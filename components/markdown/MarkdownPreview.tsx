import { cn } from '@/lib/utils'
import React, { ForwardRefExoticComponent } from 'react'
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

import 'highlight.js/styles/atom-one-dark.css'
import { LucideProps, TerminalIcon } from 'lucide-react'
import CopyButton from './CopyButton'
import { icons } from '@/lib/icons'
import { IconType } from 'react-icons/lib'

interface Props {
	content: string
	className?: string
}

const MarkdownPreview = ({ content, className }: Props) => {
	return (
		<Markdown
			rehypePlugins={[rehypeHighlight]}
			className={cn('dark:text-gray-200 space-y-8 ml-10', className)}
			components={{
				h1: ({ node, ...props }) => {
					return <h1 {...props} className='text-3xl font-bold' />
				},
				h2: ({ node, ...props }) => {
					return <h1 {...props} className='text-2xl font-bold mt-10 mb-10' />
				},
				h3: ({ node, ...props }) => {
					return <h1 {...props} className='text-xl font-bold mt-10 mb-10' />
				},
				code: ({ node, className, children, ...props }) => {
					const match = /language-(\w+)/.exec(className || '')
					const id = (Math.floor(Math.random() * 100) + 1).toString()
					if (match?.length) {
						let Icon: ForwardRefExoticComponent<LucideProps> | IconType =
							TerminalIcon
						const isMatch = icons.hasOwnProperty(match[1])
						if (isMatch) {
							Icon = icons[match[1] as keyof typeof icons]
						}

						return (
							<div className=' bg-graident-dark text-gray-300 border-[0.5px] rounded-md border-zinc-500'>
								<div className='flex items-center justify-between px-5 py-2 border-b-[0.5px] border-zinc-500'>
									<div className='flex items-center gap-2'>
										<Icon className='w-4 h-4' />
										<p className='text-sm text-gray-400'>
											{/* @ts-ignore  */}
											{node?.data?.meta}
										</p>
									</div>
									<CopyButton id={id} />
								</div>
								<div className='overflow-x-auto w-full'>
									<div className='p-5' id={id}>
										{children}
									</div>
								</div>
							</div>
						)
					} else {
						return (
							// TODO: convert to code block
							<code
								className='text-lg break-words bg-zinc-700 px-1 rounded-sm'
								{...props}
							>
								{children}
							</code>
						)
					}
				},
			}}
		>
			{content}
		</Markdown>
	)
}

export default MarkdownPreview
