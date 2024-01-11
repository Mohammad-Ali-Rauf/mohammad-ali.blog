'use client'

import React from 'react'

import Link from 'next/link'
import LoginForm from './LoginForm'

import { createBrowserClient } from '@supabase/ssr'

type Props = {}

const Navbar = (props: Props) => {
	const supabase = createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	)

    

	return (
		<nav className='flex items-center justify-between'>
			<div className='group'>
				<Link href='/' className='text-2xl font-bold'>
					ScribeQuantum
				</Link>
				<div className='h-1 w-0 group-hover:w-full transition-all duration-500 bg-green-500 ' />
			</div>

			<LoginForm />
		</nav>
	)
}

export default Navbar
