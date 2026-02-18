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
            <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 bg-deep-navy/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="text-muted-teal">
                            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="3" width="26" height="26" rx="4" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M11 9L11 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <path d="M11 9L18 9C20.2 9 22 10.8 22 13C22 15.2 20.2 17 18 17L11 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                <path d="M17 17L22 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </div>
                        <span className="text-xl font-semibold text-off-white tracking-[0.06em]">
                            Rule<span className="font-normal text-muted-teal">Sysci</span>
                        </span>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-10 text-sm font-medium">
                        <a href="#philosophy" className="hover:text-off-white transition-colors">Philosophy</a>
                        <a href="#framework" className="hover:text-off-white transition-colors">Framework</a>
                        <a href="#access" className="hover:text-off-white transition-colors">Request Access</a>
                        <Link
                            href="/dashboard"
                            className="px-5 py-2 rounded-md bg-muted-teal/10 border border-muted-teal/20 text-sm font-medium text-muted-teal hover:bg-muted-teal/20 transition-all"
                        >
                            Demo Lab
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
                    <div className="md:hidden absolute top-20 left-0 right-0 bg-deep-navy border-b border-white/10 p-6 flex flex-col gap-6 animate-fade-in z-50">
                        <a href="#philosophy" onClick={() => setIsMenuOpen(false)} className="text-lg text-off-white">Philosophy</a>
                        <a href="#framework" onClick={() => setIsMenuOpen(false)} className="text-lg text-off-white">Framework</a>
                        <a href="#access" onClick={() => setIsMenuOpen(false)} className="text-lg text-off-white font-semibold text-muted-teal">Request Access</a>
                        <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="text-center py-4 bg-muted-teal rounded-md text-off-white font-medium">
                            Demo Lab
                        </Link>
                    </div>
                )}
            </nav>

            {/* --- HERO SECTION --- */}
            <section className="relative pt-40 md:pt-56 pb-24 md:pb-40 px-4 sm:px-6 lg:px-8">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_center,_rgba(42,157,143,0.05)_0%,_transparent_70%)] pointer-events-none" />

                <div className="max-w-5xl mx-auto text-center relative">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted-teal/10 border border-muted-teal/20 text-muted-teal text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.15em] mb-8 animate-fade-in shadow-[0_0_20px_rgba(42,157,143,0.1)]">
                        Behavior first. Markets second.
                    </div>

                    <h1 className="text-4xl sm:text-6xl md:text-8xl font-medium text-off-white tracking-tight leading-[1.05] mb-8 animate-fade-in-up">
                        Trade by rules. <br className="hidden sm:block" />
                        <span className="text-muted-teal">Think by science.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-light max-w-2xl mx-auto leading-relaxed mb-12 animate-fade-in-up [animation-delay:200ms]">
                        The operating system for trading discipline. We treat behavior as a system, not a variable. Request access to the early observation lab.
                    </p>

                    {/* Hero Form / CTA Mesh */}
                    <div className="max-w-md mx-auto animate-fade-in-up [animation-delay:400ms]" id="access">
                        {!isSubmitted ? (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-2 bg-cool-slate/20 border border-white/5 rounded-xl backdrop-blur-sm">
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <div className="relative flex-1">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-mid" size={16} />
                                        <input
                                            type="text"
                                            required
                                            placeholder="Full Name"
                                            className="w-full bg-deep-navy/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-off-white outline-none focus:border-muted-teal/50 transition-all"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="relative flex-1">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-mid" size={16} />
                                        <input
                                            type="email"
                                            required
                                            placeholder="Email Address"
                                            className="w-full bg-deep-navy/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-off-white outline-none focus:border-muted-teal/50 transition-all"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-3.5 bg-muted-teal text-off-white font-semibold rounded-lg hover:bg-[#248f82] transition-all hover:scale-[1.01] shadow-[0_8px_30px_rgba(42,157,143,0.3)] flex items-center justify-center gap-2 group"
                                >
                                    Join the Lab <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        ) : (
                            <div className="p-8 bg-muted-teal/5 border border-muted-teal/20 rounded-xl text-center flex flex-col items-center gap-3 animate-fade-in-scale">
                                <CheckCircle2 size={40} className="text-muted-teal" />
                                <h3 className="text-xl font-semibold text-off-white">Request Received</h3>
                                <p className="text-sm text-slate-light">Welcome, {formData.name.split(' ')[0]}. We'll notify you when your session window opens.</p>
                            </div>
                        )}
                        <p className="mt-4 text-[11px] text-slate-mid tracking-wide uppercase">No password required. Private access only.</p>
                    </div>
                </div>
            </section>

            {/* --- PHILOSOPHY SECTION --- */}
            <section id="philosophy" className="py-24 md:py-40 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-cool-slate/[0.03]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
                        <div>
                            <div className="flex items-center gap-2 text-soft-amber mb-6">
                                <ZapOff size={18} />
                                <span className="text-[11px] font-bold uppercase tracking-[0.2em]">The Behavioral Laboratory</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-medium text-off-white mb-8 tracking-tight leading-[1.15]">
                                Stabilize behavior. <br className="hidden sm:block" />
                                Stabilize equity.
                            </h2>
                            <p className="text-lg text-slate-light leading-relaxed mb-10">
                                Performance is a lagging indicator of behavior. RuleSysci treats your execution as a physical system—measuring stability, pressure, and deviation triggers to ensure your framework remains absolute.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="card p-6 bg-white/[0.02]">
                                    <Lock className="text-muted-teal mb-4" size={20} />
                                    <h4 className="text-off-white font-medium mb-2">Protocol Lock</h4>
                                    <p className="text-sm text-slate-light">Hard-coded rule framework that prevents impulse during market hours.</p>
                                </div>
                                <div className="card p-6 bg-white/[0.02]">
                                    <Microscope className="text-muted-teal mb-4" size={20} />
                                    <h4 className="text-off-white font-medium mb-2">Neural Observation</h4>
                                    <p className="text-sm text-slate-light">Track baseline states to correlate emotion with rule adherence.</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative group p-4 sm:p-0">
                            <div className="absolute inset-0 bg-muted-teal/10 blur-[100px] rounded-full group-hover:bg-muted-teal/20 transition-all" />
                            <div className="aspect-[4/5] sm:aspect-square rounded-3xl bg-deep-navy border border-white/10 p-12 flex flex-col items-center justify-center relative overflow-hidden">
                                <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
                                    <div className="absolute inset-0 border-[3px] border-muted-teal/10 rounded-full" />
                                    <div className="absolute inset-0 border-t-[3px] border-muted-teal rounded-full animate-[spin_12s_linear_infinite]" />
                                    <div className="absolute inset-10 border border-white/5 rounded-full" />
                                    <div className="text-center">
                                        <span className="text-5xl sm:text-7xl font-semibold text-off-white block">91</span>
                                        <span className="text-[10px] text-muted-teal uppercase tracking-[0.2em] font-medium mt-3">Stability Score</span>
                                    </div>
                                </div>
                                <div className="absolute top-12 left-12 animate-fade-in-up badge badge-calm">Controlled</div>
                                <div className="absolute bottom-12 right-12 animate-fade-in-up [animation-delay:300ms] badge badge-neutral">Protocol: Active</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- GRID FRAMEWORK SECTION --- */}
            <section id="framework" className="py-24 md:py-40 px-4 sm:px-6 lg:px-8 bg-deep-navy relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 md:mb-24">
                        <h2 className="text-3xl md:text-5xl font-medium text-off-white mb-6">Engineered for Protocol.</h2>
                        <p className="text-slate-light text-lg max-w-2xl mx-auto">Three integrated systems that transform raw behavior into structured performance.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
                        {[
                            {
                                icon: FlaskConical,
                                title: "Observation Lab",
                                desc: "A distraction-free environment. No P&L, no charts, no noise. Only you and the protocol.",
                                color: "text-muted-teal"
                            },
                            {
                                icon: Shield,
                                title: "Rule Mesh",
                                desc: "Immutable session rules. Once the lab door is closed, your behavioral frame is locked.",
                                color: "text-soft-amber"
                            },
                            {
                                icon: TrendingUp,
                                title: "Behavioral Analytics",
                                desc: "Deep-layer data on your psychological baselines. Identify your impulse loops before they execute.",
                                color: "text-muted-teal"
                            }
                        ].map((feature, idx) => (
                            <div key={idx} className="card group p-10 hover:border-muted-teal/20 transition-all duration-500 flex flex-col h-full bg-white/[0.01]">
                                <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center ${feature.color} mb-8 group-hover:scale-110 transition-transform`}>
                                    <feature.icon size={26} />
                                </div>
                                <h3 className="text-xl font-medium text-off-white mb-4">{feature.title}</h3>
                                <p className="text-slate-light leading-relaxed text-sm lg:text-base">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FINAL CTA MESH --- */}
            <section className="py-24 md:py-40 px-4 sm:px-6 lg:px-8 border-t border-white/5 relative overflow-hidden">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_bottom,_rgba(42,157,143,0.08)_0%,_transparent_60%)] pointer-events-none" />

                <div className="max-w-4xl mx-auto text-center relative">
                    <h2 className="text-4xl md:text-6xl font-medium text-off-white mb-10 tracking-tight">Ready to enter the lab?</h2>
                    <p className="text-lg md:text-xl text-slate-light mb-12 max-w-xl mx-auto">
                        Early access is available for traders who prioritize behavior over dopamine.
                    </p>
                    <a
                        href="#access"
                        className="inline-flex px-10 py-5 rounded-lg bg-muted-teal text-off-white font-semibold hover:bg-[#248f82] transition-all hover:scale-[1.05] shadow-[0_4px_30px_rgba(42,157,143,0.3)] items-center gap-3 mb-6"
                    >
                        Request Session Access <ArrowRight size={20} />
                    </a>
                    <p className="text-xs text-slate-mid tracking-[0.1em] uppercase">Private Beta Protocol v1.4.2</p>
                </div>
            </section>

            {/* --- PREMIUM FOOTER --- */}
            <footer className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-deep-navy relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="text-muted-teal">
                                    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="3" y="3" width="26" height="26" rx="4" stroke="currentColor" strokeWidth="1.5" />
                                    </svg>
                                </div>
                                <span className="text-lg font-semibold text-off-white tracking-[0.05em]">
                                    Rule<span className="font-normal text-muted-teal">Sysci</span>
                                </span>
                            </div>
                            <p className="text-sm text-slate-mid leading-relaxed max-w-sm">
                                RuleSysci is built to make traders more disciplined; profit is a byproduct of structure. We help you stabilize the only variable that matters: your behavior.
                            </p>
                        </div>

                        <div>
                            <h5 className="text-[11px] font-bold text-off-white uppercase tracking-[0.2em] mb-6">Protocol</h5>
                            <ul className="flex flex-col gap-4 text-sm text-slate-mid">
                                <li><a href="#philosophy" className="hover:text-muted-teal transition-colors">Philosophy</a></li>
                                <li><a href="#framework" className="hover:text-muted-teal transition-colors">Scientific Mesh</a></li>
                                <li><Link href="/dashboard" className="hover:text-muted-teal transition-colors">Demo Lab</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="text-[11px] font-bold text-off-white uppercase tracking-[0.2em] mb-6">Inquiry</h5>
                            <ul className="flex flex-col gap-4 text-sm text-slate-mid">
                                <li><a href="#" className="hover:text-muted-teal transition-colors">Privacy Protocol</a></li>
                                <li><a href="#" className="hover:text-muted-teal transition-colors">Terms of Observation</a></li>
                                <li><a href="mailto:access@rulesysci.com" className="hover:text-muted-teal transition-colors">Support</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-[11px] text-slate-mid tracking-widest uppercase">© 2026 RuleSysci Laboratory. All rights reserved.</p>
                        <div className="px-5 py-2 rounded-full bg-white/[0.02] border border-white/5 text-[10px] text-slate-mid text-center max-w-xl md:text-right italic">
                            "RuleSysci does not provide financial advice or automated trading. Discipline is the only byproduct."
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
