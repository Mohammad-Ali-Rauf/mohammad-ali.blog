import React from 'react'
import NavLink from './components/NavLink'

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='space-y-5'>
			<NavLink />
			{children}
		</div>
	)
}

export default layout
