import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';

const CentroGerencial = () => {
  const [novoCentro, setNovoCentro] = useState({
    nome: '',
    tipo: ''
  });

  const [centros] = useState([
    { id: 1, nome: 'Sede Administrativa', tipo: 'Centro de Custo', ativo: true },
    { id: 2, nome: 'Sede Administrativa', tipo: 'Centro de Custo', ativo: true },
    { id: 3, nome: 'Sede Administrativa', tipo: 'Centro de Custo', ativo: true },
    { id: 4, nome: 'Sede Administrativa', tipo: 'Centro de Custo', ativo: true },
    { id: 5, nome: 'Sede Administrativa', tipo: 'Centro de Custo', ativo: true },
    { id: 6, nome: 'Sede Administrativa', tipo: 'Centro de Custo', ativo: true },
    { id: 7, nome: 'Sede Administrativa', tipo: 'Centro de Custo', ativo: true },
  ]);

  const handleAdicionarCentro = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!novoCentro.nome || !novoCentro.tipo) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    console.log('Novo centro:', novoCentro);
    toast.success('Centro gerencial adicionado com sucesso!');
    
    setNovoCentro({ nome: '', tipo: '' });
  };

  const handleEditarCentro = (id: number) => {
    toast.info(`Editando centro ${id}`);
  };

  const handleExcluirCentro = (id: number) => {
    toast.success(`Centro ${id} removido com sucesso!`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="seac-card p-6">
        <h1 className="text-lg font-bold text-white bg-seac-primary px-4 py-2 rounded-lg inline-block">
          Centro Gerencial
        </h1>
      </div>

      {/* Add New Centro Form */}
      <Card className="seac-card">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Plus size={20} />
            <span className="font-semibold">Adicionar Novo Centro Gerencial</span>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdicionarCentro} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <Label htmlFor="nome">Nome do Centro Gerencial</Label>
              <Input
                id="nome"
                value={novoCentro.nome}
                onChange={(e) => setNovoCentro(prev => ({ ...prev, nome: e.target.value }))}
                className="mt-1"
                placeholder="Digite o nome"
              />
            </div>
            
            <div>
              <Label htmlFor="tipo">Tipo</Label>
              <Input
                id="tipo"
                value={novoCentro.tipo}
                onChange={(e) => setNovoCentro(prev => ({ ...prev, tipo: e.target.value }))}
                className="mt-1"
                placeholder="Digite o tipo"
              />
            </div>
            
            <Button 
              type="submit"
              className="bg-seac-primary hover:bg-seac-primary-dark text-white"
            >
              ✓ Adicionar
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Centros Gerenciais Table */}
      <Card className="seac-card">
        <CardHeader>
          <h2 className="text-lg font-semibold">Centros Gerenciais Cadastrados</h2>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {centros.map((centro) => (
                  <TableRow key={centro.id}>
                    <TableCell className="font-medium">{centro.nome}</TableCell>
                    <TableCell>{centro.tipo}</TableCell>
                    <TableCell>
                      <div className="flex justify-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditarCentro(centro.id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Pencil size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleExcluirCentro(centro.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
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

export default CentroGerencial;