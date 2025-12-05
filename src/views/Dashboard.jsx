import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import StatsCard from '../components/StatsCard';
import RecentScans from '../components/RecentScans';
import { Box, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

const Dashboard = () => {
    const scans = useLiveQuery(() => db.scans.toArray());
    const issues = useLiveQuery(() => db.issues.toArray());

    // Calculate stats
    const stats = React.useMemo(() => {
        if (!scans || !issues) return { total: 0, verified: 0, discrepancies: 0, pending: 0 };

        const scanStats = scans.reduce((acc, scan) => {
            // Sum of items (using actualCount)
            const actual = parseInt(scan.actualCount) || 0;

            acc.total += actual;

            if (scan.status === 'Verified') {
                acc.verified += actual;
            } else if (scan.status === 'Pending') {
                acc.pending += 1;
            }

            return acc;
        }, { total: 0, verified: 0, pending: 0 });

        // Discrepancy amount = sum of the discrepancy amount in the issues
        const discrepancies = issues.reduce((sum, issue) => {
            const expected = parseInt(issue.expectedQty) || 0;
            const actual = parseInt(issue.actualQty) || 0;
            return sum + Math.abs(expected - actual);
        }, 0);

        return { ...scanStats, discrepancies };
    }, [scans, issues]);

    const accuracy = stats.total > 0 ? Math.round((stats.verified / stats.total) * 100) : 0;

    return (
        <div className="container">
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 'var(--spacing-md)'
            }}>
                <StatsCard
                    title="Total Items"
                    value={stats.total.toLocaleString()}
                    trend="+12% from last month"
                    trendPositive={true}
                    icon={Box}
                    color="primary"
                />
                <StatsCard
                    title="Verified"
                    value={stats.verified.toLocaleString()}
                    trend={`${accuracy}% accuracy`}
                    trendPositive={accuracy >= 90}
                    icon={CheckCircle}
                    color="success"
                />
                <StatsCard
                    title="Discrepancies"
                    value={stats.discrepancies.toLocaleString()}
                    trend="Needs attention"
                    trendPositive={false}
                    icon={AlertTriangle}
                    color="warning"
                />
                <StatsCard
                    title="Pending Scans"
                    value={stats.pending.toString()}
                    trend="Scheduled today"
                    trendPositive={true}
                    icon={Clock}
                    color="primary"
                />
            </div>

            <RecentScans />
        </div>
    );
};

export default Dashboard;
