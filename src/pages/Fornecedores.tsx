import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FormCard from '@/components/Forms/FormCard';
import { toast } from 'sonner';

const Fornecedores = () => {
  const [formData, setFormData] = useState({
    nomeRazaoSocial: '',
    cpfCnpj: '',
    inscricaoEstadual: '',
    inscricaoMunicipal: '',
    categoria: '',
    uf: '',
    cidade: '',
    endereco: '',
    email: '',
    numero: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nomeRazaoSocial || !formData.cpfCnpj) {
      toast.error('Por favor, preencha os campos obrigatórios');
      return;
    }
    
    console.log('Fornecedor cadastrado:', formData);
    toast.success('Fornecedor cadastrado com sucesso!');
    
    // Reset form
    setFormData({
      nomeRazaoSocial: '',
      cpfCnpj: '',
      inscricaoEstadual: '',
      inscricaoMunicipal: '',
      categoria: '',
      uf: '',
      cidade: '',
      endereco: '',
      email: '',
      numero: ''
    });
  };

  return (
    <FormCard title="Cadastro de Fornecedores" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="nomeRazaoSocial">Nome / Razão Social</Label>
            <Input
              id="nomeRazaoSocial"
              value={formData.nomeRazaoSocial}
              onChange={(e) => handleInputChange('nomeRazaoSocial', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="cpfCnpj">CPF / CNPJ</Label>
            <Input
              id="cpfCnpj"
              value={formData.cpfCnpj}
              onChange={(e) => handleInputChange('cpfCnpj', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="inscricaoEstadual">Inscrição Estadual</Label>
            <Input
              id="inscricaoEstadual"
              value={formData.inscricaoEstadual}
              onChange={(e) => handleInputChange('inscricaoEstadual', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="inscricaoMunicipal">Inscrição Municipal</Label>
            <Input
              id="inscricaoMunicipal"
              value={formData.inscricaoMunicipal}
              onChange={(e) => handleInputChange('inscricaoMunicipal', e.target.value)}
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
                <SelectItem value="insumos">Insumos Agrícolas</SelectItem>
                <SelectItem value="equipamentos">Equipamentos</SelectItem>
                <SelectItem value="servicos">Serviços</SelectItem>
                <SelectItem value="combustivel">Combustível</SelectItem>
                <SelectItem value="outros">Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="uf">UF</Label>
            <Select onValueChange={(value) => handleInputChange('uf', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Selecione o UF" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SP">SP</SelectItem>
                <SelectItem value="RJ">RJ</SelectItem>
                <SelectItem value="MG">MG</SelectItem>
                <SelectItem value="RS">RS</SelectItem>
                <SelectItem value="PR">PR</SelectItem>
                <SelectItem value="SC">SC</SelectItem>
                <SelectItem value="GO">GO</SelectItem>
                <SelectItem value="MT">MT</SelectItem>
                <SelectItem value="MS">MS</SelectItem>
                <SelectItem value="BA">BA</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="cidade">Cidade</Label>
            <Input
              id="cidade"
              value={formData.cidade}
              onChange={(e) => handleInputChange('cidade', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="endereco">Endereço</Label>
            <Input
              id="endereco"
              value={formData.endereco}
              onChange={(e) => handleInputChange('endereco', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="numero">Número</Label>
            <Input
              id="numero"
              value={formData.numero}
              onChange={(e) => handleInputChange('numero', e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      </div>
    </FormCard>
  );
};

export default Fornecedores;