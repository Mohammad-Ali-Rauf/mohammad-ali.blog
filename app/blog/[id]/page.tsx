import React from 'react'
import Image from 'next/image'

// Types
import { IBlog } from '@/lib/types'

// Components
import BlogContent from './components/BlogContent'

interface Props {
	params: {
		id: string
	}
}

export async function generateStaticParams() {
	const { data: blog } = await fetch(
		`https://mohammad-ali-blog.vercel.app/api/blog?id=*`
	).then((res) => res.json())
	return blog
}

export async function generateMetadata({ params: { id } }: Props) {
	const { data: blog } = (await fetch(
		`https://mohammad-ali-blog.vercel.app/api/blog?id=${id}`
	).then((res) => res.json())) as { data: IBlog }

	return {
		title: blog?.title,
		authors: {
			name: 'Mohammad Ali',
		},
		openGraph: {
			title: blog?.title,
			url: `https://mohammad-ali-blog.vercel.app/blog/${id}`,
			siteName: 'ScribeQuantum',
			images: blog?.image_url,
			type: 'website',
		},
		keywords: [
			'ScribeQuantum',
			'Blog',
			'Mohammad Ali',
			'Mohammad Ali Blog',
			'MERN Stack Developer Blog',
			'MERN Stack Developer',
			'Next.js Developer',
			'Next.js Developer Blog',
			'Scribe Quantum',
			'ScribeQuantum Blog',
			'Scribe Quantum Blog',
		],
	}
}

const Page = async ({ params: { id } }: Props) => {
	const { data: blog } = (await fetch(
		`https://mohammad-ali-blog.vercel.app/api/blog?id=${id}`
	).then((res) => res.json())) as { data: IBlog }

	if (!blog?.id) {
		return <h1>Not Found</h1>
	}

	return (
		<div className='max-w-5xl mx-auto min-h-screen pt-10 space-y-10'>
			<div className='sm:px-10 space-y-5'>
				<h1 className='text-3xl font-bold'>{blog?.title}</h1>
				<p className='text-sm text-gray-300'>
					{new Date(blog?.created_at || '').toDateString()}
				</p>
			</div>
			<div className='w-full h-96 relative'>
				<Image
					priority
					src={blog?.image_url || '/'}
					alt='cover'
					fill
					className='object-cover object-center rounded-md border'
					sizes='(max-width: 768px) 100vw, (max-width: 1200px): 50vw, 33vw'
				/>
			</div>
			<BlogContent blogId={blog?.id} />
		</div>
	)
}

export default Page
