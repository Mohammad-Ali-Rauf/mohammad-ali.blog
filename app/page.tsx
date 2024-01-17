import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Functions/Actions
import { readBlog } from '@/lib/actions/blog'

interface Props {}

const Home = async (props: Props) => {
	const { data: blogs } = await readBlog()

	return (
		<div className='w-full grid grid-cols-1 md:grid-cols-3 gap-5 p-5 xl:p-0'>
			{blogs?.map((blog, i) => {
				return (
					<Link
						href={`/blog/${blog.id}`}
						key={i}
						className='w-full border rounded-md bg-graident-dark p-5 hover:ring-2 ring-blue-500 transition-all cursor-pointer space-y-5 first:lg:col-span-2 first:md:col-span-3'
					>
						<div className='relative w-full h-72 md:h-64 xl:h-96'>
							<Image
								src={blog.image_url}
								alt='cover'
								fill
								className='object-cover object-center'
							/>
						</div>
					</Link>
				)
			})}
		</div>
	)
}

export default Home
