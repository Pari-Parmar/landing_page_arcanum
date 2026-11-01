import React, { useState } from 'react';
import { useApp } from './AppContext';
import { ArcanumLogo } from './ArcanumLogo';
import {
    CheckCircle2, Mail, Lock, Eye, EyeOff,
    ArrowRight, GraduationCap, Building2,
    Sparkles, ArrowLeft
} from 'lucide-react';
import './landing.css';

export const AuthPage: React.FC = () => {
    const { setRoute, theme } = useApp();
    const [tab, setTab] = useState<'signin' | 'signup'>('signin');
    const [role, setRole] = useState<'student' | 'faculty'>('student');
    const [email, setEmail] = useState('student@university.edu');
    const [password, setPassword] = useState('••••••••');
    const [fullName, setFullName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState('');

    const fillDemo = (type: 'student' | 'faculty') => {
        setRole(type);
        if (type === 'student') {
            setEmail('student@arcanum.ai');
            setPassword('Demo@123');
            setFullName('Aarav Patel');
        } else {
            setEmail('faculty@arcanum.ai');
            setPassword('Faculty@2026');
            setFullName('Dr. Priya Sharma');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoggedIn(true);
        setLoggedInUser(email || 'User');
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0a0a0c',
            color: '#f4f4f5',
            fontFamily: "'DM Sans', Inter, system-ui, sans-serif",
            padding: '24px 16px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Ambience */}
            <div style={{
                position: 'fixed',
                inset: 0,
                pointerEvents: 'none',
                background: 'radial-gradient(circle at 20% 20%, rgba(124, 58, 237, 0.15), transparent 45%), radial-gradient(circle at 80% 80%, rgba(244, 114, 182, 0.08), transparent 45%)',
                zIndex: 0
            }} />

            {/* Back Button */}
            <header style={{
                position: 'absolute',
                top: '20px',
                left: '24px',
                right: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 10
            }}>
                <button
                    onClick={() => setRoute('landing')}
                    style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.14)',
                        color: '#f4f4f5',
                        padding: '8px 16px',
                        borderRadius: '9999px',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.2s ease'
                    }}
                >
                    <ArrowLeft size={15} /> Back to Overview
                </button>

                <div style={{ fontSize: '13px', color: '#a1a1aa' }}>
                    Need help? <a href="mailto:support@arcanum.ai" style={{ color: '#b9a8ff', textDecoration: 'none' }}>support@arcanum.ai</a>
                </div>
            </header>

            {/* Split Auth Card */}
            <div style={{
                width: '100%',
                maxWidth: '1020px',
                background: '#ffffff',
                borderRadius: '28px',
                display: 'grid',
                gridTemplateColumns: '1fr 1.22fr',
                overflow: 'hidden',
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08)',
                position: 'relative',
                zIndex: 2,
                margin: '40px 0'
            }}>
                {/* LEFT COLUMN: Dark Luxury Brand Side */}
                <div style={{
                    background: '#0d0d10',
                    color: '#ffffff',
                    padding: '48px 40px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* Subtle glow inside left column */}
                    <div style={{
                        position: 'absolute',
                        top: '-10%',
                        right: '-10%',
                        width: '280px',
                        height: '280px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(124, 58, 237, 0.25) 0%, transparent 70%)',
                        pointerEvents: 'none'
                    }} />

                    <div>
                        {/* Logo */}
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
                            <ArcanumLogo variant="full" size={32} theme="dark" interactive />
                        </div>

                        {/* Portal Badge */}
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: 'rgba(124, 58, 237, 0.16)',
                            border: '1px solid rgba(185, 168, 255, 0.25)',
                            padding: '6px 14px',
                            borderRadius: '9999px',
                            fontSize: '11px',
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            color: '#b9a8ff',
                            textTransform: 'uppercase',
                            marginBottom: '28px'
                        }}>
                            <GraduationCap size={14} /> Student &amp; Academic Portal
                        </div>

                        {/* Title & Headline */}
                        <h1 style={{
                            fontSize: '32px',
                            fontWeight: 700,
                            lineHeight: 1.2,
                            letterSpacing: '-0.02em',
                            margin: '0 0 16px 0',
                            fontFamily: "'DM Sans', sans-serif"
                        }}>
                            Understand more.<br />
                            <em style={{
                                fontFamily: "'Playfair Display', Georgia, serif",
                                fontStyle: 'italic',
                                fontWeight: 500,
                                background: 'linear-gradient(135deg, #f5d0c5 0%, #b9a8ff 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                Learn without limits.
                            </em>
                        </h1>

                        <p style={{
                            fontSize: '14px',
                            lineHeight: 1.6,
                            color: '#a1a1aa',
                            margin: '0 0 36px 0'
                        }}>
                            Live translations, vernacular notes and an AI tutor built around the way students learn best.
                        </p>

                        {/* Key Feature List */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {[
                                'Real-Time Multilingual Lecture Sync',
                                'Contextual AI Tutor & 3D Flashcards',
                                '12+ Indian Regional Dialects & Study Notes',
                                'Zero-Retention Audio Privacy Shield'
                            ].map((feat) => (
                                <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#e4e4e7' }}>
                                    <div style={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        background: 'rgba(124, 58, 237, 0.2)',
                                        border: '1px solid rgba(185, 168, 255, 0.4)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                    }}>
                                        <CheckCircle2 size={13} color="#b9a8ff" />
                                    </div>
                                    <span>{feat}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Left footer note */}
                    <div style={{
                        marginTop: '40px',
                        paddingTop: '20px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                        fontSize: '11px',
                        color: '#71717a',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <span>FERPA &amp; COPPA Aligned</span>
                        <span>v2.4 Production</span>
                    </div>
                </div>

                {/* RIGHT COLUMN: Crisp White Login/Signup Form */}
                <div style={{
                    padding: '48px 44px',
                    color: '#0a0a0b',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    background: '#ffffff'
                }}>
                    <div>
                        {/* Header */}
                        <div style={{ marginBottom: '24px' }}>
                            <h2 style={{
                                fontSize: '26px',
                                fontWeight: 700,
                                margin: '0 0 6px 0',
                                letterSpacing: '-0.02em',
                                color: '#09090b'
                            }}>
                                {tab === 'signin' ? 'Student Portal Login' : 'Create Student Account'}
                            </h2>
                            <p style={{
                                fontSize: '14px',
                                color: '#71717a',
                                margin: 0
                            }}>
                                {tab === 'signin'
                                    ? 'Welcome back! Sign in to continue your vernacular studies & notes.'
                                    : 'Start understanding lectures in real time with continuous AI assistance.'}
                            </p>
                        </div>

                        {/* Tab Switcher */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            background: '#f4f4f5',
                            padding: '4px',
                            borderRadius: '12px',
                            marginBottom: '20px'
                        }}>
                            <button
                                type="button"
                                onClick={() => setTab('signin')}
                                style={{
                                    border: 'none',
                                    borderRadius: '9px',
                                    padding: '8px 16px',
                                    fontSize: '13px',
                                    fontWeight: tab === 'signin' ? 700 : 500,
                                    background: tab === 'signin' ? '#ffffff' : 'transparent',
                                    color: tab === 'signin' ? '#09090b' : '#71717a',
                                    boxShadow: tab === 'signin' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.15s ease'
                                }}
                            >
                                Sign In
                            </button>
                            <button
                                type="button"
                                onClick={() => setTab('signup')}
                                style={{
                                    border: 'none',
                                    borderRadius: '9px',
                                    padding: '8px 16px',
                                    fontSize: '13px',
                                    fontWeight: tab === 'signup' ? 700 : 500,
                                    background: tab === 'signup' ? '#ffffff' : 'transparent',
                                    color: tab === 'signup' ? '#09090b' : '#71717a',
                                    boxShadow: tab === 'signup' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '6px',
                                    transition: 'all 0.15s ease'
                                }}
                            >
                                <Sparkles size={13} color="#7c3aed" /> Create Account (Sign Up)
                            </button>
                        </div>

                        {/* Continue with Google Button */}
                        <button
                            type="button"
                            onClick={() => fillDemo('student')}
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                padding: '11px',
                                borderRadius: '12px',
                                border: '1px solid #e4e4e7',
                                background: '#ffffff',
                                color: '#18181b',
                                fontSize: '14px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                marginBottom: '20px',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = '#fcfcfc')}
                            onMouseLeave={(e) => (e.currentTarget.style.background = '#ffffff')}
                        >
                            {/* Google "G" logo */}
                            <svg width="18" height="18" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.15z"/>
                                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                            </svg>
                            Continue with Google
                        </button>

                        {/* Divider */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            margin: '18px 0',
                            color: '#a1a1aa',
                            fontSize: '11px',
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase'
                        }}>
                            <div style={{ flex: 1, height: '1px', background: '#f4f4f5' }} />
                            <span style={{ padding: '0 12px' }}>or email sign in</span>
                            <div style={{ flex: 1, height: '1px', background: '#f4f4f5' }} />
                        </div>

                        {/* Form */}
                        {isLoggedIn ? (
                            <div style={{
                                background: 'rgba(34, 197, 94, 0.08)',
                                border: '1px solid rgba(34, 197, 94, 0.25)',
                                padding: '24px',
                                borderRadius: '16px',
                                textAlign: 'center',
                                margin: '20px 0'
                            }}>
                                <CheckCircle2 size={36} color="#22c55e" style={{ margin: '0 auto 12px auto' }} />
                                <h3 style={{ margin: '0 0 6px 0', color: '#15803d', fontSize: '18px' }}>
                                    Authenticated Successfully!
                                </h3>
                                <p style={{ margin: '0 0 16px 0', color: '#166534', fontSize: '13px' }}>
                                    Welcome back, <strong>{loggedInUser}</strong>. Your session is now synchronized.
                                </p>
                                <button
                                    onClick={() => setRoute('landing')}
                                    className="arc2-black-button"
                                    style={{ width: '100%', justifyContent: 'center' }}
                                >
                                    Return to Lecture Hall
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                {tab === 'signup' && (
                                    <div>
                                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#71717a', marginBottom: '6px' }}>
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            placeholder="Aarav Patel"
                                            style={{
                                                width: '100%',
                                                padding: '11px 14px',
                                                borderRadius: '10px',
                                                border: '1px solid #e4e4e7',
                                                fontSize: '14px',
                                                color: '#09090b',
                                                outline: 'none',
                                                boxSizing: 'border-box'
                                            }}
                                        />
                                    </div>
                                )}

                                {/* Email Address */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#71717a', marginBottom: '6px' }}>
                                        Email Address
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="student@university.edu"
                                            style={{
                                                width: '100%',
                                                padding: '11px 14px 11px 38px',
                                                borderRadius: '10px',
                                                border: '1px solid #e4e4e7',
                                                fontSize: '14px',
                                                color: '#09090b',
                                                outline: 'none',
                                                boxSizing: 'border-box'
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                        <label style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#71717a' }}>
                                            Password
                                        </label>
                                        <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Password reset link has been dispatched to your email address."); }} style={{ fontSize: '12px', color: '#7c3aed', textDecoration: 'none', fontWeight: 600 }}>
                                            Forgot password?
                                        </a>
                                    </div>
                                    <div style={{ position: 'relative' }}>
                                        <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            style={{
                                                width: '100%',
                                                padding: '11px 38px 11px 38px',
                                                borderRadius: '10px',
                                                border: '1px solid #e4e4e7',
                                                fontSize: '14px',
                                                color: '#09090b',
                                                outline: 'none',
                                                boxSizing: 'border-box'
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(v => !v)}
                                            style={{
                                                position: 'absolute',
                                                right: '12px',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                color: '#9ca3af',
                                                padding: 0
                                            }}
                                            aria-label="Toggle password visibility"
                                        >
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Submit button */}
                                <button
                                    type="submit"
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        padding: '13px',
                                        borderRadius: '12px',
                                        background: '#09090b',
                                        color: '#ffffff',
                                        border: 'none',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        transition: 'background 0.2s ease',
                                        marginTop: '4px'
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.background = '#27272a')}
                                    onMouseLeave={(e) => (e.currentTarget.style.background = '#09090b')}
                                >
                                    {tab === 'signin' ? 'Sign In to Student Portal' : 'Create Student Account'} <ArrowRight size={15} />
                                </button>
                            </form>
                        )}
                    </div>

                    {/* BOTTOM: Quick Demo Account Auto-Fill */}
                    <div style={{
                        marginTop: '22px',
                        background: '#f9f9fb',
                        border: '1px solid #ebecef',
                        borderRadius: '12px',
                        padding: '12px 14px'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 600, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                Demo Accounts
                            </span>
                            <span style={{ fontSize: '11px', color: '#9ca3af' }}>
                                One-click auto-fill
                            </span>
                        </div>

                        {/* Demo buttons */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                            <button
                                type="button"
                                onClick={() => fillDemo('student')}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '6px',
                                    padding: '8px 10px',
                                    borderRadius: '8px',
                                    border: '1px solid #e4e4e7',
                                    background: '#ffffff',
                                    color: '#18181b',
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.15s ease'
                                }}
                            >
                                <GraduationCap size={14} color="#7c3aed" /> Student Demo
                            </button>

                            <button
                                type="button"
                                onClick={() => fillDemo('faculty')}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '6px',
                                    padding: '8px 10px',
                                    borderRadius: '8px',
                                    border: '1px solid #e4e4e7',
                                    background: '#ffffff',
                                    color: '#18181b',
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.15s ease'
                                }}
                            >
                                <Building2 size={14} color="#059669" /> Faculty Demo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;

