import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/landing/Hero';
import Process from '@/components/landing/Process';
import Features from '@/components/landing/Features';
import Pricing from '@/components/landing/Pricing';
import HardwarePricing from '@/components/landing/HardwarePricing';
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
      <Process />
      <Features />
      <HardwarePricing />
      <Pricing />
      <MobileExperience />
      <Testimonials />
      <AutomationCTA />
      <FAQ />
      <Footer />
    </div>
  );
}
