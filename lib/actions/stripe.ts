'use server'

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function checkout(email: string, redirectTo: string) {
	return JSON.stringify(
		await stripe.checkout.sessions.create({
			success_url: redirectTo || 'https://mohammad-ali-blog.vercel.app/',
			cancel_url: 'https://mohammad-ali-blog.vercel.app/',
			customer_email: email,
			line_items: [{ price: process.env.PRO_PRICE_ID!, quantity: 1 }],
			mode: 'subscription',
		})
	)
}
