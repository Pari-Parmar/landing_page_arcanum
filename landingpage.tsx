import React, { useEffect, useState } from 'react';
import { useApp } from './AppContext';
import {
    ArrowRight, Play, Sparkles, Brain, Languages, Mic2, Network,
    BarChart3, ChevronDown, Menu, X,
    Shield, FileText,
    Sun, Moon, CheckCircle2, Mail
} from 'lucide-react';
import './landing.css';
import { ArcanumLogo } from './ArcanumLogo';

const platform = [
    { n: '01', title: 'Listen', text: 'ARCANUM follows the lecture as it happens, capturing academic speech and structure in real time.', icon: <Mic2 /> },
    { n: '02', title: 'Understand', text: 'Context, terminology and course material are connected so difficult ideas become easier to grasp.', icon: <Brain /> },
    { n: '03', title: 'Adapt', text: "Explanations can shift with language, fluency, pace and the learner's current level of understanding.", icon: <Languages /> },
    { n: '04', title: 'Progress', text: 'Learning signals turn into revision paths, insights and the next useful action.', icon: <BarChart3 /> },
];

const reasons = [
    ['01', 'One continuous learning layer', 'ARCANUM connects lecture, context, questions, revision and progress instead of scattering them across disconnected tools.'],
    ['02', 'Built around understanding', 'The goal is not more information. It is a clearer path from hearing something to actually understanding it.'],
    ['03', 'Designed for real students', 'Language, terminology, pace and confidence are treated as part of the learning experience, not edge cases.'],
];

interface TeamMember {
    name: string;
    role: string;
    focus: string;
    bioParagraphs?: string[];
    photo: string;
    domain: string;
    tags: string[];
    email: string;
    github: string;
    linkedin: string;
}

const teamMembers: TeamMember[] = [
    {
        name: 'Hetvi Sheth',
        role: 'Backend Architect & Speech Engineer',
        focus: 'Real-time Whisper ASR with VAD streaming, Supabase database architecture, live session syncing, and AI backend fallback services.',
        bioParagraphs: [
            "At ARCANUM, learning should happen at the speed of thought. My mission has been building the low-latency speech backbone and database pipeline that listens, decodes, and reasons in real time without cognitive lag.",
            "From streaming Whisper ASR paired with Voice Activity Detection (VAD) to orchestrating synchronized Supabase DB states, I focus on turning complex distributed backend engineering into an invisible, effortless experience for every student."
        ],
        photo: '/team/hetvi.jpg',
        domain: 'Backend & Real-Time ASR',
        tags: ['Whisper ASR & VAD', 'Supabase DB', 'Backend APIs'],
        email: 'hetvi@arcanum.ai',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
    },
    {
        name: 'Sneha Patel',
        role: 'Full Stack & AI Systems Engineer',
        focus: 'Multi-agent AI orchestration, Google OAuth authentication pipelines, Sarvam & Groq Whisper transcription, and interactive classroom modules.',
        bioParagraphs: [
            "Intelligence in education is about contextual empathy. I focus on developing multi-agent orchestration pipelines that adapt lecture material to any student's native vernacular, pace, and cognitive style.",
            "By integrating dual transcription fallbacks with Groq and Sarvam alongside robust Google OAuth flows, we ensure the classroom remains completely inclusive, deeply personalized, and always reliable."
        ],
        photo: '/team/sneha.jpg',
        domain: 'AI Systems & Auth',
        tags: ['Multi-Agent AI', 'Google OAuth', 'Sarvam & Groq'],
        email: 'sneha@arcanum.ai',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
    },
    {
        name: 'Parisha',
        role: 'Frontend Lead & UI/UX Designer',
        focus: 'Warm editorial design system, responsive dashboards, command palette UX, skeleton loading states, and dynamic onboarding flows.',
        bioParagraphs: [
            "Design is not just how something looks, but how clearly it communicates. My objective has been creating a warm, editorial design language that removes cognitive clutter and makes academic environments feel calm and inspiring.",
            "Every component—from fluid command palettes and responsive podium layouts to tactile micro-interactions—is crafted to honor the student's focus and elevate understanding above information overload."
        ],
        photo: '/team/parisha_member.jpg',
        domain: 'UI/UX & Frontend',
        tags: ['UI/UX Design', 'Design Systems', 'Responsive Web'],
        email: 'parisha@arcanum.ai',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
    },
    {
        name: 'Priya Bhatt',
        role: 'QA & Testing Lead',
        focus: 'Comprehensive end-to-end testing, cross-browser validation, bug verification, and system reliability benchmarks.',
        bioParagraphs: [
            "Reliability is the foundation of trust in education. When students and faculty depend on real-time classroom tooling, there is zero tolerance for dropped audio or failing synchronization.",
            "I lead our end-to-end testing matrix, stress-testing live ASR streaming across devices, edge latencies, and diverse network conditions to ensure every lecture runs with rock-solid consistency."
        ],
        photo: '/team/priya.jpg',
        domain: 'Quality Assurance',
        tags: ['Software Testing', 'E2E Testing', 'System Reliability'],
        email: 'priya@arcanum.ai',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
    },
    {
        name: 'Isha Rajput',
        role: 'Technical Documentation Lead',
        focus: 'System architecture documentation, technical reports, platform specifications, and comprehensive user guides.',
        bioParagraphs: [
            "Complex systems deserve crystal-clear articulation. Great engineering is only as impactful as the ability for developers, educators, and students to understand and navigate its foundations.",
            "I document ARCANUM's multi-agent architectural layers, API specifications, and deployment runbooks, turning cutting-edge speech and pedagogical models into accessible, transparent knowledge."
        ],
        photo: '/team/isha.jpg',
        domain: 'Documentation',
        tags: ['Technical Writing', 'Architecture Docs', 'System Specs'],
        email: 'isha@arcanum.ai',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
    }
];

