import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  MapPin, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Settings,
  FileText,
  Menu,
  X
} from 'lucide-react';
import seacLogo from '@/assets/seac-logo.png';
import UserProfile from './UserProfile';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  
  const menuItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/propriedades', label: 'Propriedades', icon: Building2 },
    { path: '/areas', label: 'Áreas', icon: MapPin },
    { path: '/receitas', label: 'Receitas', icon: TrendingUp },
    { path: '/despesas', label: 'Despesas', icon: TrendingDown },
    { path: '/fornecedores', label: 'Fornecedores', icon: Users },
    { path: '/centro-gerencial', label: 'Centro Gerencial', icon: Settings },
    { path: '/relatorios', label: 'Relatórios', icon: FileText },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className={`seac-sidebar flex flex-col h-screen transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <img src={seacLogo} alt="SEAC Gestão" className="w-8 h-8" />
            <div className="text-white">
              <div className="font-bold text-lg">SEAC</div>
              <div className="text-xs opacity-75">GESTÃO</div>
            </div>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-lg hover:bg-white/10 text-white transition-colors"
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    active 
                      ? 'bg-seac-primary text-white font-medium'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  {!isCollapsed && <span className="text-sm">{item.label}</span>}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <UserProfile />
      )}
    </div>
  );
};

export default Sidebar;