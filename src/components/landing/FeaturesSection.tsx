
import React from 'react';
import { Link } from 'react-router-dom';
import { FolderKanban, CheckSquare, BarChart3, Settings, Users, Clock, Filter, Calendar, Bell, PieChart, CreditCard, ArrowLeft } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  text: string;
}

interface FeatureDetail {
  id: string;
  title: string;
  relatedTo: string;
  icon: React.ReactNode;
  color: string;
  features: Feature[];
}

const featureDetails: FeatureDetail[] = [
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

const FeaturesSection = () => {
  return (
    <div className="mt-16 mb-12">
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
  );
};

export default FeaturesSection;
