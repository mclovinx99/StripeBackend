const express = require('express');
const Router = express.Router();

const userFunctionalities = require('../controller/UserFunctionalities');
const stripe = require('../controller/Stripe');
const utilities = require('../utilities');


//admin routes

Router
	.route('/user/login')
	.post(userFunctionalities.Login);

Router
	.route('/user/checkout')
	.post(stripe.checkoutSession);



module.exports = Router;