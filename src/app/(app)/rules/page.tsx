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
        <div className="animate-fade-in-up pb-20 max-w-4xl mx-auto">
            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-teal mb-2">
                        <Shield size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Protocol Framework</span>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-off-white">Integrity Mesh</h1>
                    <p className="text-slate-light font-medium">Your behavioral structure. Deviations are observed, not judged.</p>
                </div>
                <div className="px-6 py-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-4">
                    <div className="flex flex-col gap-0.5">
                        <span className="text-[9px] font-bold text-slate-mid uppercase tracking-widest leading-none">Status</span>
                        <span className="text-sm font-bold text-muted-teal leading-none">SYNCHRONIZED</span>
                    </div>
                </div>
            </div>

            {/* --- SUMMARY MESH --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="card-elevated group p-8 border-white/10">
                    <span className="text-[10px] font-bold text-slate-mid uppercase tracking-[0.2em] block mb-4">Active Nodes</span>
                    <div className="flex items-center gap-4">
                        <div className="text-4xl font-bold text-off-white tracking-tighter group-hover:text-muted-teal transition-colors">{active}</div>
                        <Shield size={24} strokeWidth={1.4} className="text-muted-teal/40 group-hover:text-muted-teal transition-colors" />
                    </div>
                </div>
                <div className="card-elevated group p-8 border-white/10">
                    <span className="text-[10px] font-bold text-slate-mid uppercase tracking-[0.2em] block mb-4">Breach Points</span>
                    <div className="flex items-center gap-4">
                        <div className="text-4xl font-bold text-off-white tracking-tighter group-hover:text-status-deviation transition-colors">{deviated}</div>
                        <AlertTriangle size={24} strokeWidth={1.4} className="text-status-deviation/40 group-hover:text-status-deviation transition-colors" />
                    </div>
                </div>
                <div className="card-elevated group p-8 border-white/10">
                    <span className="text-[10px] font-bold text-slate-mid uppercase tracking-[0.2em] block mb-4">Adherence Coeff</span>
                    <div className="flex items-center gap-4">
                        <div className="text-4xl font-bold text-off-white tracking-tighter group-hover:text-blue-400 transition-colors">{adherence}%</div>
                        <Lock size={24} strokeWidth={1.4} className="text-slate-mid/40 group-hover:text-blue-400 transition-colors" />
                    </div>
                </div>
            </div>

            {/* --- LOCKED PROTOCOL NOTICE --- */}
            {session.rulesLocked && (
                <div className="bg-muted-teal/5 border border-muted-teal/20 backdrop-blur-md p-6 rounded-[24px] flex items-center gap-4 mb-10 text-sm text-slate-light animate-fade-in shadow-[0_0_40px_rgba(56,189,248,0.05)]">
                    <div className="p-2 bg-muted-teal/10 rounded-lg">
                        <Lock size={18} className="text-muted-teal" />
                    </div>
                    <p className="font-medium">
                        <span className="text-muted-teal font-bold uppercase tracking-wider mr-2">Framework Locked:</span>
                        Rule structure is finalized for the current observing session. Every node state is logged.
                    </p>
                </div>
            )}

            {/* --- RULE MESH NODES --- */}
            <div className="space-y-4">
                {rules.map((rule, index) => (
                    <div
                        key={rule.id}
                        className={`card-elevated group flex items-center gap-8 py-7 px-8 transition-all duration-500 hover:scale-[1.01] ${rule.violated
                            ? 'border-status-deviation/30 bg-status-deviation/[0.03] shadow-[0_0_30px_rgba(244,63,94,0.05)]'
                            : 'border-white/5 hover:border-white/10 bg-white/[0.01]'
                            }`}
                    >
                        <div className="text-xs font-black text-slate-mid group-hover:text-muted-teal transition-colors tracking-tighter">
                            CORE_{String(index + 1).padStart(2, '0')}
                        </div>

                        <div className="flex-1">
                            <p className={`text-lg font-bold tracking-tight transition-colors duration-500 ${rule.violated ? 'text-status-deviation' : 'text-off-white group-hover:text-white'}`}>
                                {rule.text}
                            </p>
                            <div className="mt-3 flex items-center gap-3">
                                {rule.violated ? (
                                    <div className="badge badge-deviation py-1 px-4 font-bold flex items-center gap-2">
                                        <AlertTriangle size={12} /> BREACHED
                                    </div>
                                ) : (
                                    <div className="badge badge-calm py-1 px-4 font-bold flex items-center gap-2">
                                        <CheckCircle2 size={12} /> INTACT
                                    </div>
                                )}
                                <div className="w-1 h-1 rounded-full bg-white/10" />
                                <span className="text-[10px] font-bold text-slate-mid uppercase tracking-widest leading-none">Priority Alpha</span>
                            </div>
                        </div>

                        <button
                            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 border shadow-xl ${rule.violated
                                ? 'bg-status-deviation/10 border-status-deviation/30 text-status-deviation hover:bg-status-deviation/20 active:scale-95'
                                : 'bg-white/[0.03] border-white/10 text-slate-mid hover:text-white hover:border-white/20 active:scale-95'
                                }`}
                            onClick={() => toggleRuleViolation(rule.id)}
                            title={rule.violated ? 'Reset Node' : 'Log Breach'}
                        >
                            {rule.violated ? (
                                <CheckCircle2 size={24} />
                            ) : (
                                <AlertTriangle size={24} />
                            )}
                        </button>
                    </div>
                ))}
            </div>

            {/* --- PHILOSOPHICAL MESH --- */}
            <div className="mt-20 pt-12 border-t border-white/5 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 bg-deep-navy">
                    <Shield size={24} className="text-muted-teal/20" />
                </div>
                <div className="text-center max-w-[640px] mx-auto space-y-4">
                    <p className="text-lg font-medium italic text-slate-light leading-relaxed">
                        "Structure is not restriction. It is the framework within which controlled performance becomes possible. When behavior is consistent, outcomes stabilize."
                    </p>
                    <p className="text-[10px] font-bold text-slate-mid uppercase tracking-[0.3em]">Foundation Protocol v.4.0</p>
                </div>
            </div>
        </div>
    );
}
