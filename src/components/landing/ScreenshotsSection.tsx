
import React from 'react';
import { MenuItem } from './MenuItems';

interface ScreenshotsSectionProps {
  menuItems: MenuItem[];
}

const ScreenshotsSection = ({ menuItems }: ScreenshotsSectionProps) => {
  return (
    <div className="mt-16 mb-12">
      <h2 className="text-2xl font-bold text-center mb-2">See TaskTide in Action</h2>
      <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
        Get a glimpse of our intuitive interface and powerful features
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {menuItems.map((item) => (
          <div key={item.id} className="screenshot-card group relative p-[3px] rounded-lg bg-gradient-to-br from-primary via-accent to-primary bg-size-200 animate-gradient-xy transition-all duration-300">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary via-accent to-primary bg-size-200 animate-gradient-xy opacity-30 blur-xl transition-all duration-500 group-hover:opacity-40 group-hover:blur-2xl"></div>
            <div className="relative rounded-lg overflow-hidden bg-card shadow-[0_0_25px_rgba(155,135,245,0.2)] transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(155,135,245,0.35)]">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={item.screenshot} 
                  alt={`${item.title} screenshot`} 
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <p className="text-white/80 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScreenshotsSection;
