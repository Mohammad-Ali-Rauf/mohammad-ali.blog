'use server'

// Supabase Configuration
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '../types/supabase'

// Types
import { BlogFormSchemaType } from '@/app/dashboard/schemas'

// Routing
import { revalidatePath } from 'next/cache'

// Constants
const DASHBOARD = '/dashboard'

const supabase = createServerClient<Database>(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
	{
		cookies: {
			async get(name: string) {
				'use server'
				return await cookies().get(name)?.value
			},
		},
	}
)

export async function createBlog(data: BlogFormSchemaType) {
	const { ['content']: excludedKey, ...blog } = data

	const resultBlog = await supabase
		.from('blog')
		.insert(blog)
		.select('id')
		.single()

	if (resultBlog?.error) {
		return JSON.stringify(resultBlog.error)
	} else {
		const result = await supabase
			.from('blog_content')
			.insert({ blog_id: resultBlog.data.id!, content: data.content })
			
		revalidatePath(DASHBOARD)
		return JSON.stringify(result)
	}
}

export async function readBlog() {
	return supabase
		.from('blog')
		.select('*')
		.eq('is_published', true)
		.order('created_at', { ascending: true })
}

export async function readBlogForAdmin() {
	return supabase
		.from('blog')
		.select('*')
		.order('created_at', { ascending: true })
}

export async function readBlogContentById(blogId: string) {
	return supabase
		.from('blog')
		.select('*,blog_content(*)')
		.eq('id', blogId)
		.single()
}

export async function deleteBlogById(blogId: string) {
	const result = await supabase.from('blog').delete().eq('id', blogId)

	revalidatePath(DASHBOARD)

	return JSON.stringify(result)
}

export async function updateBlogByDashboard(
	blogId: string,
	data: BlogFormSchemaType
) {
	const result = await supabase.from('blog').update(data).eq('id', blogId)

	revalidatePath(DASHBOARD)

	return JSON.stringify(result)
}

export async function updateBlogByForm(
	blogId: string,
	data: BlogFormSchemaType
) {
	const { ['content']: excludedKey, ...blog } = data
	const resultBlog = await supabase.from('blog').update(blog).eq('id', blogId)

	if (resultBlog.error) {
		return JSON.stringify(resultBlog.error)
	} else {
		const result = await supabase
			.from('blog_content')
			.update({ content: data.content })
			.eq('blog_id', blogId)

		revalidatePath(DASHBOARD)

		return JSON.stringify(result)
	}
}