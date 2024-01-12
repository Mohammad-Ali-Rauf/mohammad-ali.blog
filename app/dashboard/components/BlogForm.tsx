'use client'

import React, { useState } from 'react'
import Image from 'next/image'

// Configurations
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { BlogFormSchema, BlogFormSchemaType } from '../schemas'

// Components
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { SaveIcon } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import MarkdownPreview from '@/components/markdown/MarkdownPreview'

// Icons
import {
	EyeOpenIcon,
	Pencil1Icon,
	RocketIcon,
	StarIcon,
} from '@radix-ui/react-icons'
import { z } from 'zod'

// Props Types
interface Props {
    onHandleSubmit: (data: BlogFormSchemaType) => void
}

const BlogForm = ({ onHandleSubmit }: Props) => {
	const [isPreview, setIsPreview] = useState(false)

	const form = useForm<z.infer<typeof BlogFormSchema>>({
		mode: 'all',
		resolver: zodResolver(BlogFormSchema),
		defaultValues: {
			title: '',
			image_url: '',
			content: '',
			is_published: true,
			is_premium: false,
		},
	})

	const onSubmit = (data: BlogFormSchemaType) => {
		onHandleSubmit(data)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-8 w-full border rounded-md'
			>
				<div className='p-5 gap-5 flex items-center flex-wrap justify-between border-b'>
					<div className='flex gap-5 items-center flex-wrap'>
						<span
							onClick={() =>
								setIsPreview(
									!isPreview && !form.getFieldState('image_url').invalid
								)
							}
							role='button'
							tabIndex={0}
							className='flex items-center gap-2 border bg-zinc-700 p-3 rounded-md hover:ring-2 hover:ring-zinc-400 transition-all'
						>
							{isPreview ? (
								<>
									<Pencil1Icon />
									Edit
								</>
							) : (
								<>
									<EyeOpenIcon />
									Preview
								</>
							)}
						</span>
						<FormField
							control={form.control}
							name='is_premium'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<div className='flex items-center gap-3 border bg-zinc-700 p-3 rounded-md hover:ring-2 hover:ring-zinc-400 transition-all'>
											<StarIcon />
											<span>Premium</span>
											<Switch
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</div>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='is_published'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<div className='flex items-center gap-3 border bg-zinc-700 p-3 rounded-md hover:ring-2 hover:ring-zinc-400 transition-all'>
											<RocketIcon />
											<span>Publish</span>
											<Switch
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</div>
									</FormControl>
								</FormItem>
							)}
						/>
					</div>
					<Button
						className='flex items-center gap-2'
						disabled={!form.formState.isValid}
					>
						<SaveIcon className='w-5 h-5' />
						Save
					</Button>
				</div>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<div
									className={cn(
										'p-2 w-full flex break-words gap-2',
										isPreview ? 'divide-x-0' : 'divide-x'
									)}
								>
									<Input
										placeholder='Blog Title'
										{...field}
										className={cn(
											'border-none text-lg font-medium leading-relaxed',
											isPreview ? 'w-0 p-0' : 'w-full lg:w-1/2'
										)}
									/>
									<div
										className={cn(
											'lg:px-10',
											isPreview
												? 'w-full mx-auto lg:w-4/5'
												: 'w-1/2 lg:block hidden'
										)}
									>
										<h1 className='text-3xl font-medium'>
											{form.getValues().title}
										</h1>
									</div>
								</div>
							</FormControl>
							{form.getFieldState('title') && form.getValues().title && (
								<FormMessage className='text-rose-500' />
							)}
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='image_url'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<div
									className={cn(
										'p-2 w-full flex break-words gap-2',
										isPreview ? 'divide-x-0' : 'divide-x'
									)}
								>
									<Input
										placeholder='Image URL'
										{...field}
										className={cn(
											'border-none text-lg font-medium leading-relaxed',
											isPreview ? 'w-0 p-0' : 'w-full lg:w-1/2'
										)}
									/>
									<div
										className={cn(
											'lg:px-10',
											isPreview
												? 'w-full mx-auto lg:w-4/5'
												: 'w-1/2 lg:block hidden'
										)}
									>
										{!isPreview ? (
											<p className='text-yellow-500'>
												Please click `Preview` to see image.
											</p>
										) : (
											<div className='relative rounded-md border mt-5 h-80'>
												<Image
													src={form.getValues().image_url}
													alt='preview'
													fill
													className='object-center object-cover rounded-md'
												/>
											</div>
										)}
									</div>
								</div>
							</FormControl>
							{form.getFieldState('image_url') &&
								form.getValues().image_url && (
									<div className='p-2'>
										<FormMessage className='text-rose-500' />
									</div>
								)}
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='content'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<div
									className={cn(
										'p-2 w-full flex break-words gap-2',
										isPreview ? 'divide-x-0' : 'divide-x h-70vh'
									)}
								>
									<Textarea
										placeholder='Content'
										{...field}
										className={cn(
											'border-none resize-none text-lg font-medium leading-relaxed h-full',
											isPreview ? 'w-0 p-0' : 'w-full lg:w-1/2'
										)}
									/>
									<div
										className={cn(
											'overflow-y-auto',
											isPreview
												? 'w-full mx-auto lg:w-4/5'
												: 'w-1/2 lg:block hidden'
										)}
									>
										<MarkdownPreview content={form.getValues().content} />
									</div>
								</div>
							</FormControl>
							{form.getFieldState('content') && form.getValues().content && (
								<FormMessage className='text-rose-500' />
							)}
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
}

export default BlogForm
