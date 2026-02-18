'use client';

import { useState } from 'react';
import { useRuleSysci } from '@/lib/context';
import {
  Shield,
  Activity,
  CircleDot,
  Lock,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
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
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-[13px] text-slate-light mb-1 tracking-wide">{dateStr}</p>
          <h1 className="text-[28px] font-medium tracking-tight text-off-white">Session Overview</h1>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-muted-teal/5 border border-muted-teal/10 rounded-full text-[13px] text-muted-teal">
          <span>{analytics.consistencyDays} days consistent</span>
        </div>
      </div>

      {/* Primary Observation Card */}
      <div className="card-focus mb-8 flex flex-col gap-8">
        <div className="flex items-center gap-12 md:flex-row flex-col text-center md:text-left">
          <StabilityMeter score={session.stabilityScore} />

          <div className="flex-1 flex flex-col gap-6 w-full">
            {/* Emotional Baseline */}
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center justify-center md:justify-start gap-1.5 text-xs text-slate-light uppercase tracking-wider font-medium">
                <CircleDot size={14} strokeWidth={1.6} /> Baseline State
              </label>
              <div className="relative">
                <button
                  className="flex items-center gap-1.5 text-[15px] font-medium transition-fast hover:opacity-80"
                  onClick={() => setShowBaselinePicker(!showBaselinePicker)}
                  style={{ color: currentBaseline?.color }}
                >
                  {currentBaseline?.label}
                  <ChevronDown size={14} />
                </button>
                {showBaselinePicker && (
                  <div className="absolute top-full left-0 mt-1 bg-slate-mid rounded-md p-1 min-width-[160px] shadow-lg z-10 border border-white/5 animate-fade-in">
                    {baselines.map((bl) => (
                      <button
                        key={bl.key}
                        className={`block w-full text-left px-3 py-2 text-sm rounded transition-fast hover:bg-white/5 ${session.emotionalBaseline === bl.key ? 'bg-muted-teal/10' : ''
                          }`}
                        onClick={() => {
                          setEmotionalBaseline(bl.key);
                          setShowBaselinePicker(false);
                        }}
                        style={{ color: bl.color }}
                      >
                        {bl.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Rules Status */}
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center justify-center md:justify-start gap-1.5 text-xs text-slate-light uppercase tracking-wider font-medium">
                <Lock size={14} strokeWidth={1.6} /> Rule Framework
              </label>
              <div className="flex items-center justify-center md:justify-start">
                {session.rulesLocked ? (
                  <span className="badge badge-calm">
                    <Shield size={12} /> Locked
                  </span>
                ) : (
                  <span className="badge badge-caution">
                    <AlertTriangle size={12} /> Unlocked
                  </span>
                )}
              </div>
            </div>

            {/* Trades */}
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center justify-center md:justify-start gap-1.5 text-xs text-slate-light uppercase tracking-wider font-medium">
                <Activity size={14} strokeWidth={1.6} /> Execution Count
              </label>
              <div className="flex flex-col gap-1.5">
                <span className="text-lg font-medium text-off-white">
                  {session.tradesTaken}
                  <span className="text-sm text-slate-light font-normal"> / {session.tradesAllowed}</span>
                </span>
                <div className="w-full max-w-[200px] h-1 bg-white/5 rounded overflow-hidden mx-auto md:mx-0">
                  <div
                    className="h-full transition-all duration-500"
                    style={{
                      width: `${(session.tradesTaken / session.tradesAllowed) * 100}%`,
                      backgroundColor: session.tradesTaken >= session.tradesAllowed
                        ? 'var(--color-status-deviation)'
                        : 'var(--color-muted-teal)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pre-session check */}
        {!session.preSessionComplete && (
          <div className="mt-4 pt-6 border-t border-white/5 flex items-center justify-between md:flex-row flex-col gap-4">
            <p className="text-sm text-mist-gray">Pre-session behavioral check-in required.</p>
            <button
              className="bg-muted-teal text-off-white px-5 py-2.5 rounded-md text-sm font-medium transition-fast hover:bg-[#248f82] hover:-translate-y-px shadow-[0_4px_16px_rgba(42,157,143,0.25)] flex items-center gap-2"
              onClick={completePreSession}
            >
              <CheckCircle2 size={16} /> Confirm Readiness
            </button>
          </div>
        )}
      </div>

      {/* Behavioral Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="card flex flex-col gap-1 items-center justify-center py-6">
          <span className="text-[11px] uppercase tracking-wider text-slate-light font-medium">Rule Adherence</span>
          <span className="text-2xl font-semibold text-off-white">{analytics.ruleAdherence}%</span>
          <span className="text-[11px] text-slate-light">7-day average</span>
        </div>
        <div className="card flex flex-col gap-1 items-center justify-center py-6">
          <span className="text-[11px] uppercase tracking-wider text-slate-light font-medium">Avg Executions</span>
          <span className="text-2xl font-semibold text-off-white">{analytics.avgTradesPerDay}</span>
          <span className="text-[11px] text-slate-light">Per session</span>
        </div>
        <div className="card flex flex-col gap-1 items-center justify-center py-6">
          <span className="text-[11px] uppercase tracking-wider text-slate-light font-medium">Behavioral Trend</span>
          <span className="text-2xl font-semibold text-off-white capitalize">{analytics.behavioralTrend}</span>
          <span className="text-[11px] text-slate-light">Week over week</span>
        </div>
        <div className="card flex flex-col gap-1 items-center justify-center py-6">
          <span className="text-[11px] uppercase tracking-wider text-slate-light font-medium">Primary Deviation</span>
          <span className="text-[15px] font-medium text-soft-amber text-center px-2">{analytics.primaryDeviation}</span>
          <span className="text-[11px] text-slate-light">Most observed</span>
        </div>
      </div>

      {/* Rule deviations */}
      {violatedRules.length > 0 && (
        <div className="card border-status-deviation/20 bg-status-deviation/[0.04]">
          <h3 className="flex items-center gap-2 text-off-white font-medium mb-4">
            <AlertTriangle size={18} className="text-soft-amber" />
            Rule Deviations Observed
          </h3>
          <div className="flex flex-col gap-2">
            {violatedRules.map((r) => (
              <div key={r.id}>
                <span className="badge badge-deviation">{r.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
