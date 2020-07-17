const routes = require('express').Router()
const dbController = require('../controllers/dbController');


//Add a User
routes
    .route('/adduser')
    .post(dbController.addUser);

// Get a User
routes
    .route('/user/:id')
    .get(dbController.getUser);

// Get all User
routes
    .route('/users')
    .get(dbController.getAllUSer);

//Get All Products
routes
    .route('/products')
    .get(dbController.getAllProduct);

//Get a Product
routes
    .route('/product/:id')
    .get(dbController.getProdut);

//Get All Orders 
routes
    .route('/orders')
    .get(dbController.getAllOrders);

//Get a User Order
routes
    .route('/order/user/:id')
    .get(dbController.getUserOder);

//Get a Order
routes
    .route('/order/:id')
    .get(dbController.getAOrder);

//Add Order
routes
    .route('/addorder')
    .post(dbController.addOrder);

//Add Products
routes
    .route('/addproduct')
    .post(dbController.addProduct);

module.exports = routes;