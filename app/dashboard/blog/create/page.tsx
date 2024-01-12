'use client'
import React from 'react'

// Components
import BlogForm from '../../components/BlogForm'

// Types
import { BlogFormSchemaType } from '../../schemas'

const page = () => {

	const handleCreate = (data: BlogFormSchemaType) => {
		console.log(data)
	}

  return (
	<BlogForm onHandleSubmit={handleCreate} />
  )
}

export default page