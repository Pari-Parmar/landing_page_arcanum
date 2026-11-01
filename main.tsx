import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider, useApp } from './AppContext';
import { LandingPage } from './landingpage';
import { AuthPage } from './AuthPage';
import './landing.css';

const App: React.FC = () => {
    const { route } = useApp();
    if (route === 'login' || route === 'signup' || route === 'auth') {
        return <AuthPage />;
    }
    return <LandingPage />;
};

const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <AppProvider>
                <App />
            </AppProvider>
        </React.StrictMode>
    );
}
