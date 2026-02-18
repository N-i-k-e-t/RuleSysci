'use client';

import { useState, useEffect } from 'react';
import { useRuleSci } from '@/lib/context';
import { X, FlaskConical, Clock } from 'lucide-react';

export default function LabMode() {
    const { setLabMode, session } = useRuleSci();
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
        <div className="fixed inset-0 bg-deep-navy z-[100] flex items-center justify-center animate-fade-in">
            {/* Exit */}
            <button
                className="absolute top-8 right-8 w-11 h-11 flex items-center justify-center rounded-md text-slate-light hover:text-off-white hover:bg-white/5 transition-fast"
                onClick={() => setLabMode(false)}
            >
                <X size={20} />
            </button>

            <div className="flex flex-col items-center gap-8 max-w-md text-center animate-fade-in-scale">
                {/* Icon */}
                <div className="text-muted-teal/50 animate-pulse-soft">
                    <FlaskConical size={40} strokeWidth={1.2} />
                </div>

                {/* Timer */}
                <div className="flex items-center gap-2 text-sm text-slate-light tabular-nums">
                    <Clock size={16} strokeWidth={1.6} />
                    <span>{formatTime(elapsed)}</span>
                </div>

                {/* Current state */}
                <div className="flex flex-col gap-2">
                    <h2 className="text-[28px] font-medium tracking-tight text-off-white">Observation Mode</h2>
                    <p className="text-[15px] text-mist-gray">
                        Baseline: <span className="capitalize text-muted-teal font-medium">{baselineLabels[session.emotionalBaseline] || session.emotionalBaseline}</span>
                    </p>
                    <p className="text-sm text-slate-light">
                        {session.tradesTaken} of {session.tradesAllowed} executions recorded
                    </p>
                </div>

                {/* Principle */}
                <div className="max-w-[360px] p-6 border-l-2 border-muted-teal/20 text-left">
                    <p className="text-[15px] italic text-mist-gray leading-relaxed">"{principle}"</p>
                </div>

                {/* Rhythm indicator */}
                <div className="flex flex-col items-center gap-4 mt-6">
                    <div className="w-3 h-3 rounded-full bg-muted-teal/40 animate-[rhythm_4s_ease-in-out_infinite]" />
                    <span className="text-[11px] uppercase tracking-[0.15em] text-slate-light animate-pulse-soft">Observe</span>
                </div>
            </div>
        </div>
    );
}
