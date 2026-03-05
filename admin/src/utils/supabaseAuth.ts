export const getSupabaseConfig = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in admin/.env')
  }

  return { supabaseUrl, supabaseAnonKey }
}

export const getAuthenticatedHeaders = (includeJsonContentType = false) => {
  const { supabaseAnonKey } = getSupabaseConfig()
  const accessToken = localStorage.getItem('sb-auth-token')

  if (!accessToken) {
    throw new Error('Not authenticated. Please sign in again.')
  }

  const headers: Record<string, string> = {
    'Authorization': `Bearer ${accessToken}`,
    'apikey': supabaseAnonKey,
  }

  if (includeJsonContentType) {
    headers['Content-Type'] = 'application/json'
  }

  return headers
}
