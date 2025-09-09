import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Download, Filter } from 'lucide-react';
import { toast } from 'sonner';

const Relatorios = () => {
  const [filtros, setFiltros] = useState({
    dataInicial: '',
    dataFinal: '',
    tipoRelatorio: ''
  });

  // Mock data para a tabela de relatórios
  const [relatorios] = useState([
    { data: '23/04/01', tipo: 'Receita', descricao: 'Pagamento cliente A', categoria: 'Vendas', valor: 'R$ 1.200,00', centro: 'Comercial', status: 'Aprovado' },
    { data: '23/04/01', tipo: 'Entrada', descricao: 'Pagamento cliente A', categoria: 'Receitas', valor: 'R$ 1.200,00', centro: 'Comercial', status: 'Aprovado' },
    { data: '23/04/01', tipo: 'Saída', descricao: 'Pagamento cliente A', categoria: 'Receitas', valor: 'R$ 1.200,00', centro: 'Comercial', status: 'Aprovado' },
    { data: '23/04/01', tipo: 'Entrada', descricao: 'Pagamento cliente A', categoria: 'Receitas', valor: 'R$ 1.200,00', centro: 'Comercial', status: 'Aprovado' },
    { data: '23/04/01', tipo: 'Saída', descricao: 'Pagamento cliente A', categoria: 'Receitas', valor: 'R$ 1.200,00', centro: 'Comercial', status: 'Aprovado' },
    { data: '23/04/01', tipo: 'Entrada', descricao: 'Pagamento cliente A', categoria: 'Receitas', valor: 'R$ 1.200,00', centro: 'Comercial', status: 'Aprovado' },
    { data: '23/04/01', tipo: 'Saída', descricao: 'Pagamento cliente A', categoria: 'Receitas', valor: 'R$ 1.200,00', centro: 'Comercial', status: 'Aprovado' },
  ]);

  const handleFiltroChange = (field: string, value: string) => {
    setFiltros(prev => ({ ...prev, [field]: value }));
  };

  const handleGerarRelatorio = () => {
    if (!filtros.dataInicial || !filtros.dataFinal) {
      toast.error('Por favor, selecione o período do relatório');
      return;
    }
    
    toast.success('Relatório gerado com sucesso!');
    console.log('Gerando relatório com filtros:', filtros);
  };

  const handleExportarRelatorio = (formato: string) => {
    toast.success(`Relatório exportado em ${formato.toUpperCase()}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="seac-card p-6">
        <h1 className="text-lg font-bold text-white bg-seac-primary px-4 py-2 rounded-lg inline-block">
          Relatórios
        </h1>
      </div>

      {/* Filters */}
      <Card className="seac-card">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Filter size={20} />
            <span className="font-semibold">Filtros de Relatório</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <Label htmlFor="dataInicial">Data Inicial</Label>
              <Input
                id="dataInicial"
                type="date"
                value={filtros.dataInicial}
                onChange={(e) => handleFiltroChange('dataInicial', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="dataFinal">Data Final</Label>
              <Input
                id="dataFinal"
                type="date"
                value={filtros.dataFinal}
                onChange={(e) => handleFiltroChange('dataFinal', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="tipoRelatorio">Tipo de Relatório</Label>
              <Select onValueChange={(value) => handleFiltroChange('tipoRelatorio', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="geral">Relatório Geral</SelectItem>
                  <SelectItem value="receitas">Receitas</SelectItem>
                  <SelectItem value="despesas">Despesas</SelectItem>
                  <SelectItem value="fluxo-caixa">Fluxo de Caixa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              onClick={handleGerarRelatorio}
              className="bg-seac-primary hover:bg-seac-primary-dark text-white"
            >
              <FileText size={16} className="mr-2" />
              Gerar Relatório
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Export Buttons */}
      <div className="flex flex-wrap gap-4">
        <Button 
          onClick={() => handleExportarRelatorio('excel')}
          variant="outline"
          className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
        >
          <Download size={16} className="mr-2" />
          Exportar Excel
        </Button>
        <Button 
          onClick={() => handleExportarRelatorio('pdf')}
          variant="outline"
          className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
        >
          <Download size={16} className="mr-2" />
          Exportar PDF
        </Button>
        <Button 
          onClick={() => handleExportarRelatorio('csv')}
          variant="outline"
          className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
        >
          <Download size={16} className="mr-2" />
          Exportar CSV
        </Button>
      </div>

      {/* Reports Table */}
      <Card className="seac-card">
        <CardHeader>
          <h2 className="text-lg font-semibold">Dados do Relatório</h2>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Centro Gerencial</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {relatorios.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.data}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.tipo === 'Entrada' ? 'bg-green-100 text-green-800' : 
                        item.tipo === 'Saída' ? 'bg-red-100 text-red-800' : 
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {item.tipo}
                      </span>
                    </TableCell>
                    <TableCell>{item.descricao}</TableCell>
                    <TableCell>{item.categoria}</TableCell>
                    <TableCell className="font-medium">{item.valor}</TableCell>
                    <TableCell>{item.centro}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {item.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Relatorios;