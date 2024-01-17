'use client'

import React, { useEffect, useState } from 'react'

// Supabase
import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/lib/types/supabase'

// Types
import { IBlog } from '@/lib/types'
import MarkdownPreview from '@/components/markdown/MarkdownPreview'

interface Props {
	blogId: string
}

const BlogContent = ({ blogId }: Props) => {
	const [blog, setBlog] = useState<{
		blog_id: string
		content: string
		created_at: string
	} | null>()

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
	}

    useEffect(() => {
        readBlogContent()
        // eslint-disable-next-line
    }, [])

	return <MarkdownPreview content={blog?.content || ''} />
}

export default BlogContent
