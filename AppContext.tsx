/**
 * AppContext.tsx — Self-contained context for the ARCANUM landing page.
 *
 * Provides:
 *   - route / setRoute
 *   - theme / toggleTheme
 *   - useApp() with safe fallback (never throws, safe outside provider)
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

export const PUBLIC_PAGES = [
    'landing',
    'login',
    'signup',
    'onboarding',
    'privacy',
    'terms',
    'auth/callback',
    'auth-callback',
];

export const TUTOR_ONLY_PAGES = [
    'tutor-dashboard',
    'ingestion',
];

export interface AppContextType {
    route: string;
    setRoute: (page: string) => void;
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

const defaultAppContext: AppContextType = {
    route: 'landing',
    setRoute: () => { },
    theme: 'dark',
    toggleTheme: () => { }
};

const AppContext = createContext<AppContextType>(defaultAppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [route, setRouteState] = useState<string>('landing');

    const getInitialTheme = (): 'light' | 'dark' => {
        try {
            const stored = localStorage.getItem('arcanum-theme');
            if (stored === 'light' || stored === 'dark') return stored;
        } catch {
            // localStorage unavailable
        }
        if (typeof window !== 'undefined' && window.matchMedia) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return 'dark';
    };

    const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);

    useEffect(() => {
        if (typeof document !== 'undefined') {
            document.documentElement.setAttribute('data-theme', theme);
            if (theme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
        try {
            localStorage.setItem('arcanum-theme', theme);
        } catch {
            // ignore
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    };

    const setRoute = (page: string) => {
        setRouteState(page);
        try {
            window.history.pushState({}, '', `/${page === 'landing' ? '' : page}`);
        } catch {
            // ignore
        }
    };

    return (
        <AppContext.Provider value={{ route, setRoute, theme, toggleTheme }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = (): AppContextType => {
    const ctx = useContext(AppContext);
    return ctx || defaultAppContext;
};

export default AppContext;
