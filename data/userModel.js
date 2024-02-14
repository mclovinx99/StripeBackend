const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
	role: {
		type: String,
		require: true
	},
	name: {
		type: String,
		require: true
	},
	address: {
		line1: String,
		postal_code: Number,
		city: String,
		state: String,
		country: String
	},
	email: {
		type: String,
		require: true
	},
	password: {
		type: String,
		require: true
	},
	stripe_id: {
		type: String,
		require: true,
		default: " "
	},
	product_subscribed: {
		type: String,
		required: true,
		default: ""
	}
});



const ProductUsers = mongoose.model('ProductUsers', userSchema);

module.exports = ProductUsers;