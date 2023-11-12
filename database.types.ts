export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      category: {
        Row: {
          created_at: string | null
          id: number
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      day: {
        Row: {
          created_at: string | null
          id: number
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      days_categories: {
        Row: {
          category_id: number
          day_id: number
        }
        Insert: {
          category_id?: number
          day_id?: number
        }
        Update: {
          category_id?: number
          day_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'days_categories_category_id_fkey'
            columns: ['category_id']
            isOneToOne: false
            referencedRelation: 'category'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'days_categories_day_id_fkey'
            columns: ['day_id']
            isOneToOne: false
            referencedRelation: 'day'
            referencedColumns: ['id']
          }
        ]
      }
      todo: {
        Row: {
          body: string
          category_id: number
          created_at: string | null
          day_id: number
          id: number
          is_completed: boolean | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          body: string
          category_id?: number
          created_at?: string | null
          day_id?: number
          id?: number
          is_completed?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          body?: string
          category_id?: number
          created_at?: string | null
          day_id?: number
          id?: number
          is_completed?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'fk_user'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'todo_category_id_fkey'
            columns: ['category_id']
            isOneToOne: false
            referencedRelation: 'category'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'todo_day_id_fkey'
            columns: ['day_id']
            isOneToOne: false
            referencedRelation: 'day'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
