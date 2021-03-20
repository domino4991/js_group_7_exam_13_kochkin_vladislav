const router = require('express').Router();

const Institution = require('../models/Institution');
const auth = require('../middlewares/auth');
const permit = require('../middlewares/permit');
const upload = require('../middlewares/upload');
const errorCatching = require('../middlewares/errorCatching');

router.get('/', async (req, res) => {
    try {
        const institutions = await Institution.find();
        if(institutions.length === 0) return res.status(404).send({error: 'Нет ни одного добавленного заведения.'});
        return res.send(institutions);
    } catch (e) {
        return errorCatching(e, res);
    }
});

router.get('/:instID', async (req, res) => {
    try {
        const institution = await Institution.findById(req.params.instID);
        if(!institution) return res.status(404).send({error: 'Заведение не найдено.'});
        return res.send(institution);
    } catch (e) {
        return errorCatching(e, res);
    }
});

router.post('/', [auth, upload.single('mainImage')], async (req, res) => {
   try {
        if(!req.body.isAgree) return res.status(400).send({error: 'Вы должны принять условия соглашения.'});
        const newInstitution = new Institution({
            title: req.body.title,
            description: req.body.description,
            user: req.user._id
        });
        if(req.file) newInstitution.mainImage = req.file.filename;
        await newInstitution.save();
        return res.send(newInstitution);
   } catch (e) {
       return errorCatching(e, res);
   }
});

router.delete('/:instID', [auth, permit('admin')], async (req, res) => {
   try {
       const institution = await Institution.deleteOne({_id: req.params.instID});
       if(!institution || institution.deletedCount === 0) return res.status(404).send({error: 'Заведение не найдено.'});
       return res.send({message: `Заведение удалено.`});
   } catch (e) {
       return errorCatching(e, res);
   }

});

module.exports = router;