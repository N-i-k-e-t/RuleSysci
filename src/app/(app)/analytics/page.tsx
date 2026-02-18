'use client';

import { useState } from 'react';
import { useRuleSysci } from '@/lib/context';
import {
    TrendingUp,
    Microscope,
    BarChart3,
    ChevronDown,
    ChevronUp,
    AlertTriangle,
} from 'lucide-react';
import { Trade } from '@/types/trading';

function MiniBarChart({ data }: { data: number[] }) {
    const max = Math.max(...data);
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return (
        <div className="mb-6">
            <div className="flex items-end gap-2 h-32 px-2">
                {data.map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center justify-end gap-2 h-full group">
                        <div
                            className="w-full max-w-[40px] rounded-t-sm transition-[height] duration-1000 ease-out min-h-[8px]"
                            style={{
                                height: `${(val / max) * 100}%`,
                                backgroundColor: val >= 80
                                    ? 'var(--color-muted-teal)'
                                    : val >= 60
                                        ? 'var(--color-soft-amber)'
                                        : 'var(--color-status-deviation)',
                                opacity: 0.8 + (val / max) * 0.2,
                            }}
                        />
                        <span className="text-[10px] text-slate-light tracking-wide">{days[i]}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function AnalyticsPanel({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className={`card overflow-hidden transition-all duration-300 ${open ? 'ring-1 ring-white/5' : ''}`}>
            <button
                className="flex items-center justify-between w-full text-off-white hover:text-muted-teal transition-fast text-left"
                onClick={() => setOpen(!open)}
            >
                <h3 className="text-base font-medium">{title}</h3>
                {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            {open && (
                <div className="mt-6 pt-6 border-t border-white/4 animate-fade-in">
                    {children}
                </div>
            )}
        </div>
    );
}

export default function AnalyticsPage() {
    const { analytics, trades, observations } = useRuleSysci();

    const rulesFollowed = trades.filter((t) => t.followedRules).length;
    const totalTrades = trades.length;
    const adherenceRate = totalTrades > 0 ? Math.round((rulesFollowed / totalTrades) * 100) : 0;

    // Baseline state distribution
    const baselineCounts = trades.reduce<Record<string, number>>((acc, t) => {
        acc[t.emotion] = (acc[t.emotion] || 0) + 1;
        return acc;
    }, {});

    const sortedBaselines = Object.entries(baselineCounts).sort((a, b) => b[1] - a[1]);
    const primaryState = sortedBaselines[0]?.[0] || 'neutral';

    return (
        <div className="animate-fade-in-up pb-24 max-w-5xl mx-auto">
            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-teal mb-2">
                        <Microscope size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Analytical Engine</span>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-off-white">Laboratory Insights</h1>
                    <p className="text-slate-light font-medium">Behavioral data refined into structural performance metrics.</p>
                </div>
                <div className="px-6 py-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-4">
                    <div className="flex flex-col gap-0.5">
                        <span className="text-[9px] font-bold text-slate-mid uppercase tracking-widest leading-none">Dataset</span>
                        <span className="text-sm font-bold text-muted-teal leading-none">ALL SESSIONS</span>
                    </div>
                </div>
            </div>

            {/* --- PRIMARY METRIC MESH --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="card-elevated group p-8 border-white/10">
                    <span className="text-[10px] font-bold text-slate-mid uppercase tracking-[0.2em] block mb-4">Adherence Rate</span>
                    <div className="flex items-center gap-4">
                        <div className="text-4xl font-bold text-off-white tracking-tighter group-hover:text-muted-teal transition-colors">{adherenceRate}%</div>
                        <TrendingUp size={24} strokeWidth={1.4} className="text-muted-teal/40 group-hover:text-muted-teal transition-colors" />
                    </div>
                    <div className="w-12 h-1 bg-muted-teal/20 rounded-full mt-6 group-hover:w-full transition-all duration-700" />
                </div>
                <div className="card-elevated group p-8 border-white/10">
                    <span className="text-[10px] font-bold text-slate-mid uppercase tracking-[0.2em] block mb-4">Consistency</span>
                    <div className="flex items-center gap-4">
                        <div className="text-4xl font-bold text-off-white tracking-tighter group-hover:text-blue-400 transition-colors">{analytics.consistencyDays}</div>
                        <BarChart3 size={24} strokeWidth={1.4} className="text-blue-400/40 group-hover:text-blue-400 transition-colors" />
                    </div>
                    <p className="text-[10px] text-slate-mid font-bold tracking-widest uppercase mt-4">Consecutive Sessions</p>
                </div>
                <div className="card-elevated group p-8 border-white/10">
                    <span className="text-[10px] font-bold text-slate-mid uppercase tracking-[0.2em] block mb-4">Behavioral Trend</span>
                    <div className="flex items-center gap-4">
                        <div className="text-4xl font-bold text-off-white tracking-tighter group-hover:text-muted-teal transition-colors capitalize">{analytics.behavioralTrend}</div>
                        <Microscope size={24} strokeWidth={1.4} className="text-muted-teal/40 group-hover:text-muted-teal transition-colors" />
                    </div>
                    <div className="w-12 h-1 bg-muted-teal/20 rounded-full mt-6 group-hover:w-full transition-all duration-700" />
                </div>
            </div>

            {/* --- DATA PANELS MESH --- */}
            <div className="flex flex-col gap-6">
                <AnalyticsPanel title="Weekly Behavioral Stability" defaultOpen={true}>
                    <div className="space-y-10">
                        <MiniBarChart data={analytics.weeklyStability} />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/5">
                            <div className="space-y-4">
                                <span className="text-[10px] font-bold text-slate-light uppercase tracking-[0.2em]">Statistical Analysis</span>
                                <div className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl">
                                    <p className="text-[14px] leading-relaxed text-slate-light font-medium italic">
                                        Average stability metric holds at <span className="text-muted-teal font-bold">{Math.round(analytics.weeklyStability.reduce((a, b) => a + b, 0) / analytics.weeklyStability.length)}%</span> across 7 observation points.
                                        {analytics.weeklyStability[6] > analytics.weeklyStability[0]
                                            ? ' Positive divergence in consistency noted.'
                                            : ' Mid-session deviation observed in protocol adherence.'}
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <span className="text-[10px] font-bold text-slate-light uppercase tracking-[0.2em]">Recovery Coefficient</span>
                                <div className="p-6 rounded-2xl bg-muted-teal/5 border border-muted-teal/10 flex items-center justify-between">
                                    <span className="text-sm font-bold text-off-white">Delta Magnitude</span>
                                    <span className="text-2xl font-bold text-muted-teal">+4.2 pts</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnalyticsPanel>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <AnalyticsPanel title="State Vector Distribution" defaultOpen={true}>
                        <div className="space-y-8">
                            <div className="space-y-5">
                                {Object.entries(baselineCounts).map(([state, count]) => (
                                    <div key={state} className="space-y-2">
                                        <div className="flex justify-between items-center px-1">
                                            <span className="text-[11px] font-bold text-slate-light uppercase tracking-widest">{state}</span>
                                            <span className="text-[11px] font-black text-off-white">{count} OBS</span>
                                        </div>
                                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(56,189,248,0.2)]"
                                                style={{
                                                    width: `${(count / totalTrades) * 100}%`,
                                                    backgroundColor: ['neutral', 'controlled'].includes(state)
                                                        ? 'var(--color-muted-teal)'
                                                        : state === 'uncertain'
                                                            ? 'var(--color-slate-mid)'
                                                            : 'var(--color-status-deviation)',
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                                <p className="text-xs leading-relaxed text-slate-mid font-medium uppercase tracking-wider text-center">
                                    Primary Vector: <span className="text-off-white font-bold">{primaryState}</span>
                                </p>
                            </div>
                        </div>
                    </AnalyticsPanel>

                    <div className="space-y-6">
                        <div className="card h-full relative overflow-hidden group">
                            <div className="absolute -right-4 -bottom-4 text-status-deviation/5 group-hover:text-status-deviation/10 transition-colors">
                                <AlertTriangle size={160} strokeWidth={1} />
                            </div>
                            <div className="relative space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-off-white">Primary Breach Pattern</h3>
                                    <div className="badge badge-deviation py-1 px-4 font-black text-[10px]">HIGH RISK</div>
                                </div>
                                <div className="p-4 rounded-xl bg-status-deviation/5 border border-status-deviation/15">
                                    <span className="text-sm font-bold text-status-deviation tracking-tight italic">
                                        {analytics.primaryDeviation}
                                    </span>
                                </div>
                                <p className="text-[13px] leading-relaxed text-slate-light font-medium">
                                    Pattern identified as the primary disruptor of behavioral stability. Implementation of a secondary protocol mesh is recommended during next session activation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <AnalyticsPanel title="Executive Data Mesh">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="p-8 rounded-[24px] bg-white/[0.02] border border-white/5 text-center group hover:bg-white/[0.04] transition-all">
                            <span className="block text-3xl font-bold text-off-white tracking-tighter mb-1">{totalTrades}</span>
                            <span className="text-[9px] font-bold text-slate-mid uppercase tracking-[0.2em] group-hover:text-muted-teal transition-colors">Executions</span>
                        </div>
                        <div className="p-8 rounded-[24px] bg-white/[0.02] border border-white/5 text-center group hover:bg-white/[0.04] transition-all">
                            <span className="block text-3xl font-bold text-off-white tracking-tighter mb-1">{rulesFollowed}</span>
                            <span className="text-[9px] font-bold text-slate-mid uppercase tracking-[0.2em] group-hover:text-muted-teal transition-colors">Intact Nodes</span>
                        </div>
                        <div className="p-8 rounded-[24px] bg-white/[0.02] border border-white/5 text-center group hover:bg-white/[0.04] transition-all">
                            <span className="block text-3xl font-bold text-off-white tracking-tighter mb-1">{totalTrades - rulesFollowed}</span>
                            <span className="text-[9px] font-bold text-slate-mid uppercase tracking-[0.2em] group-hover:text-status-deviation transition-colors">Breach Count</span>
                        </div>
                        <div className="p-8 rounded-[24px] bg-white/[0.02] border border-white/5 text-center group hover:bg-white/[0.04] transition-all">
                            <span className="block text-3xl font-bold text-off-white tracking-tighter mb-1">{observations.length}</span>
                            <span className="text-[9px] font-bold text-slate-mid uppercase tracking-[0.2em] group-hover:text-muted-teal transition-colors">Data Points</span>
                        </div>
                    </div>
                </AnalyticsPanel>
            </div>
        </div>
    );
}
