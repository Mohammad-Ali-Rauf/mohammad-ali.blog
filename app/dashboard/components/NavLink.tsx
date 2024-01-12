'use client'
import { cn } from '@/lib/utils'
import { PersonIcon, ReaderIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {}

const NavLink = (props: Props) => {
	const pathname = usePathname()

	const links = [
		{
			href: '/dashboard',
			text: '/dashboard',
			icon: ReaderIcon,
		},
		{
			href: '/dashboard/user',
			text: '/user',
			icon: PersonIcon,
		},
	]

	return (
		<div className='flex items-center gap-5 border-b pb-2'>
			{links.map(({ href, text, icon: Icon }, i) => {
				return (
					<Link
						className={cn(
							'flex items-center gap-1 hover:underline transition-all',
                            {'text-blue-500 underline': pathname === href},
						)}
						key={i}
						href={href}
					>
						<Icon />
						{text}
					</Link>
				)
			})}
		</div>
	)
}

export default NavLink
