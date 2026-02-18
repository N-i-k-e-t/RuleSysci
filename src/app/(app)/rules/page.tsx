'use client';

import { useRuleSysci } from '@/lib/context';
import {
    Lock,
    Shield,
    AlertTriangle,
    CheckCircle2,
} from 'lucide-react';

export default function RulesPage() {
    const { rules, toggleRuleViolation, session } = useRuleSysci();

    const active = rules.filter((r) => r.locked && !r.violated).length;
    const deviated = rules.filter((r) => r.violated).length;
    const total = rules.length;
    const adherence = Math.round(((total - deviated) / total) * 100);

    return (
        <div className="animate-fade-in-up pb-20">
            <div className="mb-8">
                <h1 className="text-[28px] font-medium tracking-tight text-off-white">Rule Framework</h1>
                <p className="text-sm text-slate-light">Your behavioral structure. Deviations are observed, not judged.</p>
            </div>

            {/* Rule Status Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="card flex items-center gap-4 py-6">
                    <Shield size={24} strokeWidth={1.4} className="text-muted-teal" />
                    <div className="flex flex-col">
                        <span className="text-2xl font-semibold text-off-white leading-tight">{active}</span>
                        <span className="text-[11px] uppercase tracking-wider text-slate-light font-medium">Active Rules</span>
                    </div>
                </div>
                <div className="card flex items-center gap-4 py-6">
                    <AlertTriangle size={24} strokeWidth={1.4} className="text-soft-amber" />
                    <div className="flex flex-col">
                        <span className="text-2xl font-semibold text-off-white leading-tight">{deviated}</span>
                        <span className="text-[11px] uppercase tracking-wider text-slate-light font-medium">Deviations</span>
                    </div>
                </div>
                <div className="card flex items-center gap-4 py-6">
                    <Lock size={24} strokeWidth={1.4} className="text-mist-gray" />
                    <div className="flex flex-col">
                        <span className="text-2xl font-semibold text-off-white leading-tight">{adherence}%</span>
                        <span className="text-[11px] uppercase tracking-wider text-slate-light font-medium">Adherence</span>
                    </div>
                </div>
            </div>

            {/* Rules locked notice */}
            {session.rulesLocked && (
                <div className="bg-cool-slate/40 border border-white/5 p-4 rounded-lg flex items-center gap-3 mb-8 text-sm text-mist-gray">
                    <Lock size={16} strokeWidth={1.6} className="flex-shrink-0" />
                    <span>Rule framework is locked for the current session. Deviations are recorded for analysis.</span>
                </div>
            )}

            {/* Rule Cards */}
            <div className="flex flex-col gap-3">
                {rules.map((rule, index) => (
                    <div
                        key={rule.id}
                        className={`card group flex items-center gap-6 py-5 px-6 transition-fast ${rule.violated ? 'border-status-deviation/20 bg-status-deviation/[0.02]' : ''
                            }`}
                    >
                        <div className="text-[13px] font-medium text-slate-mid group-hover:text-slate-light transition-fast">
                            {String(index + 1).padStart(2, '0')}
                        </div>

                        <div className="flex-1">
                            <p className={`text-[15px] font-medium transition-fast ${rule.violated ? 'text-status-deviation/80' : 'text-off-white'
                                }`}>
                                {rule.text}
                            </p>
                            <div className="mt-1.5">
                                {rule.violated ? (
                                    <span className="badge badge-deviation">
                                        <AlertTriangle size={12} /> Deviated
                                    </span>
                                ) : (
                                    <span className="badge badge-calm">
                                        <CheckCircle2 size={12} /> Held
                                    </span>
                                )}
                            </div>
                        </div>

                        <button
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-fast border ${rule.violated
                                ? 'bg-status-deviation/10 border-status-deviation/20 text-status-deviation hover:bg-status-deviation/20'
                                : 'bg-white/5 border-white/5 text-slate-mid hover:text-soft-amber hover:border-soft-amber/30'
                                }`}
                            onClick={() => toggleRuleViolation(rule.id)}
                            title={rule.violated ? 'Mark as held' : 'Mark as deviated'}
                        >
                            {rule.violated ? (
                                <CheckCircle2 size={18} />
                            ) : (
                                <AlertTriangle size={18} />
                            )}
                        </button>
                    </div>
                ))}
            </div>

            {/* Structural principle */}
            <div className="mt-12 p-8 border-t border-white/4 text-center max-w-[640px] mx-auto">
                <p className="text-[17px] italic text-slate-light leading-relaxed">
                    "Structure is not restriction. It is the framework within which controlled performance becomes possible. When behavior is consistent, outcomes stabilize."
                </p>
            </div>
        </div>
    );
}
