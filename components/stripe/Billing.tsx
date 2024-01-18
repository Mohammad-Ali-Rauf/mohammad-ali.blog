'use client'

import React, { useTransition } from 'react'

// Components
import { Button } from '../ui/button'

// Icons
import { BackpackIcon } from '@radix-ui/react-icons'
import { Loader } from 'lucide-react'

// Zustand
import { useUser } from '@/lib/store/user'

// Actions
import { manageBilling } from '@/lib/actions/stripe'

// Styles
import { cn } from '@/lib/utils'

interface Props {}

const Billing = (props: Props) => {
	const [isPending, startTransition] = useTransition()

	const user = useUser((state) => state.user)

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		startTransition(async () => {
			const data = JSON.parse(await manageBilling(user?.stripe_customer_id!))
			window.location.href = data.url
		})
	}

	return (
		<form onSubmit={onSubmit}>
			<Button
				className='flex items-center justify-between w-full'
				variant='ghost'
			>
				<span className='flex items-center gap-2'>
					<Loader className={cn('animate-spin', {
						hidden: !isPending
					})} />
					Billing
				</span>
				<BackpackIcon />
			</Button>
		</form>
	)
}

export default Billing
