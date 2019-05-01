const {Items} = require('../models');

module.exports = {
    async index (req, res) {
        try {
            let item = null
            const search = req.query.search
            if (search) {
                item = await Items.findAll({
                    where: {
                        $or: [
                            'ItemID', 'ItemName', 'Supplier', 'CategoryID','QuantityPerUnit','UnitPrice','UnitInStock','UnitsOnOrder','MinStockLevel'
                        ].map(key => ({
                            [key]: {
                                $like: `%${search}%`
                            }
                        }))
                    }
                })
            } else {
                item = await Items.findAll({
                    limit: 10
                })
            }
            res.send(item)
        } catch (err) {
            res.status(500).send({
                error: 'error has occurred'
            })
        }
    },
    async show (req, res) {
        try {
            const item = await Items.findById(req.params.ItemID)
            res.send(item)
        } catch (err) {
            res.status(500).send({
                error: 'an error has occurred trying to show the items'
            })
        }
    },
    async post (req, res) {
        try {
            const item = await Items.create(req.body)
            res.send(item)
        } catch (err) {
            res.status(500).send({
                error: 'an error has occurred trying to create the item'
            })
        }
    },
    async put (req, res){
        try {
            await Items.update(req.body, {
                where: {
                    id: req.params.ItemID
                }
            });
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'an error has occurred trying to update the item'
            })
        }
    }
};
