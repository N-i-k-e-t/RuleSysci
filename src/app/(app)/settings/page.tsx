'use client';

import { useState } from 'react';
import {
    User,
    Bell,
    Shield,
    Palette,
    Moon,
    Sun,
    Save,
} from 'lucide-react';

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        name: 'Trader',
        maxTrades: 3,
        sessionStart: '09:30',
        sessionEnd: '16:00',
        reminders: true,
        preSessionCheck: true,
        darkMode: true,
    });

    return (
        <div className="animate-fade-in-up pb-24 max-w-4xl mx-auto">
            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-teal mb-2">
                        <Palette size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Environment Config</span>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-off-white">Protocol Parameters</h1>
                    <p className="text-slate-light font-medium">Fine-tune behavioral parameters and system environment settings.</p>
                </div>
            </div>

            <div className="flex flex-col gap-6">
                {/* --- PROFILE MESH --- */}
                <div className="card-elevated border-white/5 p-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-muted-teal/10 rounded-lg">
                            <User size={18} className="text-muted-teal" />
                        </div>
                        <h3 className="text-xl font-bold text-off-white">Identity Matrix</h3>
                    </div>
                    <div className="flex flex-col gap-3 max-w-md">
                        <label className="text-[10px] font-bold text-slate-mid uppercase tracking-[0.2em]">User Identifier</label>
                        <input
                            className="bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-off-white font-bold outline-none focus:border-muted-teal/50 transition-all placeholder:text-slate-mid"
                            type="text"
                            value={settings.name}
                            onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                        />
                    </div>
                </div>

                {/* --- SESSION PARAMETERS MESH --- */}
                <div className="card-elevated border-white/5 p-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-muted-teal/10 rounded-lg">
                            <Shield size={18} className="text-muted-teal" />
                        </div>
                        <h3 className="text-xl font-bold text-off-white">Constraint Mesh</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-slate-mid uppercase tracking-[0.2em]">Max Executions</label>
                            <input
                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-off-white font-bold outline-none focus:border-muted-teal/50 transition-all"
                                type="number"
                                min="1"
                                max="20"
                                value={settings.maxTrades}
                                onChange={(e) => setSettings({ ...settings, maxTrades: Number(e.target.value) })}
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-slate-mid uppercase tracking-[0.2em]">Activation Window</label>
                            <input
                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-off-white font-bold outline-none focus:border-muted-teal/50 transition-all"
                                type="time"
                                value={settings.sessionStart}
                                onChange={(e) => setSettings({ ...settings, sessionStart: e.target.value })}
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-slate-mid uppercase tracking-[0.2em]">Termination Window</label>
                            <input
                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-off-white font-bold outline-none focus:border-muted-teal/50 transition-all"
                                type="time"
                                value={settings.sessionEnd}
                                onChange={(e) => setSettings({ ...settings, sessionEnd: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                {/* --- NOTIFICATIONS MESH --- */}
                <div className="card-elevated border-white/5 p-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-muted-teal/10 rounded-lg">
                            <Bell size={18} className="text-muted-teal" />
                        </div>
                        <h3 className="text-xl font-bold text-off-white">Telemetry Feedback</h3>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                            <div>
                                <p className="text-base font-bold text-off-white">Session Pulse</p>
                                <p className="text-sm text-slate-light font-medium">Auto-trigger notifications when activation window opens.</p>
                            </div>
                            <button
                                className={`w-14 h-8 rounded-full relative transition-all duration-500 shadow-xl ${settings.reminders ? 'bg-muted-teal' : 'bg-white/10'}`}
                                onClick={() => setSettings({ ...settings, reminders: !settings.reminders })}
                            >
                                <div className={`absolute top-1.5 w-5 h-5 bg-white rounded-full transition-all duration-500 shadow-md ${settings.reminders ? 'left-7' : 'left-2'}`} />
                            </button>
                        </div>
                        <div className="flex items-center justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                            <div>
                                <p className="text-base font-bold text-off-white">Pre-Session Validation</p>
                                <p className="text-sm text-slate-light font-medium">Require psychological synchronization before execution mode.</p>
                            </div>
                            <button
                                className={`w-14 h-8 rounded-full relative transition-all duration-500 shadow-xl ${settings.preSessionCheck ? 'bg-muted-teal' : 'bg-white/10'}`}
                                onClick={() => setSettings({ ...settings, preSessionCheck: !settings.preSessionCheck })}
                            >
                                <div className={`absolute top-1.5 w-5 h-5 bg-white rounded-full transition-all duration-500 shadow-md ${settings.preSessionCheck ? 'left-7' : 'left-2'}`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- ENVIRONMENT MESH --- */}
                <div className="card-elevated border-white/5 p-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-muted-teal/10 rounded-lg">
                            <Palette size={18} className="text-muted-teal" />
                        </div>
                        <h3 className="text-xl font-bold text-off-white">Visual Synthesis</h3>
                    </div>
                    <div className="flex items-center justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                        <div className="space-y-1">
                            <p className="text-base font-bold text-off-white">
                                {settings.darkMode ? 'OBSIDIAN CORE' : 'PRISTINE LIGHT'}
                            </p>
                            <p className="text-sm text-slate-light font-medium">
                                {settings.darkMode
                                    ? 'High-contrast dark environment for deep focus sessions.'
                                    : 'Balanced luminosity for daytime analytical operations.'
                                }
                            </p>
                        </div>
                        <button
                            className={`w-16 h-10 rounded-2xl relative transition-all duration-500 shadow-2xl ${settings.darkMode ? 'bg-muted-teal' : 'bg-slate-200'}`}
                            onClick={() => setSettings({ ...settings, darkMode: !settings.darkMode })}
                        >
                            <div className={`absolute top-2 w-6 h-6 bg-white rounded-xl transition-all duration-500 flex items-center justify-center shadow-lg ${settings.darkMode ? 'left-8' : 'left-2'}`}>
                                {settings.darkMode ? <Moon size={12} className="text-muted-teal" strokeWidth={3} /> : <Sun size={12} className="text-amber-500" strokeWidth={3} />}
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-12 flex justify-end">
                <button className="bg-gradient-to-r from-muted-teal to-blue-600 text-white shadow-[0_15px_40px_rgba(56,189,248,0.3)] px-12 py-4 rounded-2xl text-sm font-bold transition-all hover:scale-105 active:scale-95 flex items-center gap-3">
                    <Save size={18} /> SYNCHRONIZE CONFIG
                </button>
            </div>
        </div>
    );
}
