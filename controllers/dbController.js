const db = require('../models');
const { ObjectId } = require('mongodb');
const { json } = require('body-parser');

const dbController = {

    addUser: (req, res) => {

        const userObject = req.body;
        const objectSize = Object.keys(userObject).length;
        let finalUserObject = [];
        let finalUserOrderObject = [];
        let isUserCreated = false;
        let hasOrder = false;

        if (objectSize > 4) {

            // Get a subset of the object properties
            let userDataObject = (({ firstName, lastName, address, email }) => ({ firstName, lastName, address, email }))(userObject);

            // Get a array of products selected from the object
            let userSelectedProductsArray = Object.values(userObject).slice(4);

            // Insert user data into the database
            db.User.create(userDataObject, (err, userData) => {
                if (err) {
                    res.status(500).send(err);
                }
                else {

                    let userId = userData._id;

                    // Create the user order
                    let userOrderObject = userSelectedProductsArray.map((product) => {
                        return {
                            productId: product,
                            userId: userId
                        }
                    });

                    // Inserting the orders into the database
                    db.Order.create(userOrderObject, (err, userOderData) => {
                        if (err) {
                            res.status(500).send(err);
                        } else {

                            //Get all user orders
                            let userId = userOderData.map((userOrder) => {
                                console.log("Map userOrder", userOrder);
                                return userOrder.userId
                            });

                            function getUserOrder(user) {

                                console.log("fUserId", user);
                            }
                            getUserOrder(userId);

                            finalUserOrderObject.push(userOderData);

                            isUserCreated = true;
                            hasOrder = true;
                            console.log(isUserCreated, finalUserObject, finalUserOrderObject);

                            res.render('main', { isUserCreated, hasOrder, finalUserObject, finalUserOrderObject });
                        }
                    })

                    finalUserObject.push(userData);
                }
            });
        }
        else {
            db.User.create(userObject, (err, data) => {
                if (err) {
                    res.status(500).send(err);
                } else {

                    finalUserObject.push(data);
                    isUserCreated = true;
                    console.log(isUserCreated, finalUserObject, hasOrder);
                    res.render('main', { isUserCreated, finalUserObject, hasOrder });
                }
            });
        }
    },
    addOrder: (req, res) => {
        db.Order.create(req.body, (err, data) => {
            if (err)
                res.status(500).send(err);
            else
                res.json(data);
        })
    },
    addProduct: (req, res) => {
        db.Product.create(req.body, (err, data) => {
            if (err)
                res.status(500).send(err);
            else
                res.json(data);
        })
    },
    getProdut: (req, res) => {
        db.Product.findById({ _id: req.params.id }, (err, data) => {
            if (err)
                res.status(500).send(err);
            else
                res.json(data);
        }
        )
    },
    getUser: (req, res) => {
        db.User.findOne({ _id: req.params.id }, (err, data) => {
            if (err)
                res.status(500).send(err);
            else
                res.json(data);
        })
    },
    getAllUSer: (req, res) => {
        db.User.find((err, data) => {
            if (err)
                res.status(500).send(err);
            else
                res.json(data);
        })
    },
    getAllProduct: (req, res) => {
        db.Product.find((err, data) => {
            if (err)
                res.status(500).send(err);
            else
                res.json(data);
        })
    },
    getUserOder: (req, res) => {
        let userId = req.params.id;
        db.User.aggregate([
            {
                $match: {
                    _id: new ObjectId(`${userId}`)
                }
            },
            {
                $lookup: {
                    from: 'orders',         //the name of the collection you want to look up information on
                    localField: '_id',      // the field on the main collection (user in this case)
                    foreignField: 'userId', // the foreing fied that match on the other collection in this case order
                    as: 'userOrders'
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'userOrders.productId',
                    foreignField: '_id',
                    as: 'userProducts'
                }
            }

        ], (err, data) => {
            if (err)
                res.status(500).send(err)
            else
                res.json(data);
        })
    },
    getAOrder: (req, res) => {
        console.log(req.params.id);
        db.Order.aggregate([

            {
                $match: {
                    _id: new ObjectId(`${req.params.id}`)
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'users'
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'products'
                }
            }
        ], (err, data) => {

            if (err)
                res.status(500).send(err)
            else
                res.json(data);
        })
    },
    getAllOrders: (req, res) => {
        db.Order.find((err, data) => {
            if (err)
                res.status(500).send(err);
            else
                res.json(data);
        })
    }
};


module.exports = dbController;