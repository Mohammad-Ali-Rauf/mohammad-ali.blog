import React from 'react'

interface Props {
	params: {
		id: string
	}
}

const Page = async ({ params: { id } }: Props) => {
	const { data: blog } = await fetch(
		`https://mohammad-ali-blog.vercel.app/api/blog/${id}`
	).then((res) => res.json())

	return (
        <div>{JSON.stringify(blog)}</div>
    )
}

export default Page
