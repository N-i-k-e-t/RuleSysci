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
            className={`fixed top-0 left-0 bottom-0 bg-cool-slate border-r border-white/4 flex flex-col p-4 z-50 transition-[width] duration-300 overflow-hidden ${sidebarCollapsed ? 'w-[72px] items-center px-2' : 'w-[240px]'
                }`}
        >
            {/* Brand */}
            <div className={`flex items-center gap-4 px-2 mb-8 ${sidebarCollapsed ? 'justify-center' : ''}`}>
                <div className="w-10 h-10 flex items-center justify-center text-muted-teal flex-shrink-0">
                    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="3" width="26" height="26" rx="4" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M11 9L11 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M11 9L18 9C20.2 9 22 10.8 22 13C22 15.2 20.2 17 18 17L11 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        <path d="M17 17L22 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>
                {!sidebarCollapsed && (
                    <div className="flex flex-col min-w-0 animate-fade-in">
                        <span className="text-base font-semibold text-off-white tracking-[0.06em]">
                            Rule<span className="font-normal text-muted-teal">Sysci</span>
                        </span>
                        <span className="text-[11px] text-slate-light tracking-wide">Behavior first</span>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-0.5 flex-1 w-full">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.to;
                    return (
                        <Link
                            key={item.to}
                            href={item.to}
                            className={`flex items-center gap-4 p-2.5 rounded-md text-sm font-normal transition-fast whitespace-nowrap whitespace-nowrap group ${isActive
                                ? 'bg-muted-teal/10 text-muted-teal'
                                : 'text-mist-gray hover:bg-white/5 hover:text-off-white'
                                } ${sidebarCollapsed ? 'justify-center' : ''}`}
                            title={sidebarCollapsed ? item.label : undefined}
                        >
                            <Icon size={20} strokeWidth={1.6} />
                            {!sidebarCollapsed && <span className="animate-fade-in">{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="flex flex-col gap-0.5 pt-4 border-t border-white/4 w-full">
                <button
                    className={`flex items-center gap-4 p-2.5 rounded-md text-sm font-normal text-mist-gray hover:bg-white/5 hover:text-off-white transition-fast ${sidebarCollapsed ? 'justify-center' : ''
                        }`}
                    onClick={toggleLabMode}
                    title="Lab Mode"
                >
                    <FlaskConical size={20} strokeWidth={1.6} />
                    {!sidebarCollapsed && <span className="animate-fade-in">Lab Mode</span>}
                </button>

                <Link
                    href="/settings"
                    className={`flex items-center gap-4 p-2.5 rounded-md text-sm font-normal transition-fast whitespace-nowrap group ${pathname === '/settings'
                        ? 'bg-muted-teal/10 text-muted-teal'
                        : 'text-mist-gray hover:bg-white/5 hover:text-off-white'
                        } ${sidebarCollapsed ? 'justify-center' : ''}`}
                    title={sidebarCollapsed ? 'Settings' : undefined}
                >
                    <Settings size={20} strokeWidth={1.6} />
                    {!sidebarCollapsed && <span className="animate-fade-in">Settings</span>}
                </Link>

                <button
                    className="flex items-center justify-center p-2 rounded-sm text-slate-light hover:text-off-white hover:bg-white/5 transition-fast mt-2"
                    onClick={toggleSidebar}
                >
                    {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>
        </aside>
    );
}
