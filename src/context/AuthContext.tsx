import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';

// --- Interfaces (Tipos) ---
interface Profile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'cliente';
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  signUp: (email: string, password: string, name: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // --- ESTADO INICIAL: Começa Deslogado (Null) ---
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // --- Usuário Falso (Mock) para quando logar ---
  const mockUser = {
    id: '123-teste-id',
    aud: 'authenticated',
    role: 'authenticated',
    email: '',
    phone: '',
    app_metadata: {},
    user_metadata: {},
    created_at: new Date().toISOString(),
  } as User;

  // --- FUNÇÕES QUE SIMULAM O SUCESSO ---

  const signUp = async (email: string, password: string, name: string) => {
    console.log('SIMULANDO CADASTRO DE:', email);
    
    // Cria um usuário falso com o email que o robô digitou
    const newUser = { ...mockUser, email: email };
    
    setUser(newUser);
    setProfile({ id: '123', name: name, email: email, role: 'admin' });
    
    // Retorna SEM ERRO (null) para o site achar que deu certo
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    console.log('SIMULANDO LOGIN DE:', email);
    const newUser = { ...mockUser, email: email };
    setUser(newUser);
    return { error: null };
  };

  const signOut = async () => {
    setUser(null);
    setProfile(null);
  };

  const value = {
    user,
    session,
    profile,
    signUp,
    signIn,
    signOut,
    isAuthenticated: !!user,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};