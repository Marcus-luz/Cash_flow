import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { LogOut, User } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    toast.success('Logout realizado com sucesso!');
    navigate('/login');
  };

  if (!profile) return null;

  return (
    <div className="flex items-center justify-between p-4 border-t border-white/10">
      <div className="flex items-center space-x-3">
        <div className="bg-white/20 p-2 rounded-full">
          <User size={16} className="text-white" />
        </div>
        <div className="text-white">
          <div className="text-sm font-medium">{profile.name}</div>
          <div className="text-xs opacity-75 capitalize">{profile.role}</div>
        </div>
      </div>
      <Button
        onClick={handleLogout}
        variant="ghost"
        size="sm"
        className="text-white/80 hover:text-white hover:bg-white/10"
      >
        <LogOut size={16} />
      </Button>
    </div>
  );
};

export default UserProfile;