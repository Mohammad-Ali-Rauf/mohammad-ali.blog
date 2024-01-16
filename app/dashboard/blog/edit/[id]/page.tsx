import React from 'react'

// Functions/Actions
import { readBlogContentById } from '@/lib/actions/blog'

// Components
import { toast } from '@/components/ui/use-toast'

interface Props {
	params: {
		id: string
	}
}

const page = async ({ params }: Props) => {
	const { data, error } = await readBlogContentById(params.id)

	if (error || !data) {
		toast({
			title: 'Failed to load blog content. Please try again later',
			description: error.message,
			variant: 'destructive',
			duration: 1500,
		})
	} else {
		toast({
			title: 'Successfully loaded blog content.',
			description: 'You can now edit this blog content',
			variant: 'success',
			duration: 1500,
		})
	}

	return <div>{JSON.stringify(data)}</div>
}

export default page
