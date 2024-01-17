import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/supabase'

export async function createSupabaseAdmin() {
    return createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SERVICE_ROLE!, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        }
    })
}