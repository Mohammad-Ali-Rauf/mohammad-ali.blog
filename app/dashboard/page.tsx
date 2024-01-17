import React, { Suspense } from 'react'
import Link from 'next/link'

// Icons
import { PlusIcon } from '@radix-ui/react-icons'

// Components
import { Button } from '@/components/ui/button'
import BlogTable from './components/BlogTable'

type Props = {}

const Dashboard = (props: Props) => {
	return (
		<div className='space-y-5'>
			<div className='flex items-center justify-between'>
				<h1 className='text-2xl font-bold'>Blogs</h1>
				<Link href='/dashboard/blog/create'>
					<Button variant='outline' aria-label='create-blog'>
						Create <PlusIcon />
					</Button>
				</Link>
			</div>
			<BlogTable />
		</div>
	)
}

export default Dashboard
