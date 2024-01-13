'use client'

import React from 'react'

// Components
import { Switch } from '@/components/ui/switch'
import { toast } from '@/components/ui/use-toast'

interface Props {
	checked: boolean
	onToggle: () => Promise<string>
    name: string
}

const SwitchForm = ({ checked, name, onToggle }: Props) => {
	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const { error } = JSON.parse(await onToggle())

		if (error) {
			toast({
				title: `Failed to update ${name}.`,
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
				title: `Successfully updated ${name}. 🎉`,
				variant: 'success',
				duration: 1500,
			})
		}
	}

	return (
		<form onSubmit={onSubmit}>
			<Switch checked={checked} type='submit' />
		</form>
	)
}

export default SwitchForm
