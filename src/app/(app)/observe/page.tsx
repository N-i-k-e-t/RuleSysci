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
            <div className="fixed inset-0 bg-deep-navy z-[200] flex flex-col p-8 animate-fade-in">
                <div className="flex items-center justify-between pb-6 border-b border-white/4 flex-shrink-0">
                    <div className="flex items-center gap-4">
                        <select
                            className="bg-white/4 border border-white/8 rounded-md px-4 py-2 text-sm text-off-white outline-none cursor-pointer"
                            value={form.state}
                            onChange={(e) => setForm({ ...form, state: e.target.value })}
                        >
                            {states.map((s) => (
                                <option key={s.key} value={s.key} className="bg-cool-slate">{s.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 text-sm text-mist-gray hover:text-off-white transition-fast" onClick={cancelWriting}>
                            <X size={16} /> Discard
                        </button>
                        <button className="bg-muted-teal text-off-white px-5 py-2 rounded-md text-sm font-medium transition-fast hover:bg-[#248f82] flex items-center gap-2" onClick={handleSubmit}>
                            <PenLine size={16} /> Save Observation
                        </button>
                    </div>
                </div>

                <div className="flex-1 max-w-[720px] mx-auto w-full py-16 flex flex-col overflow-y-auto">
                    <input
                        className="text-[32px] font-medium text-off-white border-none bg-transparent outline-none mb-8 tracking-tight placeholder:text-slate-mid"
                        type="text"
                        placeholder="Observation title..."
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        autoFocus
                    />
                    <textarea
                        className="flex-1 text-lg leading-[1.9] text-mist-gray border-none bg-transparent outline-none resize-none placeholder:text-slate-mid"
                        placeholder="Record your behavioral observation. What patterns occurred? What triggered them? What was the behavioral state before, during, and after?"
                        value={form.content}
                        onChange={(e) => setForm({ ...form, content: e.target.value })}
                    />
                </div>

                <div className="text-center text-xs text-slate-mid py-4 flex-shrink-0">
                    {form.content.split(/\s+/).filter(Boolean).length} words
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in-up pb-20">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-[28px] font-medium tracking-tight text-off-white">Observe</h1>
                    <p className="text-sm text-slate-light">Structured behavioral observation. No judgment. Only data.</p>
                </div>
                <button
                    className="bg-muted-teal text-off-white px-4 py-2 rounded-md text-sm font-medium transition-fast hover:bg-[#248f82] flex items-center gap-2"
                    onClick={startWriting}
                >
                    <Plus size={16} /> New Observation
                </button>
            </div>

            {/* Observation Prompt */}
            <div className="card-focus mb-8 flex items-start gap-6">
                <Microscope size={24} strokeWidth={1.4} className="text-muted-teal mt-1" />
                <div className="flex flex-col gap-1.5">
                    <h3 className="text-[11px] uppercase tracking-[0.1em] text-muted-teal font-semibold">Today's Inquiry</h3>
                    <p className="text-[19px] italic text-off-white leading-relaxed font-medium">"What behavioral pattern am I repeating? Is it structural or reactive?"</p>
                </div>
            </div>

            {/* Past Observations */}
            <div className="grid grid-cols-1 gap-4">
                {observations.map((obs) => (
                    <div key={obs.id} className="card p-8 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-slate-light tracking-wide">
                                <Calendar size={14} strokeWidth={1.6} />
                                {formatDate(obs.date)}
                            </div>
                            <span className="badge badge-neutral capitalize">{obs.state}</span>
                        </div>
                        <h3 className="text-xl font-medium text-off-white tracking-tight">{obs.title}</h3>
                        <p className="text-[15px] leading-relaxed text-mist-gray">{obs.content}</p>
                    </div>
                ))}
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
