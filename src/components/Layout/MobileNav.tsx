
import React from 'react';
import { Calendar, MessageSquare, CheckSquare, Target, Settings } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { title: 'Chat', url: '/chat', icon: MessageSquare },
  { title: 'Tareas', url: '/tasks', icon: CheckSquare },
  { title: 'Hábitos', url: '/habits', icon: Target },
  { title: 'Calendario', url: '/calendar', icon: Calendar },
  { title: 'Ajustes', url: '/settings', icon: Settings },
];

export function MobileNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (url: string) => {
    if (url === '/' && location.pathname === '/') return true;
    if (url !== '/' && location.pathname.startsWith(url)) return true;
    return false;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => (
          <button
            key={item.title}
            onClick={() => navigate(item.url)}
            className={`flex flex-col items-center justify-center p-2 min-w-0 flex-1 ${
              isActive(item.url) 
                ? 'text-[#4F46E5]' 
                : 'text-gray-500'
            }`}
          >
            <item.icon size={20} className="mb-1" />
            <span className="text-xs font-medium truncate">{item.title}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
