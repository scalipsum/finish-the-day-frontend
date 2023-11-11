import { Database } from '@/../database.types'

export type Tables<T extends keyof Database['public']['Tables']> = Partial<
  Database['public']['Tables'][T]['Row']
>

export type Day =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'

export type Category = 'personal' | 'professional' | 'passion'
