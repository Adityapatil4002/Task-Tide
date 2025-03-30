
import React from 'react';
import { Link } from 'react-router-dom';
import { FolderKanban, CheckSquare, BarChart3, Settings, Users, Clock, Filter, Calendar, Bell, PieChart, CreditCard } from 'lucide-react';

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

  const featureDetails = [
    {
      id: 'projects-features',
      title: 'Project Management',
      relatedTo: 'projects',
      icon: <FolderKanban className="h-8 w-8" />,
      color: 'text-purple-500',
      features: [
        { icon: <Users className="h-5 w-5" />, text: 'Add team members and assign responsibilities' },
        { icon: <Clock className="h-5 w-5" />, text: 'Set deadlines and track project timelines' },
        { icon: <CreditCard className="h-5 w-5" />, text: 'Organize with customizable kanban boards' }
      ]
    },
    {
      id: 'todos-features',
      title: 'Task Tracking',
      relatedTo: 'todos',
      icon: <CheckSquare className="h-8 w-8" />,
      color: 'text-blue-500',
      features: [
        { icon: <Filter className="h-5 w-5" />, text: 'Filter tasks by status and priority' },
        { icon: <Calendar className="h-5 w-5" />, text: 'Organize daily, weekly and monthly tasks' },
        { icon: <CheckSquare className="h-5 w-5" />, text: 'Track completion and progress of tasks' }
      ]
    },
    {
      id: 'statistics-features',
      title: 'Analytics Dashboard',
      relatedTo: 'statistics',
      icon: <BarChart3 className="h-8 w-8" />,
      color: 'text-green-500',
      features: [
        { icon: <PieChart className="h-5 w-5" />, text: 'Visualize task distribution and priority' },
        { icon: <BarChart3 className="h-5 w-5" />, text: 'Track team performance metrics' },
        { icon: <Users className="h-5 w-5" />, text: 'Monitor productivity across projects' }
      ]
    },
    {
      id: 'settings-features',
      title: 'Customization',
      relatedTo: 'settings',
      icon: <Settings className="h-8 w-8" />,
      color: 'text-orange-500',
      features: [
        { icon: <Bell className="h-5 w-5" />, text: 'Manage notification preferences' },
        { icon: <Users className="h-5 w-5" />, text: 'Update profile information' },
        { icon: <Settings className="h-5 w-5" />, text: 'Choose light, dark or system theme' }
      ]
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
      
      <main className="flex-1 container mx-auto px-4 py-6">
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
        
        <div className="mt-16 mb-8">
          <h2 className="text-2xl font-bold text-center mb-2">Powerful Features</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
            Explore the complete set of tools designed to help you manage your work effectively and efficiently
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featureDetails.map((section) => (
              <div key={section.id} className="border border-border rounded-lg p-6 bg-card/60 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className={`mr-3 ${section.color}`}>
                    {section.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{section.title}</h3>
                </div>
                
                <ul className="space-y-4">
                  {section.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className={`mr-3 mt-0.5 ${section.color}`}>
                        {feature.icon}
                      </div>
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6">
                  <Link
                    to={`/${section.relatedTo}`}
                    className={`text-sm font-medium ${section.color} hover:underline flex items-center`}
                  >
                    Try {section.title} 
                    <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <footer className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground border-t border-border mt-auto">
        <p>© 2023 TaskTide. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
