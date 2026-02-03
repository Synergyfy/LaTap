'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import {
    Home, Store, Users, Nfc, CreditCard, BarChart, MessageSquare,
    Settings, ChevronDown, Shield, LogOut, Search, Bell, HelpCircle
} from 'lucide-react';

interface AdminSidebarProps {
    children: React.ReactNode;
}

export default function AdminSidebar({ children }: AdminSidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuthStore();
    const [expandedMenus, setExpandedMenus] = useState<string[]>(['businesses']);

    const toggleMenu = (menu: string) => {
        setExpandedMenus(prev =>
            prev.includes(menu) ? prev.filter(m => m !== menu) : [...prev, menu]
        );
    };

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    const menuItems = [
        {
            id: 'overview',
            label: 'Dashboard',
            icon: Home,
            href: '/admin/dashboard',
        },
        {
            id: 'businesses',
            label: 'Businesses',
            icon: Store,
            submenu: [
                { label: 'All Businesses', href: '/admin/businesses' },
                { label: 'Pending Approval', href: '/admin/businesses/pending' },
                { label: 'Suspended', href: '/admin/businesses/suspended' },
            ]
        },
        {
            id: 'users',
            label: 'Users',
            icon: Users,
            href: '/admin/users',
        },
        {
            id: 'devices',
            label: 'Devices',
            icon: Nfc,
            submenu: [
                { label: 'All Devices', href: '/admin/devices' },
                { label: 'Active', href: '/admin/devices/active' },
                { label: 'Inactive', href: '/admin/devices/inactive' },
            ]
        },
        {
            id: 'subscriptions',
            label: 'Subscriptions',
            icon: CreditCard,
            href: '/admin/subscriptions',
        },
        {
            id: 'analytics',
            label: 'Platform Analytics',
            icon: BarChart,
            href: '/admin/analytics',
        },
        {
            id: 'support',
            label: 'Support Tickets',
            icon: MessageSquare,
            href: '/admin/support',
        },
        {
            id: 'settings',
            label: 'System Settings',
            icon: Settings,
            href: '/admin/settings',
        },
    ];

    const isActive = (href: string) => pathname === href;
    const isParentActive = (submenu?: { href: string }[]) =>
        submenu?.some(item => pathname === item.href);

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar - Light theme matching business dashboard */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
                {/* Logo with Wordmark */}
                <div className="h-16 flex items-center px-6 border-b border-gray-200">
                    <Link href="/admin/dashboard" className="flex items-center gap-2">
                        <Shield className="text-primary" size={28} strokeWidth={2.5} />
                        <div className="flex flex-col">
                            <span className="font-display font-bold text-lg text-text-main leading-none">LaTap</span>
                            <span className="text-[10px] text-text-secondary font-medium uppercase tracking-wider">Admin Panel</span>
                        </div>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-6 px-3">
                    {menuItems.map((item) => {
                        const IconComponent = item.icon;
                        return (
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
                                                <IconComponent size={18} />
                                                <span>{item.label}</span>
                                            </div>
                                            <ChevronDown
                                                size={16}
                                                className={`transition-transform ${expandedMenus.includes(item.id) ? 'rotate-180' : ''}`}
                                            />
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
                                        <IconComponent size={18} />
                                        <span>{item.label}</span>
                                    </Link>
                                )}
                            </div>
                        );
                    })}
                </nav>

                {/* Admin Profile */}
                <div className="border-t border-gray-200 p-4">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Shield className="text-primary" size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-text-main truncate">{user?.name || 'Admin'}</p>
                            <p className="text-xs text-text-secondary truncate">System Administrator</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full py-2 px-3 bg-gray-50 text-text-secondary rounded-lg text-sm font-bold hover:bg-gray-100 hover:text-text-main transition-colors flex items-center justify-center gap-2"
                    >
                        <LogOut size={16} />
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
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search businesses, users, devices..."
                                className="w-full h-10 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-text-secondary hover:text-text-main hover:bg-gray-50 rounded-lg transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <button className="p-2 text-text-secondary hover:text-text-main hover:bg-gray-50 rounded-lg transition-colors">
                            <HelpCircle size={20} />
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
