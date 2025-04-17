
import React from 'react';
import Header from '@/components/landing/Header';
import MenuItems, { menuItems } from '@/components/landing/MenuItems';
import FeaturesSection from '@/components/landing/FeaturesSection';
import ScreenshotsSection from '@/components/landing/ScreenshotsSection';
import TestimonialsCarousel from '@/components/landing/TestimonialsCarousel';
import Footer from '@/components/landing/Footer';
import AnimatedBackground from '@/components/landing/AnimatedBackground';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <MenuItems />
        <FeaturesSection />
        <ScreenshotsSection menuItems={menuItems} />
        <TestimonialsCarousel />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
