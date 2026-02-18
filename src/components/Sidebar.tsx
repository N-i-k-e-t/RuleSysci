'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRuleSysci } from '@/lib/context';
import {
    LayoutDashboard,
    BookOpen,
    ScrollText,
    PenLine,
    BarChart3,
    Settings,
    ChevronLeft,
    ChevronRight,
    FlaskConical,
} from 'lucide-react';

const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Session' },
    { to: '/trades', icon: BookOpen, label: 'Trade Log' },
    { to: '/rules', icon: ScrollText, label: 'Rules' },
    { to: '/observe', icon: PenLine, label: 'Observe' },
    { to: '/analytics', icon: BarChart3, label: 'Analytics' },
];

export default function Sidebar() {
    const { sidebarCollapsed, toggleSidebar, labMode, toggleLabMode } = useRuleSysci();
    const pathname = usePathname();

    if (labMode) return null;

    return (
        <aside
            className={`fixed top-0 left-0 bottom-0 bg-deep-navy/40 backdrop-blur-2xl border-r border-white/5 flex flex-col p-4 z-50 transition-[width] duration-300 overflow-hidden ${sidebarCollapsed ? 'w-[80px] items-center px-2' : 'w-[260px]'
                }`}
        >
            {/* Brand */}
            <div className={`flex items-center gap-4 px-3 mb-12 mt-4 ${sidebarCollapsed ? 'justify-center' : ''}`}>
                <div className="w-10 h-10 flex items-center justify-center text-muted-teal flex-shrink-0 relative">
                    <div className="absolute inset-0 bg-muted-teal/10 blur-lg rounded-full animate-pulse-soft" />
                    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative">
                        <rect x="3" y="3" width="26" height="26" rx="6" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M11 9L11 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M11 9L18 9C20.2 9 22 10.8 22 13C22 15.2 20.2 17 18 17L11 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        <path d="M17 17L22 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>
                {!sidebarCollapsed && (
                    <div className="flex flex-col min-w-0 animate-fade-in">
                        <span className="text-lg font-bold text-off-white tracking-tight">
                            Rule<span className="font-medium text-muted-teal">Sysci</span>
                        </span>
                        <span className="text-[10px] text-slate-light tracking-[0.2em] font-semibold uppercase">Protocol Lab</span>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-1.5 flex-1 w-full">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.to;
                    return (
                        <Link
                            key={item.to}
                            href={item.to}
                            className={`flex items-center gap-4 p-3 rounded-xl text-[14px] font-medium transition-all whitespace-nowrap group relative ${isActive
                                ? 'text-muted-teal bg-muted-teal/5'
                                : 'text-slate-light hover:text-off-white hover:bg-white/[0.03]'
                                } ${sidebarCollapsed ? 'justify-center' : ''}`}
                            title={sidebarCollapsed ? item.label : undefined}
                        >
                            {isActive && <div className="absolute left-0 w-1 h-6 bg-muted-teal rounded-r-full shadow-[0_0_10px_rgba(56,189,248,0.5)]" />}
                            <Icon size={20} strokeWidth={isActive ? 2 : 1.6} className={isActive ? 'drop-shadow-[0_0_5px_rgba(56,189,248,0.5)]' : ''} />
                            {!sidebarCollapsed && <span className="animate-fade-in">{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="flex flex-col gap-1.5 pt-6 border-t border-white/5 w-full">
                <button
                    className={`flex items-center gap-4 p-3 rounded-xl text-[14px] font-medium text-slate-light hover:bg-white/[0.03] hover:text-off-white transition-all ${sidebarCollapsed ? 'justify-center' : ''
                        }`}
                    onClick={toggleLabMode}
                    title="Lab Mode"
                >
                    <FlaskConical size={20} strokeWidth={1.6} />
                    {!sidebarCollapsed && <span className="animate-fade-in">Observation Mode</span>}
                </button>

                <Link
                    href="/settings"
                    className={`flex items-center gap-4 p-3 rounded-xl text-[14px] font-medium transition-all whitespace-nowrap group ${pathname === '/settings'
                        ? 'text-muted-teal bg-muted-teal/5'
                        : 'text-slate-light hover:bg-white/[0.03] hover:text-off-white'
                        } ${sidebarCollapsed ? 'justify-center' : ''}`}
                    title={sidebarCollapsed ? 'Settings' : undefined}
                >
                    <Settings size={20} strokeWidth={1.6} />
                    {!sidebarCollapsed && <span className="animate-fade-in">Lab Settings</span>}
                </Link>

                <button
                    className="flex items-center justify-center p-3 rounded-xl text-slate-light hover:text-off-white hover:bg-white/[0.03] transition-all mt-4"
                    onClick={toggleSidebar}
                >
                    {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>
        </aside>

    );
}
