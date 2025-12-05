import React from 'react';

const StatsCard = ({ title, value, trend, icon: Icon, trendPositive, color = 'primary' }) => {
    const getColors = () => {
        switch (color) {
            case 'success': return { bg: 'var(--color-success-bg)', text: 'var(--color-success)' };
            case 'warning': return { bg: 'var(--color-warning-bg)', text: 'var(--color-warning)' };
            case 'primary':
            default: return { bg: 'var(--color-info-bg)', text: 'var(--color-primary)' };
        }
    };

    const colors = getColors();

    return (
        <div className="card" style={{
            padding: 'var(--spacing-lg)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
        }}>
            <div>
                <p className="text-sm text-secondary font-medium" style={{ marginBottom: 'var(--spacing-xs)' }}>{title}</p>
                <h3 className="font-bold" style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--spacing-xs)' }}>{value}</h3>
                {trend && (
                    <p className="text-sm font-medium" style={{
                        color: trendPositive ? 'var(--color-primary)' : 'var(--color-warning)'
                    }}>
                        {trend}
                    </p>
                )}
            </div>
            <div style={{
                backgroundColor: colors.bg,
                color: colors.text,
                padding: 'var(--spacing-sm)',
                borderRadius: 'var(--radius-md)',
                display: 'flex'
            }}>
                <Icon size={24} />
            </div>
        </div>
    );
};

export default StatsCard;
