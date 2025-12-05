import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { Trash2, RefreshCw } from 'lucide-react';
import boxesImage from '../assets/boxes_a.jpg';

const ImageCell = ({ image, fallback }) => {
    const [url, setUrl] = React.useState(null);

    React.useEffect(() => {
        if (image instanceof Blob || image instanceof File) {
            const objectUrl = URL.createObjectURL(image);
            setUrl(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        } else if (typeof image === 'string') {
            setUrl(image);
        } else {
            setUrl(fallback);
        }
    }, [image, fallback]);

    return (
        <img
            src={url || fallback}
            alt="Scan"
            style={{
                width: '40px',
                height: '40px',
                objectFit: 'cover',
                borderRadius: 'var(--radius-sm)'
            }}
        />
    );
};

const DataView = () => {
    const scans = useLiveQuery(() => db.scans.toArray());
    const issues = useLiveQuery(() => db.issues.toArray());

    const handleReset = async () => {
        if (window.confirm('This will delete all current data and reset to the initial seed data. Are you sure?')) {
            await db.delete();
            await db.open();
            window.location.reload();
        }
    };

    const handleDeleteScan = (id) => db.scans.delete(id);
    const handleDeleteIssue = (id) => db.issues.delete(id);

    return (
        <div className="container">
            <div className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-xl)' }}>
                <div>
                    <h2 className="font-bold" style={{ fontSize: 'var(--font-size-2xl)' }}>Data Management</h2>
                    <p className="text-secondary">View and manage your local database</p>
                </div>
                <button onClick={handleReset} className="btn btn-secondary">
                    <RefreshCw size={18} />
                    Reset Database
                </button>
            </div>

            <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
                <h3 className="font-bold" style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--spacing-md)' }}>
                    Scans ({scans?.length || 0})
                </h3>
                <div className="card" style={{ overflow: 'hidden', padding: 0 }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ backgroundColor: 'var(--color-background)', borderBottom: '1px solid var(--color-border)' }}>
                            <tr>
                                <th style={{ padding: '12px', fontSize: 'var(--font-size-sm)' }}>ID</th>
                                <th style={{ padding: '12px', fontSize: 'var(--font-size-sm)' }}>Image</th>
                                <th style={{ padding: '12px', fontSize: 'var(--font-size-sm)' }}>Location</th>
                                <th style={{ padding: '12px', fontSize: 'var(--font-size-sm)' }}>Actual</th>
                                <th style={{ padding: '12px', fontSize: 'var(--font-size-sm)' }}>Expected</th>
                                <th style={{ padding: '12px', fontSize: 'var(--font-size-sm)' }}>Status</th>
                                <th style={{ padding: '12px', fontSize: 'var(--font-size-sm)' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scans?.map(scan => (
                                <tr key={scan.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                    <td style={{ padding: '12px' }}>{scan.id}</td>
                                    <td style={{ padding: '12px' }}>
                                        <ImageCell image={scan.image} fallback={boxesImage} />
                                    </td>
                                    <td style={{ padding: '12px' }}>{scan.location}</td>
                                    <td style={{ padding: '12px' }}>{scan.actualCount}</td>
                                    <td style={{ padding: '12px' }}>{scan.expectedCount}</td>
                                    <td style={{ padding: '12px' }}>
                                        <span style={{
                                            color: scan.status === 'Verified' ? 'var(--color-success)' : 'var(--color-warning)',
                                            fontWeight: 500
                                        }}>
                                            {scan.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        <button
                                            onClick={() => handleDeleteScan(scan.id)}
                                            className="btn btn-ghost"
                                            style={{ padding: '4px', color: 'var(--color-error)' }}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <h3 className="font-bold" style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--spacing-md)' }}>
                    Issues ({issues?.length || 0})
                </h3>
                <div className="card" style={{ overflow: 'hidden', padding: 0 }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ backgroundColor: 'var(--color-background)', borderBottom: '1px solid var(--color-border)' }}>
                            <tr>
                                <th style={{ padding: '12px', fontSize: 'var(--font-size-sm)' }}>ID</th>
                                <th style={{ padding: '12px', fontSize: 'var(--font-size-sm)' }}>Location</th>
                                <th style={{ padding: '12px', fontSize: 'var(--font-size-sm)' }}>Priority</th>
                                <th style={{ padding: '12px', fontSize: 'var(--font-size-sm)' }}>Expected Item</th>
                                <th style={{ padding: '12px', fontSize: 'var(--font-size-sm)' }}>Exp. Qty</th>
                                <th style={{ padding: '12px', fontSize: 'var(--font-size-sm)' }}>Actual Item</th>
                                <th style={{ padding: '12px', fontSize: 'var(--font-size-sm)' }}>Act. Qty</th>
                                <th style={{ padding: '12px', fontSize: 'var(--font-size-sm)' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {issues?.map(issue => (
                                <tr key={issue.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                    <td style={{ padding: '12px' }}>{issue.id}</td>
                                    <td style={{ padding: '12px' }}>{issue.location}</td>
                                    <td style={{ padding: '12px' }}>{issue.priority}</td>
                                    <td style={{ padding: '12px' }}>{issue.expected}</td>
                                    <td style={{ padding: '12px' }}>{issue.expectedQty}</td>
                                    <td style={{ padding: '12px' }}>{issue.actual}</td>
                                    <td style={{ padding: '12px' }}>{issue.actualQty}</td>
                                    <td style={{ padding: '12px' }}>
                                        <button
                                            onClick={() => handleDeleteIssue(issue.id)}
                                            className="btn btn-ghost"
                                            style={{ padding: '4px', color: 'var(--color-error)' }}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DataView;
