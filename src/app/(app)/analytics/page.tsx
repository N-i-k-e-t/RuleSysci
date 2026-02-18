'use client';

import { useState } from 'react';
import { useRuleSysci } from '@/lib/context';
import {
    TrendingUp,
    Microscope,
    BarChart3,
    ChevronDown,
    ChevronUp,
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
        <div className="animate-fade-in-up pb-24">
            <div className="mb-8">
                <h1 className="text-[28px] font-medium tracking-tight text-off-white">Analytics</h1>
                <p className="text-sm text-slate-light">Behavioral data. Collapsed by default. Expand what requires attention.</p>
            </div>

            {/* Primary Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="card flex items-center gap-4 p-6">
                    <TrendingUp size={20} strokeWidth={1.4} className="text-muted-teal" />
                    <div className="flex flex-col">
                        <span className="text-2xl font-semibold text-off-white leading-none">{analytics.consistencyDays}</span>
                        <span className="text-[11px] uppercase tracking-wider text-slate-light font-medium mt-1">Consistent Days</span>
                    </div>
                </div>
                <div className="card flex items-center gap-4 p-6">
                    <BarChart3 size={20} strokeWidth={1.4} className="text-muted-teal" />
                    <div className="flex flex-col">
                        <span className="text-2xl font-semibold text-off-white leading-none">{adherenceRate}%</span>
                        <span className="text-[11px] uppercase tracking-wider text-slate-light font-medium mt-1">Adherence Rate</span>
                    </div>
                </div>
                <div className="card flex items-center gap-4 p-6">
                    <Microscope size={20} strokeWidth={1.4} className="text-muted-teal" />
                    <div className="flex flex-col">
                        <span className="text-2xl font-semibold text-off-white leading-none capitalize">{analytics.behavioralTrend}</span>
                        <span className="text-[11px] uppercase tracking-wider text-slate-light font-medium mt-1">Behavioral Trend</span>
                    </div>
                </div>
            </div>

            {/* Collapsible Analytics Panels */}
            <div className="flex flex-col gap-4">
                <AnalyticsPanel title="Weekly Stability Score" defaultOpen={true}>
                    <MiniBarChart data={analytics.weeklyStability} />
                    <div className="bg-white/[0.02] rounded-md p-4 mt-4">
                        <p className="text-[13.5px] leading-relaxed text-mist-gray">
                            Average stability:{' '}
                            <strong className="text-off-white font-medium">
                                {Math.round(
                                    analytics.weeklyStability.reduce((a, b) => a + b, 0) /
                                    analytics.weeklyStability.length
                                )}%
                            </strong>{' '}
                            across 7 sessions.{' '}
                            {analytics.weeklyStability[6] > analytics.weeklyStability[0]
                                ? 'Observation: stability increased through the week. Structure held under repeated exposure.'
                                : 'Observation: stability decreased mid-week. Examine environmental or behavioral triggers.'}
                        </p>
                    </div>
                </AnalyticsPanel>

                <AnalyticsPanel title="Baseline State Distribution">
                    <div className="flex flex-col gap-4 mb-6">
                        {Object.entries(baselineCounts).map(([state, count]) => (
                            <div key={state} className="flex items-center gap-4">
                                <span className="text-[13px] text-off-white capitalize w-20 flex-shrink-0">{state}</span>
                                <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full transition-all duration-1000 ease-out"
                                        style={{
                                            width: `${(count / totalTrades) * 100}%`,
                                            backgroundColor: ['neutral', 'controlled'].includes(state)
                                                ? 'var(--color-muted-teal)'
                                                : state === 'uncertain'
                                                    ? 'var(--color-mist-gray)'
                                                    : 'var(--color-soft-amber)',
                                        }}
                                    />
                                </div>
                                <span className="text-[12px] text-slate-light w-8 text-right">{count}</span>
                            </div>
                        ))}
                    </div>
                    <div className="bg-white/[0.02] rounded-md p-4">
                        <p className="text-[13.5px] leading-relaxed text-mist-gray">
                            Most frequent baseline state during execution:{' '}
                            <strong className="text-off-white font-medium capitalize">
                                {primaryState}
                            </strong>.
                            Correlation between baseline state and rule adherence can indicate behavioral triggers for further study.
                        </p>
                    </div>
                </AnalyticsPanel>

                <AnalyticsPanel title="Execution Meta Data">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white/2 rounded-md p-4 text-center">
                            <span className="block text-2xl font-semibold text-off-white leading-none mb-1">{totalTrades}</span>
                            <span className="text-[10px] uppercase tracking-wider text-slate-mid font-semibold">Executions</span>
                        </div>
                        <div className="bg-white/2 rounded-md p-4 text-center">
                            <span className="block text-2xl font-semibold text-off-white leading-none mb-1">{rulesFollowed}</span>
                            <span className="text-[10px] uppercase tracking-wider text-slate-mid font-semibold">Adherence</span>
                        </div>
                        <div className="bg-white/2 rounded-md p-4 text-center">
                            <span className="block text-2xl font-semibold text-off-white leading-none mb-1">{totalTrades - rulesFollowed}</span>
                            <span className="text-[10px] uppercase tracking-wider text-slate-mid font-semibold">Deviations</span>
                        </div>
                        <div className="bg-white/2 rounded-md p-4 text-center">
                            <span className="block text-2xl font-semibold text-off-white leading-none mb-1">{observations.length}</span>
                            <span className="text-[10px] uppercase tracking-wider text-slate-mid font-semibold">Observations</span>
                        </div>
                    </div>
                </AnalyticsPanel>

                <AnalyticsPanel title="Primary Deviation Pattern">
                    <div className="p-4 border border-status-deviation/10 bg-status-deviation/[0.02] rounded-lg">
                        <span className="badge badge-caution mb-3">{analytics.primaryDeviation}</span>
                        <p className="text-[13.5px] leading-relaxed text-mist-gray italic">
                            "This is the most frequently observed behavioral pattern preceding rule deviations. Consider implementing a structural intervention: a pre-execution checklist addressing this specific trigger to destabilize the habit loop."
                        </p>
                    </div>
                </AnalyticsPanel>
            </div>
        </div>
    );
}
