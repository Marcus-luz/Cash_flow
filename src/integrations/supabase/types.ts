export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      areas: {
        Row: {
          atividade_atual: string
          created_at: string | null
          data_conclusao: string | null
          id: string
          objetivo: string | null
          propriedade: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          atividade_atual: string
          created_at?: string | null
          data_conclusao?: string | null
          id?: string
          objetivo?: string | null
          propriedade: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          atividade_atual?: string
          created_at?: string | null
          data_conclusao?: string | null
          id?: string
          objetivo?: string | null
          propriedade?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      despesas: {
        Row: {
          categoria: string
          centro_custo: string | null
          created_at: string | null
          data_despesa: string
          descricao: string | null
          forma_pagamento: string
          fornecedor: string | null
          id: string
          origem: string
          status_pagamento: string
          updated_at: string | null
          user_id: string
          valor: number
        }
        Insert: {
          categoria: string
          centro_custo?: string | null
          created_at?: string | null
          data_despesa: string
          descricao?: string | null
          forma_pagamento: string
          fornecedor?: string | null
          id?: string
          origem: string
          status_pagamento: string
          updated_at?: string | null
          user_id: string
          valor: number
        }
        Update: {
          categoria?: string
          centro_custo?: string | null
          created_at?: string | null
          data_despesa?: string
          descricao?: string | null
          forma_pagamento?: string
          fornecedor?: string | null
          id?: string
          origem?: string
          status_pagamento?: string
          updated_at?: string | null
          user_id?: string
          valor?: number
        }
        Relationships: []
      }
      fornecedores: {
        Row: {
          categoria: string | null
          cidade: string
          cpf_cnpj: string
          created_at: string | null
          email: string | null
          endereco: string
          id: string
          inscricao_estadual: string | null
          inscricao_municipal: string | null
          nome_razao_social: string
          numero: string | null
          uf: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          categoria?: string | null
          cidade: string
          cpf_cnpj: string
          created_at?: string | null
          email?: string | null
          endereco: string
          id?: string
          inscricao_estadual?: string | null
          inscricao_municipal?: string | null
          nome_razao_social: string
          numero?: string | null
          uf: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          categoria?: string | null
          cidade?: string
          cpf_cnpj?: string
          created_at?: string | null
          email?: string | null
          endereco?: string
          id?: string
          inscricao_estadual?: string | null
          inscricao_municipal?: string | null
          nome_razao_social?: string
          numero?: string | null
          uf?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          name: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      propriedades: {
        Row: {
          categoria: string | null
          cidade: string
          cpf_cnpj: string
          created_at: string | null
          email: string | null
          endereco: string
          id: string
          inscricao_estadual: string | null
          inscricao_municipal: string | null
          nome_razao_social: string
          numero: string | null
          uf: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          categoria?: string | null
          cidade: string
          cpf_cnpj: string
          created_at?: string | null
          email?: string | null
          endereco: string
          id?: string
          inscricao_estadual?: string | null
          inscricao_municipal?: string | null
          nome_razao_social: string
          numero?: string | null
          uf: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          categoria?: string | null
          cidade?: string
          cpf_cnpj?: string
          created_at?: string | null
          email?: string | null
          endereco?: string
          id?: string
          inscricao_estadual?: string | null
          inscricao_municipal?: string | null
          nome_razao_social?: string
          numero?: string | null
          uf?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      receitas: {
        Row: {
          atividades: string | null
          categoria: string
          centro_custo: string | null
          created_at: string | null
          data_receita: string
          descricao: string | null
          forma_recebimento: string
          fornecedor: string | null
          id: string
          origem: string
          status_recebimento: string
          updated_at: string | null
          user_id: string
          valor: number
        }
        Insert: {
          atividades?: string | null
          categoria: string
          centro_custo?: string | null
          created_at?: string | null
          data_receita: string
          descricao?: string | null
          forma_recebimento: string
          fornecedor?: string | null
          id?: string
          origem: string
          status_recebimento: string
          updated_at?: string | null
          user_id: string
          valor: number
        }
        Update: {
          atividades?: string | null
          categoria?: string
          centro_custo?: string | null
          created_at?: string | null
          data_receita?: string
          descricao?: string | null
          forma_recebimento?: string
          fornecedor?: string | null
          id?: string
          origem?: string
          status_recebimento?: string
          updated_at?: string | null
          user_id?: string
          valor?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      user_role: "admin" | "cliente"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["admin", "cliente"],
    },
  },
} as const