export const LandingPage: React.FC = () => {
    const { setRoute, theme, toggleTheme } = useApp();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [active, setActive] = useState(0);
    const [activeSection, setActiveSection] = useState<string>('');
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
    const [earlyAccessOpen, setEarlyAccessOpen] = useState(false);
    const [earlyEmail, setEarlyEmail] = useState('');
    const [earlyRole, setEarlyRole] = useState<'student' | 'educator' | 'institution' | 'other'>('student');
    const [earlySubmitted, setEarlySubmitted] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setSelectedMember(null);
                setEarlyAccessOpen(false);
            }
        };
        if (selectedMember || earlyAccessOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedMember, earlyAccessOpen]);

    useEffect(() => {
        const sections = ['problem', 'why', 'platform', 'demo-video', 'vision', 'team', 'partner'];
        const onScroll = () => {
            setScrolled(window.scrollY > 20);
            const scrollPos = window.scrollY + 180;
            let current = '';
            for (const id of sections) {
                const el = document.getElementById(id);
                if (el && el.offsetTop <= scrollPos) {
                    current = id;
                }
            }
            setActiveSection(current);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        const timer = window.setInterval(() => setActive(v => (v + 1) % platform.length), 2200);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.clearInterval(timer);
        };
    }, []);

    const go = (id: string) => {
        setMobileOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    const openEarlyAccess = () => {
        setMobileOpen(false);
        setEarlyAccessOpen(true);
    };

    const handleEarlyAccessSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!earlyEmail.trim()) return;
        setEarlySubmitted(true);
    };

    const enter = () => {
        openEarlyAccess();
    };

    return (
        <div className="arc2-page">
            <div className="arc2-global-glow" aria-hidden="true" />
            <div className="arc2-stars" aria-hidden="true">
                {Array.from({ length: 32 }).map((_, i) => <i key={i} style={{ '--i': i } as React.CSSProperties} />)}
            </div>

            <header className={`arc2-nav ${scrolled ? 'arc2-nav-scrolled' : ''}`}>
                <div className="arc2-nav-inner">
                    <button className="arc2-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ display: 'flex', alignItems: 'center' }}>
                        <ArcanumLogo variant="full" size={24} interactive />
                    </button>
                    <nav className="arc2-links">
                        <button className={activeSection === 'problem' ? 'arc2-link-active' : ''} onClick={() => go('problem')}>Problem</button>
                        <button className={activeSection === 'why' ? 'arc2-link-active' : ''} onClick={() => go('why')}>Why Us</button>
                        <button className={activeSection === 'platform' ? 'arc2-link-active' : ''} onClick={() => go('platform')}>Platform</button>
                        <button className={activeSection === 'demo-video' ? 'arc2-link-active' : ''} onClick={() => go('demo-video')}>Demo</button>
                        <button className={activeSection === 'vision' ? 'arc2-link-active' : ''} onClick={() => go('vision')}>Vision</button>
                        <button className={activeSection === 'team' ? 'arc2-link-active' : ''} onClick={() => go('team')}>Team</button>
                        <button className={activeSection === 'partner' ? 'arc2-link-active' : ''} onClick={() => go('partner')}>Partner</button>
                    </nav>
                    <div className="arc2-nav-actions">
                        {/* Compact Theme Toggle */}
                        <button
                            type="button"
                            onClick={toggleTheme}
                            className="arc2-theme-toggle interactive-lift interactive-tap"
                            title={theme === 'dark' ? "Switch to Editorial Light Theme" : "Switch to Obsidian Dark Theme"}
                            aria-label="Toggle dark/light theme"
                            style={{
                                background: theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                                border: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.14)' : 'rgba(0, 0, 0, 0.08)'}`,
                                borderRadius: '50%',
                                width: '32px',
                                height: '32px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                color: theme === 'dark' ? '#f4f4f5' : '#18181b'
                            }}
                        >
                            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                        </button>

                        {/* Single Sleek Sign In Button */}
                        <button
                            type="button"
                            onClick={() => setRoute('login')}
                            className="arc2-nav-signin-btn interactive-lift interactive-tap"
                            title="Sign In to Student Portal"
                        >
                            <span>Sign In</span>
                            <ArrowRight size={13} />
                        </button>
                    </div>
                    <button className="arc2-mobile-button" onClick={() => setMobileOpen(v => !v)} aria-label="Menu">{mobileOpen ? <X /> : <Menu />}</button>
                </div>
                {mobileOpen && <div className="arc2-mobile-menu">
                    <button onClick={() => go('problem')}>Problem</button>
                    <button onClick={() => go('why')}>Why Arcanum</button>
                    <button onClick={() => go('platform')}>Platform</button>
                    <button onClick={() => go('demo-video')}>Demo Video</button>
                    <button onClick={() => go('vision')}>Vision</button>
                    <button onClick={() => go('team')}>Team</button>
                    <button onClick={() => go('partner')}>Partner</button>
                    <button
                        onClick={toggleTheme}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '12px 16px',
                            borderRadius: '12px',
                            background: theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'inherit',
                            fontWeight: 600,
                            fontSize: '14px'
                        }}
                    >
                        {theme === 'dark' ? <Sun size={17} color="#b9a8ff" /> : <Moon size={17} color="#7c3aed" />}
                        <span>{theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}</span>
                    </button>
                    <button onClick={() => setRoute('privacy')}>Privacy Policy</button>
                    <button onClick={() => setRoute('terms')}>Terms of Service</button>
                    <button
                        onClick={() => { setMobileOpen(false); setRoute('login'); }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px 16px',
                            borderRadius: '12px',
                            background: theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
                            color: 'inherit',
                            fontWeight: 600,
                            fontSize: '14px',
                            cursor: 'pointer',
                            border: 'none'
                        }}
                    >
                        <span>Student Portal (Sign In)</span>
                        <ArrowRight size={15} />
                    </button>
                    <button
                        onClick={openEarlyAccess}
                        style={{ fontWeight: 700, color: '#b9a8ff', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        Sign Up for Early Access <ArrowRight size={15} />
                    </button>
                </div>}
            </header>

            <main>
                <section className="arc2-hero">
                    <div className="arc2-hero-copy">
                        <div className="arc2-kicker">INTELLIGENCE FOR THE LEARNING JOURNEY</div>
                        <h1>Understand more.<br /><em>Learn without limits.</em></h1>
                        <p>ARCANUM transforms the way students experience academic information, bringing language, context, intelligence and progress into one beautifully connected environment.</p>
                        <div className="arc2-hero-actions">
                            <button className="arc2-black-button" onClick={openEarlyAccess}>Sign Up for Early Access <ArrowRight size={17} /></button>
                            <button className="arc2-quiet-button" onClick={() => go('demo-video')}><Play size={14} /> See how it works</button>
                        </div>
                    </div>

                    <div className="arc2-hero-stage" aria-label="Interactive 3D ARCANUM intelligence environment">
                        <div className="arc2-haze haze-a" /><div className="arc2-haze haze-b" />
                        <div className="arc2-floor" />
                        <div className="arc2-shooting s1" /><div className="arc2-shooting s2" /><div className="arc2-shooting s3" />
                        <div className="arc2-orbit orbit-1" /><div className="arc2-orbit orbit-2" /><div className="arc2-orbit orbit-3" />
                        <div className="arc2-core">
                            <div className="arc2-core-inner"><span>A</span></div>
                            <div className="arc2-core-glass" />
                        </div>
                        <div className="arc2-float-card card-a"><span>LIVE</span><strong>Lecture intelligence</strong><small>Listening · 98.4%</small></div>
                        <div className="arc2-float-card card-b"><span>01</span><strong>Context layer</strong><small>Connected to course material</small></div>
                        <div className="arc2-float-card card-c"><span>AI</span><strong>Personalized explanation</strong><small>Ready when you need it</small></div>
                        <div className="arc2-stage-label"><Sparkles size={14} /> ARCANUM CORE <b>01</b></div>
                    </div>
                    <div className="arc2-scroll-cue">SCROLL TO EXPLORE <ChevronDown size={14} /></div>
                </section>

                {/* ── OFFICIAL PARTNER: DEZAI ─────────────────────────────────────── */}
                <section className="arc2-partner" id="partner" aria-label="Official Partner">
                    <div className="arc2-partner-wrap">
                        <span className="arc2-partner-tag">
                            OFFICIAL PARTNER
                        </span>
                        <a
                            href="https://dezai.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="arc2-partner-card interactive-lift interactive-tap"
                            title="Visit DEZAI - Enterprise Product Engineering & Mentorship (dezai.org)"
                            aria-label="DEZAI Official Partner Website"
                        >
                            <img
                                src="./images/dezai-logo.png"
                                alt="DEZAI Official Partner"
                                className="arc2-partner-logo"
                                style={{
                                    maxHeight: '64px',
                                    width: 'auto',
                                    borderRadius: '12px',
                                    objectFit: 'contain',
                                    filter: theme === 'dark' ? 'drop-shadow(0 4px 12px rgba(234, 179, 8, 0.25))' : 'none'
                                }}
                            />
                        </a>
                    </div>
                </section>

                <section className="arc2-intro arc2-white" id="problem">
                    <div className="arc2-section-wrap">
                        <div className="arc2-section-tag">01 / THE PROBLEM</div>
                        <div className="arc2-split-heading"><h2>Information is everywhere.<br /><em>Understanding is not.</em></h2><p>Students move through lectures, terminology, assessments, notes and unfamiliar concepts at the same speed. When language, pace or context becomes a barrier, the gap compounds.</p></div>
                        <div className="arc2-problem-line"><div className="arc2-line-number">01</div><div><strong>Too much information</strong><span>More content does not automatically create more understanding.</span></div><div className="arc2-line-number">02</div><div><strong>Too many disconnected tools</strong><span>Questions, notes, translation and revision often live in separate places.</span></div></div>
                    </div>
                </section>

                <section className="arc2-why" id="why">
                    <div className="arc2-section-wrap">
                        <div className="arc2-section-tag">02 / WHY ARCANUM</div>
                        <div className="arc2-why-head"><h2>A calmer way to<br /><em>make sense of learning.</em></h2><p>ARCANUM is not another chatbot placed beside a course. It is designed as the intelligence layer that sits across the learning journey.</p></div>
                        <div className="arc2-reason-grid">{reasons.map(([n, t, d]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p><div className="arc2-arrow"><ArrowRight size={15} /></div></article>)}</div>
                    </div>
                </section>

                <section className="arc2-vision" id="vision">
                    <div className="arc2-section-wrap arc2-vision-grid">
                        <div><div className="arc2-section-tag">03 / VISION</div><h2>From <em>information</em><br />to understanding.</h2></div>
                        <div className="arc2-vision-copy"><p>Imagine a learning environment that listens to the lecture, understands the context, adapts explanations to the student and remembers what needs attention next.</p><p>That is the direction behind ARCANUM: a more human, intelligent and connected way to learn.</p><button className="arc2-outline-button" onClick={openEarlyAccess}>Sign Up for Early Access <ArrowRight size={15} /></button></div>
                    </div>
                    <div className="arc2-vision-object" aria-hidden="true"><div className="arc2-glass-sphere"><span>ARCANUM</span></div><div className="arc2-vision-ring vr1" /><div className="arc2-vision-ring vr2" /><div className="arc2-vision-ring vr3" /></div>
                </section>

                <section className="arc2-platform" id="platform">
                    <div className="arc2-section-wrap">
                        <div className="arc2-section-tag">04 / THE PLATFORM</div>
                        <div className="arc2-platform-head"><h2>One system.<br /><em>Four intelligent movements.</em></h2><p>Every capability works toward the same outcome: helping the student understand what matters, when it matters.</p></div>
                        <div className="arc2-platform-layout">
                            <div className="arc2-platform-visual">
                                <div className="arc2-platform-core"><Network size={28} /><span>ARCANUM</span><small>INTELLIGENCE LAYER</small></div>
                                <div className="arc2-platform-ring pr1" /><div className="arc2-platform-ring pr2" />
                                {platform.map((item, i) => <div key={item.n} className={`arc2-mini-node pn${i} ${active === i ? 'active' : ''}`}>{item.icon}</div>)}
                            </div>
                            <div className="arc2-platform-list">{platform.map((item, i) => <button key={item.n} className={`arc2-platform-row ${active === i ? 'active' : ''}`} onMouseEnter={() => setActive(i)}><span>{item.n}</span><div><h3>{item.title}</h3><p>{item.text}</p></div><ArrowRight size={17} /></button>)}</div>
                        </div>
                    </div>
                </section>

                {/* ── 05: DEMO VIDEO SHOWCASE ───────────────────────────────────────── */}
                <section className="arc2-demo-video-section" id="demo-video" style={{ padding: '80px 24px', position: 'relative' }}>
                    <div className="arc2-section-wrap" style={{ maxWidth: '1100px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                            <div className="arc2-section-tag" style={{ display: 'inline-block' }}>05 / LIVE DEMONSTRATION</div>
                            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, margin: '12px 0 16px 0', letterSpacing: '-0.02em' }}>
                                See intelligence in motion.<br />
                                <em style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', fontWeight: 500, color: '#7c3aed' }}>
                                    Speech to vernacular understanding.
                                </em>
                            </h2>
                            <p style={{ maxWidth: '640px', margin: '0 auto', fontSize: '16px', color: theme === 'dark' ? '#a1a1aa' : '#52525b', lineHeight: 1.6 }}>
                                Watch how ARCANUM streams lecture speech with Whisper ASR, extracts context in real time, and adapts complex academic concepts into any learner's vernacular.
                            </p>
                        </div>

                        {/* Modern Cinema Player Container */}
                        <div style={{
                            background: '#09090b',
                            borderRadius: '24px',
                            border: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'}`,
                            overflow: 'hidden',
                            boxShadow: '0 30px 80px -20px rgba(124, 58, 237, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)',
                            position: 'relative'
                        }}>
                            {/* Player Window Chrome Bar */}
                            <div style={{
                                height: '42px',
                                background: '#121217',
                                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '0 16px',
                                fontSize: '12px',
                                color: '#a1a1aa'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eab308' }} />
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }} />
                                    <span style={{ marginLeft: '12px', color: '#71717a', fontSize: '11px', fontFamily: 'monospace' }}>
                                        arcanum.ai/live/cs101-lecture
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 600 }}>
                                    <span style={{ display: 'inline-flex', width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
                                    <span style={{ color: '#22c55e' }}>98.4% ASR ACCURACY</span>
                                </div>
                            </div>

                            {/* Video / Player Area */}
                            <div style={{ position: 'relative', width: '100%', background: '#000000', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <video
                                    controls
                                    playsInline
                                    poster="./images/dezai-logo.png"
                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                >
                                    <source src="./images/demo.mp4" type="video/mp4" />
                                    <source src="./demo.mp4" type="video/mp4" />
                                    <source src="./images/video.mp4" type="video/mp4" />
                                    <source src="./video.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>

                            {/* Player Feature Highlights Bar */}
                            <div style={{
                                padding: '16px 24px',
                                background: '#121217',
                                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                                display: 'flex',
                                flexWrap: 'wrap',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '12px'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f4f4f5', fontSize: '13px', fontWeight: 600 }}>
                                    <Sparkles size={16} color="#b9a8ff" />
                                    <span>Continuous Dual-Tier Context Engine</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: '#a1a1aa' }}>
                                    <span>⚡ Whisper Streaming VAD</span>
                                    <span>·</span>
                                    <span>🇮🇳 Hindi &amp; Gujarati Translation</span>
                                    <span>·</span>
                                    <span>📚 Auto-Note Extraction</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="arc2-detail arc2-white">
                    <div className="arc2-section-wrap">
                        <div className="arc2-detail-grid">
                            <div><div className="arc2-section-tag">05 / BUILT DIFFERENTLY</div><h2>Quietly powerful.<br /><em>Beautifully connected.</em></h2></div>
                            <div className="arc2-detail-copy"><p>ARCANUM is built around the moments that make learning difficult: a concept that does not click, a lecture that moves too fast, a term that feels unfamiliar, or a question that appears five minutes after class.</p><div className="arc2-detail-stat"><strong>01</strong><span>Context follows the learner.</span></div><div className="arc2-detail-stat"><strong>02</strong><span>Language becomes a bridge, not a barrier.</span></div><div className="arc2-detail-stat"><strong>03</strong><span>Progress becomes visible and actionable.</span></div></div>
                        </div>
                    </div>
                </section>

                {/* 06: TEAM & LEADERSHIP SECTION */}
                <section className="arc2-team" id="team">
                    <div className="arc2-section-wrap arc2-team-wrap">
                        <div className="arc2-team-header-center">
                            <h2 className="arc2-team-headline">Meet our team!</h2>
                        </div>

                        {/* Team Grid */}
                        <div className="arc2-team-grid">
                            {teamMembers.map((m) => (
                                <article
                                    key={m.name}
                                    className="arc2-team-card arc2-team-card-interactive"
                                    onClick={() => setSelectedMember(m)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            setSelectedMember(m);
                                        }
                                    }}
                                    title={`Click to view ${m.name}'s profile`}
                                    aria-label={`View profile of ${m.name}`}
                                >
                                    <div className="arc2-team-media">
                                        <img src={m.photo} alt={m.name} className="arc2-team-img" loading="lazy" />
                                        <span className="arc2-team-badge">
                                            {m.domain}
                                        </span>
                                    </div>

                                    <div className="arc2-team-body">
                                        <div className="arc2-team-header">
                                            <h3>{m.name}</h3>
                                            <div className="arc2-team-specialty">{m.role}</div>
                                        </div>

                                        <p className="arc2-team-bio">{m.focus}</p>

                                        <div className="arc2-team-skills">
                                            {m.tags.map((s) => (
                                                <span key={s} className="arc2-team-chip">{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 07: CTA SECTION */}
                <section className="arc2-cta">
                    <div className="arc2-cta-stars" aria-hidden="true"><i /><i /><i /><i /><i /></div>
                    <div className="arc2-section-wrap">
                        <div className="arc2-section-tag">07 / BEGIN</div>
                        <h2>Make learning<br /><em>feel clearer.</em></h2>
                        <p>Step into the ARCANUM environment and see what an intelligent learning layer can feel like.</p>
                        <button className="arc2-white-button" onClick={openEarlyAccess}>Sign Up for Early Access <ArrowRight size={17} /></button>
                    </div>
                </section>
            </main>

            {/* ENHANCED MULTI-COLUMN FOOTER */}
            <footer className="arc2-footer">
                <div className="arc2-footer-container">
                    <div className="arc2-footer-grid" style={{ gridTemplateColumns: '2fr 1fr 1.2fr' }}>
                        {/* Col 1: Brand & Attribution */}
                        <div className="arc2-footer-col arc2-footer-brand-col">
                            <div className="arc2-brand" style={{ display: 'flex', alignItems: 'center' }}>
                                <ArcanumLogo variant="full" size={32} theme="dark" interactive />
                            </div>
                            <p className="arc2-footer-desc">
                                The continuous intelligence layer for higher education. Real-time vernacular comprehension, adaptive tutoring, and zero-distraction focus for every student.
                            </p>
                            <div className="arc2-footer-team-mention">
                                Crafted by <strong>Hetvi Sheth, Sneha Patel, Parisha, Priya Bhatt &amp; Isha Rajput</strong>
                            </div>
                        </div>

                        {/* Col 2: Platform Navigation */}
                        <div className="arc2-footer-col">
                            <h4>Platform</h4>
                            <ul>
                                <li><button onClick={() => go('problem')}>The Problem</button></li>
                                <li><button onClick={() => go('why')}>Why ARCANUM</button></li>
                                <li><button onClick={() => go('platform')}>Four Movements</button></li>
                                <li><button onClick={() => go('vision')}>Vision</button></li>
                                <li><button onClick={() => go('team')}>Engineering Team</button></li>
                            </ul>
                        </div>

                        {/* Col 3: Trust & Legal */}
                        <div className="arc2-footer-col">
                            <h4>Trust &amp; Legal</h4>
                            <ul>
                                <li><button onClick={() => setRoute('privacy')} className="arc2-footer-highlight-link"><Shield size={13} /> Privacy Policy</button></li>
                                <li><button onClick={() => setRoute('terms')} className="arc2-footer-highlight-link"><FileText size={13} /> Terms &amp; Conditions</button></li>
                                <li><span className="arc2-footer-compliance-tag">FERPA &amp; COPPA Aligned</span></li>
                                <li><span className="arc2-footer-compliance-tag">Zero-Retention Audio</span></li>
                            </ul>
                        </div>
                    </div>

                    <div className="arc2-footer-bottom">
                        <span>© 2026 ARCANUM AI. All rights reserved.</span>
                        <div className="arc2-footer-bottom-links">
                            <button onClick={() => setRoute('privacy')}>Privacy</button>
                            <span className="arc2-dot">·</span>
                            <button onClick={() => setRoute('terms')}>Terms</button>
                            <span className="arc2-dot">·</span>
                            <button onClick={() => go('team')}>Team</button>
                        </div>
                    </div>
                </div>
            </footer>
            {/* ── TEAM MEMBER MODAL (DHAIRYA DESAI DEZAI.ORG STYLE) ────────── */}
            {selectedMember && (
                <div
                    className="arc2-member-modal-overlay"
                    onClick={() => setSelectedMember(null)}
                    role="dialog"
                    aria-modal="true"
                    aria-label={selectedMember.name}
                >
                    <div
                        className="arc2-member-modal-card"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Circular Close Button */}
                        <button
                            className="arc2-member-modal-close"
                            onClick={() => setSelectedMember(null)}
                            aria-label="Close profile modal"
                        >
                            <X size={18} />
                        </button>

                        {/* Profile Avatar Frame */}
                        <div className="arc2-member-modal-avatar">
                            <img
                                src={selectedMember.photo}
                                alt={selectedMember.name}
                            />
                        </div>

                        {/* Name */}
                        <h2 className="arc2-member-modal-name">{selectedMember.name}</h2>

                        {/* Role / Amber Subtitle */}
                        <div className="arc2-member-modal-role">{selectedMember.role}</div>

                        {/* Bio Paragraphs */}
                        <div className="arc2-member-modal-bio">
                            {(selectedMember.bioParagraphs || [selectedMember.focus]).map((p, idx) => (
                                <p key={idx}>{p}</p>
                            ))}
                        </div>

                        {/* Numbered Badges (Pills) */}
                        <div className="arc2-member-modal-tags">
                            {selectedMember.tags.map((tag, idx) => (
                                <span key={tag} className="arc2-member-modal-pill">
                                    <span className="arc2-member-modal-num">
                                        {String(idx + 1).padStart(2, '0')}
                                    </span>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ── EARLY ACCESS MODAL ─────────────────────────────────────── */}
            {earlyAccessOpen && (
                <div
                    className="arc2-member-modal-overlay"
                    onClick={() => { setEarlyAccessOpen(false); setEarlySubmitted(false); }}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Sign Up for Early Access"
                >
                    <div
                        className="arc2-member-modal-card"
                        onClick={(e) => e.stopPropagation()}
                        style={{ maxWidth: '500px', padding: '36px 32px' }}
                    >
                        {/* Close button */}
                        <button
                            className="arc2-member-modal-close"
                            onClick={() => { setEarlyAccessOpen(false); setEarlySubmitted(false); }}
                            aria-label="Close modal"
                        >
                            <X size={18} />
                        </button>

                        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                            <div style={{ display: 'inline-flex', padding: '12px', borderRadius: '16px', background: theme === 'dark' ? 'rgba(124, 58, 237, 0.15)' : 'rgba(124, 58, 237, 0.08)', marginBottom: '16px' }}>
                                <Sparkles size={28} color="#7c3aed" />
                            </div>
                            <h2 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 8px 0' }}>
                                {earlySubmitted ? "You're on the list!" : "Sign Up for Early Access"}
                            </h2>
                            <p style={{ color: theme === 'dark' ? '#a1a1aa' : '#52525b', fontSize: '14px', lineHeight: 1.5, margin: 0 }}>
                                {earlySubmitted
                                    ? "Thank you for joining! We are rolling out private access batches weekly. Check your inbox soon."
                                    : "Be the first to experience real-time lecture intelligence, vernacular comprehension, and adaptive tutoring."}
                            </p>
                        </div>

                        {earlySubmitted ? (
                            <div style={{ textAlign: 'center', padding: '16px 0' }}>
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '9999px', background: 'rgba(34, 197, 94, 0.12)', color: '#22c55e', fontWeight: 600, fontSize: '14px', marginBottom: '20px' }}>
                                    <CheckCircle2 size={16} /> Priority Invitation Confirmed
                                </div>
                                <button
                                    onClick={() => { setEarlyAccessOpen(false); setEarlySubmitted(false); }}
                                    className="arc2-black-button"
                                    style={{ width: '100%', justifyContent: 'center' }}
                                >
                                    Back to Overview
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleEarlyAccessSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', color: theme === 'dark' ? '#a1a1aa' : '#71717a' }}>
                                        I am a:
                                    </label>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                                        {[
                                            { id: 'student', label: 'Student' },
                                            { id: 'educator', label: 'Educator' },
                                            { id: 'institution', label: 'Institution' },
                                        ].map((r) => (
                                            <button
                                                key={r.id}
                                                type="button"
                                                onClick={() => setEarlyRole(r.id as any)}
                                                style={{
                                                    padding: '8px 12px',
                                                    borderRadius: '10px',
                                                    border: earlyRole === r.id
                                                        ? '2px solid #7c3aed'
                                                        : `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)'}`,
                                                    background: earlyRole === r.id
                                                        ? (theme === 'dark' ? 'rgba(124, 58, 237, 0.2)' : 'rgba(124, 58, 237, 0.08)')
                                                        : (theme === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.02)'),
                                                    color: earlyRole === r.id ? '#7c3aed' : 'inherit',
                                                    fontWeight: earlyRole === r.id ? 700 : 500,
                                                    fontSize: '13px',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.15s ease'
                                                }}
                                            >
                                                {r.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', color: theme === 'dark' ? '#a1a1aa' : '#71717a' }}>
                                        Email Address:
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                                        <input
                                            type="email"
                                            required
                                            value={earlyEmail}
                                            onChange={(e) => setEarlyEmail(e.target.value)}
                                            placeholder="you@university.edu"
                                            style={{
                                                width: '100%',
                                                padding: '12px 14px 12px 40px',
                                                borderRadius: '12px',
                                                border: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)'}`,
                                                background: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
                                                color: 'inherit',
                                                fontSize: '14px',
                                                outline: 'none',
                                                boxSizing: 'border-box'
                                            }}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="arc2-black-button"
                                    style={{
                                        width: '100%',
                                        justifyContent: 'center',
                                        marginTop: '8px',
                                        padding: '12px',
                                        background: '#7c3aed',
                                        color: '#ffffff',
                                        borderColor: '#7c3aed'
                                    }}
                                >
                                    Request Early Access <ArrowRight size={16} />
                                </button>
                                <span style={{ fontSize: '11px', textAlign: 'center', color: '#9ca3af' }}>
                                    🔒 No spam. Zero audio retention. FERPA &amp; COPPA compliant.
                                </span>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LandingPage;
