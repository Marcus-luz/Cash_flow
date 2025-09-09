import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FormCard from '@/components/Forms/FormCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Propriedade, PropriedadeForm } from '@/types/database';

const Propriedades = () => {
  const [data, setData] = useState<Propriedade[]>([]);
  const [formData, setFormData] = useState<PropriedadeForm>({
    nome_razao_social: '',
    cpf_cnpj: '',
    inscricao_estadual: '',
    inscricao_municipal: '',
    categoria: '',
    uf: '',
    cidade: '',
    endereco: '',
    email: '',
    numero: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchData = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data: result, error } = await supabase
        .from('propriedades')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setData(result || []);
    } catch (error) {
      console.error('Error fetching propriedades:', error);
      toast.error('Erro ao carregar propriedades');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleInputChange = (field: keyof PropriedadeForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Usuário não autenticado');
      return;
    }

    if (!formData.nome_razao_social || !formData.cpf_cnpj || !formData.uf || !formData.cidade || !formData.endereco) {
      toast.error('Por favor, preencha os campos obrigatórios');
      return;
    }

    try {
      const dataToSubmit = {
        ...formData,
        user_id: user.id
      };

      if (editingId) {
        const { error } = await supabase
          .from('propriedades')
          .update(dataToSubmit)
          .eq('id', editingId);

        if (error) throw error;
        toast.success('Propriedade atualizada com sucesso!');
        setEditingId(null);
      } else {
        const { error } = await supabase
          .from('propriedades')
          .insert([dataToSubmit]);

        if (error) throw error;
        toast.success('Propriedade cadastrada com sucesso!');
      }

      setFormData({
        nome_razao_social: '',
        cpf_cnpj: '',
        inscricao_estadual: '',
        inscricao_municipal: '',
        categoria: '',
        uf: '',
        cidade: '',
        endereco: '',
        email: '',
        numero: ''
      });
      fetchData();
    } catch (error) {
      console.error('Error submitting propriedade:', error);
      toast.error('Erro ao salvar propriedade');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta propriedade?')) return;

    try {
      const { error } = await supabase
        .from('propriedades')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Propriedade excluída com sucesso!');
      fetchData();
    } catch (error) {
      console.error('Error deleting propriedade:', error);
      toast.error('Erro ao excluir propriedade');
    }
  };

  const handleEdit = (item: Propriedade) => {
    const editData: PropriedadeForm = {
      nome_razao_social: item.nome_razao_social,
      cpf_cnpj: item.cpf_cnpj,
      inscricao_estadual: item.inscricao_estadual || '',
      inscricao_municipal: item.inscricao_municipal || '',
      categoria: item.categoria || '',
      uf: item.uf,
      cidade: item.cidade,
      endereco: item.endereco,
      email: item.email || '',
      numero: item.numero || ''
    };
    
    setFormData(editData);
    setEditingId(item.id);
  };

  const handleCancelEdit = () => {
    setFormData({
      nome_razao_social: '',
      cpf_cnpj: '',
      inscricao_estadual: '',
      inscricao_municipal: '',
      categoria: '',
      uf: '',
      cidade: '',
      endereco: '',
      email: '',
      numero: ''
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <FormCard title={editingId ? "Editar Propriedade" : "Cadastro de Propriedade"} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="nome_razao_social">Nome / Razão Social *</Label>
              <Input
                id="nome_razao_social"
                value={formData.nome_razao_social}
                onChange={(e) => handleInputChange('nome_razao_social', e.target.value)}
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="cpf_cnpj">CPF / CNPJ *</Label>
              <Input
                id="cpf_cnpj"
                value={formData.cpf_cnpj}
                onChange={(e) => handleInputChange('cpf_cnpj', e.target.value)}
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="inscricao_estadual">Inscrição Estadual</Label>
              <Input
                id="inscricao_estadual"
                value={formData.inscricao_estadual}
                onChange={(e) => handleInputChange('inscricao_estadual', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="inscricao_municipal">Inscrição Municipal</Label>
              <Input
                id="inscricao_municipal"
                value={formData.inscricao_municipal}
                onChange={(e) => handleInputChange('inscricao_municipal', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="categoria">Categoria</Label>
              <Input
                id="categoria"
                value={formData.categoria}
                onChange={(e) => handleInputChange('categoria', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="uf">UF *</Label>
              <Select value={formData.uf} onValueChange={(value) => handleInputChange('uf', value)}>
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
              <Label htmlFor="cidade">Cidade *</Label>
              <Input
                id="cidade"
                value={formData.cidade}
                onChange={(e) => handleInputChange('cidade', e.target.value)}
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="endereco">Endereço *</Label>
              <Input
                id="endereco"
                value={formData.endereco}
                onChange={(e) => handleInputChange('endereco', e.target.value)}
                className="mt-1"
                required
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

        <div className="flex gap-2 mt-6">
          <Button type="submit" className="bg-seac-primary hover:bg-seac-primary-dark">
            {editingId ? 'Atualizar' : 'Adicionar'}
          </Button>
          {editingId && (
            <Button type="button" variant="outline" onClick={handleCancelEdit}>
              Cancelar
            </Button>
          )}
        </div>
      </FormCard>

      {/* Lista de Propriedades */}
      <div className="seac-card p-6">
        <h2 className="text-xl font-semibold mb-4">Propriedades Cadastradas</h2>
        
        {isLoading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-seac-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Carregando...</p>
          </div>
        ) : data.length === 0 ? (
          <p className="text-center py-4 text-muted-foreground">Nenhuma propriedade cadastrada ainda.</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome/Razão Social</TableHead>
                  <TableHead>CPF/CNPJ</TableHead>
                  <TableHead>Cidade/UF</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.nome_razao_social}</TableCell>
                    <TableCell>{item.cpf_cnpj}</TableCell>
                    <TableCell>{item.cidade}/{item.uf}</TableCell>
                    <TableCell>{item.email || '-'}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleEdit(item)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Propriedades;