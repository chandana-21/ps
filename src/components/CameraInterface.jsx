import React, { useState } from 'react';
import { Camera, Video } from 'lucide-react';

const CameraInterface = () => {
    const [isActive, setIsActive] = useState(false);

    return (
        <div style={{ marginTop: 'var(--spacing-lg)' }}>
            <div style={{
                backgroundColor: '#E2E8F0', // Light gray placeholder
                borderRadius: 'var(--radius-lg)',
                aspectRatio: '16/9',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text-secondary)',
                marginBottom: 'var(--spacing-md)'
            }}>
                {!isActive ? (
                    <>
                        <Video size={48} style={{ marginBottom: 'var(--spacing-sm)', opacity: 0.5 }} />
                        <p>Camera not active</p>
                    </>
                ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', color: 'white', borderRadius: 'var(--radius-lg)' }}>
                        <p>Live Feed Placeholder</p>
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                    onClick={() => setIsActive(!isActive)}
                    className="btn btn-primary"
                    style={{
                        padding: 'var(--spacing-md) var(--spacing-xl)',
                        fontSize: 'var(--font-size-base)'
                    }}
                >
                    <Camera size={20} />
                    {isActive ? 'Stop Camera' : 'Start Camera'}
                </button>
            </div>
        </div>
    );
};

export default CameraInterface;
