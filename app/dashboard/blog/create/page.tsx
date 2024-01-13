'use client'
import React from 'react'

// Components
import BlogForm from '../../components/BlogForm'

// Types
import { BlogFormSchemaType } from '../../schemas'

// Functions/Actions
import { createBlog } from '@/lib/actions/blog'
import { useToast } from '@/components/ui/use-toast'

const Page = () => {
	const { toast } = useToast()
	const handleCreate = async (data: BlogFormSchemaType) => {
		const result = await createBlog(data)
		const { error } = JSON.parse(result)

		if (error?.message) {
			toast({
				title: 'An error occurred while creating the blog.',
				description: error.message,
				duration: 1500,
				variant: 'destructive',
			})
		} else {
			toast({
				title: 'Successfully created the blog.',
				description: (
					<span>
						The blog with the title of{' '}
						<span className='font-bold'>{data.title}</span> has been created.
					</span>
				),
				duration: 1500,
				variant: 'success',
			})
		}
	}

	return <BlogForm onHandleSubmit={handleCreate} />
}

export default Page
