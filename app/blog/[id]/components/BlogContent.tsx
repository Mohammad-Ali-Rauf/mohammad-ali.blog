'use client'

import React, { useEffect, useState } from 'react'

// Supabase
import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/lib/types/supabase'

// Components
import MarkdownPreview from '@/components/markdown/MarkdownPreview'
import Loader from './Loader'

interface Props {
	blogId: string
}

const BlogContent = ({ blogId }: Props) => {
	const [blog, setBlog] = useState<{
		blog_id: string
		content: string
		created_at: string
	} | null>()
	const [loading, setLoading] = useState(true)

	const supabase = createBrowserClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	)

	const readBlogContent = async () => {
		const { data } = await supabase
			.from('blog_content')
			.select('*')
			.eq('blog_id', blogId)
			.single()

		setBlog(data)
		setLoading(false)
	}

	useEffect(() => {
        readBlogContent()
        // eslint-disable-next-line
    }, [])

	if (loading) {
		return <Loader />
	}

	return <MarkdownPreview className='sm:px-10' content={blog?.content || ''} />
}

export default BlogContent
