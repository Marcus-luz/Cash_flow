-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum for user roles
CREATE TYPE public.user_role AS ENUM ('admin', 'cliente');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'cliente',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- Create propriedades table
CREATE TABLE public.propriedades (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nome_razao_social TEXT NOT NULL,
  cpf_cnpj TEXT NOT NULL,
  inscricao_estadual TEXT,
  inscricao_municipal TEXT,
  categoria TEXT,
  uf TEXT NOT NULL,
  cidade TEXT NOT NULL,
  endereco TEXT NOT NULL,
  email TEXT,
  numero TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create areas table
CREATE TABLE public.areas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  propriedade TEXT NOT NULL,
  atividade_atual TEXT NOT NULL,
  data_conclusao DATE,
  objetivo TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create receitas table
CREATE TABLE public.receitas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  valor DECIMAL(15,2) NOT NULL,
  data_receita DATE NOT NULL,
  origem TEXT NOT NULL,
  categoria TEXT NOT NULL,
  forma_recebimento TEXT NOT NULL,
  status_recebimento TEXT NOT NULL,
  centro_custo TEXT,
  atividades TEXT,
  fornecedor TEXT,
  descricao TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create despesas table
CREATE TABLE public.despesas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  valor DECIMAL(15,2) NOT NULL,
  data_despesa DATE NOT NULL,
  origem TEXT NOT NULL,
  categoria TEXT NOT NULL,
  forma_pagamento TEXT NOT NULL,
  status_pagamento TEXT NOT NULL,
  centro_custo TEXT,
  fornecedor TEXT,
  descricao TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create fornecedores table
CREATE TABLE public.fornecedores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nome_razao_social TEXT NOT NULL,
  cpf_cnpj TEXT NOT NULL,
  inscricao_estadual TEXT,
  inscricao_municipal TEXT,
  categoria TEXT,
  uf TEXT NOT NULL,
  cidade TEXT NOT NULL,
  endereco TEXT NOT NULL,
  email TEXT,
  numero TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.propriedades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.receitas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.despesas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fornecedores ENABLE ROW LEVEL SECURITY;

-- Create function to check if user has admin role
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = is_admin.user_id 
    AND role = 'admin'
  );
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.is_admin(auth.uid()));

-- RLS Policies for propriedades
CREATE POLICY "Users can manage their own propriedades" ON public.propriedades
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all propriedades" ON public.propriedades
  FOR SELECT USING (public.is_admin(auth.uid()));

-- RLS Policies for areas
CREATE POLICY "Users can manage their own areas" ON public.areas
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all areas" ON public.areas
  FOR SELECT USING (public.is_admin(auth.uid()));

-- RLS Policies for receitas
CREATE POLICY "Users can manage their own receitas" ON public.receitas
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all receitas" ON public.receitas
  FOR SELECT USING (public.is_admin(auth.uid()));

-- RLS Policies for despesas
CREATE POLICY "Users can manage their own despesas" ON public.despesas
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all despesas" ON public.despesas
  FOR SELECT USING (public.is_admin(auth.uid()));

-- RLS Policies for fornecedores
CREATE POLICY "Users can manage their own fornecedores" ON public.fornecedores
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all fornecedores" ON public.fornecedores
  FOR SELECT USING (public.is_admin(auth.uid()));

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name, email, role)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'name', new.email),
    new.email,
    CASE 
      WHEN new.email = 'admin@seac.com' THEN 'admin'::user_role
      ELSE 'cliente'::user_role
    END
  );
  RETURN new;
END;
$$;

-- Trigger to create profile on user registration
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at on all tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_propriedades_updated_at BEFORE UPDATE ON public.propriedades
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_areas_updated_at BEFORE UPDATE ON public.areas
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_receitas_updated_at BEFORE UPDATE ON public.receitas
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_despesas_updated_at BEFORE UPDATE ON public.despesas
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_fornecedores_updated_at BEFORE UPDATE ON public.fornecedores
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();