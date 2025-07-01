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
      api_keys: {
        Row: {
          api_key: string
          created_at: string | null
          id: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          api_key: string
          created_at?: string | null
          id?: never
          updated_at?: string | null
          user_id: string
        }
        Update: {
          api_key?: string
          created_at?: string | null
          id?: never
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          id: string
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      banking_details: {
        Row: {
          account_type: string
          account_verified: boolean | null
          bank_account_number: string
          bank_name: string
          branch_code: string | null
          created_at: string
          encrypted_data: string | null
          encryption_salt: string | null
          fields_encrypted: string[] | null
          full_name: string
          id: string
          password_hash: string | null
          paystack_subaccount_code: string | null
          paystack_subaccount_id: string | null
          recipient_type: string
          subaccount_status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          account_type: string
          account_verified?: boolean | null
          bank_account_number: string
          bank_name: string
          branch_code?: string | null
          created_at?: string
          encrypted_data?: string | null
          encryption_salt?: string | null
          fields_encrypted?: string[] | null
          full_name: string
          id?: string
          password_hash?: string | null
          paystack_subaccount_code?: string | null
          paystack_subaccount_id?: string | null
          recipient_type: string
          subaccount_status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          account_type?: string
          account_verified?: boolean | null
          bank_account_number?: string
          bank_name?: string
          branch_code?: string | null
          created_at?: string
          encrypted_data?: string | null
          encryption_salt?: string | null
          fields_encrypted?: string[] | null
          full_name?: string
          id?: string
          password_hash?: string | null
          paystack_subaccount_code?: string | null
          paystack_subaccount_id?: string | null
          recipient_type?: string
          subaccount_status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      banking_subaccounts: {
        Row: {
          account_number: string
          bank_code: string
          bank_name: string
          business_name: string
          created_at: string | null
          email: string
          id: string
          paystack_response: Json | null
          status: string | null
          subaccount_code: string | null
          updated_at: string | null
        }
        Insert: {
          account_number: string
          bank_code: string
          bank_name: string
          business_name: string
          created_at?: string | null
          email: string
          id?: string
          paystack_response?: Json | null
          status?: string | null
          subaccount_code?: string | null
          updated_at?: string | null
        }
        Update: {
          account_number?: string
          bank_code?: string
          bank_name?: string
          business_name?: string
          created_at?: string | null
          email?: string
          id?: string
          paystack_response?: Json | null
          status?: string | null
          subaccount_code?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      books: {
        Row: {
          author: string
          back_cover: string | null
          category: string
          condition: string
          created_at: string
          description: string
          front_cover: string | null
          grade: string | null
          id: string
          image_url: string
          inside_pages: string | null
          price: number
          seller_id: string
          sold: boolean
          title: string
          university_year: string | null
        }
        Insert: {
          author: string
          back_cover?: string | null
          category: string
          condition: string
          created_at?: string
          description: string
          front_cover?: string | null
          grade?: string | null
          id?: string
          image_url: string
          inside_pages?: string | null
          price: number
          seller_id: string
          sold?: boolean
          title: string
          university_year?: string | null
        }
        Update: {
          author?: string
          back_cover?: string | null
          category?: string
          condition?: string
          created_at?: string
          description?: string
          front_cover?: string | null
          grade?: string | null
          id?: string
          image_url?: string
          inside_pages?: string | null
          price?: number
          seller_id?: string
          sold?: boolean
          title?: string
          university_year?: string | null
        }
        Relationships: []
      }
      broadcasts: {
        Row: {
          active: boolean
          created_at: string
          created_by: string | null
          expires_at: string | null
          id: string
          message: string
          priority: Database["public"]["Enums"]["broadcast_priority"]
          target_audience:
            | Database["public"]["Enums"]["broadcast_target_audience"]
            | null
          title: string
          type: Database["public"]["Enums"]["broadcast_type"]
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          message: string
          priority?: Database["public"]["Enums"]["broadcast_priority"]
          target_audience?:
            | Database["public"]["Enums"]["broadcast_target_audience"]
            | null
          title: string
          type?: Database["public"]["Enums"]["broadcast_type"]
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          message?: string
          priority?: Database["public"]["Enums"]["broadcast_priority"]
          target_audience?:
            | Database["public"]["Enums"]["broadcast_target_audience"]
            | null
          title?: string
          type?: Database["public"]["Enums"]["broadcast_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "broadcasts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "account_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "broadcasts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "account_details"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "broadcasts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          status: string
          subject: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          status?: string
          subject: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          status?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      email_notifications: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      notification_preferences: {
        Row: {
          created_at: string | null
          email_notifications: boolean | null
          id: string
          marketing_emails: boolean | null
          push_notifications: boolean | null
          sms_notifications: boolean | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email_notifications?: boolean | null
          id?: string
          marketing_emails?: boolean | null
          push_notifications?: boolean | null
          sms_notifications?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email_notifications?: boolean | null
          id?: string
          marketing_emails?: boolean | null
          push_notifications?: boolean | null
          sms_notifications?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          message: string
          read: boolean
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          read?: boolean
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          read?: boolean
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      payment_logs: {
        Row: {
          event_type: string
          id: string
          payload: Json | null
          paystack_event_id: string | null
          processed_at: string | null
          transaction_id: string | null
        }
        Insert: {
          event_type: string
          id?: string
          payload?: Json | null
          paystack_event_id?: string | null
          processed_at?: string | null
          transaction_id?: string | null
        }
        Update: {
          event_type?: string
          id?: string
          payload?: Json | null
          paystack_event_id?: string | null
          processed_at?: string | null
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_logs_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_splits: {
        Row: {
          book_amount: number
          courier_amount: number
          courier_subaccount: string | null
          created_at: string
          delivery_amount: number
          id: string
          paystack_reference: string | null
          paystack_split_id: string | null
          pickup_confirmed: boolean
          platform_commission: number
          seller_amount: number
          seller_subaccount: string
          split_executed: boolean
          transaction_id: string
          updated_at: string
        }
        Insert: {
          book_amount: number
          courier_amount?: number
          courier_subaccount?: string | null
          created_at?: string
          delivery_amount?: number
          id?: string
          paystack_reference?: string | null
          paystack_split_id?: string | null
          pickup_confirmed?: boolean
          platform_commission: number
          seller_amount: number
          seller_subaccount: string
          split_executed?: boolean
          transaction_id: string
          updated_at?: string
        }
        Update: {
          book_amount?: number
          courier_amount?: number
          courier_subaccount?: string | null
          created_at?: string
          delivery_amount?: number
          id?: string
          paystack_reference?: string | null
          paystack_split_id?: string | null
          pickup_confirmed?: boolean
          platform_commission?: number
          seller_amount?: number
          seller_subaccount?: string
          split_executed?: boolean
          transaction_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      paystack_subaccounts: {
        Row: {
          account_number: string
          business_name: string
          created_at: string
          id: string
          paystack_response: Json | null
          percentage_charge: number
          settlement_bank: string
          status: string
          subaccount_code: string
          updated_at: string
          user_id: string
          user_type: string
        }
        Insert: {
          account_number: string
          business_name: string
          created_at?: string
          id?: string
          paystack_response?: Json | null
          percentage_charge?: number
          settlement_bank: string
          status?: string
          subaccount_code: string
          updated_at?: string
          user_id: string
          user_type: string
        }
        Update: {
          account_number?: string
          business_name?: string
          created_at?: string
          id?: string
          paystack_response?: Json | null
          percentage_charge?: number
          settlement_bank?: string
          status?: string
          subaccount_code?: string
          updated_at?: string
          user_id?: string
          user_type?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          addresses_same: boolean | null
          bio: string | null
          created_at: string
          date_of_birth: string | null
          email: string | null
          email_verification_token: string | null
          email_verified: boolean | null
          first_name: string | null
          id: string
          is_admin: boolean | null
          last_name: string | null
          name: string | null
          phone_number: string | null
          phone_verification_code: string | null
          phone_verified: boolean | null
          pickup_address: Json | null
          preferences: Json | null
          profile_picture_url: string | null
          shipping_address: Json | null
          status: string | null
          suspended_at: string | null
          suspension_reason: string | null
          updated_at: string
          user_tier: string | null
          verification_expires_at: string | null
        }
        Insert: {
          addresses_same?: boolean | null
          bio?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          email_verification_token?: string | null
          email_verified?: boolean | null
          first_name?: string | null
          id: string
          is_admin?: boolean | null
          last_name?: string | null
          name?: string | null
          phone_number?: string | null
          phone_verification_code?: string | null
          phone_verified?: boolean | null
          pickup_address?: Json | null
          preferences?: Json | null
          profile_picture_url?: string | null
          shipping_address?: Json | null
          status?: string | null
          suspended_at?: string | null
          suspension_reason?: string | null
          updated_at?: string
          user_tier?: string | null
          verification_expires_at?: string | null
        }
        Update: {
          addresses_same?: boolean | null
          bio?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          email_verification_token?: string | null
          email_verified?: boolean | null
          first_name?: string | null
          id?: string
          is_admin?: boolean | null
          last_name?: string | null
          name?: string | null
          phone_number?: string | null
          phone_verification_code?: string | null
          phone_verified?: boolean | null
          pickup_address?: Json | null
          preferences?: Json | null
          profile_picture_url?: string | null
          shipping_address?: Json | null
          status?: string | null
          suspended_at?: string | null
          suspension_reason?: string | null
          updated_at?: string
          user_tier?: string | null
          verification_expires_at?: string | null
        }
        Relationships: []
      }
      reports: {
        Row: {
          book_id: string | null
          book_title: string
          created_at: string
          id: string
          reason: string
          reported_user_id: string
          reporter_user_id: string
          seller_name: string
          status: string
          updated_at: string
        }
        Insert: {
          book_id?: string | null
          book_title: string
          created_at?: string
          id?: string
          reason: string
          reported_user_id: string
          reporter_user_id: string
          seller_name: string
          status?: string
          updated_at?: string
        }
        Update: {
          book_id?: string | null
          book_title?: string
          created_at?: string
          id?: string
          reason?: string
          reported_user_id?: string
          reporter_user_id?: string
          seller_name?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reports_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          book_id: string
          book_title: string
          buyer_email: string | null
          buyer_id: string
          buyer_phone: string | null
          commission: number
          committed_at: string | null
          created_at: string
          delivery_address: Json | null
          delivery_fee: number | null
          expires_at: string | null
          id: string
          paystack_reference: string | null
          paystack_subaccount_code: string | null
          price: number
          refund_reason: string | null
          refunded: boolean | null
          seller_committed: boolean | null
          seller_id: string
          status: string | null
          total_amount: number | null
        }
        Insert: {
          book_id: string
          book_title: string
          buyer_email?: string | null
          buyer_id: string
          buyer_phone?: string | null
          commission: number
          committed_at?: string | null
          created_at?: string
          delivery_address?: Json | null
          delivery_fee?: number | null
          expires_at?: string | null
          id?: string
          paystack_reference?: string | null
          paystack_subaccount_code?: string | null
          price: number
          refund_reason?: string | null
          refunded?: boolean | null
          seller_committed?: boolean | null
          seller_id: string
          status?: string | null
          total_amount?: number | null
        }
        Update: {
          book_id?: string
          book_title?: string
          buyer_email?: string | null
          buyer_id?: string
          buyer_phone?: string | null
          commission?: number
          committed_at?: string | null
          created_at?: string
          delivery_address?: Json | null
          delivery_fee?: number | null
          expires_at?: string | null
          id?: string
          paystack_reference?: string | null
          paystack_subaccount_code?: string | null
          price?: number
          refund_reason?: string | null
          refunded?: boolean | null
          seller_committed?: boolean | null
          seller_id?: string
          status?: string | null
          total_amount?: number | null
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
      waitlist: {
        Row: {
          created_at: string
          email: string
          id: string
          notified: boolean
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          notified?: boolean
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          notified?: boolean
        }
        Relationships: []
      }
    }
    Views: {
      account_details: {
        Row: {
          bio: string | null
          created_at: string | null
          date_of_birth: string | null
          email: string | null
          email_verified: boolean | null
          first_name: string | null
          full_name: string | null
          id: string | null
          last_name: string | null
          phone_number: string | null
          phone_verified: boolean | null
          preferences: Json | null
          profile_picture_url: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          email_verified?: boolean | null
          first_name?: string | null
          full_name?: string | null
          id?: string | null
          last_name?: string | null
          phone_number?: string | null
          phone_verified?: boolean | null
          preferences?: Json | null
          profile_picture_url?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          email_verified?: boolean | null
          first_name?: string | null
          full_name?: string | null
          id?: string | null
          last_name?: string | null
          phone_number?: string | null
          phone_verified?: boolean | null
          preferences?: Json | null
          profile_picture_url?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      atomic_book_purchase: {
        Args: { p_book_id: string; p_buyer_id: string; p_amount: number }
        Returns: string
      }
      calculate_commission: {
        Args: { base_amount: number; user_tier?: string }
        Returns: number
      }
      calculate_payment_split: {
        Args: {
          p_book_amount: number
          p_delivery_amount?: number
          p_platform_commission_rate?: number
        }
        Returns: {
          platform_commission: number
          seller_amount: number
          courier_amount: number
        }[]
      }
      create_payment_split: {
        Args: {
          p_transaction_id: string
          p_seller_subaccount: string
          p_courier_subaccount: string
          p_book_amount: number
          p_delivery_amount?: number
        }
        Returns: string
      }
      delete_user_profile: {
        Args: { user_id: string }
        Returns: undefined
      }
      execute_payment_split_after_pickup: {
        Args: { p_transaction_id: string }
        Returns: boolean
      }
      generate_api_key: {
        Args: { user_id: string }
        Returns: string
      }
      get_current_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_profile: {
        Args: { user_id: string }
        Returns: {
          id: string
          name: string
          email: string
        }[]
      }
      has_role: {
        Args:
          | { user_id: number; role_name: string }
          | { user_id: string; role_name: string }
        Returns: boolean
      }
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
      is_current_user_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_user_admin: {
        Args: Record<PropertyKey, never>
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
      search_books: {
        Args: {
          search_term: string
          category_filter?: string
          max_price?: number
        }
        Returns: {
          id: string
          title: string
          author: string
          description: string
          price: number
          category: string
          condition: string
          image_url: string
          seller_id: string
          created_at: string
        }[]
      }
      secure_atomic_book_purchase: {
        Args: {
          p_book_id: string
          p_buyer_id: string
          p_amount: number
          p_book_title: string
        }
        Returns: string
      }
      update_expired_transactions: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      update_user_profile: {
        Args: { user_id: string; new_name: string; new_email: string }
        Returns: undefined
      }
      validate_book_availability: {
        Args: { book_id: string }
        Returns: boolean
      }
      validate_book_ownership: {
        Args: { book_id: string; user_id: string }
        Returns: boolean
      }
      validate_payment_amount: {
        Args: { amount: number }
        Returns: boolean
      }
    }
    Enums: {
      broadcast_priority: "low" | "normal" | "medium" | "high" | "urgent"
      broadcast_target_audience: "all" | "users" | "admin"
      broadcast_type: "info" | "warning" | "success" | "error"
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
    Enums: {
      broadcast_priority: ["low", "normal", "medium", "high", "urgent"],
      broadcast_target_audience: ["all", "users", "admin"],
      broadcast_type: ["info", "warning", "success", "error"],
    },
  },
} as const
