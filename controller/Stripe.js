const utilities = require('../utilities');
const mongoose = require('mongoose');
const Users = mongoose.model('ProductUsers');




class Stripe {
	async checkoutSession(req, res) {
		try {
			const user = await Users.findOne({
				email: req.body.email
			})
				.exec()
			if (user != null) {
				const prices = await utilities.stripe.prices.list({
					lookup_keys: [req.body.lookup_key],
					expand: ['data.product'],
				});

				const session = await utilities.stripe.checkout.sessions.create({
					billing_address_collection: 'auto',
					customer: user.stripe_id,
					line_items: [
						{
							price: prices.data[0].id,
							// For metered billing, do not pass quantity
							quantity: 1,

						},
					],
					mode: 'subscription',
					success_url: `${utilities.domain}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
					cancel_url: `${utilities.domain}?canceled=true`,
				});
				res.json({ url: session.url });
			}
		}
		catch (err) {
			console.log(err);
		}
	}
}

module.exports = new Stripe();