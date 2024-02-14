const mongoose = require('mongoose');
const Users = mongoose.model('ProductUsers');
const stripe = require('stripe')('sk_test_51Oit8WSJSac01P1zZds5NdXOKEzCOFPMV2QLF6v2SZOeiZ8xRNiebnQFiEX3G2rxcgbwn8Tl6dLdwvSTsPjrCQGN00Nh40jsbq');

//Frontend Domain for redirection
const YOUR_DOMAIN = 'http://localhost:3000';

module.exports.Login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await Users.findOne({
			email: email
		})
			.exec()
		if (user.password == password) {
			this.stripeCustomer(user, res);
			console.log("verified");
			res
				.status(200)
				.json({ message: 'logged in.' });
		}
		else {
			res
				.status(401)
				.json({ message: 'Incorrect Password' });
		}
	}
	catch (err) {
		console.log(err);
	}
}

module.exports.stripeCustomer = async (user, res) => {
	try {
		const customer = await stripe.customers.create({
			name: user.name,
			address: {
				line1: user.address.line1,
				postal_code: user.address.postal_code,
				city: user.address.city,
				state: user.address.state,
				country: user.address.country
			}
		});
		console.log(customer);

		// TODO `SEND THIS CUSTOMER ID IN HELPER FN TO BE UPDATED`

		const filter = { email: user.email };
		const update = { stripe_id: customer.id };
		const updateID = await Users.findOneAndUpdate(filter, update)
			.exec()
			.then((res) => {
				console.log("updated stripe ID", res);
			})
			.catch((err) => {
				console.log("err updating ID", err);
			});
	}
	catch (err) {
		res
			.status(401)
			.json(err)
	}
}


// app.post('/create-checkout-session', async (req, res) => {

// 	const prices = await stripe.prices.list({
// 		lookup_keys: [req.body.lookup_key],
// 		expand: ['data.product'],
// 	});

// 	const customer = await stripe.customers.create({
// 		name: 'Vaibhav',
// 		address: {
// 			line1: 'line1 addres',
// 			postal_code: '500001',
// 			city: 'Fl',
// 			state: 'Florida',
// 			country: 'US',
// 		}
// 	});

// 	console.log(customer, "customer created.");

// 	const session = await stripe.checkout.sessions.create({
// 		billing_address_collection: 'auto',
// 		customer: customer.id,

// 		line_items: [
// 			{
// 				price: prices.data[0].id,
// 				// For metered billing, do not pass quantity
// 				quantity: 1,

// 			},
// 		],
// 		mode: 'subscription',
// 		success_url: `${YOUR_DOMAIN}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
// 		cancel_url: `${YOUR_DOMAIN}?canceled=true`,
// 	});

// 	console.log(session, "session created");

// 	res.redirect(303, session.url);
// });

// app.post('/create-portal-session', async (req, res) => {
// 	// For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
// 	// Typically this is stored alongside the authenticated user in your database.
// 	const { session_id } = req.body;
// 	const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

// 	// This is the url to which the customer will be redirected when they are done
// 	// managing their billing with the portal.
// 	const returnUrl = YOUR_DOMAIN;

// 	const portalSession = await stripe.billingPortal.sessions.create({
// 		customer: checkoutSession.customer,
// 		return_url: returnUrl,
// 	});

// 	res.redirect(303, portalSession.url);
// });

// app.post(
// 	'/webhook',
// 	express.raw({ type: 'application/json' }),
// 	(request, response) => {
// 		let event = request.body;
// 		// Replace this endpoint secret with your endpoint's unique secret
// 		// If you are testing with the CLI, find the secret by running 'stripe listen'
// 		// If you are using an endpoint defined with the API or dashboard, look in your webhook settings
// 		// at https://dashboard.stripe.com/webhooks
// 		const endpointSecret = 'whsec_12345';
// 		// Only verify the event if you have an endpoint secret defined.
// 		// Otherwise use the basic event deserialized with JSON.parse
// 		if (endpointSecret) {
// 			// Get the signature sent by Stripe
// 			const signature = request.headers['stripe-signature'];
// 			try {
// 				event = stripe.webhooks.constructEvent(
// 					request.body,
// 					signature,
// 					endpointSecret
// 				);
// 			} catch (err) {
// 				console.log(`⚠️  Webhook signature verification failed.`, err.message);
// 				return response.sendStatus(400);
// 			}
// 		}

// 		let subscription;
// 		let status;
// 		// Handle the event
// 		switch (event.type) {
// 			case 'customer.subscription.trial_will_end':
// 				subscription = event.data.object;
// 				status = subscription.status;
// 				console.log(`Subscription status is ${status}.`);
// 				// Then define and call a method to handle the subscription trial ending.
// 				// handleSubscriptionTrialEnding(subscription);
// 				break;
// 			case 'customer.subscription.deleted':
// 				subscription = event.data.object;
// 				status = subscription.status;
// 				console.log(`Subscription status is ${status}.`);
// 				// Then define and call a method to handle the subscription deleted.
// 				// handleSubscriptionDeleted(subscriptionDeleted);
// 				break;
// 			case 'customer.subscription.created':
// 				subscription = event.data.object;
// 				status = subscription.status;
// 				console.log(`Subscription status is ${status}.`);
// 				// Then define and call a method to handle the subscription created.
// 				// handleSubscriptionCreated(subscription);
// 				break;
// 			case 'customer.subscription.updated':
// 				subscription = event.data.object;
// 				status = subscription.status;
// 				console.log(`Subscription status is ${status}.`);
// 				// Then define and call a method to handle the subscription update.
// 				// handleSubscriptionUpdated(subscription);
// 				break;
// 			default:
// 				// Unexpected event type
// 				console.log(`Unhandled event type ${event.type}.`);
// 		}
// 		// Return a 200 response to acknowledge receipt of the event
// 		response.send();
// 	}
// );


