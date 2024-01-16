'use client'

import React from 'react'

// Components
import BlogForm from '@/app/dashboard/components/BlogForm'
import { toast } from '@/components/ui/use-toast'

// Types
import { IBlogDetail } from '@/lib/types'
import { BlogFormSchemaType } from '@/app/dashboard/schemas'

// Functions/Actions
import { updateBlogByForm } from '@/lib/actions/blog'

// Routing
import { useRouter } from 'next/navigation'

interface Props {
	blog: IBlogDetail
}

const EditForm = ({ blog }: Props) => {
	const router = useRouter()

	const onSubmit = async (data: BlogFormSchemaType) => {
		const result = await updateBlogByForm(blog?.id!, data)
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
				title: 'Successfully updated the blog.',
				description: (
					<span>
						The blog has been updated.
					</span>
				),
				duration: 1500,
				variant: 'success',
			})
			router.push('/dashboard')
		}
	}

	return <BlogForm blog={blog} onHandleSubmit={onSubmit} />
}

export default EditForm
