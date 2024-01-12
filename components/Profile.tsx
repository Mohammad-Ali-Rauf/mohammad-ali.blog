import { useUser } from '@/lib/store/user'
import Image from 'next/image'
import React from 'react'

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import Link from 'next/link'
import { Button } from './ui/button'

// Icons
import { DashboardIcon, LockOpen1Icon } from '@radix-ui/react-icons'

type Props = {}

const Profile = (props: Props) => {
	const user = useUser((state) => state.user)
	return (
		<Popover>
			<PopoverTrigger>
				<Image
					src={user?.user_metadata?.avatar_url}
					alt={user?.user_metadata?.user_name}
					width={50}
					height={50}
					className='rounded-full ring-2 ring-blue-500'
				/>
			</PopoverTrigger>
			<PopoverContent className='p-2 space-y-3'>
				<div className='px-4 text-sm'>
					<p>{user?.user_metadata?.user_name}</p>
					<p className='text-gray-500'>{user?.user_metadata?.email}</p>
				</div>
				<Link href='/dashboard' className='block'>
					<Button variant='ghost' className='w-full'>
            <DashboardIcon className='w-5 h-5 mr-2' />
						Dashboard
					</Button>
				</Link>
			</PopoverContent>
		</Popover>
	)
}

export default Profile
