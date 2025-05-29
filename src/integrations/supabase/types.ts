export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      books: {
        Row: {
          author: string
          category: string
          condition: string
          created_at: string
          description: string
          grade: string | null
          id: string
          image_url: string
          price: number
          seller_id: string
          sold: boolean
          title: string
          university_year: string | null
        }
        Insert: {
          author: string
          category: string
          condition: string
          created_at?: string
          description: string
          grade?: string | null
          id?: string
          image_url: string
          price: number
          seller_id: string
          sold?: boolean
          title: string
          university_year?: string | null
        }
        Update: {
          author?: string
          category?: string
          condition?: string
          created_at?: string
          description?: string
          grade?: string | null
          id?: string
          image_url?: string
          price?: number
          seller_id?: string
          sold?: boolean
          title?: string
          university_year?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          addresses_same: boolean | null
          created_at: string
          email: string | null
          id: string
          is_admin: boolean | null
          name: string | null
          pickup_address: Json | null
          shipping_address: Json | null
          status: string | null
          updated_at: string
        }
        Insert: {
          addresses_same?: boolean | null
          created_at?: string
          email?: string | null
          id: string
          is_admin?: boolean | null
          name?: string | null
          pickup_address?: Json | null
          shipping_address?: Json | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          addresses_same?: boolean | null
          created_at?: string
          email?: string | null
          id?: string
          is_admin?: boolean | null
          name?: string | null
          pickup_address?: Json | null
          shipping_address?: Json | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          book_id: string
          book_title: string
          buyer_id: string
          commission: number
          created_at: string
          id: string
          price: number
          seller_id: string
        }
        Insert: {
          book_id: string
          book_title: string
          buyer_id: string
          commission: number
          created_at?: string
          id?: string
          price: number
          seller_id: string
        }
        Update: {
          book_id?: string
          book_title?: string
          buyer_id?: string
          commission?: number
          created_at?: string
          id?: string
          price?: number
          seller_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_user_profile: {
        Args: { user_id: string }
        Returns: undefined
      }
      get_user_profile: {
        Args: { user_id: string }
        Returns: {
          id: string
          name: string
          email: string
        }[]
      }
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
      list_all_profiles: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          username: string
          email: string
          created_at: string
        }[]
      }
      update_user_profile: {
        Args: { user_id: string; new_name: string; new_email: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
