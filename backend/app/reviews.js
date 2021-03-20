const router = require('express').Router();

const Review = require('../models/Review');
const Institution = require('../models/Institution');
const auth = require('../middlewares/auth');
const permit = require('../middlewares/permit');
const errorCatching = require('../middlewares/errorCatching');
const calculateRating = require('./utils/calculateRating');

router.get('/:instID', async (req, res) => {
   try {
       const reviews = await Review.find({institution: req.params.instID}).populate('user', 'username -_id');
       if(reviews.length === 0) return res.status(404).send({error: 'Отзывов нет.'});
       return res.send(reviews);
   } catch (e) {
       return errorCatching(e, res);
   }
});

router.post('/:instID', [auth], async (req, res) => {
    try {
        const reviewCheck = await Review.findOne({institution: req.params.instID});
        if(reviewCheck
            && reviewCheck.user.toString() === req.user._id.toString()
        ) return res.status(400).send({message: 'Вы не можете добавить два отзыва на одно заведение.'})

        const institution = await Institution.findById(req.params.instID);
        if(institution.user.toString() === req.user._id.toString()) return res.status(400).send({error: 'Вы не можете оценить своё же заведение.'});
        const review = new Review({
            user: req.user._id,
            institution: req.params.instID,
            comment: req.body.comment,
            foodRating: req.body.foodRating,
            serviceRating: req.body.serviceRating,
            interiorRating: req.body.interiorRating,
            createDate: new Date().toISOString()
        });
        await review.save();
        const reviews = await Review.find({institution: req.params.instID}).lean();
        if(review.foodRating !== 0 || review.serviceRating !== 0 || review.interiorRating !== 0) {
            institution.rateCount++;
            let foodRatingSum = calculateRating(reviews, 'foodRating');
            let serviceRatingSum = calculateRating(reviews, 'serviceRating');
            let interiorRatingSum = calculateRating(reviews, 'interiorRating');
            institution.foodRating = (foodRatingSum / reviews.length).toFixed(1);
            institution.serviceRating = (serviceRatingSum / reviews.length).toFixed(1);
            institution.interiorRating = (interiorRatingSum / reviews.length).toFixed(1);
            institution.allRating = ((institution.foodRating + institution.interiorRating + institution.serviceRating) / 3).toFixed(1);
            await institution.save();
        }
        return res.send({message: 'Ваш отзыв добавлен.'});
    } catch (e) {
        return errorCatching(e, res);
    }
});

router.delete('/', [auth, permit('admin')], async (req, res) => {
   try {
       const review = await Review.deleteOne({_id: req.query.revID});
       const inst = await Institution.findById(req.query.instID);
       if(review.deletedCount === 0) return res.status(400).send({error: 'Вы уже удалили отзыв.'});

       const reviews = await Review.find({institution: req.query.instID}).lean();
       if(reviews.length === 0) {
           inst.rateCount--;
           inst.foodRating = 0;
           inst.serviceRating = 0;
           inst.interiorRating = 0;
           inst.allRating = 0;
       } else {
           inst.rateCount--;
           let foodRatingSum = calculateRating(reviews, 'foodRating');
           let serviceRatingSum = calculateRating(reviews, 'serviceRating');
           let interiorRatingSum = calculateRating(reviews, 'interiorRating');
           inst.foodRating = (foodRatingSum / reviews.length).toFixed(1);
           inst.serviceRating = (serviceRatingSum / reviews.length).toFixed(1);
           inst.interiorRating = (interiorRatingSum / reviews.length).toFixed(1);
           inst.allRating = ((inst.foodRating + inst.interiorRating + inst.serviceRating) / 3).toFixed(1);
       }
       await inst.save();

       return res.send({message: 'Отзыв удалён.'});
   } catch (e) {
       return errorCatching(e, res);
   }
});

module.exports = router;