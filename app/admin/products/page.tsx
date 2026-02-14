
'use client';

import React from 'react';
import Link from 'next/link';
import {
    Search, Plus, Package, Store, AlertTriangle, Filter, ArrowUpDown,
    MoreHorizontal, Edit, Copy, Trash2, ChevronLeft, ChevronRight, TrendingUp, AlertCircle
} from 'lucide-react';

export default function ProductsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-200 px-6 sm:px-10 py-5">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="font-display text-2xl sm:text-3xl font-bold bg-linear-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                            Product Management
                        </h2>
                        <p className="text-text-secondary text-sm mt-1">Manage your hardware inventory and listings</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="size-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary transition-colors bg-white">
                            <Search size={20} />
                        </button>
                        <Link
                            href="/admin/products/create"
                            className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-full font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            <Plus size={20} />
                            Add New Product
                        </Link>
                    </div>
                </div>
            </header>

            <div className="flex-1 p-6 sm:p-10 overflow-y-auto">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Package size={96} className="text-primary" />
                            </div>
                            <div className="relative z-10">
                                <p className="text-text-secondary font-medium text-sm uppercase tracking-wide">Total Products</p>
                                <h3 className="text-4xl font-display font-bold text-text-main mt-2">1,284</h3>
                                <div className="flex items-center gap-1 mt-2 text-green-500 text-sm font-medium">
                                    <TrendingUp size={16} />
                                    <span>+12% from last month</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Store size={96} className="text-green-500" />
                            </div>
                            <div className="relative z-10">
                                <p className="text-text-secondary font-medium text-sm uppercase tracking-wide">Active Listings</p>
                                <h3 className="text-4xl font-display font-bold text-text-main mt-2">1,156</h3>
                                <div className="flex items-center gap-1 mt-2 text-text-secondary text-sm font-medium">
                                    <span>92% of inventory active</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <AlertTriangle size={96} className="text-yellow-500" />
                            </div>
                            <div className="relative z-10">
                                <p className="text-text-secondary font-medium text-sm uppercase tracking-wide">Low Stock Alerts</p>
                                <h3 className="text-4xl font-display font-bold text-text-main mt-2">24</h3>
                                <div className="flex items-center gap-1 mt-2 text-yellow-500 text-sm font-medium">
                                    <AlertCircle size={16} />
                                    <span>Requires attention</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Products Table */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <span className="font-display font-bold text-lg px-2">All Products</span>
                                <span className="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full text-xs font-bold">1284</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                    <Filter size={18} />
                                    Filter
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                    <ArrowUpDown size={18} />
                                    Sort
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                                        <th className="px-6 py-4">Product</th>
                                        <th className="px-6 py-4">SKU</th>
                                        <th className="px-6 py-4">Category</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Stock Level</th>
                                        <th className="px-6 py-4">Last Updated</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {[
                                        {
                                            id: 1, name: "ACS ACR1552U NFC Reader", sku: "#PROD-83920", category: "Hardware", status: "Active", stock: 850, updated: "2 mins ago",
                                            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpjfsbDcyNrcdY3wT5WsPHayuKV69IQp4zBZ55v0IhZB0SDp8aAem18hyQdluYYILdlRmoE6j1nhmXZEzgHjLTk4yB68cpsg4noFpyqOshqOCH6pZ4LDN9Lib0fXNQy8DrtpqmAc-lwPooG109eEazivYU-ywoKB0KXg7Drb3DbQiRCdX3DPrZRWh884uRXJ7_7IKxKkpOHmWBXNsCoo-Xltcx9gc-mnp0bIuzG0wn604byUosX-4swwZ5erfiokNSvV_tWJoxr3OU",
                                            stockColor: "bg-primary", stockPercent: "85%"
                                        },
                                        {
                                            id: 2, name: "HID Omnikey 5427 CK", sku: "#PROD-77321", category: "Access Control", status: "Hidden", stock: 450, updated: "Yesterday",
                                            stockColor: "bg-green-500", stockPercent: "45%"
                                        },
                                        {
                                            id: 3, name: "Identiv uTrust 3700 F", sku: "#PROD-19283", category: "Hardware", status: "Out of Stock", stock: 0, updated: "Oct 24, 2024",
                                            stockColor: "bg-red-400", stockPercent: "0%"
                                        },
                                        {
                                            id: 4, name: "SpringCard Puck", sku: "#PROD-99821", category: "Peripherals", status: "Low Stock", stock: 5, updated: "Nov 02, 2024",
                                            stockColor: "bg-yellow-400", stockPercent: "5%"
                                        },
                                    ].map((product) => (
                                        <tr key={product.id} className="group hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="size-12 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-200 flex items-center justify-center">
                                                        {product.image ? (
                                                            <img alt={product.name} className="w-full h-full object-cover" src={product.image} />
                                                        ) : (
                                                            <Package className="text-gray-400" size={24} />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-text-main group-hover:text-primary transition-colors">{product.name}</div>
                                                        <div className="text-xs text-text-secondary">{product.category} details</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-600">{product.sku}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border 
                                                        ${product.status === 'Active' ? 'bg-green-100 text-green-700 border-green-200' :
                                                        product.status === 'Hidden' ? 'bg-gray-100 text-gray-600 border-gray-200' :
                                                            product.status === 'Out of Stock' ? 'bg-red-100 text-red-700 border-red-200' :
                                                                'bg-yellow-100 text-yellow-700 border-yellow-200'
                                                    }`}>
                                                    <span className={`size-1.5 rounded-full 
                                                            ${product.status === 'Active' ? 'bg-green-500' :
                                                            product.status === 'Hidden' ? 'bg-gray-400' :
                                                                product.status === 'Out of Stock' ? 'bg-red-500' :
                                                                    'bg-yellow-500'
                                                        }`}></span>
                                                    {product.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                        <div className={`h-full rounded-full ${product.stockColor}`} style={{ width: product.stockPercent }}></div>
                                                    </div>
                                                    <span className={`text-xs font-bold ${product.stock === 0 ? 'text-red-500' : 'text-gray-600'}`}>{product.stock}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{product.updated}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="size-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-primary/10 hover:text-primary transition-colors" title="Edit">
                                                        <Edit size={16} />
                                                    </button>
                                                    <button className="size-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-primary/10 hover:text-primary transition-colors" title="Duplicate">
                                                        <Copy size={16} />
                                                    </button>
                                                    <button className="size-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors" title="Delete">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-6 border-t border-gray-100 flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                                Showing <span className="font-bold text-text-main">1</span> to <span className="font-bold text-text-main">4</span> of <span className="font-bold text-text-main">1284</span> results
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="size-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled>
                                    <ChevronLeft size={20} />
                                </button>
                                <button className="size-9 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-sm shadow-md">1</button>
                                <button className="size-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-primary transition-colors text-sm font-medium">2</button>
                                <button className="size-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-primary transition-colors text-sm font-medium">3</button>
                                <span className="text-gray-400">...</span>
                                <button className="size-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-primary transition-colors text-sm font-medium">12</button>
                                <button className="size-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-primary transition-colors">
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
