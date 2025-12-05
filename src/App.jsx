import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './views/Dashboard';
import ScanView from './views/ScanView';
import IssuesView from './views/IssuesView';
import DataView from './views/DataView';
import { LayoutDashboard, Scan, AlertCircle, Database } from 'lucide-react';

function App() {
    const [activeTab, setActiveTab] = useState('dashboard');

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard': return <Dashboard />;
            case 'scan': return <ScanView />;
            case 'issues': return <IssuesView />;
            case 'data': return <DataView />;
            default: return <Dashboard />;
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />

            <main style={{ flex: 1, padding: 'var(--spacing-xl) 0' }}>
                {/* Tab Navigation */}
                <div className="container" style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--spacing-xl)' }}>
                    <div style={{
                        backgroundColor: 'var(--color-border)',
                        padding: '4px',
                        borderRadius: 'var(--radius-lg)',
                        display: 'inline-flex',
                        gap: '4px'
                    }}>
                        <button
                            onClick={() => setActiveTab('dashboard')}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '8px 16px',
                                borderRadius: 'var(--radius-md)',
                                border: 'none',
                                backgroundColor: activeTab === 'dashboard' ? 'var(--color-surface)' : 'transparent',
                                color: activeTab === 'dashboard' ? 'var(--color-text-main)' : 'var(--color-text-secondary)',
                                fontWeight: '500',
                                boxShadow: activeTab === 'dashboard' ? 'var(--shadow-sm)' : 'none',
                                transition: 'all 0.2s'
                            }}
                        >
                            <LayoutDashboard size={18} />
                            Dashboard
                        </button>
                        <button
                            onClick={() => setActiveTab('scan')}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '8px 16px',
                                borderRadius: 'var(--radius-md)',
                                border: 'none',
                                backgroundColor: activeTab === 'scan' ? 'var(--color-surface)' : 'transparent',
                                color: activeTab === 'scan' ? 'var(--color-text-main)' : 'var(--color-text-secondary)',
                                fontWeight: '500',
                                boxShadow: activeTab === 'scan' ? 'var(--shadow-sm)' : 'none',
                                transition: 'all 0.2s'
                            }}
                        >
                            <Scan size={18} />
                            Scan
                        </button>
                        <button
                            onClick={() => setActiveTab('issues')}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '8px 16px',
                                borderRadius: 'var(--radius-md)',
                                border: 'none',
                                backgroundColor: activeTab === 'issues' ? 'var(--color-surface)' : 'transparent',
                                color: activeTab === 'issues' ? 'var(--color-text-main)' : 'var(--color-text-secondary)',
                                fontWeight: '500',
                                boxShadow: activeTab === 'issues' ? 'var(--shadow-sm)' : 'none',
                                transition: 'all 0.2s'
                            }}
                        >
                            <AlertCircle size={18} />
                            Issues
                        </button>
                        <button
                            onClick={() => setActiveTab('data')}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '8px 16px',
                                borderRadius: 'var(--radius-md)',
                                border: 'none',
                                backgroundColor: activeTab === 'data' ? 'var(--color-surface)' : 'transparent',
                                color: activeTab === 'data' ? 'var(--color-text-main)' : 'var(--color-text-secondary)',
                                fontWeight: '500',
                                boxShadow: activeTab === 'data' ? 'var(--shadow-sm)' : 'none',
                                transition: 'all 0.2s'
                            }}
                        >
                            <Database size={18} />
                            Data
                        </button>
                    </div>
                </div>

                {renderContent()}
            </main>
        </div>
    );
}

export default App;
