import React from 'react'

// Components
import { Button } from '../ui/button'
import LoginForm from '../LoginForm'

// Icons
import { LightningBoltIcon } from '@radix-ui/react-icons'

// Zustand
import { useUser } from '@/lib/store/user'

interface Props {}

const Checkout = (props: Props) => {
	const user = useUser((state) => state.user)

	if (!user?.id) {
		return (
			<div className='flex items-center justify-center h-96 w-full gap-2'>
				<LoginForm /> to read.
			</div>
		)
	}

	return (
		<form className='h-96 w-full flex items-center justify-center'>
			<Button
				variant='ghost'
				className='flex flex-col p-10 gap-5 ring-2 ring-blue-500'
			>
				<span className='flex items-center gap-2 text-2xl font-bold ring-blue-500'>
					<LightningBoltIcon />
					Upgrade to Pro
				</span>
				<span>Unlock all blog content.</span>
			</Button>
		</form>
	)
}

export default Checkout
