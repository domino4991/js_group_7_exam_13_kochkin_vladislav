const router = require('express').Router();
const Image = require('../models/Image');
const Institutions = require('../models/Institution');

const errorCatching = require('../middlewares/errorCatching');
const upload = require('../middlewares/upload');
const auth = require('../middlewares/auth');
const permit = require('../middlewares/permit');

router.get('/:instID', async (req, res) => {
    try {
        const images = await Image.find({institution: req.params.instID});
        if(images.length === 0) return res.status(404).send({error: 'Нет фотографий.'});
        return res.send(images);
    } catch (e) {
        return errorCatching(e, res);
    }
});

router.post('/:instID', [auth, upload.single('image')], async (req, res) => {
   try {
       const institution = await Institutions.findById(req.params.instID);
       const image = new Image({
           user: req.user._id,
           institution: req.params.instID,
           image: req.file.filename
       });
       await image.save();
       institution.imagesCount++;
       await institution.save();
       return res.send({message: 'Фотография добавлена.'})
   } catch (e) {
       return errorCatching(e, res);
   }
});

router.delete('/:photoID', [auth, permit('admin')], async (req, res) => {
   try {
       const image = await Image.deleteOne({_id: req.params.photoID});
       if(image.deletedCount === 0) return res.status(404).send({error: 'Изображение не найдено.'});
       return res.send({message: 'Изображение удалено.'});
   } catch (e) {
       return errorCatching(e, res);
   }
});

module.exports = router;