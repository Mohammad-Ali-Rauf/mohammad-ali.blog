import React from 'react'
import Link from 'next/link'

// Components
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import DeleteAlert from './DeleteAlert'
import SwitchForm from './SwitchForm'

// Icons
import { EyeOpenIcon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'

// Functions/Actions - Database CRUD not these actions
import { readBlogForAdmin, updateBlogByDashboard } from '@/lib/actions/blog'

// Types
import { BlogFormSchemaType } from '../schemas'

interface ActionsProps {
	id: string
}

const Actions = ({ id }: ActionsProps) => {
	return (
		<div className='flex items-center gap-3 flex-wrap'>
			<Link href={`/blog/${id}`}>
				<Button
					aria-label='view-blog'
					variant='outline'
					className='flex items-center gap-2'
				>
					<EyeOpenIcon />
					View
				</Button>
			</Link>
			<Link href={`/dashboard/blog/edit/${id}`}>
				<Button
					aria-label='edit-blog'
					variant='secondary'
					className='flex items-center gap-2'
				>
					<Pencil1Icon />
					Edit
				</Button>
			</Link>
			<DeleteAlert blogId={id} />
		</div>
	)
}

const BlogTable = async () => {
	const { data: blogs } = await readBlogForAdmin()

	return (
		<ScrollArea>
			<div className='border:bg-graident-dark rounded-md w-[900px] h-full overflow-hidden md:w-full'>
				<div className='grid grid-cols-5 p-5 text-gray-500 border-b'>
					<h1 className='col-span-2'>Title</h1>
					<h1>Premium</h1>
					<h1>Publish</h1>
				</div>
				{blogs?.map((blog, i) => {
					const updatePremium = updateBlogByDashboard.bind(null, blog.id, {
						is_premium: !blog.is_premium,
					} as BlogFormSchemaType)

					const updatePublish = updateBlogByDashboard.bind(null, blog.id, {
						is_published: !blog.is_published,
					} as BlogFormSchemaType)

					return (
						<div key={i} className='grid grid-cols-5 p-5'>
							<h1 className='col-span-2'>{blog.title}</h1>
							<SwitchForm
								name='premium'
								onToggle={updatePremium}
								checked={blog.is_premium}
							/>
							<SwitchForm
								name='publish'
								onToggle={updatePublish}
								checked={blog.is_published}
							/>
							<Actions id={blog.id} />
						</div>
					)
				})}
			</div>
			<ScrollBar orientation='horizontal' className='h-3' />
		</ScrollArea>
	)
}

export default BlogTable
