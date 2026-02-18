'use client';

import { useState } from 'react';
import { useRuleSysci } from '@/lib/context';
import {
    PenLine,
    X,
    Plus,
    Calendar,
    Microscope,
} from 'lucide-react';
import { Observation } from '@/types/trading';

const states = [
    { key: 'controlled', label: 'Controlled' },
    { key: 'analytical', label: 'Analytical' },
    { key: 'reactive', label: 'Reactive' },
    { key: 'uncertain', label: 'Uncertain' },
    { key: 'aware', label: 'Aware' },
    { key: 'structured', label: 'Structured' },
];

export default function ObservePage() {
    const { observations, addObservation } = useRuleSysci();
    const [writing, setWriting] = useState(false);
    const [form, setForm] = useState<Omit<Observation, 'id' | 'date'>>({
        title: '',
        content: '',
        state: 'analytical',
    });

    const handleSubmit = () => {
        if (!form.content.trim()) return;

        addObservation({
            id: Date.now(),
            date: new Date().toISOString().split('T')[0],
            ...form,
        } as Observation);

        setForm({ title: '', content: '', state: 'analytical' });
        setWriting(false);
    };

    const startWriting = () => setWriting(true);
    const cancelWriting = () => {
        setWriting(false);
        setForm({ title: '', content: '', state: 'analytical' });
    };

    // Full-screen observation mode
    if (writing) {
        return (
            <div className="fixed inset-0 bg-[#020617] z-[200] flex flex-col p-10 animate-fade-in font-sans overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(56,189,248,0.05)_0%,_transparent_50%)] pointer-events-none" />

                <div className="flex items-center justify-between pb-8 border-b border-white/5 relative z-10">
                    <div className="flex items-center gap-6">
                        <div className="px-6 py-2.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
                            <span className="text-[10px] font-bold text-slate-mid uppercase tracking-[0.2em]">Vector:</span>
                            <select
                                className="bg-transparent text-sm font-bold text-muted-teal outline-none cursor-pointer appearance-none pr-4"
                                value={form.state}
                                onChange={(e) => setForm({ ...form, state: e.target.value })}
                            >
                                {states.map((s) => (
                                    <option key={s.key} value={s.key} className="bg-deep-navy">{s.label.toUpperCase()}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            className="px-6 py-3 rounded-xl text-sm font-bold text-slate-mid hover:text-white transition-all flex items-center gap-2 group"
                            onClick={cancelWriting}
                        >
                            <X size={18} className="group-hover:rotate-90 transition-transform" /> DISCARD SAMPLE
                        </button>
                        <button
                            className="bg-muted-teal text-white shadow-[0_10px_30px_rgba(56,189,248,0.25)] px-8 py-3 rounded-2xl text-sm font-bold transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
                            onClick={handleSubmit}
                        >
                            <PenLine size={18} /> SYNCHRONIZE
                        </button>
                    </div>
                </div>

                <div className="flex-1 max-w-4xl mx-auto w-full py-24 flex flex-col relative z-10 overflow-y-auto custom-scrollbar">
                    <input
                        className="text-5xl font-black text-white border-none bg-transparent outline-none mb-12 tracking-tighter placeholder:text-white/10"
                        type="text"
                        placeholder="OBSERVATION TITLE"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        autoFocus
                    />
                    <textarea
                        className="flex-1 text-xl leading-[1.8] text-slate-light border-none bg-transparent outline-none resize-none placeholder:text-slate-mid/30 font-medium"
                        placeholder="Begin recording behavioral data points. Analyze the trigger logic, psychological ripples, and structural adherence during this cycle..."
                        value={form.content}
                        onChange={(e) => setForm({ ...form, content: e.target.value })}
                    />
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-white/5 relative z-10">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-mid uppercase tracking-widest">
                            <div className="w-2 h-2 rounded-full bg-muted-teal animate-pulse" />
                            Live Telemetry Active
                        </div>
                    </div>
                    <div className="text-[10px] font-black text-slate-mid uppercase tracking-[0.4em]">
                        {form.content.split(/\s+/).filter(Boolean).length} WORDS ENCRYPTED
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in-up pb-20 max-w-4xl mx-auto">
            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-teal mb-2">
                        <Microscope size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Behavioral Lab</span>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-off-white">Observation Chamber</h1>
                    <p className="text-slate-light font-medium">Capture raw behavioral state data with surgical precision.</p>
                </div>
                <button
                    className="bg-muted-teal text-white shadow-[0_10px_30px_rgba(56,189,248,0.25)] px-8 py-3.5 rounded-2xl text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-3 group"
                    onClick={startWriting}
                >
                    <Plus size={18} className="group-hover:rotate-90 transition-transform" /> NEW RECORD
                </button>
            </div>

            {/* --- DAILY INQUIRY MESH --- */}
            <div className="card-elevated border-muted-teal/20 bg-muted-teal/[0.02] p-10 mb-12 flex items-start gap-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 text-muted-teal/5 group-hover:text-muted-teal/10 transition-colors">
                    <Microscope size={100} strokeWidth={1} />
                </div>
                <div className="relative space-y-4">
                    <div className="badge badge-calm py-1 px-4 font-black text-[10px] tracking-widest">DAILY HYPOTHESIS</div>
                    <p className="text-2xl italic text-off-white leading-relaxed font-bold tracking-tight">
                        "What behavioral pattern am I repeating? Is it structural or reactive?"
                    </p>
                </div>
            </div>

            {/* --- OBSERVATION LOG MESH --- */}
            <div className="grid grid-cols-1 gap-6">
                {observations.length === 0 ? (
                    <div className="card-elevated border-white/5 py-32 text-center">
                        <div className="w-20 h-20 bg-white/[0.02] border border-white/5 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-mid">
                            <PenLine size={32} strokeWidth={1} />
                        </div>
                        <h4 className="text-xl font-bold text-off-white mb-2">No observation logs initiated.</h4>
                        <p className="text-slate-mid text-sm">Protocol requires manual entry of behavioral data points.</p>
                    </div>
                ) : (
                    observations.map((obs) => (
                        <div key={obs.id} className="card-elevated border-white/5 p-10 group hover:border-muted-teal/30 hover:bg-white/[0.01] transition-all duration-500">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-slate-mid">
                                        <Calendar size={16} />
                                    </div>
                                    <span className="text-[12px] font-bold text-slate-light uppercase tracking-widest">
                                        {formatDate(obs.date)}
                                    </span>
                                </div>
                                <div className="badge badge-neutral py-1.5 px-5 font-black text-[10px] tracking-[0.2em] transition-all group-hover:bg-muted-teal group-hover:text-white border-white/10 group-hover:border-muted-teal">
                                    {obs.state.toUpperCase()}
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-off-white tracking-tight mb-4 group-hover:text-white transition-colors">
                                {obs.title || "UNTITLED LOG"}
                            </h3>
                            <p className="text-[16px] leading-[1.8] text-slate-light font-medium line-clamp-3">
                                {obs.content}
                            </p>
                            <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                                <span className="text-[10px] font-bold text-slate-mid uppercase tracking-[0.3em]">Protocol Log ID: {obs.id}</span>
                                <button className="text-muted-teal text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">View Deep File</button>
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
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

