import React from 'react'

// Components
import { Button } from '../ui/button'

// Icons
import { BackpackIcon } from '@radix-ui/react-icons'

interface Props {}

const Billing = (props: Props) => {
	return (
		<Button
			className='flex items-center justify-between w-full'
			variant='ghost'
		>
			Billing
			<BackpackIcon />
		</Button>
	)
}

export default Billing
