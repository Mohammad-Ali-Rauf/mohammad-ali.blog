'use client'

import Image from 'next/image'
import React, { useEffect } from 'react'
import Link from 'next/link'

// Zustand
import { useUser } from '@/lib/store/user'

// Components
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from './ui/button'

// Icons
import { DashboardIcon, LockOpen1Icon } from '@radix-ui/react-icons'

// Supabase
import { createBrowserClient } from '@supabase/ssr'

// Routing
import { useRouter } from 'next/navigation'

const Profile = () => {
	const user = useUser((state) => state.user)
	const setUser = useUser((state) => state.setUser)
	const { push } = useRouter()

	const isAdmin = user?.user_metadata?.role === 'admin'

	const supabase = createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	)

	supabase
		.channel('custom-all-channel')
		.on(
			'postgres_changes',
			{ event: 'UPDATE', schema: 'public', table: 'users' },
			(payload) => {
				console.log('Change received!', payload)
			}
		)
		.subscribe()

	useEffect(() => {}, [supabase])

	const handleLogout = async () => {
		supabase.auth.signOut()
		setUser(undefined)
		push('/')
	}

	return (
		<Popover>
			<PopoverTrigger>
				<Image
					loading='lazy'
					src={user?.user_metadata?.avatar_url}
					alt={user?.user_metadata?.user_name}
					width={50}
					height={50}
					className='rounded-full ring-2 ring-blue-500'
				/>
			</PopoverTrigger>
			<PopoverContent className='p-2 space-y-3 divide-y'>
				<div className='px-4 text-sm'>
					<p>{user?.user_metadata?.user_name}</p>
					<p className='text-gray-500'>{user?.user_metadata?.email}</p>
				</div>
				{isAdmin && (
					<Link href='/dashboard' className='block'>
						<Button
							aria-label='dashboard'
							variant='ghost'
							className='w-full flex items-center justify-between'
						>
							Dashboard
							<DashboardIcon />
						</Button>
					</Link>
				)}
				<Button
					aria-label='logout'
					onClick={handleLogout}
					variant='ghost'
					className='w-full flex items-center justify-between'
				>
					Logout
					<LockOpen1Icon />
				</Button>
			</PopoverContent>
		</Popover>
	)
}

export default Profile
