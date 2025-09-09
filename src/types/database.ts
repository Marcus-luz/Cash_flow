export interface Propriedade {
  id: string;
  user_id: string;
  nome_razao_social: string;
  cpf_cnpj: string;
  inscricao_estadual?: string;
  inscricao_municipal?: string;
  categoria?: string;
  uf: string;
  cidade: string;
  endereco: string;
  email?: string;
  numero?: string;
  created_at: string;
  updated_at: string;
}

export interface Area {
  id: string;
  user_id: string;
  propriedade: string;
  atividade_atual: string;
  data_conclusao?: string;
  objetivo?: string;
  created_at: string;
  updated_at: string;
}

export interface Receita {
  id: string;
  user_id: string;
  valor: number;
  data_receita: string;
  origem: string;
  categoria: string;
  forma_recebimento: string;
  status_recebimento: string;
  centro_custo?: string;
  atividades?: string;
  fornecedor?: string;
  descricao?: string;
  created_at: string;
  updated_at: string;
}

export interface Despesa {
  id: string;
  user_id: string;
  valor: number;
  data_despesa: string;
  origem: string;
  categoria: string;
  forma_pagamento: string;
  status_pagamento: string;
  centro_custo?: string;
  fornecedor?: string;
  descricao?: string;
  created_at: string;
  updated_at: string;
}

export interface Fornecedor {
  id: string;
  user_id: string;
  nome_razao_social: string;
  cpf_cnpj: string;
  inscricao_estadual?: string;
  inscricao_municipal?: string;
  categoria?: string;
  uf: string;
  cidade: string;
  endereco: string;
  email?: string;
  numero?: string;
  created_at: string;
  updated_at: string;
}

export type PropriedadeForm = Omit<Propriedade, 'id' | 'user_id' | 'created_at' | 'updated_at'>;
export type AreaForm = Omit<Area, 'id' | 'user_id' | 'created_at' | 'updated_at'>;
export type ReceitaForm = Omit<Receita, 'id' | 'user_id' | 'created_at' | 'updated_at'>;
export type DespesaForm = Omit<Despesa, 'id' | 'user_id' | 'created_at' | 'updated_at'>;
export type FornecedorForm = Omit<Fornecedor, 'id' | 'user_id' | 'created_at' | 'updated_at'>;