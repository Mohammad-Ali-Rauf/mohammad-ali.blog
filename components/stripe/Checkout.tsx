import React, { FormEvent, useTransition } from 'react'

// Components
import { Button } from '../ui/button'
import LoginForm from '../LoginForm'

// Icons
import { LightningBoltIcon } from '@radix-ui/react-icons'

// Zustand
import { useUser } from '@/lib/store/user'

// Stripe
import { checkout } from '@/lib/actions/stripe'
import { loadStripe } from '@stripe/stripe-js'

// Routing
import { usePathname } from 'next/navigation'

// Styles
import { cn } from '@/lib/utils'

interface Props {}

const Checkout = (props: Props) => {
	const user = useUser((state) => state.user)
	const path = usePathname()
	const [isPending, startTransition] = useTransition()

	const handleCheckout = (e: FormEvent) => {
		e.preventDefault()
		startTransition(async () => {
			const data = JSON.parse(
				await checkout(user?.user_metadata?.email!, location.origin + path)
			)
			const stripe = await loadStripe(
				process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!
			)
			await stripe?.redirectToCheckout({ sessionId: data.id })
		})
	}

	if (!user?.id) {
		return (
			<div className='flex items-center justify-center h-96 w-full gap-2'>
				<LoginForm /> to read.
			</div>
		)
	}

	return (
		<form
			onSubmit={handleCheckout}
			className={cn('h-96 w-full flex items-center justify-center', {
				'animate-pulse': isPending,
			})}
		>
			<Button
				variant='ghost'
				className='flex flex-col p-10 gap-5 ring-2 ring-blue-500'
			>
				<span className='flex items-center gap-2 text-2xl font-bold ring-blue-500'>
					<LightningBoltIcon
						className={cn(
							'w-5 h-5',
							!isPending ? 'animate-bounce' : 'animate-spin'
						)}
					/>
					Upgrade to Pro
				</span>
				<span>Unlock all blog content.</span>
			</Button>
		</form>
	)
}

export default Checkout
