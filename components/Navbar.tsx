'use client'

import React from 'react'

import Link from 'next/link'
import LoginForm from './LoginForm'

// Zustand user state
import { useUser } from '@/lib/store/user'
import Profile from './Profile'

type Props = {}

const Navbar = (props: Props) => {
	const user = useUser((state) => state.user)

	return (
		<nav className='flex items-center justify-between'>
			<div className='group'>
				<Link href='/' className='text-2xl font-bold'>
					ScribeQuantum
				</Link>
				<div className='h-1 w-0 group-hover:w-full transition-all duration-500 bg-blue-500 ' />
			</div>

			{user ? <Profile /> : <LoginForm />}
		</nav>
	)
}

export default Navbar
