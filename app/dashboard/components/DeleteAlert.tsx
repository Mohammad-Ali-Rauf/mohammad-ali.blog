'use client'

import React, { ChangeEvent, useTransition } from 'react'

// Components
import { Button } from '@/components/ui/button'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

// Icons
import { TrashIcon } from '@radix-ui/react-icons'
import { Loader2 } from 'lucide-react'

// Functions/Actions
import { deleteBlogById } from '@/lib/actions/blog'

// Alerts
import { toast } from '@/components/ui/use-toast'

// Dynamic Classnames
import { cn } from '@/lib/utils'

// Types
import { PostgrestSingleResponse } from '@supabase/supabase-js'

const DeleteAlert = ({ blogId }: { blogId: string }) => {
	const [isPending, startTransition] = useTransition()

	const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()
		startTransition(async () => {
			const { error } = JSON.parse(
				await deleteBlogById(blogId)
			) as PostgrestSingleResponse<null>
			if (error) {
				toast({
					title: 'Failed to delete. ',
					description: (
						<pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
							<code className='text-white'>{error?.message}</code>
						</pre>
					),
					variant: 'destructive',
					duration: 1500,
				})
			} else {
				toast({
					title: 'Successfully deleted. 🎉',
					variant: 'success',
					duration: 1500,
				})
			}
		})
	}

	return (
		<div>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button aria-label='delete-blog' variant='destructive' className='flex items-center gap-2'>
						<TrashIcon />
						Delete
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete your
							blog and remove your blog from the database.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<form onSubmit={onSubmit}>
							<Button
							aria-label='delete-blog-confirmation'
								className={cn(
									'bg-rose-500 text-white hover:bg-rose-700 flex items-center gap-2',
									{
										'bg-rose-700 hover:bg-rose-900 cursor-default': isPending,
									}
								)}
								variant='destructive'
								type='submit'
							>
								{isPending ? (
									<>
										<Loader2
											className={cn('w-6 h-6', {
												'animate-spin': isPending,
												hidden: !isPending,
											})}
										/>
										Deleting
									</>
								) : (
									<>Yes, I am sure!</>
								)}
							</Button>
						</form>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	)
}

export default DeleteAlert
