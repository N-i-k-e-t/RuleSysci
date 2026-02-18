'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    FlaskConical,
    Shield,
    Activity,
    TrendingUp,
    ArrowRight,
    Microscope,
    Lock,
    ZapOff,
    CheckCircle2,
    Menu,
    X,
    Mail,
    User
} from 'lucide-react';

export default function LandingPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.name && formData.email) {
            // Logic for capturing lead would go here
            setIsSubmitted(true);
        }
    };

    return (
        <div className="min-h-screen bg-deep-navy text-mist-gray selection:bg-muted-teal/30 font-sans overflow-x-hidden">
            {/* --- PREMIUM HEADER --- */}
            <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 bg-deep-navy/30 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="text-muted-teal relative">
                            <div className="absolute inset-0 bg-muted-teal/20 blur-md rounded-full animate-pulse-soft" />
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative">
                                <rect x="3" y="3" width="26" height="26" rx="6" stroke="currentColor" strokeWidth="2" />
                                <path d="M11 9L11 23" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                                <path d="M11 9L18 9C20.2 9 22 10.8 22 13C22 15.2 20.2 17 18 17L11 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                <path d="M17 17L22 23" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                            </svg>
                        </div>
                        <span className="text-2xl font-bold text-off-white tracking-tight">
                            Rule<span className="font-medium text-muted-teal">Sysci</span>
                        </span>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-10 text-[13px] font-semibold uppercase tracking-widest text-slate-light">
                        <a href="#philosophy" className="hover:text-off-white transition-all transform hover:scale-105">Philosophy</a>
                        <a href="#framework" className="hover:text-off-white transition-all transform hover:scale-105">Framework</a>
                        <a href="#access" className="hover:text-muted-teal transition-all transform hover:scale-105">Request Access</a>
                        <Link
                            href="/dashboard"
                            className="px-6 py-2.5 rounded-full bg-white/[0.03] border border-white/10 text-off-white hover:bg-white/[0.08] hover:border-white/20 transition-all font-bold"
                        >
                            DEMO LAB
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 text-mist-gray hover:text-off-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation Mesh */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-20 left-0 right-0 bg-deep-navy/95 backdrop-blur-2xl border-b border-white/10 p-8 flex flex-col gap-8 animate-fade-in z-50">
                        <a href="#philosophy" onClick={() => setIsMenuOpen(false)} className="text-lg text-off-white font-medium">Philosophy</a>
                        <a href="#framework" onClick={() => setIsMenuOpen(false)} className="text-lg text-off-white font-medium">Framework</a>
                        <a href="#access" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-muted-teal">Request Access</a>
                        <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="text-center py-4 bg-muted-teal text-off-white font-bold rounded-xl shadow-[0_0_20px_rgba(56,189,248,0.3)]">
                            DEMO LAB
                        </Link>
                    </div>
                )}
            </nav>

            {/* --- HERO SECTION --- */}
            <section className="relative pt-48 md:pt-64 pb-32 md:pb-48 px-6 lg:px-12">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.08)_0%,_transparent_70%)] pointer-events-none" />
                <div className="absolute top-20 right-[10%] w-[300px] h-[300px] bg-muted-teal/5 blur-[120px] rounded-full animate-pulse-soft" />
                <div className="absolute bottom-20 left-[10%] w-[400px] h-[400px] bg-muted-teal/10 blur-[150px] rounded-full animate-pulse-soft" />

                <div className="max-w-5xl mx-auto text-center relative">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted-teal/5 border border-muted-teal/15 text-muted-teal text-[11px] font-bold uppercase tracking-[0.25em] mb-12 animate-fade-in shadow-[0_0_30px_rgba(56,189,248,0.15)]">
                        Behavior first. Markets second.
                    </div>

                    <h1 className="text-5xl sm:text-7xl md:text-9xl font-bold text-off-white tracking-tighter leading-[0.95] mb-12 animate-fade-in-up">
                        Trade by rules. <br className="hidden sm:block" />
                        <span className="bg-gradient-to-r from-muted-teal via-blue-400 to-indigo-500 bg-clip-text text-transparent">Think by science.</span>
                    </h1>

                    <p className="text-lg md:text-2xl text-slate-light max-w-3xl mx-auto leading-relaxed mb-16 animate-fade-in-up [animation-delay:200ms] font-medium">
                        The world's first behavioral operating system for traders. We transform raw execution into structured protocol.
                    </p>

                    {/* Hero Form / CTA Mesh */}
                    <div className="max-w-lg mx-auto animate-fade-in-up [animation-delay:400ms]" id="access">
                        {!isSubmitted ? (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 bg-white/[0.02] border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <div className="relative flex-1">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-mid" size={18} />
                                        <input
                                            type="text"
                                            required
                                            placeholder="Full Name"
                                            className="w-full bg-deep-navy/40 border border-white/5 rounded-xl pl-12 pr-4 py-4 text-sm text-off-white outline-none focus:border-muted-teal/40 focus:bg-deep-navy/60 transition-all font-medium"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="relative flex-1">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-mid" size={18} />
                                        <input
                                            type="email"
                                            required
                                            placeholder="Email Address"
                                            className="w-full bg-deep-navy/40 border border-white/5 rounded-xl pl-12 pr-4 py-4 text-sm text-off-white outline-none focus:border-muted-teal/40 focus:bg-deep-navy/60 transition-all font-medium"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-5 bg-gradient-to-r from-muted-teal to-blue-500 text-off-white font-bold text-base rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_40px_rgba(56,189,248,0.3)] flex items-center justify-center gap-3 group"
                                >
                                    ENTER THE LAB <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
                                </button>
                            </form>
                        ) : (
                            <div className="p-12 bg-muted-teal/10 border border-muted-teal/20 rounded-3xl text-center flex flex-col items-center gap-5 animate-fade-in-scale shadow-[0_0_50px_rgba(56,189,248,0.1)]">
                                <div className="p-4 bg-muted-teal/20 rounded-full">
                                    <CheckCircle2 size={48} className="text-muted-teal" />
                                </div>
                                <h3 className="text-3xl font-bold text-off-white tracking-tight">Access Requested.</h3>
                                <p className="text-lg text-slate-light">Welcome to the protocol, {formData.name.split(' ')[0]}. Standby for window activation.</p>
                            </div>
                        )}
                        <p className="mt-8 text-[12px] text-slate-mid tracking-[0.3em] uppercase font-bold">Encrypted Session • Beta Protocol v2.0</p>
                    </div>
                </div>
            </section>

            {/* --- PHILOSOPHY SECTION --- */}
            <section id="philosophy" className="py-32 md:py-56 px-6 lg:px-12 border-t border-white/5 bg-gradient-to-b from-transparent to-deep-navy/50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-40 items-center">
                        <div>
                            <div className="flex items-center gap-3 text-soft-amber mb-8">
                                <div className="p-2 bg-soft-amber/10 rounded-lg">
                                    <ZapOff size={22} />
                                </div>
                                <span className="text-[12px] font-bold uppercase tracking-[0.3em]">Behavioral Lab v.01</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-bold text-off-white mb-10 tracking-tight leading-[0.95]">
                                Stabilize behavior. <br className="hidden sm:block" />
                                Stabilize equity.
                            </h2>
                            <p className="text-xl text-slate-light leading-relaxed mb-12 font-medium">
                                Performance is a lagging indicator of behavior. RuleSysci treats your execution as a physical system—measuring stability, pressure, and deviation triggers to ensure your frame remains absolute.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
                                <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-muted-teal/20 transition-all group">
                                    <div className="w-12 h-12 bg-muted-teal/10 rounded-2xl flex items-center justify-center text-muted-teal mb-6 group-hover:scale-110 transition-transform">
                                        <Lock size={24} />
                                    </div>
                                    <h4 className="text-xl font-bold text-off-white mb-3">Protocol Lock</h4>
                                    <p className="text-base text-slate-light leading-relaxed">Hard-coded rule framework that prevents impulse during session windows.</p>
                                </div>
                                <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-muted-teal/20 transition-all group">
                                    <div className="w-12 h-12 bg-muted-teal/10 rounded-2xl flex items-center justify-center text-muted-teal mb-6 group-hover:scale-110 transition-transform">
                                        <Microscope size={24} />
                                    </div>
                                    <h4 className="text-xl font-bold text-off-white mb-3">State Tracking</h4>
                                    <p className="text-base text-slate-light leading-relaxed">Advanced correlation between psychological baselines and execution quality.</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-0 bg-muted-teal/20 blur-[150px] rounded-full group-hover:bg-muted-teal/30 transition-all animate-pulse-soft" />
                            <div className="aspect-square rounded-[40px] bg-[#0f172a] border border-white/10 p-16 flex flex-col items-center justify-center relative shadow-2xl">
                                <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
                                    <div className="absolute inset-0 border-[4px] border-white/5 rounded-full" />
                                    <div className="absolute inset-0 border-t-[4px] border-muted-teal rounded-full animate-[spin_8s_linear_infinite]" />
                                    <div className="absolute inset-12 border border-white/10 rounded-full" />
                                    <div className="text-center relative">
                                        <span className="text-7xl md:text-9xl font-bold text-off-white tracking-tighter block drop-shadow-[0_0_20px_rgba(56,189,248,0.3)]">91</span>
                                        <span className="text-[11px] text-muted-teal uppercase tracking-[0.4em] font-bold mt-6">Stability Score</span>
                                    </div>
                                </div>
                                <div className="absolute top-16 left-16 badge badge-calm shadow-lg py-2.5 px-6 font-bold">Controlled</div>
                                <div className="absolute bottom-16 right-16 badge badge-neutral shadow-lg py-2.5 px-6 font-bold">SECURED: V2.1</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- GRID FRAMEWORK SECTION --- */}
            <section id="framework" className="py-32 md:py-56 px-6 lg:px-12 bg-deep-navy relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24 md:mb-32">
                        <h2 className="text-4xl md:text-7xl font-bold text-off-white mb-8 tracking-tighter leading-none">Engineered for Protocol.</h2>
                        <p className="text-slate-light text-xl md:text-2xl max-w-3xl mx-auto font-medium">Three integrated systems built to transform behavior into performance.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-14">
                        {[
                            {
                                icon: FlaskConical,
                                title: "Observation Lab",
                                desc: "A noise-free sanctuary. No P&L, no signals, no dopamine. Only the protocol exists.",
                                color: "text-muted-teal"
                            },
                            {
                                icon: Shield,
                                title: "Rule Mesh",
                                desc: "Immutable session rules. Once the lab door is closed, your behavioral frame is physically locked.",
                                color: "text-soft-amber"
                            },
                            {
                                icon: TrendingUp,
                                title: "Neural Analytics",
                                desc: "Deep-layer data on your psychological baselines. Identify impulse loops before they manifest.",
                                color: "text-blue-400"
                            }
                        ].map((feature, idx) => (
                            <div key={idx} className="card-elevated group p-12 hover:border-muted-teal/30 transition-all duration-500 bg-white/[0.015] flex flex-col h-full border border-white/5">
                                <div className={`w-16 h-16 rounded-[22px] bg-white/5 flex items-center justify-center ${feature.color} mb-10 group-hover:scale-110 transition-transform shadow-xl`}>
                                    <feature.icon size={30} />
                                </div>
                                <h3 className="text-2xl font-bold text-off-white mb-5 tracking-tight">{feature.title}</h3>
                                <p className="text-slate-light leading-relaxed text-lg font-medium">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FINAL CTA MESH --- */}
            <section className="py-32 md:py-64 px-6 lg:px-12 border-t border-white/5 relative overflow-hidden">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_bottom,_rgba(56,189,248,0.1)_0%,_transparent_60%)] pointer-events-none" />

                <div className="max-w-5xl mx-auto text-center relative">
                    <h2 className="text-6xl md:text-8xl font-bold text-off-white mb-12 tracking-tighter leading-none">Enter the lab.</h2>
                    <p className="text-xl md:text-3xl text-slate-light mb-20 max-w-2xl mx-auto font-medium">
                        Access is limited to traders who prioritize behavioral data over outcome noise.
                    </p>
                    <a
                        href="#access"
                        className="inline-flex px-12 py-6 rounded-2xl bg-gradient-to-r from-muted-teal to-blue-600 text-off-white font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_15px_50px_rgba(56,189,248,0.4)] items-center gap-4 mb-10 group"
                    >
                        REQUEST LAB ACCESS <ArrowRight size={24} className="group-hover:translate-x-1.5 transition-transform" />
                    </a>
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-[12px] text-slate-mid tracking-[0.5em] uppercase font-bold">Neural Protocol v.2.4.X</p>
                        <div className="w-1 h-12 bg-gradient-to-b from-muted-teal to-transparent rounded-full mt-4 animate-bounce" />
                    </div>
                </div>
            </section>

            {/* --- PREMIUM FOOTER --- */}
            <footer className="py-32 px-6 lg:px-12 border-t border-white/5 bg-[#020617] relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-3 mb-10">
                                <div className="text-muted-teal">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="3" y="3" width="26" height="26" rx="6" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                </div>
                                <span className="text-2xl font-bold text-off-white tracking-tight">
                                    Rule<span className="font-medium text-muted-teal">Sysci</span>
                                </span>
                            </div>
                            <p className="text-lg text-slate-mid leading-relaxed max-w-md font-medium">
                                We stabilize the only variable that matters: your behavior. Performance is the byproduct of structure.
                            </p>
                        </div>

                        <div>
                            <h5 className="text-[12px] font-bold text-off-white uppercase tracking-[0.4em] mb-10">Documentation</h5>
                            <ul className="flex flex-col gap-6 text-[15px] text-slate-mid font-bold">
                                <li><a href="#philosophy" className="hover:text-muted-teal transition-all">Philosophy</a></li>
                                <li><a href="#framework" className="hover:text-muted-teal transition-all">Lab Mesh</a></li>
                                <li><Link href="/dashboard" className="hover:text-muted-teal transition-all">Access Demo</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="text-[12px] font-bold text-off-white uppercase tracking-[0.4em] mb-10">Support</h5>
                            <ul className="flex flex-col gap-6 text-[15px] text-slate-mid font-bold">
                                <li><a href="#" className="hover:text-muted-teal transition-all">Privacy Mesh</a></li>
                                <li><a href="#" className="hover:text-muted-teal transition-all">Protocol Terms</a></li>
                                <li><a href="mailto:admin@rulesysci.com" className="hover:text-muted-teal transition-all">Inquiry</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-16 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-12">
                        <p className="text-[12px] text-slate-mid tracking-[0.4em] uppercase font-bold">© 2026 RuleSysci Lab Systems. All rights reserved.</p>
                        <div className="px-8 py-4 rounded-3xl bg-white/[0.02] border border-white/5 text-[11px] text-slate-mid tracking-wide max-w-2xl leading-loose italic">
                            "RuleSysci does not provide financial advice, trading signals, or automated execution. We provide the framework; you provide the discipline."
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
