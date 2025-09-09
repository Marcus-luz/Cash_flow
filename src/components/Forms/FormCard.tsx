import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FormCardProps {
  title: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  submitLabel?: string;
}

const FormCard: React.FC<FormCardProps> = ({ 
  title, 
  children, 
  onSubmit, 
  submitLabel = "Adicionar" 
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="seac-card p-6">
        <h1 className="text-lg font-bold text-white bg-seac-primary px-4 py-2 rounded-lg inline-block">
          {title}
        </h1>
      </div>

      {/* Form */}
      <Card className="seac-card">
        <CardContent className="p-6">
          <form onSubmit={onSubmit} className="space-y-6">
            {children}
            
            <div className="flex justify-end">
              <Button 
                type="submit" 
                className="bg-seac-primary hover:bg-seac-primary-dark text-white px-8 py-2"
              >
                ✓ {submitLabel}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormCard;