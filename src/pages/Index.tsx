
import React from 'react';
import { Link } from 'react-router-dom';
import { FolderKanban, CheckSquare, BarChart3, Settings } from 'lucide-react';

const Index = () => {
  const menuItems = [
    {
      id: 'projects',
      title: 'Manage Projects',
      description: 'Create and organize your projects',
      icon: <FolderKanban className="h-12 w-12" />,
      path: '/projects',
      color: 'from-purple-500/20 to-purple-700/20 border-purple-500/30',
      hoverColor: 'group-hover:from-purple-500/30 group-hover:to-purple-700/30',
      iconColor: 'text-purple-400'
    },
    {
      id: 'todos',
      title: 'To-Do List',
      description: 'Manage your daily tasks',
      icon: <CheckSquare className="h-12 w-12" />,
      path: '/todos',
      color: 'from-blue-500/20 to-blue-700/20 border-blue-500/30',
      hoverColor: 'group-hover:from-blue-500/30 group-hover:to-blue-700/30',
      iconColor: 'text-blue-400'
    },
    {
      id: 'statistics',
      title: 'View Statistics',
      description: 'Visualize your progress',
      icon: <BarChart3 className="h-12 w-12" />,
      path: '/statistics',
      color: 'from-green-500/20 to-green-700/20 border-green-500/30',
      hoverColor: 'group-hover:from-green-500/30 group-hover:to-green-700/30',
      iconColor: 'text-green-400'
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'Customize your experience',
      icon: <Settings className="h-12 w-12" />,
      path: '/settings',
      color: 'from-orange-500/20 to-orange-700/20 border-orange-500/30',
      hoverColor: 'group-hover:from-orange-500/30 group-hover:to-orange-700/30',
      iconColor: 'text-orange-400'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="animated-background"></div>
      
      <header className="container mx-auto px-4 py-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="mr-2 text-accent">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="h-10 w-10 animate-float"
            >
              <path d="M12 2 L22 8.5 L22 15.5 L12 22 L2 15.5 L2 8.5 L12 2" />
              <path d="M12 22 L12 15.5" />
              <path d="M22 8.5 L12 15.5 L2 8.5" />
              <path d="M2 15.5 L12 8.5 L22 15.5" />
              <path d="M12 2 L12 8.5" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">TaskTide</h1>
        </div>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Streamline your workflow, boost productivity, and stay organized with our
          comprehensive task management solution.
        </p>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-12">
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
      </main>
      
      <footer className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground border-t border-border mt-auto">
        <p>© 2023 TaskTide. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
