import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import FormCard from '@/components/Forms/FormCard';
import { toast } from 'sonner';

const Areas = () => {
  const [formData, setFormData] = useState({
    propriedade: '',
    atividadeAtual: '',
    dataConclusao: '',
    objetivo: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.propriedade || !formData.atividadeAtual) {
      toast.error('Por favor, preencha os campos obrigatórios');
      return;
    }
    
    console.log('Área cadastrada:', formData);
    toast.success('Área cadastrada com sucesso!');
    
    // Reset form
    setFormData({
      propriedade: '',
      atividadeAtual: '',
      dataConclusao: '',
      objetivo: ''
    });
  };

  return (
    <FormCard title="Cadastro de Áreas" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Form Fields */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="propriedade">Propriedade</Label>
            <Input
              id="propriedade"
              value={formData.propriedade}
              onChange={(e) => handleInputChange('propriedade', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="atividadeAtual">Atividade atual</Label>
            <Input
              id="atividadeAtual"
              value={formData.atividadeAtual}
              onChange={(e) => handleInputChange('atividadeAtual', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="dataConclusao">Data de Conclusão</Label>
            <Input
              id="dataConclusao"
              type="date"
              value={formData.dataConclusao}
              onChange={(e) => handleInputChange('dataConclusao', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="objetivo">Objetivo</Label>
            <Textarea
              id="objetivo"
              value={formData.objetivo}
              onChange={(e) => handleInputChange('objetivo', e.target.value)}
              className="mt-1"
              rows={4}
            />
          </div>
        </div>

        {/* Right Column - Map */}
        <div className="space-y-4">
          <Label>Localização da Área</Label>
          <div className="w-full h-80 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-lg mb-2">🗺️</div>
              <p>Mapa Interativo</p>
              <p className="text-sm">Selecione a área no mapa</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Em uma implementação completa, aqui seria integrado um mapa interativo 
            (Google Maps, Mapbox, etc.) para seleção da área geográfica.
          </p>
        </div>
      </div>
    </FormCard>
  );
};

export default Areas;