'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

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
            icon: 'dashboard',
            href: '/admin/dashboard',
        },
        {
            id: 'businesses',
            label: 'Businesses',
            icon: 'store',
            submenu: [
                { label: 'All Businesses', href: '/admin/businesses' },
                { label: 'Pending Approval', href: '/admin/businesses/pending' },
                { label: 'Suspended', href: '/admin/businesses/suspended' },
            ]
        },
        {
            id: 'users',
            label: 'Users',
            icon: 'people',
            href: '/admin/users',
        },
        {
            id: 'devices',
            label: 'Devices',
            icon: 'nfc',
            submenu: [
                { label: 'All Devices', href: '/admin/devices' },
                { label: 'Active', href: '/admin/devices/active' },
                { label: 'Inactive', href: '/admin/devices/inactive' },
            ]
        },
        {
            id: 'subscriptions',
            label: 'Subscriptions',
            icon: 'credit_card',
            href: '/admin/subscriptions',
        },
        {
            id: 'analytics',
            label: 'Platform Analytics',
            icon: 'analytics',
            href: '/admin/analytics',
        },
        {
            id: 'support',
            label: 'Support Tickets',
            icon: 'support_agent',
            href: '/admin/support',
        },
        {
            id: 'settings',
            label: 'System Settings',
            icon: 'settings',
            href: '/admin/settings',
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
                <div className="h-16 flex items-center px-6 border-b border-gray-100">
                    <Link href="/admin/dashboard" className="flex items-center gap-2">
                        <span className="material-icons-round text-primary text-2xl">admin_panel_settings</span>
                        <div>
                            <span className="font-display font-bold text-base text-gray-900 block">LaTap Admin</span>
                            <span className="text-[10px] text-gray-500 font-medium">Control Panel</span>
                        </div>
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
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
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
                                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
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
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                >
                                    <span className="material-icons-round text-lg">{item.icon}</span>
                                    <span>{item.label}</span>
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Admin Profile */}
                <div className="border-t border-gray-100 p-4">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="material-icons-round text-primary">shield</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-900 truncate">{user?.name || 'Admin'}</p>
                            <p className="text-xs text-gray-500 truncate">System Administrator</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full py-2 px-3 bg-red-500/10 text-red-400 rounded-lg text-sm font-bold hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2"
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
                                placeholder="Search businesses, users, devices..."
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
