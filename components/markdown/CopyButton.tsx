'use client'
import { CopyIcon } from 'lucide-react'
import React, { useState } from 'react'
import { CheckIcon } from '@radix-ui/react-icons'
import { useToast } from '../ui/use-toast'

interface Props {
    id: string
}

const CopyButton = ({ id }: Props) => {

    const [onCopy, setOnCopy] = useState(false);
	const [onSuccess, setSuccess] = useState(false);
    const { toast } = useToast()

	const handleCopy = async () => {
		let text = document.getElementById(id)!.textContent;
		try {
			if (text) {
                await navigator.clipboard.writeText(text);
                setOnCopy(true);
            } else {
                toast({
                    title: `There is nothing to copy.`,
                    variant: 'destructive',
                    duration: 1500,
                })
            }
		} catch (err) {
			toast({
                title: `Failed to copy: ${err}`,
                variant: 'destructive',
                duration: 1500,
            })
		}
	};
	return (
		<div
			className="hover:scale-105 relative hover:bg-zinc-700 p-2 rounded-md cursor-pointer"
			onClick={handleCopy}
		>
			<CheckIcon
				className={`" cursor-pointer  transition-all w-6 h-6  text-green-500 ${
					onSuccess ? "scale-100 " : "scale-0 "
				}`}
				onTransitionEnd={() => {
					setTimeout(() => {
						setSuccess(false);
						setOnCopy(false);
					}, 500);
				}}
			/>

			<div className=" h-full w-full absolute top-0 left-0 flex items-center justify-center">
				<CopyIcon
					className={`"w-4 h-4 transition-all ${
						onCopy ? "scale-0" : "scale-100 "
					}`}
					onTransitionEnd={() => {
						if (onCopy) {
							setSuccess(true);
						}
					}}
				/>
			</div>
		</div>
	);
}

export default CopyButton