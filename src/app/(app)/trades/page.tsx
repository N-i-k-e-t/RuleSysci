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
    TrendingUp,
    TrendingDown,
    Database,
    Shield,
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
        <div className="animate-fade-in-up pb-20 max-w-5xl mx-auto">
            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-teal mb-2">
                        <TrendingUp size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Execution Mesh</span>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-off-white">Trade Protocol Lab</h1>
                    <p className="text-slate-light font-medium">Record and analyze raw execution data with structural integrity.</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className={`px-8 py-3.5 rounded-2xl font-bold text-sm transition-all flex items-center gap-3 group ${showForm
                        ? 'bg-white/[0.03] border border-white/10 text-off-white hover:bg-white/[0.08]'
                        : 'bg-muted-teal text-white shadow-[0_10px_30px_rgba(56,189,248,0.25)] hover:scale-[1.02] active:scale-[0.98]'
                        }`}
                >
                    {showForm ? <X size={18} /> : <Plus size={18} className="group-hover:rotate-90 transition-transform" />}
                    {showForm ? 'CANCEL ENTRY' : 'NEW EXECUTION'}
                </button>
            </div>

            {/* --- NEW TRADE FORM MESH --- */}
            {showForm && (
                <form
                    className="card-elevated border-white/10 p-10 mb-12 animate-fade-in-up relative overflow-hidden"
                    onSubmit={handleSubmit}
                >
                    <div className="absolute top-0 right-0 p-12 text-muted-teal/5 pointer-events-none">
                        <Plus size={120} strokeWidth={1} />
                    </div>

                    <div className="relative space-y-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-muted-teal/10 rounded-lg">
                                <Plus size={20} className="text-muted-teal" />
                            </div>
                            <h3 className="text-xl font-bold text-off-white">Record Protocol Entry</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-slate-mid uppercase tracking-[0.2em]">Instrument Pair</label>
                                <input
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-off-white focus:border-muted-teal/50 outline-none transition-all font-bold placeholder:text-slate-mid text-sm"
                                    type="text"
                                    placeholder="e.g. BTC/USD"
                                    required
                                    value={form.pair}
                                    onChange={(e) => setForm({ ...form, pair: e.target.value.toUpperCase() })}
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-slate-mid uppercase tracking-[0.2em]">Vector Position</label>
                                <div className="grid grid-cols-2 gap-2 bg-white/[0.02] border border-white/5 rounded-2xl p-1.5">
                                    <button
                                        type="button"
                                        className={`py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all ${form.type === 'Long'
                                            ? 'bg-muted-teal text-white shadow-lg'
                                            : 'text-slate-mid hover:text-slate-light'
                                            }`}
                                        onClick={() => setForm({ ...form, type: 'Long' })}
                                    >
                                        Long
                                    </button>
                                    <button
                                        type="button"
                                        className={`py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all ${form.type === 'Short'
                                            ? 'bg-status-deviation text-white shadow-lg'
                                            : 'text-slate-mid hover:text-slate-light'
                                            }`}
                                        onClick={() => setForm({ ...form, type: 'Short' })}
                                    >
                                        Short
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-slate-mid uppercase tracking-[0.2em]">Entry Level</label>
                                <input
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-off-white focus:border-muted-teal/50 outline-none transition-all font-bold placeholder:text-slate-mid text-sm"
                                    type="text"
                                    placeholder="0.0000"
                                    required
                                    value={form.entry}
                                    onChange={(e) => setForm({ ...form, entry: e.target.value })}
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-slate-mid uppercase tracking-[0.2em]">Exit Level</label>
                                <input
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-off-white focus:border-muted-teal/50 outline-none transition-all font-bold placeholder:text-slate-mid text-sm"
                                    type="text"
                                    placeholder="0.0000"
                                    value={form.exit}
                                    onChange={(e) => setForm({ ...form, exit: e.target.value })}
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-slate-mid uppercase tracking-[0.2em]">Baseline State</label>
                                <div className="grid grid-cols-5 gap-1.5">
                                    {baselineOptions.map((em) => (
                                        <button
                                            key={em}
                                            type="button"
                                            className={`py-3 rounded-xl text-[9px] font-bold uppercase tracking-tighter border transition-all ${form.emotion === em
                                                ? 'bg-muted-teal border-muted-teal text-white'
                                                : 'bg-white/[0.02] border-white/5 text-slate-mid hover:text-slate-light'
                                                }`}
                                            onClick={() => setForm({ ...form, emotion: em })}
                                        >
                                            {em}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-slate-mid uppercase tracking-[0.2em]">Protocol Adherence</label>
                                <div className="grid grid-cols-2 gap-2 bg-white/[0.02] border border-white/5 rounded-2xl p-1.5">
                                    <button
                                        type="button"
                                        className={`py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all ${form.followedRules
                                            ? 'bg-muted-teal text-white'
                                            : 'text-slate-mid hover:text-slate-light'
                                            }`}
                                        onClick={() => setForm({ ...form, followedRules: true })}
                                    >
                                        Adhered
                                    </button>
                                    <button
                                        type="button"
                                        className={`py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all ${!form.followedRules
                                            ? 'bg-status-deviation text-white'
                                            : 'text-slate-mid hover:text-slate-light'
                                            }`}
                                        onClick={() => setForm({ ...form, followedRules: false })}
                                    >
                                        Deviated
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-slate-mid uppercase tracking-[0.2em]">Execution Notes</label>
                            <textarea
                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-off-white focus:border-muted-teal/50 outline-none transition-all font-medium placeholder:text-slate-mid text-sm min-h-[120px] resize-none"
                                placeholder="Describe the trigger logic and psychological state during execution..."
                                value={form.notes}
                                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                            />
                        </div>

                        <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                            <p className="text-[10px] text-slate-mid uppercase tracking-widest font-bold">Encrypted Session Validation</p>
                            <button
                                type="submit"
                                className="px-12 py-4 bg-gradient-to-r from-muted-teal to-blue-600 text-white font-bold text-sm rounded-2xl shadow-[0_15px_40px_rgba(56,189,248,0.3)] hover:scale-[1.05] active:scale-[0.98] transition-all"
                            >
                                SYNCHRONIZE DATA
                            </button>
                        </div>
                    </div>
                </form>
            )}

            {/* --- TRADE LIST MESH --- */}
            <div className="space-y-12">
                {Object.entries(grouped).length === 0 ? (
                    <div className="card-elevated border-white/5 py-32 text-center">
                        <div className="w-20 h-20 bg-white/[0.02] border border-white/5 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-mid">
                            <Database size={32} strokeWidth={1} />
                        </div>
                        <h4 className="text-xl font-bold text-off-white mb-2">No execution samples found.</h4>
                        <p className="text-slate-mid text-sm">Initialization of first protocol entry required to start tracking.</p>
                    </div>
                ) : (
                    Object.entries(grouped).map(([date, dateTrades]) => (
                        <div key={date} className="animate-fade-in">
                            <div className="flex items-center gap-4 mb-8 px-2">
                                <h4 className="text-[12px] font-bold text-slate-light uppercase tracking-[0.4em]">
                                    {formatDate(date)}
                                </h4>
                                <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {dateTrades.map((trade) => (
                                    <div key={trade.id} className="card-elevated border-white/5 p-8 group hover:border-muted-teal/30 transition-all duration-500 bg-white/[0.01]">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                            <div className="flex items-center gap-8">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-bold text-slate-mid uppercase tracking-widest mb-1">Instrument</span>
                                                    <span className="text-2xl font-bold text-off-white">{trade.pair}</span>
                                                </div>

                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-bold text-slate-mid uppercase tracking-widest mb-1">Vector</span>
                                                    <span className={`text-[15px] font-bold uppercase tracking-widest flex items-center gap-2 ${trade.type === 'Long' ? 'text-muted-teal' : 'text-status-deviation'
                                                        }`}>
                                                        {trade.type === 'Long' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                                                        {trade.type}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                {trade.followedRules ? (
                                                    <div className="badge badge-calm py-2 px-5 font-bold flex items-center gap-2">
                                                        <Shield size={14} /> ADHERED
                                                    </div>
                                                ) : (
                                                    <div className="badge badge-deviation py-2 px-5 font-bold flex items-center gap-2">
                                                        <AlertTriangle size={14} /> DEVIATED
                                                    </div>
                                                )}
                                                <div className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-[11px] font-bold text-slate-light uppercase tracking-widest">
                                                    {trade.emotion}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10 pt-8 border-t border-white/5">
                                            <div>
                                                <span className="text-[9px] font-bold text-slate-mid uppercase tracking-wider block mb-1">Entry level</span>
                                                <span className="text-base font-bold text-off-white">{trade.entry}</span>
                                            </div>
                                            <div>
                                                <span className="text-[9px] font-bold text-slate-mid uppercase tracking-wider block mb-1">Exit level</span>
                                                <span className="text-base font-bold text-off-white">{trade.exit || '--'}</span>
                                            </div>
                                            <div className="col-span-2">
                                                <span className="text-[9px] font-bold text-slate-mid uppercase tracking-wider block mb-1">Laboratory Note</span>
                                                <p className="text-sm text-slate-light font-medium leading-relaxed italic truncate">
                                                    {trade.notes ? `"${trade.notes}"` : 'No protocol notes recorded.'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
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
