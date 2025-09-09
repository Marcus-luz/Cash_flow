import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import FormCard from '@/components/Forms/FormCard';
import { toast } from 'sonner';

const Despesas = () => {
  const [formData, setFormData] = useState({
    valor: '',
    dataDespesas: '',
    origem: '',
    categoria: '',
    formaRecebimento: '',
    statusRecebimento: '',
    centroCusto: '',
    fornecedor: '',
    descricao: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.valor || !formData.dataDespesas) {
      toast.error('Por favor, preencha os campos obrigatórios');
      return;
    }
    
    console.log('Despesa cadastrada:', formData);
    toast.success('Despesa cadastrada com sucesso!');
    
    // Reset form
    setFormData({
      valor: '',
      dataDespesas: '',
      origem: '',
      categoria: '',
      formaRecebimento: '',
      statusRecebimento: '',
      centroCusto: '',
      fornecedor: '',
      descricao: ''
    });
  };

  return (
    <FormCard title="Cadastro de Despesa" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="valor">Valor</Label>
            <Input
              id="valor"
              type="number"
              step="0.01"
              value={formData.valor}
              onChange={(e) => handleInputChange('valor', e.target.value)}
              className="mt-1"
              placeholder="0,00"
            />
          </div>

          <div>
            <Label htmlFor="dataDespesas">Data das Despesas</Label>
            <Input
              id="dataDespesas"
              type="date"
              value={formData.dataDespesas}
              onChange={(e) => handleInputChange('dataDespesas', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="origem">Origem</Label>
            <Input
              id="origem"
              value={formData.origem}
              onChange={(e) => handleInputChange('origem', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="categoria">Categoria</Label>
            <Select onValueChange={(value) => handleInputChange('categoria', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="combustivel">Combustível</SelectItem>
                <SelectItem value="manutencao">Manutenção</SelectItem>
                <SelectItem value="insumos">Insumos Agrícolas</SelectItem>
                <SelectItem value="pessoal">Pessoal</SelectItem>
                <SelectItem value="equipamentos">Equipamentos</SelectItem>
                <SelectItem value="outros">Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="formaRecebimento">Forma de Recebimento</Label>
            <Select onValueChange={(value) => handleInputChange('formaRecebimento', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Selecione a forma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dinheiro">Dinheiro</SelectItem>
                <SelectItem value="pix">PIX</SelectItem>
                <SelectItem value="cartao">Cartão</SelectItem>
                <SelectItem value="transferencia">Transferência</SelectItem>
                <SelectItem value="boleto">Boleto</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="statusRecebimento">Status do Recebimento</Label>
            <Select onValueChange={(value) => handleInputChange('statusRecebimento', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pago">Pago</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="vencido">Vencido</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="centroCusto">Centro de Custo</Label>
            <Input
              id="centroCusto"
              value={formData.centroCusto}
              onChange={(e) => handleInputChange('centroCusto', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="fornecedor">Fornecedor</Label>
            <Input
              id="fornecedor"
              value={formData.fornecedor}
              onChange={(e) => handleInputChange('fornecedor', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => handleInputChange('descricao', e.target.value)}
              className="mt-1"
              rows={6}
            />
          </div>
        </div>
      </div>
    </FormCard>
  );
};

export default Despesas;