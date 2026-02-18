'use client';

import { useState, useEffect } from 'react';
import { useRuleSysci } from '@/lib/context';
import { X, FlaskConical, Clock } from 'lucide-react';

export default function LabMode() {
    const { setLabMode, session } = useRuleSysci();
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setElapsed((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };

    const principles = [
        "Behavior stabilizes when observed without judgment.",
        "Structure precedes performance. Build the frame first.",
        "Impulse is data, not direction.",
        "The best execution is the one that follows process.",
        "If behavior is consistent, outcomes become predictable.",
    ];

    const principle = principles[Math.floor(Date.now() / 60000) % principles.length];

    const baselineLabels: Record<string, string> = {
        controlled: 'Controlled',
        neutral: 'Neutral',
        elevated: 'Elevated',
        reactive: 'Reactive',
        uncertain: 'Uncertain',
    };

    return (
        <div className="fixed inset-0 bg-[#020617] z-[100] flex items-center justify-center animate-fade-in overflow-hidden">
            {/* Background Mesh */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(56,189,248,0.06)_0%,_transparent_50%)]" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-muted-teal/20 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-muted-teal/20 to-transparent" />

            {/* Exit Control */}
            <button
                className="absolute top-12 right-12 w-14 h-14 flex items-center justify-center rounded-2xl text-slate-mid hover:text-white hover:bg-white/[0.03] border border-white/5 transition-all group z-50"
                onClick={() => setLabMode(false)}
            >
                <X size={24} className="group-hover:rotate-90 transition-transform" />
            </button>

            <div className="flex flex-col items-center gap-10 max-w-2xl text-center animate-fade-in-scale relative z-10">
                {/* Lab Identifier */}
                <div className="flex items-center gap-4 text-muted-teal/40 mb-2">
                    <div className="h-px w-12 bg-muted-teal/20" />
                    <div className="flex items-center gap-2 animate-pulse-soft">
                        <FlaskConical size={20} />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em]">System Observing</span>
                    </div>
                    <div className="h-px w-12 bg-muted-teal/20" />
                </div>

                {/* Immense Timer Display */}
                <div className="relative group">
                    <div className="absolute inset-0 blur-3xl bg-muted-teal/5 rounded-full scale-150 transition-all group-hover:bg-muted-teal/10" />
                    <div className="relative flex flex-col items-center">
                        <span className="text-8xl font-black text-white tracking-tighter tabular-nums drop-shadow-2xl">
                            {formatTime(elapsed)}
                        </span>
                        <div className="mt-4 flex items-center gap-3 px-6 py-2 rounded-full bg-white/[0.03] border border-white/10">
                            <Clock size={14} className="text-muted-teal" />
                            <span className="text-[11px] font-bold text-slate-light uppercase tracking-widest">Active Pulse</span>
                        </div>
                    </div>
                </div>

                {/* Context Mesh */}
                <div className="grid grid-cols-2 gap-6 w-full mt-4">
                    <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 backdrop-blur-xl group hover:border-muted-teal/20 transition-all">
                        <span className="text-[10px] font-black text-slate-mid uppercase tracking-[0.2em] block mb-2">Baseline Vector</span>
                        <h4 className="text-2xl font-bold text-off-white capitalize group-hover:text-muted-teal transition-colors">
                            {baselineLabels[session.emotionalBaseline] || session.emotionalBaseline}
                        </h4>
                    </div>
                    <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 backdrop-blur-xl group hover:border-muted-teal/20 transition-all">
                        <span className="text-[10px] font-black text-slate-mid uppercase tracking-[0.2em] block mb-2">Sample Capacity</span>
                        <h4 className="text-2xl font-bold text-off-white group-hover:text-muted-teal transition-colors">
                            {session.tradesTaken} <span className="text-slate-mid">/</span> {session.tradesAllowed}
                        </h4>
                    </div>
                </div>

                {/* Structural Principle */}
                <div className="max-w-lg p-10 rounded-[32px] bg-muted-teal/[0.02] border border-muted-teal/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 text-muted-teal/5">
                        <FlaskConical size={64} strokeWidth={1} />
                    </div>
                    <p className="text-lg font-medium italic text-slate-light leading-relaxed relative z-10 transition-colors group-hover:text-white">
                        "{principle}"
                    </p>
                </div>

                {/* Final Status */}
                <div className="mt-6 flex flex-col items-center gap-4">
                    <div className="flex gap-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-1.5 h-1.5 rounded-full bg-muted-teal animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                        ))}
                    </div>
                    <span className="text-[10px] font-black text-slate-mid uppercase tracking-[0.5em] animate-pulse">Observation in Progress</span>
                </div>
            </div>
        </div>
    );
}
