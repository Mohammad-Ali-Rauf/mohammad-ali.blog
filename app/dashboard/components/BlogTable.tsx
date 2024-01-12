import React, { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Switch } from '@/components/ui/switch'
import { EyeOpenIcon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'

type Props = {}

const Actions = () => {
	return (
		<div className='flex items-center gap-3 flex-wrap'>
			<Button variant='outline' className='flex items-center gap-2'>
				<EyeOpenIcon />
				View
			</Button>
			<Button variant='secondary' className='flex items-center gap-2'>
				<Pencil1Icon />
				Edit
			</Button>
			<Button variant='destructive' className='flex items-center gap-2'>
				<TrashIcon />
				Delete
			</Button>
		</div>
	)
}

const BlogTable = (props: Props) => {
	return (
		<ScrollArea>
			<div className='border:bg-graident-dark rounded-md w-[900px] h-full overflow-hidden md:w-full'>
				<div className='grid grid-cols-5 p-5 text-gray-500 border-b'>
					<h1 className='col-span-2'>Title</h1>
					<h1>Premium</h1>
					<h1>Publish</h1>
				</div>
				<div className='grid grid-cols-5 p-5'>
					<h1 className='col-span-2'>Blog Title</h1>
					<Switch checked={false} />
					<Switch checked={true} />
					<Actions />
				</div>
			</div>
			<ScrollBar orientation='horizontal' className='h-3' />
		</ScrollArea>
	)
}

export default BlogTable
