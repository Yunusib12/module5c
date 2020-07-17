const routes = require('express').Router();
const axios = require('axios');
const path = require('path');


// Default Route
routes
    .route('/')
    .get((req, res) => {

        // let isUserCreated = false;

        // // Get the list of all the products
        // function getProduct() {
        //     return axios.get('http://localhost:3000/api/products')
        //         .then((response) => response.data)
        // }

        // getProduct()
        //     .then((products) => {

        //         res.render('main', { isUserCreated, products })
        //     })
        //     .catch((err) => console.error(err))

        res.sendfile(path.join(__dirname, "../public/index.html"));
    });


module.exports = routes;