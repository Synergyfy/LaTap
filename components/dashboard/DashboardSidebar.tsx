'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useCustomerFlowStore } from '@/store/useCustomerFlowStore';
import defaultLogo from '@/assets/logo.png';

interface SidebarProps {
    children: React.ReactNode;
}

export default function DashboardSidebar({ children }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuthStore();
    const { storeName, logoUrl: businessLogo } = useCustomerFlowStore();
    const [expandedMenus, setExpandedMenus] = useState<string[]>(['visitors']);

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    const toggleMenu = (menu: string) => {
        setExpandedMenus(prev =>
            prev.includes(menu) ? prev.filter(m => m !== menu) : [...prev, menu]
        );
    };

    const menuItems = [
        {
            id: 'overview',
            label: 'Dashboard',
            icon: 'dashboard',
            href: '/dashboard',
        },
        {
            id: 'visitors',
            label: 'Visitors',
            icon: 'group',
            submenu: [
                { label: 'Overview', href: '/dashboard/visitors' },
                { label: 'All Visitors', href: '/dashboard/visitors/all' },
                { label: 'New Visitors', href: '/dashboard/visitors/new' },
                { label: 'Returning', href: '/dashboard/visitors/returning' },
            ]
        },
        {
            id: 'devices',
            label: 'Devices',
            icon: 'nfc',
            submenu: [
                { label: 'Overview', href: '/dashboard/devices' },
                { label: 'Device Settings', href: '/dashboard/settings/devices' },
            ]
        },
        {
            id: 'campaigns',
            label: 'Campaigns',
            icon: 'campaign',
            submenu: [
                { label: 'All Campaigns', href: '/dashboard/campaigns' },
                { label: 'Create New', href: '/dashboard/campaigns/new' },
                { label: 'Scheduled', href: '/dashboard/campaigns/scheduled' },
                { label: 'Templates', href: '/dashboard/campaigns/templates' },
            ]
        },
        {
            id: 'loyalty',
            label: 'Loyalty',
            icon: 'loyalty',
            href: '/dashboard/loyalty',
        },
        {
            id: 'analytics',
            label: 'Analytics',
            icon: 'analytics',
            submenu: [
                { label: 'Overview', href: '/dashboard/analytics' },
                { label: 'Footfall', href: '/dashboard/analytics/footfall' },
                { label: 'Peak Times', href: '/dashboard/analytics/peak-times' },
            ]
        },
        {
            id: 'staff',
            label: 'Team',
            icon: 'people',
            href: '/dashboard/staff',
        },
        {
            id: 'settings',
            label: 'Settings',
            icon: 'settings',
            submenu: [
                { label: 'Profile', href: '/dashboard/settings/profile' },
                { label: 'Notifications', href: '/dashboard/settings/notifications' },
                { label: 'Integrations', href: '/dashboard/settings/integrations' },
                { label: 'Privacy & Data', href: '/dashboard/settings/privacy' },
            ]
        },
    ];

    const isActive = (href: string) => pathname === href;
    const isParentActive = (submenu?: { href: string }[]) =>
        submenu?.some(item => pathname === item.href);

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
                {/* Logo */}
                <div className="h-16 flex items-center px-6 border-b border-gray-200">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <span className="material-icons-round text-primary text-2xl">nfc</span>
                        <span className="font-display font-bold text-lg text-text-main">LaTap</span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-6 px-3">
                    {menuItems.map((item) => (
                        <div key={item.id} className="mb-1">
                            {item.submenu ? (
                                <>
                                    <button
                                        onClick={() => toggleMenu(item.id)}
                                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isParentActive(item.submenu)
                                            ? 'bg-primary/5 text-primary'
                                            : 'text-text-secondary hover:bg-gray-50 hover:text-text-main'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="material-icons-round text-lg">{item.icon}</span>
                                            <span>{item.label}</span>
                                        </div>
                                        <span className={`material-icons-round text-sm transition-transform ${expandedMenus.includes(item.id) ? 'rotate-180' : ''
                                            }`}>
                                            expand_more
                                        </span>
                                    </button>
                                    {expandedMenus.includes(item.id) && (
                                        <div className="mt-1 ml-9 space-y-1">
                                            {item.submenu.map((subItem) => (
                                                <Link
                                                    key={subItem.href}
                                                    href={subItem.href}
                                                    className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(subItem.href)
                                                        ? 'bg-primary text-white'
                                                        : 'text-text-secondary hover:bg-gray-50 hover:text-text-main'
                                                        }`}
                                                >
                                                    {subItem.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Link
                                    href={item.href!}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive(item.href!)
                                        ? 'bg-primary/5 text-primary'
                                        : 'text-text-secondary hover:bg-gray-50 hover:text-text-main'
                                        }`}
                                >
                                    <span className="material-icons-round text-lg">{item.icon}</span>
                                    <span>{item.label}</span>
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>

                {/* User Profile */}
                <div className="border-t border-gray-200 p-4">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border border-gray-100">
                            {businessLogo || defaultLogo ? (
                                <img
                                    src={businessLogo || defaultLogo.src}
                                    alt={storeName}
                                    className="w-full h-full object-contain p-1"
                                />
                            ) : (
                                <span className="material-icons-round text-primary">person</span>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-text-main truncate">{user?.name || 'Business Owner'}</p>
                            <p className="text-xs text-text-secondary truncate">{storeName || user?.businessName || 'Premium Plan'}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full py-2 px-3 bg-gray-50 text-text-secondary rounded-lg text-sm font-bold hover:bg-gray-100 hover:text-text-main transition-colors flex items-center justify-center gap-2"
                    >
                        <span className="material-icons-round text-sm">logout</span>
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Bar */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
                    <div className="flex-1">
                        <div className="relative max-w-md">
                            <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                                search
                            </span>
                            <input
                                type="text"
                                placeholder="Search visitors, campaigns..."
                                className="w-full h-10 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-text-secondary hover:text-text-main hover:bg-gray-50 rounded-lg transition-colors">
                            <span className="material-icons-round">notifications</span>
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <button className="p-2 text-text-secondary hover:text-text-main hover:bg-gray-50 rounded-lg transition-colors">
                            <span className="material-icons-round">help_outline</span>
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-gray-50">
                    {children}
                </main>
            </div>
        </div>
    );
}
