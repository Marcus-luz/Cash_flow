import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import seacLogo from '@/assets/seac-logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    setIsLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      toast.error(error.message || 'Erro ao fazer login');
    } else {
      toast.success('Login realizado com sucesso!');
      navigate('/');
    }

    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !name) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    if (password.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setIsLoading(true);

    const { error } = await signUp(email, password, name);

    if (error) {
      toast.error(error.message || 'Erro ao criar conta');
    } else {
      toast.success('Conta criada com sucesso! Verifique seu email.');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen seac-gradient-bg flex items-center justify-center">
      <Card className="w-full max-w-md mx-4 seac-card">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <img src={seacLogo} alt="SEAC Gestão" className="w-20 h-20" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-card-foreground">Dashboard Financeiro</h1>
            <p className="text-muted-foreground mt-1">Controle de Fluxo de Caixa</p>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="signup">Cadastrar</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Email</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                    placeholder="Digite seu email"
                    disabled={isLoading}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Senha</label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full"
                    placeholder="Digite sua senha"
                    disabled={isLoading}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-seac-primary hover:bg-seac-primary-dark text-white font-medium py-2.5 mt-6"
                  disabled={isLoading}
                >
                  {isLoading ? 'Entrando...' : 'Entrar'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Nome</label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full"
                    placeholder="Digite seu nome"
                    disabled={isLoading}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Email</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                    placeholder="Digite seu email"
                    disabled={isLoading}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Senha</label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full"
                    placeholder="Digite sua senha (mín. 6 caracteres)"
                    disabled={isLoading}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-seac-primary hover:bg-seac-primary-dark text-white font-medium py-2.5 mt-6"
                  disabled={isLoading}
                >
                  {isLoading ? 'Criando...' : 'Criar Conta'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 text-xs text-center text-muted-foreground">
            <p>Para teste como admin, crie uma conta com:</p>
            <p>Email: admin@seac.com</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;