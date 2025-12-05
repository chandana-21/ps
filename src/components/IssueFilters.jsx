import React from 'react';
import { Search, Filter, AlertCircle, CheckCircle } from 'lucide-react';

const IssueStats = () => {
    return (
        <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-xl)' }}>
            <div style={{
                flex: 1,
                backgroundColor: 'var(--color-surface)',
                padding: 'var(--spacing-md)',
                borderRadius: 'var(--radius-lg)',
                borderLeft: '4px solid var(--color-warning)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div>
                    <p className="text-sm text-secondary">High Priority</p>
                    <h3 className="font-bold" style={{ fontSize: 'var(--font-size-xl)' }}>1</h3>
                </div>
                <AlertCircle color="var(--color-warning)" />
            </div>

            <div style={{
                flex: 1,
                backgroundColor: 'var(--color-surface)',
                padding: 'var(--spacing-md)',
                borderRadius: 'var(--radius-lg)',
                borderLeft: '4px solid var(--color-info)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div>
                    <p className="text-sm text-secondary">Under Review</p>
                    <h3 className="font-bold" style={{ fontSize: 'var(--font-size-xl)' }}>2</h3>
                </div>
                <AlertCircle color="var(--color-info)" />
            </div>

            <div style={{
                flex: 1,
                backgroundColor: 'var(--color-surface)',
                padding: 'var(--spacing-md)',
                borderRadius: 'var(--radius-lg)',
                borderLeft: '4px solid var(--color-success)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div>
                    <p className="text-sm text-secondary">Resolved Today</p>
                    <h3 className="font-bold" style={{ fontSize: 'var(--font-size-xl)' }}>1</h3>
                </div>
                <CheckCircle color="var(--color-success)" />
            </div>
        </div>
    );
};

const IssueFilters = () => {
    return (
        <div>
            <div className="flex justify-between items-end" style={{ marginBottom: 'var(--spacing-lg)' }}>
                <div>
                    <h2 className="font-bold" style={{ fontSize: 'var(--font-size-2xl)' }}>Discrepancies</h2>
                    <p className="text-secondary">Review and resolve inventory mismatches</p>
                </div>
                <div className="flex gap-sm">
                    <div style={{ position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }} />
                        <input
                            type="text"
                            placeholder="Search items..."
                            className="input-field"
                            style={{
                                paddingLeft: '36px',
                                minWidth: '240px'
                            }}
                        />
                    </div>
                    <button className="btn btn-secondary" style={{ padding: '8px' }}>
                        <Filter size={20} />
                    </button>
                </div>
            </div>
            <IssueStats />
        </div>
    );
};

export default IssueFilters;
