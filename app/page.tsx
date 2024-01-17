import React from 'react'

// Components
import { Button } from '@/components/ui/button'

// Functions/Actions
import { readBlog } from '@/lib/actions/blog'

interface Props {}

const Home = async (props: Props) => {
	const { data: blogs } = await readBlog()

	return (
		<div>
			{JSON.stringify(blogs)}
			<Button aria-label='hello'>Hello</Button>
		</div>
	)
}

export default Home
