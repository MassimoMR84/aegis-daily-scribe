
import React from 'react';
import { Calendar, MessageSquare, CheckSquare, Target, Settings, BarChart3, Home } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSampleData } from '../../hooks/useSampleData';

const menuItems = [
  {
    title: 'Dashboard',
    url: '/',
    icon: Home,
  },
  {
    title: 'Chat con Aegis',
    url: '/chat',
    icon: MessageSquare,
  },
  {
    title: 'Tareas',
    url: '/tasks',
    icon: CheckSquare,
  },
  {
    title: 'Hábitos',
    url: '/habits',
    icon: Target,
  },
  {
    title: 'Calendario',
    url: '/calendar',
    icon: Calendar,
  },
  {
    title: 'Estadísticas',
    url: '/stats',
    icon: BarChart3,
  },
  {
    title: 'Configuración',
    url: '/settings',
    icon: Settings,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Initialize sample data
  useSampleData();

  const isActive = (url: string) => {
    if (url === '/' && location.pathname === '/') return true;
    if (url !== '/' && location.pathname.startsWith(url)) return true;
    return false;
  };

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-aegis-gradient flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Aegis</h1>
            <p className="text-sm text-gray-500">Tu asistente personal</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Navegación
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className={`w-full justify-start ${
                      isActive(item.url) 
                        ? 'bg-aegis-gradient text-white shadow-lg' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <button onClick={() => navigate(item.url)} className="flex items-center space-x-3 p-3">
                      <item.icon size={20} />
                      <span className="font-medium">{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-aegis-gradient flex items-center justify-center">
              <span className="text-white text-sm font-medium">U</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Usuario</p>
              <p className="text-xs text-gray-500">Modo: Asistido</p>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
