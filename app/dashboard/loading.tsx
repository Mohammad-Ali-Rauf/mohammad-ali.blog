import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const loading = () => {
	return (
		<>
			<Skeleton className='w-full h-[30px]' />
			<Skeleton className='w-full h-[30px]' />
			<Skeleton className='w-full h-[30px]' />
			<Skeleton className='w-full h-[30px]' />
			<Skeleton className='w-full h-[30px]' />
			<Skeleton className='w-full h-[30px]' />
			<Skeleton className='w-full h-[30px]' />
			<Skeleton className='w-full h-[30px]' />
			<Skeleton className='w-full h-[30px]' />
		</>
	)
}

export default loading
