import React from 'react';
import { Layers, LayoutDashboard, Scan, AlertCircle, Maximize2 } from 'lucide-react';

const Header = ({ activeTab, onTabChange }) => {
    return (
        <header style={{
            backgroundColor: 'var(--color-surface)',
            borderBottom: '1px solid var(--color-border)',
            padding: 'var(--spacing-md) var(--spacing-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 10
        }}>
            <div className="flex items-center gap-md">
                <div style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                    padding: '8px',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex'
                }}>
                    <Layers size={24} />
                </div>
                <div>
                    <h1 className="font-bold" style={{ fontSize: 'var(--font-size-lg)' }}>SmartStock</h1>
                    <p className="text-sm text-secondary">AI Inventory Validation</p>
                </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                {/* Navigation could go here or in the main content area as tabs. 
            Based on screenshot, the tabs (Dashboard, Scan, Issues) are in the content area.
            The header mainly has the logo and the "View Live Feed" button. 
            Wait, looking at the first screenshot, the tabs are centered in the page content, not in the header.
            The header has "SmartStock" on left and "View Live Feed" on right.
        */}
            </div>

            <button className="btn btn-primary">
                <Maximize2 size={18} />
                View Live Feed
            </button>
        </header>
    );
};

export default Header;
