import { createClient } from '@supabase/supabase-js'
import {create} from 'zustand'

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface AdminState {
	isAdmin: boolean
	fetchAdminStatus: () => void
}

const useAdminStore = create<AdminState>()((set) => ({
	isAdmin: false,
	fetchAdminStatus: async () => {
		// Fetch admin status from the database
		const { data, error } = await supabase.from('users').select('role').single()

		if (error) {
			console.error('Error fetching admin status:', error.message)
			return
		}

		// Check if the user has an 'admin' role
		const isAdmin = data?.role === 'admin'

		// Update the state
		set({ isAdmin })
	},
}))

export default useAdminStore
