'use client';

import { useState } from 'react';
import { useRuleSysci } from '@/lib/context';
import {
    Plus,
    X,
    CheckCircle2,
    AlertTriangle,
    ArrowUpRight,
    ArrowDownRight,
} from 'lucide-react';
import { BaselineState, Trade } from '@/types/trading';

const baselineOptions: BaselineState[] = ['controlled', 'neutral', 'elevated', 'reactive', 'uncertain'];

export default function TradeLogPage() {
    const { trades, addTrade, session } = useRuleSysci();
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState<Omit<Trade, 'id' | 'date'>>({
        pair: '',
        type: 'Long',
        entry: '',
        exit: '',
        followedRules: true,
        emotion: 'neutral',
        notes: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.pair || !form.entry) return;

        addTrade({
            id: Date.now(),
            date: session.date,
            ...form,
        } as Trade);

        setForm({
            pair: '',
            type: 'Long',
            entry: '',
            exit: '',
            followedRules: true,
            emotion: 'neutral',
            notes: '',
        });
        setShowForm(false);
    };

    // Group trades by date
    const grouped = trades.reduce<Record<string, Trade[]>>((acc, trade) => {
        if (!acc[trade.date]) acc[trade.date] = [];
        acc[trade.date].push(trade);
        return acc;
    }, {});

    return (
        <div className="animate-fade-in-up pb-20">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-[28px] font-medium tracking-tight text-off-white">Trade Log</h1>
                    <p className="text-sm text-slate-light">Behavioral observation record.</p>
                </div>
                <button
                    className="bg-muted-teal text-off-white px-4 py-2 rounded-md text-sm font-medium transition-fast hover:bg-[#248f82] flex items-center gap-2"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? <X size={16} /> : <Plus size={16} />}
                    {showForm ? 'Cancel' : 'Log Execution'}
                </button>
            </div>

            {/* New Trade Form */}
            {showForm && (
                <form className="card-elevated mb-8 animate-fade-in-up" onSubmit={handleSubmit}>
                    <h3 className="text-lg font-medium text-off-white mb-6">Record Execution</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-medium text-slate-light uppercase tracking-wider">Instrument</label>
                            <input
                                className="bg-deep-navy border border-white/8 rounded-md px-4 py-2 text-sm text-off-white outline-none focus:border-muted-teal/50 transition-fast"
                                type="text"
                                placeholder="e.g. EUR/USD"
                                value={form.pair}
                                onChange={(e) => setForm({ ...form, pair: e.target.value })}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-medium text-slate-light uppercase tracking-wider">Direction</label>
                            <div className="flex bg-deep-navy border border-white/8 rounded-md p-1">
                                <button
                                    type="button"
                                    className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded text-sm transition-fast ${form.type === 'Long' ? 'bg-muted-teal/10 text-muted-teal' : 'text-slate-light'
                                        }`}
                                    onClick={() => setForm({ ...form, type: 'Long' })}
                                >
                                    <ArrowUpRight size={14} /> Long
                                </button>
                                <button
                                    type="button"
                                    className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded text-sm transition-fast ${form.type === 'Short' ? 'bg-status-deviation/10 text-status-deviation' : 'text-slate-light'
                                        }`}
                                    onClick={() => setForm({ ...form, type: 'Short' })}
                                >
                                    <ArrowDownRight size={14} /> Short
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-medium text-slate-light uppercase tracking-wider">Entry Level</label>
                            <input
                                className="bg-deep-navy border border-white/8 rounded-md px-4 py-2 text-sm text-off-white outline-none focus:border-muted-teal/50 transition-fast"
                                type="text"
                                placeholder="Entry"
                                value={form.entry}
                                onChange={(e) => setForm({ ...form, entry: e.target.value })}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-medium text-slate-light uppercase tracking-wider">Exit Level</label>
                            <input
                                className="bg-deep-navy border border-white/8 rounded-md px-4 py-2 text-sm text-off-white outline-none focus:border-muted-teal/50 transition-fast"
                                type="text"
                                placeholder="Exit"
                                value={form.exit}
                                onChange={(e) => setForm({ ...form, exit: e.target.value })}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-medium text-slate-light uppercase tracking-wider">Baseline State</label>
                            <select
                                className="bg-deep-navy border border-white/8 rounded-md px-4 py-2 text-sm text-off-white outline-none focus:border-muted-teal/50 transition-fast appearance-none cursor-pointer"
                                value={form.emotion}
                                onChange={(e) => setForm({ ...form, emotion: e.target.value as BaselineState })}
                            >
                                {baselineOptions.map((em) => (
                                    <option key={em} value={em}>{em.charAt(0).toUpperCase() + em.slice(1)}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-medium text-slate-light uppercase tracking-wider">Rules Adherence</label>
                            <div className="flex bg-deep-navy border border-white/8 rounded-md p-1">
                                <button
                                    type="button"
                                    className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded text-sm transition-fast ${form.followedRules ? 'bg-muted-teal/10 text-muted-teal' : 'text-slate-light'
                                        }`}
                                    onClick={() => setForm({ ...form, followedRules: true })}
                                >
                                    <CheckCircle2 size={14} /> Adhered
                                </button>
                                <button
                                    type="button"
                                    className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded text-sm transition-fast ${!form.followedRules ? 'bg-status-deviation/10 text-status-deviation' : 'text-slate-light'
                                        }`}
                                    onClick={() => setForm({ ...form, followedRules: false })}
                                >
                                    <AlertTriangle size={14} /> Deviated
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 mb-8">
                        <label className="text-xs font-medium text-slate-light uppercase tracking-wider">Behavioral Notes</label>
                        <textarea
                            className="bg-deep-navy border border-white/8 rounded-md px-4 py-2 text-sm text-off-white outline-none focus:border-muted-teal/50 transition-fast min-h-[100px] resize-none"
                            placeholder="Describe the observation. What triggered the entry? What was the behavioral state?"
                            value={form.notes}
                            onChange={(e) => setForm({ ...form, notes: e.target.value })}
                        />
                    </div>

                    <div className="flex justify-end">
                        <button type="submit" className="bg-muted-teal text-off-white px-6 py-2.5 rounded-md text-sm font-medium transition-fast hover:bg-[#248f82] flex items-center gap-2">
                            <CheckCircle2 size={16} /> Record
                        </button>
                    </div>
                </form>
            )}

            {/* Trade List */}
            <div className="flex flex-col gap-10">
                {Object.entries(grouped).map(([date, dateTrades]) => (
                    <div key={date} className="flex flex-col gap-4">
                        <h4 className="text-[13px] font-medium text-slate-light uppercase tracking-wide px-1">
                            {formatDate(date)}
                        </h4>
                        <div className="grid grid-cols-1 gap-4">
                            {dateTrades.map((trade) => (
                                <div key={trade.id} className="card p-6 flex flex-col gap-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <span className="text-lg font-semibold text-off-white">{trade.pair}</span>
                                            <span className={`flex items-center gap-1.5 text-[15px] font-medium ${trade.type === 'Long' ? 'text-muted-teal' : 'text-status-deviation'
                                                }`}>
                                                {trade.type === 'Long' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                                {trade.type}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {trade.followedRules ? (
                                                <span className="badge badge-calm">
                                                    <CheckCircle2 size={12} /> Adhered
                                                </span>
                                            ) : (
                                                <span className="badge badge-deviation">
                                                    <AlertTriangle size={12} /> Deviated
                                                </span>
                                            )}
                                            <span className="badge badge-neutral capitalize">{trade.emotion}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-8 text-[15px] text-mist-gray">
                                        <span>Entry: <strong className="text-off-white font-medium">{trade.entry}</strong></span>
                                        <span>Exit: <strong className="text-off-white font-medium">{trade.exit}</strong></span>
                                    </div>
                                    {trade.notes && (
                                        <p className="text-sm text-slate-light leading-relaxed border-t border-white/4 pt-4 mt-1 italic">
                                            "{trade.notes}"
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function formatDate(dateStr: string) {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
    });
}
