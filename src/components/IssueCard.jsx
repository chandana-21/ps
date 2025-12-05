import React from 'react';
import { AlertCircle, MoreHorizontal } from 'lucide-react';

const IssueCard = ({ priority, date, location, expected, actual, expectedQty, actualQty }) => {
    const getPriorityColor = () => {
        switch (priority) {
            case 'high': return { bg: '#FEF2F2', text: '#EF4444' };
            case 'medium': return { bg: '#FFFBEB', text: '#F59E0B' };
            case 'low': return { bg: '#F1F5F9', text: '#64748B' };
            default: return { bg: '#F1F5F9', text: '#64748B' };
        }
    };

    const pColor = getPriorityColor();

    return (
        <div className="card" style={{
            padding: 'var(--spacing-lg)',
            border: '1px solid var(--color-border)',
            marginBottom: 'var(--spacing-md)'
        }}>
            <div className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-sm)' }}>
                <div className="flex items-center gap-md">
                    <span style={{
                        backgroundColor: pColor.bg,
                        color: pColor.text,
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: 'var(--font-size-sm)',
                        fontWeight: '600',
                        textTransform: 'uppercase'
                    }}>
                        {priority}
                    </span>
                    <span className="text-sm text-secondary">{date}</span>
                </div>
                <AlertCircle size={20} color="var(--color-warning)" />
            </div>

            <h3 className="font-bold" style={{ marginBottom: 'var(--spacing-md)' }}>{location}</h3>

            <div style={{
                backgroundColor: 'var(--color-background)',
                padding: 'var(--spacing-md)',
                borderRadius: 'var(--radius-md)',
                marginBottom: 'var(--spacing-lg)'
            }}>
                <div className="flex justify-between" style={{ marginBottom: '8px' }}>
                    <span className="text-secondary font-medium">Expected:</span>
                    <span className="font-bold">{expected} - Qty: {expectedQty}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-secondary font-medium">Actual:</span>
                    <span className="font-bold">{actual} - Qty: {actualQty}</span>
                </div>
            </div>

            <div className="flex gap-md">
                <button className="btn btn-primary" style={{ flex: 1 }}>
                    Resolve
                </button>
                <button className="btn btn-secondary" style={{ flex: 1 }}>
                    Investigate
                </button>
                <button className="btn btn-ghost">
                    <span className="font-medium">More</span>
                </button>
            </div>
        </div>
    );
};

export default IssueCard;
