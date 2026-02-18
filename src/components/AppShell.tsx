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
            <footer className={`fixed bottom-0 left-0 right-0 py-6 border-t border-white/[0.02] text-[9px] text-center text-slate-mid/40 bg-[#020617]/40 backdrop-blur-md z-40 transition-opacity duration-300 font-bold uppercase tracking-[0.2em] ${labMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <p className="max-w-[960px] mx-auto px-10">
                    RuleSysci Experimental Platform <span className="mx-3 opacity-20">|</span> Non-Financial Analytical Tool <span className="mx-3 opacity-20">|</span> Behavioral Data Mesh
                </p>
            </footer>
        </div>
    );
}
