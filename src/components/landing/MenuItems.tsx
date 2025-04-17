
import React from 'react';
import { Link } from 'react-router-dom';
import { FolderKanban, CheckSquare, BarChart3, Settings } from 'lucide-react';

export interface MenuItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color: string;
  hoverColor: string;
  iconColor: string;
  screenshot: string;
}

export const menuItems: MenuItem[] = [
  {
    id: 'projects',
    title: 'Manage Projects',
    description: 'Create and organize your projects',
    icon: <FolderKanban className="h-12 w-12" />,
    path: '/projects',
    color: 'from-purple-500/20 to-purple-700/20 border-purple-500/30',
    hoverColor: 'group-hover:from-purple-500/30 group-hover:to-purple-700/30',
    iconColor: 'text-purple-400',
    screenshot: '/lovable-uploads/839f6d51-8bb1-4921-adec-aae3195ffb57.png'
  },
  {
    id: 'todos',
    title: 'To-Do List',
    description: 'Manage your daily tasks',
    icon: <CheckSquare className="h-12 w-12" />,
    path: '/todos',
    color: 'from-blue-500/20 to-blue-700/20 border-blue-500/30',
    hoverColor: 'group-hover:from-blue-500/30 group-hover:to-blue-700/30',
    iconColor: 'text-blue-400',
    screenshot: '/lovable-uploads/64d6c571-4de2-48c7-bff9-fde73b6f83c8.png'
  },
  {
    id: 'statistics',
    title: 'View Statistics',
    description: 'Visualize your progress',
    icon: <BarChart3 className="h-12 w-12" />,
    path: '/statistics',
    color: 'from-green-500/20 to-green-700/20 border-green-500/30',
    hoverColor: 'group-hover:from-green-500/30 group-hover:to-green-700/30',
    iconColor: 'text-green-400',
    screenshot: '/lovable-uploads/6ca42fd4-6738-46b5-9799-a884f61a0a5b.png'
  },
  {
    id: 'settings',
    title: 'Settings',
    description: 'Customize your experience',
    icon: <Settings className="h-12 w-12" />,
    path: '/settings',
    color: 'from-orange-500/20 to-orange-700/20 border-orange-500/30',
    hoverColor: 'group-hover:from-orange-500/30 group-hover:to-orange-700/30',
    iconColor: 'text-orange-400',
    screenshot: '/lovable-uploads/b5b39830-d610-4af4-b2fe-d8e44ee97e2c.png'
  }
];

const MenuItems = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {menuItems.map((item) => (
        <Link
          key={item.id}
          to={item.path}
          className="group"
        >
          <div className={`menu-card h-full bg-gradient-to-br ${item.color} border rounded-xl p-6 transition-all duration-300 shadow hover:shadow-lg ${item.hoverColor} hover:scale-105`}>
            <div className={`${item.iconColor} mb-4 transition-transform duration-300 group-hover:scale-110 flex justify-center`}>
              {item.icon}
            </div>
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuItems;
