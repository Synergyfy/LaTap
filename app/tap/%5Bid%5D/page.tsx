'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getBusinessByNfcId } from '@/lib/businessService';
import { useCustomerFlowStore } from '@/store/useCustomerFlowStore';
import { useAuthStore } from '@/store/useAuthStore';
import { motion } from 'framer-motion';

export default function TapPage() {
    const { id } = useParams();
    const router = useRouter();
    const initializeFromBusiness = useCustomerFlowStore(state => state.initializeFromBusiness);
    const { user } = useAuthStore();
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchBusiness = async () => {
            if (!id) return;

            // 1. Try to find in mock database
            let business = await getBusinessByNfcId(id as string);

            // 2. If not found, check if it matches the current logged in session (Real session check)
            if (!business && user && user.businessName) {
                const sessionTagId = user.businessName.replace(/\s+/g, '-').toUpperCase();
                if (id === sessionTagId) {
                    // Create a dynamic profile for the logged in session
                    business = {
                        id: 'SESSION-ID',
                        slug: sessionTagId,
                        nfcId: sessionTagId,
                        name: user.businessName,
                        type: 'RESTAURANT', // Default
                        welcomeMessage: `Welcome to ${user.businessName}`,
                        successMessage: "See you next time!",
                        privacyMessage: "Fast and secure check-in activated.",
                        rewardMessage: "10% Off your next meal",
                        rewardEnabled: true
                    };
                }
            }

            if (business) {
                initializeFromBusiness(business);
                router.push('/user-step');
            } else {
                setError(true);
            }
        };

        fetchBusiness();
    }, [id, initializeFromBusiness, router]);

    if (error) {
        return (
            <div className="min-h-screen bg-[#fafbfc] flex items-center justify-center p-6">
                <div className="max-w-sm w-full bg-white rounded-2xl p-12 shadow-xl border border-red-50 text-center">
                    <div className="size-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="material-symbols-outlined text-3xl">error</span>
                    </div>
                    <h1 className="text-2xl font-display font-black text-text-main mb-4 tracking-tight">Invalid NFC Tag</h1>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed mb-8">
                        This NFC device is not registered or has been deactivated. Please contact support.
                    </p>
                    <button
                        onClick={() => router.push('/')}
                        className="w-full h-14 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fafbfc] flex items-center justify-center">
            <div className="text-center">
                <div className="size-24 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-10 mx-auto border border-gray-50">
                    <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="material-symbols-outlined text-primary text-4xl"
                    >
                        sync
                    </motion.span>
                </div>
                <h1 className="text-2xl font-display font-black text-text-main tracking-tight px-6">
                    Establishing Secure Connection...
                </h1>
                <p className="text-xs font-black text-primary uppercase tracking-[0.3em] mt-4 animate-pulse">
                    Please Wait
                </p>
            </div>
        </div>
    );
}
