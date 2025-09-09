import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import MetricCard from '@/components/Dashboard/MetricCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Dashboard = () => {
  // Mock data for charts
  const revenueExpenseData = [
    { month: 'Jan', receitas: 45000, despesas: 12000 },
    { month: 'Fev', receitas: 52000, despesas: 15000 },
    { month: 'Mar', receitas: 48000, despesas: 18000 },
    { month: 'Abr', receitas: 61000, despesas: 14000 },
    { month: 'Mai', receitas: 55000, despesas: 16000 },
    { month: 'Jun', receitas: 67000, despesas: 13000 },
  ];

  const movementAnalysisData = [
    { month: 'Jan', value: 35000 },
    { month: 'Fev', value: 42000 },
    { month: 'Mar', value: 38000 },
    { month: 'Abr', value: 51000 },
    { month: 'Mai', value: 46000 },
    { month: 'Jun', value: 58000 },
  ];

  const bankBalanceData = [
    { bank: 'Banco A', value: 45000 },
    { bank: 'Banco B', value: 32000 },
    { bank: 'Banco C', value: 28000 },
    { bank: 'Banco D', value: 15000 },
    { bank: 'Banco E', value: 22000 },
    { bank: 'Banco F', value: 38000 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="seac-card p-6">
        <h1 className="text-2xl font-bold text-white bg-seac-primary px-4 py-2 rounded-lg inline-block">
          Dashboard
        </h1>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Receitas"
          value="R$ 130 mil"
          icon={TrendingUp}
          color="green"
        />
        <MetricCard
          title="Despesas"
          value="R$ 10 mil"
          icon={TrendingDown}
          color="red"
        />
        <MetricCard
          title="Saldo"
          value="R$ 40 mil"
          icon={DollarSign}
          color="blue"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Expenses Chart */}
        <Card className="seac-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Evolução Receitas vs. Despesas</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueExpenseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`R$ ${value.toLocaleString()}`, '']} />
                <Line 
                  type="monotone" 
                  dataKey="receitas" 
                  stroke="hsl(var(--seac-primary))" 
                  strokeWidth={2}
                  name="Receitas"
                />
                <Line 
                  type="monotone" 
                  dataKey="despesas" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="Despesas"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Movement Analysis Chart */}
        <Card className="seac-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Análise das Movimentações</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={movementAnalysisData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`R$ ${value.toLocaleString()}`, '']} />
                <Bar dataKey="value" fill="hsl(var(--seac-primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bank Balance Chart */}
      <Card className="seac-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Saldo por Banco</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bankBalanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="bank" />
              <YAxis />
              <Tooltip formatter={(value) => [`R$ ${value.toLocaleString()}`, 'Saldo']} />
              <Bar dataKey="value" fill="hsl(var(--seac-primary))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;