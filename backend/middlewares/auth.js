const User = require('../models/User');

module.exports = async (req, res, next) => {
    const token = req.get('Authorization');
    if(!token) return res.status(401).send({error: 'No token present'});
    try {
        const user = await User.findOne({token});
        if(!user) return res.status(401).send({error: "Wrong token"});
        req.user = user;
        next();
    } catch (e) {
        res.status(400).send({error: "Bad request"});
    }
};
