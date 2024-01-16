import React from 'react'

// Functions/Actions
import { readBlogContentById } from '@/lib/actions/blog'

// Components
import { toast } from '@/components/ui/use-toast'
import EditForm from '../components/EditForm'

interface Props {
	params: {
		id: string
	}
}

const page = async ({ params }: Props) => {
	const { data: blog, error } = await readBlogContentById(params.id)

	return (
		<EditForm blog={blog} />
	)
}

export default page
