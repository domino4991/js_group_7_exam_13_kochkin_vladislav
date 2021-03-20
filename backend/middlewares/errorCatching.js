const {ValidationError, CastError} = require('mongoose').Error;

module.exports = (e, res) => {
    if(e instanceof ValidationError) {
        return res.status(400).send(e);
    } else if(e instanceof CastError) {
        return res.status(400).send({error: 'Передан не верный ID.'});
    } else {
        return res.status(500).send({error: 'Eternal Server Error.'});
    }
}