const router = require('express').Router();
const User = require('../models/User');
const {ValidationError, CastError} = require('mongoose').Error;

router.post('/', async (req, res) => {
   try {
       const user = new User({
           username: req.body.username,
           password: req.body.password,
       });
       user.genToken();
       await user.save();
       return res.send(user);
   } catch (e) {
       if(e instanceof ValidationError) {
           return res.status(400).send(e);
       } else if(e instanceof CastError) {
           return res.status(400).send({error: 'Передан не верный ID.'});
       } else {
           return res.status(500).send({error: 'Eternal Server Error.'});
       }
   }
});

router.post('/sessions', async (req, res) => {
   try {
       const user = await User.findOne({username: req.body.username});
       if(!user) return res.status(404).send({error: 'Пользователь не найден.'});
       const isMatch = await user.checkPass(req.body.password);
       if(!isMatch) return res.status(400).send({error: 'Неверный пароль.'});
       user.genToken();
       await user.save({validateBeforeSave: false});
       return res.send({
           data: {
               username: user.username,
               role: user.role,
               token: user.token,
           },
           message: `Добро пожаловать ${user.username}!`
       });
   } catch (e) {
       if(e instanceof ValidationError) {
           return res.status(400).send(e);
       } else if(e instanceof CastError) {
           return res.status(400).send({error: 'Передан не верный ID.'});
       } else {
           return res.status(500).send({error: 'Eternal Server Error.'});
       }
   }
});

router.delete('/sessions', async (req, res) => {
   const token = req.get('Authorization');
   try {
        if(!token) return res.status(400).send({message: 'Ваша сессия уже завершина.'});
        const user = await User.findOne({token});
        if(!user) return res.status(404).send({message: 'Пользователь не найден.'});
        user.genToken();
        await user.save({validateBeforeSave: false});
        return res.send({message: `До скорой встречи ${user.username}. Вы вышли из своего аккаунта.`});
   } catch (e) {
        return res.status(500).send({error: 'Eternal Server Error.'});
   }
});

module.exports = router;