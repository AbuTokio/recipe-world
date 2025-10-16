export interface User {
  user_metadata?: any
  id?: string | undefined
  username: string
  firstname: string
  lastname: string
  email: string
  password: string
  img_url: string
  created_at?: string
}
