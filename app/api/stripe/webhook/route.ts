// Next.js Stuff for handling stripe
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { buffer } from 'node:stream/consumers'

// Actions
import { createSupabaseAdmin } from '@/lib/supabase'

// Stripe
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const endpointSecret = process.env.ENDPOINT_SECRET!

export async function POST(req: NextRequest, res: Response) {
	let event
	try {
		const sig = headers().get('stripe-signature')
		// @ts-ignore
		const rawBody = await buffer(req.body)

		event = stripe.webhooks.constructEvent(rawBody, sig!, endpointSecret)
	} catch (err: unknown) {
		return NextResponse.json(`Webhook Error: ${err}`, { status: 400 })
	}

	// Handle the event
	switch (event?.type) {
		case 'customer.updated':
			const customer = event.data.object
			const subscription = await stripe.subscriptions.list({
				customer: customer.id,
			});
            if (subscription.data.length) {
                const sub = subscription.data[0]

                onSuccessSubscription()
            }
			break
		default:
			console.log(`Unhandled event type ${event.type}`)
	}

	return NextResponse.json({})
}

const onSuccessSubscription = async () => {
    const supabase = await createSupabaseAdmin()
}