import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';

const ScanItem = ({ location, actualCount, expectedCount, status, timestamp }) => {
    const isVerified = status === 'Verified';

    // Simple time ago formatter
    const getTimeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);

        if (seconds < 60) return 'Just now';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes} mins ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} hours ago`;
        return date.toLocaleDateString();
    };

    return (
        <div className="card" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 'var(--spacing-md)',
            border: '1px solid var(--color-border)',
            marginBottom: 'var(--spacing-md)',
        }}>
            <div className="flex items-center gap-md">
                <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: isVerified ? 'var(--color-success)' : 'var(--color-warning)'
                }} />
                <div>
                    <p className="font-bold">{location}</p>
                    <p className="text-sm text-secondary">
                        {actualCount} items (Exp: {expectedCount})
                    </p>
                </div>
            </div>
            <div style={{ textAlign: 'right' }}>
                <p className="font-bold" style={{
                    color: isVerified ? 'var(--color-success)' : 'var(--color-warning)'
                }}>
                    {status}
                </p>
                <p className="text-sm text-secondary">{getTimeAgo(timestamp)}</p>
            </div>
        </div>
    );
};

const RecentScans = () => {
    const scans = useLiveQuery(() => db.scans.orderBy('timestamp').reverse().toArray());

    if (!scans) return null;

    return (
        <div style={{ marginTop: 'var(--spacing-xl)' }}>
            <h2 className="font-bold" style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--spacing-md)' }}>Recent Scans</h2>
            <div>
                {scans.map((scan) => (
                    <ScanItem key={scan.id} {...scan} />
                ))}
            </div>
        </div>
    );
};

export default RecentScans;
