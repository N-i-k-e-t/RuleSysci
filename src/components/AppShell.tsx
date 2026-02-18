'use client';

import Sidebar from './Sidebar';
import { useRuleSysci } from '@/lib/context';
import LabMode from './LabMode';

export default function AppShell({ children }: { children: React.ReactNode }) {
    const { sidebarCollapsed, labMode } = useRuleSysci();

    return (
        <div className="app-layout">
            <Sidebar />
            <main
                className={`app-main transition-[margin,max-width] duration-300 ${sidebarCollapsed ? 'sidebar-collapsed' : ''
                    } ${labMode ? 'focus-mode' : ''}`}
            >
                <div className="max-w-[960px] mx-auto w-full">
                    {children}
                </div>
            </main>
            {labMode && <LabMode />}

            {/* Legal Footer */}
            <footer className={`fixed bottom-0 left-0 right-0 p-4 text-[10px] text-center text-slate-mid bg-deep-navy/80 backdrop-blur-sm z-40 transition-opacity duration-300 ${labMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <p className="max-w-[960px] mx-auto">
                    RuleSysci does not provide financial advice, trading signals, or automated trading.
                    All entries are manual and for self-reflection purposes only.
                </p>
            </footer>
        </div>
    );
}
