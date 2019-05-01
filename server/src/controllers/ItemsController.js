const {items} = require('../models');

module.exports = {
    async index (req, res) {
        try {
             const Items = await items.findAll({
                 limit: 10
                })
            res.send(Items)
        } catch (err) {
            res.status(500).send({
                error: 'error has occurred'
            })
        }
    },
    async post (req, res) {
        try {
            const item = await items.create(req.body)
            res.send(item)
        } catch (err) {
            res.status(500).send({
                error: 'an error has occurred trying to create the items'
            })
        }
    }
};
