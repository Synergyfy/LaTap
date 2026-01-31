import React from 'react';
import Navbar from '@/components/layout/Navbar';
import SolutionHero from '@/components/solutions/SolutionHero';
import SolutionCaseStudies from '@/components/solutions/SolutionCaseStudies';
import Footer from '@/components/layout/Footer';

export default function SolutionsPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <SolutionHero />
            <SolutionCaseStudies />
            <Footer />
        </div>
    );
}
