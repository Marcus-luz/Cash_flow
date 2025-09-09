import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import MainLayout from "./components/Layout/MainLayout";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Propriedades from "./pages/Propriedades";
import Areas from "./pages/Areas";
import Receitas from "./pages/Receitas";
import Despesas from "./pages/Despesas";
import Fornecedores from "./pages/Fornecedores";
import CentroGerencial from "./pages/CentroGerencial";
import Relatorios from "./pages/Relatorios";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-seac-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Public Route Component (redirect if authenticated)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-seac-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }
  
  return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      
      <Route path="/" element={
        <ProtectedRoute>
          <MainLayout>
            <Dashboard />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/propriedades" element={
        <ProtectedRoute>
          <MainLayout>
            <Propriedades />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/areas" element={
        <ProtectedRoute>
          <MainLayout>
            <Areas />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/receitas" element={
        <ProtectedRoute>
          <MainLayout>
            <Receitas />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/despesas" element={
        <ProtectedRoute>
          <MainLayout>
            <Despesas />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/fornecedores" element={
        <ProtectedRoute>
          <MainLayout>
            <Fornecedores />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/centro-gerencial" element={
        <ProtectedRoute>
          <MainLayout>
            <CentroGerencial />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/relatorios" element={
        <ProtectedRoute>
          <MainLayout>
            <Relatorios />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
