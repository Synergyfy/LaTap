import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/landing/Hero';
import Process from '@/components/landing/Process';
import Features from '@/components/landing/Features';
import Pricing from '@/components/landing/Pricing';
import MobileExperience from '@/components/landing/MobileExperience';
import AutomationCTA from '@/components/landing/AutomationCTA';
import FAQ from '@/components/landing/FAQ';
import Footer from '@/components/layout/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Process />
      <Features />
      <Pricing />
      <MobileExperience />
      <AutomationCTA />
      <FAQ />
      <Footer />
    </div>
  );
}
