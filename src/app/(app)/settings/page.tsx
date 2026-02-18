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
        <div className="animate-fade-in-up pb-24">
            <div className="mb-8">
                <h1 className="text-[28px] font-medium tracking-tight text-off-white">Configuration</h1>
                <p className="text-sm text-slate-light">Behavioral parameters and environment settings.</p>
            </div>

            <div className="flex flex-col gap-4">
                {/* Profile */}
                <div className="card">
                    <div className="flex items-center gap-2 mb-6 text-off-white">
                        <User size={18} strokeWidth={1.4} className="text-muted-teal" />
                        <h3 className="text-[17px] font-medium">Profile</h3>
                    </div>
                    <div className="flex flex-col gap-2 max-w-sm">
                        <label className="text-xs font-medium text-slate-light uppercase tracking-wider">Identifier</label>
                        <input
                            className="bg-deep-navy border border-white/8 rounded-md px-4 py-2 text-sm text-off-white outline-none focus:border-muted-teal/50 transition-fast"
                            type="text"
                            value={settings.name}
                            onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                        />
                    </div>
                </div>

                {/* Session Parameters */}
                <div className="card">
                    <div className="flex items-center gap-2 mb-6 text-off-white">
                        <Shield size={18} strokeWidth={1.4} className="text-muted-teal" />
                        <h3 className="text-[17px] font-medium">Session Parameters</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-medium text-slate-light uppercase tracking-wider">Max Executions</label>
                            <input
                                className="bg-deep-navy border border-white/8 rounded-md px-4 py-2 text-sm text-off-white outline-none focus:border-muted-teal/50 transition-fast"
                                type="number"
                                min="1"
                                max="20"
                                value={settings.maxTrades}
                                onChange={(e) => setSettings({ ...settings, maxTrades: Number(e.target.value) })}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-medium text-slate-light uppercase tracking-wider">Session Start</label>
                            <input
                                className="bg-deep-navy border border-white/8 rounded-md px-4 py-2 text-sm text-off-white outline-none focus:border-muted-teal/50 transition-fast"
                                type="time"
                                value={settings.sessionStart}
                                onChange={(e) => setSettings({ ...settings, sessionStart: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-medium text-slate-light uppercase tracking-wider">Session End</label>
                            <input
                                className="bg-deep-navy border border-white/8 rounded-md px-4 py-2 text-sm text-off-white outline-none focus:border-muted-teal/50 transition-fast"
                                type="time"
                                value={settings.sessionEnd}
                                onChange={(e) => setSettings({ ...settings, sessionEnd: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div className="card">
                    <div className="flex items-center gap-2 mb-6 text-off-white">
                        <Bell size={18} strokeWidth={1.4} className="text-muted-teal" />
                        <h3 className="text-[17px] font-medium">Notifications</h3>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between py-2">
                            <div>
                                <p className="text-[15px] font-medium text-off-white">Session Reminders</p>
                                <p className="text-[13px] text-slate-light">Notify before session window opens</p>
                            </div>
                            <button
                                className={`w-11 h-6 rounded-full relative transition-fast ${settings.reminders ? 'bg-muted-teal' : 'bg-white/10'
                                    }`}
                                onClick={() => setSettings({ ...settings, reminders: !settings.reminders })}
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-off-white rounded-full transition-all duration-300 ${settings.reminders ? 'left-6' : 'left-1'
                                    }`} />
                            </button>
                        </div>
                        <div className="flex items-center justify-between py-2 border-t border-white/4 pt-4">
                            <div>
                                <p className="text-[15px] font-medium text-off-white">Pre-Session Check</p>
                                <p className="text-[13px] text-slate-light">Require behavioral check-in before execution</p>
                            </div>
                            <button
                                className={`w-11 h-6 rounded-full relative transition-fast ${settings.preSessionCheck ? 'bg-muted-teal' : 'bg-white/10'
                                    }`}
                                onClick={() => setSettings({ ...settings, preSessionCheck: !settings.preSessionCheck })}
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-off-white rounded-full transition-all duration-300 ${settings.preSessionCheck ? 'left-6' : 'left-1'
                                    }`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Appearance */}
                <div className="card">
                    <div className="flex items-center gap-2 mb-6 text-off-white">
                        <Palette size={18} strokeWidth={1.4} className="text-muted-teal" />
                        <h3 className="text-[17px] font-medium">Environment</h3>
                    </div>
                    <div className="flex items-center justify-between py-2">
                        <div>
                            <p className="text-[15px] font-medium text-off-white">
                                {settings.darkMode ? 'Dark Environment' : 'Light Environment'}
                            </p>
                            <p className="text-[13px] text-slate-light">
                                {settings.darkMode
                                    ? 'Reduced visual stimulation for controlled observation'
                                    : 'Soft light environment for daytime sessions'
                                }
                            </p>
                        </div>
                        <button
                            className={`w-11 h-6 rounded-full relative transition-fast ${settings.darkMode ? 'bg-muted-teal' : 'bg-white/10'
                                }`}
                            onClick={() => setSettings({ ...settings, darkMode: !settings.darkMode })}
                        >
                            <div className={`absolute top-1 w-4 h-4 bg-off-white rounded-full transition-all duration-300 flex items-center justify-center ${settings.darkMode ? 'left-6' : 'left-1'
                                }`}>
                                {settings.darkMode ? <Moon size={10} className="text-muted-teal" strokeWidth={3} /> : <Sun size={10} className="text-amber-500" strokeWidth={3} />}
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-end">
                <button className="bg-muted-teal text-off-white px-6 py-2.5 rounded-md text-sm font-medium transition-fast hover:bg-[#248f82] flex items-center gap-2 shadow-[0_4px_16px_rgba(42,157,143,0.25)]">
                    <Save size={16} /> Save Configuration
                </button>
            </div>
        </div>
    );
}
