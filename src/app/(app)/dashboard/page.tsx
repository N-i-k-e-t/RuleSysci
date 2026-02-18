'use client';

import { useState } from 'react';
import { useRuleSysci } from '@/lib/context';
import Link from 'next/link';
import {
  Shield,
  Activity,
  CircleDot,
  Lock,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Zap,
  FlaskConical,
  Microscope,
} from 'lucide-react';
import { BaselineState } from '@/types/trading';

const baselines: { key: BaselineState; label: string; color: string }[] = [
  { key: 'controlled', label: 'Controlled', color: 'var(--color-muted-teal)' },
  { key: 'neutral', label: 'Neutral', color: 'var(--color-mist-gray)' },
  { key: 'elevated', label: 'Elevated', color: 'var(--color-soft-amber)' },
  { key: 'reactive', label: 'Reactive', color: 'var(--color-status-deviation)' },
  { key: 'uncertain', label: 'Uncertain', color: 'var(--color-slate-light)' },
];

function StabilityMeter({ score }: { score: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-32 h-32 flex-shrink-0">
      <svg width="128" height="128" viewBox="0 0 128 128">
        <circle
          cx="64" cy="64" r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="8"
        />
        <circle
          cx="64" cy="64" r={radius}
          fill="none"
          stroke="var(--color-muted-teal)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 64 64)"
          className="transition-[stroke-dashoffset] duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[28px] font-semibold text-off-white leading-none">{score}</span>
        <span className="text-[11px] text-muted-teal uppercase tracking-[0.1em] mt-1">Stability</span>
      </div>
    </div>
  );
}

