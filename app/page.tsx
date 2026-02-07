import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/landing/Hero';
import SpeedComparison from '@/components/landing/SpeedComparison';
import SolutionsPreview from '@/components/landing/SolutionsPreview';
import Process from '@/components/landing/Process';
import Features from '@/components/landing/Features';
import Pricing from '@/components/landing/Pricing';
import MobileExperience from '@/components/landing/MobileExperience';
import AutomationCTA from '@/components/landing/AutomationCTA';
import Testimonials from '@/components/landing/Testimonials';
import FAQ from '@/components/landing/FAQ';
import Footer from '@/components/layout/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <SpeedComparison />
      <Process />
      <Features />
      <SolutionsPreview />
      <Pricing />
      <MobileExperience />
      <Testimonials />
      <AutomationCTA />
      <FAQ />
      <Footer />
    </div>
  );
}