export default function SessionPage() {
  const {
    session,
    rules,
    analytics,
    setEmotionalBaseline,
    completePreSession,
    labMode,
    setLabMode
  } = useRuleSysci();

  const [showBaselinePicker, setShowBaselinePicker] = useState(false);

  const violatedRules = rules.filter((r) => r.violated);
  const currentBaseline = baselines.find((b) => b.key === session.emotionalBaseline);

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="animate-fade-in-up pb-20">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-muted-teal mb-2">
            <Activity size={14} />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Protocol active</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-off-white">Laboratory Overview</h1>
          <p className="text-slate-light font-medium">{dateStr} • Behavioral Synchronization Active</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-5 py-2.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] font-bold text-slate-mid uppercase tracking-widest leading-none">Streak</span>
              <span className="text-sm font-bold text-muted-teal leading-none">{analytics.consistencyDays} DAYS</span>
            </div>
          </div>
          <button
            onClick={() => setLabMode(!labMode)}
            className="px-6 py-3 rounded-2xl bg-muted-teal text-white font-bold text-sm shadow-[0_10px_30px_rgba(56,189,248,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 group"
          >
            <FlaskConical size={18} className="group-hover:rotate-12 transition-transform" />
            OBSERVATION MODE
          </button>
        </div>
      </div>

      {/* --- PRIMARY METRIC MESH --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Stability Meter Card */}
        <div className="lg:col-span-2 relative">
          <div className="card-focus h-full flex items-center gap-12 flex-col md:flex-row shadow-[0_0_60px_rgba(56,189,248,0.05)] border-white/10">
            <div className="relative group">
              <div className="absolute inset-0 bg-muted-teal/10 blur-[80px] rounded-full group-hover:bg-muted-teal/20 transition-all" />
              <StabilityMeter score={session.stabilityScore} />
            </div>

            <div className="flex-1 space-y-8 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Baseline Selector */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-[10px] font-bold text-slate-light uppercase tracking-[0.2em]">
                    <CircleDot size={14} className="text-muted-teal" /> Baseline State
                  </label>
                  <div className="relative">
                    <button
                      className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-white/[0.02] border border-white/10 rounded-xl hover:bg-white/[0.05] transition-all group"
                      onClick={() => setShowBaselinePicker(!showBaselinePicker)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full shadow-[0_0_10px_currentColor]" style={{ backgroundColor: currentBaseline?.color, color: currentBaseline?.color }} />
                        <span className="text-[15px] font-bold text-off-white" style={{ color: currentBaseline?.color }}>
                          {currentBaseline?.label}
                        </span>
                      </div>
                      <ChevronDown size={14} className={`text-slate-mid transition-transform ${showBaselinePicker ? 'rotate-180' : ''}`} />
                    </button>

                    {showBaselinePicker && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-[#1e293b]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl z-50 animate-fade-in-up">
                        {baselines.map((bl) => (
                          <button
                            key={bl.key}
                            className={`flex items-center gap-3 w-full text-left px-4 py-3 text-sm font-bold rounded-xl transition-all hover:bg-white/5 ${session.emotionalBaseline === bl.key ? 'bg-muted-teal/10' : ''}`}
                            onClick={() => {
                              setEmotionalBaseline(bl.key);
                              setShowBaselinePicker(false);
                            }}
                          >
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: bl.color }} />
                            <span style={{ color: bl.color }}>{bl.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Session Progress */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-[10px] font-bold text-slate-light uppercase tracking-[0.2em]">
                    <Activity size={14} className="text-muted-teal" /> Session Progress
                  </label>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold text-off-white tracking-tight">
                        {session.tradesTaken} <span className="text-sm text-slate-mid font-medium italic">/ {session.tradesAllowed}</span>
                      </span>
                      <span className="text-[10px] font-bold text-slate-mid uppercase tracking-widest">Executions Recorded</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-muted-teal to-blue-500 rounded-full shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all duration-700"
                        style={{ width: `${(session.tradesTaken / session.tradesAllowed) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {!session.preSessionComplete ? (
                <button
                  className="w-full py-4 bg-muted-teal text-white font-bold text-sm tracking-widest hover:scale-[1.01] transition-all rounded-2xl shadow-[0_5px_20px_rgba(56,189,248,0.2)] flex items-center justify-center gap-2"
                  onClick={completePreSession}
                >
                  <CheckCircle2 size={18} /> CONFIRM PROTOCOL DATA
                </button>
              ) : (
                <div className="p-4 rounded-2xl bg-muted-teal/5 border border-muted-teal/10 flex items-center justify-center gap-3">
                  <Shield size={16} className="text-muted-teal" />
                  <span className="text-[11px] font-bold text-muted-teal uppercase tracking-[0.3em]">Protocol Framework: Active</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Status Card */}
        <div className="card-elevated space-y-8 flex flex-col justify-between border-white/10 bg-gradient-to-br from-cool-slate to-deep-navy">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-bold text-slate-light uppercase tracking-[0.3em]">Framework Status</h3>
              <div className="w-2 h-2 rounded-full bg-muted-teal animate-pulse" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="text-[9px] font-bold text-slate-mid uppercase tracking-wider">Adherence</span>
                <div className="text-2xl font-bold text-off-white">{analytics.ruleAdherence}%</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="text-[9px] font-bold text-slate-mid uppercase tracking-wider">Executions</span>
                <div className="text-2xl font-bold text-off-white">{analytics.avgTradesPerDay}</div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-light uppercase tracking-[0.2em]">Primary Deviation Trigger</span>
              <div className="p-4 rounded-2xl bg-status-deviation/5 border border-status-deviation/15 text-status-deviation font-bold text-sm tracking-tight flex items-center gap-3">
                <AlertTriangle size={16} />
                {analytics.primaryDeviation}
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-[10px] text-slate-mid leading-relaxed font-medium uppercase tracking-[0.1em]">
              Data synchronized with <br /> RuleSysci Global Protocol
            </p>
          </div>
        </div>
      </div>

      {/* --- GRID MESH CONTENT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Rule Integrity Section */}
        <div className="lg:col-span-3">
          <div className="card h-full space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-off-white flex items-center gap-3">
                <div className="p-2 bg-muted-teal/10 rounded-lg">
                  <Shield size={20} className="text-muted-teal" />
                </div>
                Rule Integrity
              </h3>
              <Link href="/rules" className="text-[10px] font-bold text-muted-teal hover:text-white transition-colors uppercase tracking-[0.2em]">Protocol Mesh</Link>
            </div>

            <div className="space-y-3">
              {rules.map((rule) => (
                <div
                  key={rule.id}
                  className={`p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${rule.violated
                    ? 'bg-status-deviation/5 border-status-deviation/20'
                    : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-1.5 h-1.5 rounded-full ${rule.violated ? 'bg-status-deviation shadow-[0_0_10px_rgba(244,63,94,0.5)]' : 'bg-muted-teal/40'}`} />
                    <span className={`text-[15px] font-medium transition-colors ${rule.violated ? 'text-status-deviation' : 'text-slate-light group-hover:text-off-white'}`}>
                      {rule.text}
                    </span>
                  </div>
                  <div className={`text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg ${rule.violated ? 'bg-status-deviation/10 text-status-deviation' : 'bg-white/5 text-slate-mid'}`}>
                    {rule.violated ? 'VIOLATED' : 'STABLE'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Behavioral Analytics Section */}
        <div className="lg:col-span-2">
          <div className="card h-full space-y-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted-teal/10 rounded-lg">
                <Microscope size={20} className="text-muted-teal" />
              </div>
              <h3 className="text-xl font-bold text-off-white">Neural Insights</h3>
            </div>

            <div className="space-y-10">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-bold text-slate-light uppercase tracking-[0.2em]">Session Trend</span>
                  <span className="text-sm font-bold text-muted-teal uppercase tracking-widest">{analytics.behavioralTrend}</span>
                </div>
                <div className="p-6 bg-muted-teal/5 border border-muted-teal/10 rounded-2xl">
                  <p className="text-sm text-slate-light leading-relaxed font-medium italic">
                    "Behavioral patterns indicate high stability during morning windows. Maintain protocol focus."
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <span className="text-[10px] font-bold text-slate-light uppercase tracking-[0.2em]">Laboratory Context</span>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-sm font-medium text-slate-light">Protocol Engine</span>
                    <span className="text-xs font-bold text-off-white">v.4.2.0-STABLE</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-sm font-medium text-slate-light">Sync Status</span>
                    <span className="text-xs font-bold text-muted-teal">FULLY SYNCED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
