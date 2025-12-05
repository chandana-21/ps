import React from 'react';

const ScanForm = ({ location, onLocationChange, type, onTypeChange }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
            <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                    Location
                </label>
                <select
                    value={location}
                    onChange={(e) => onLocationChange(e.target.value)}
                    style={{
                        width: '100%',
                        padding: 'var(--spacing-md)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'var(--color-surface)',
                        fontSize: 'var(--font-size-base)',
                        color: 'var(--color-text-main)'
                    }}
                >
                    <option value="">Select a location</option>
                    <option value="Warehouse A - Aisle 3">Warehouse A - Aisle 3</option>
                    <option value="Warehouse B - Shelf 12">Warehouse B - Shelf 12</option>
                    <option value="Storage Room C">Storage Room C</option>
                </select>
            </div>

            <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                    Inventory Type
                </label>
                <select
                    value={type}
                    onChange={(e) => onTypeChange(e.target.value)}
                    style={{
                        width: '100%',
                        padding: 'var(--spacing-md)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'var(--color-surface)',
                        fontSize: 'var(--font-size-base)',
                        color: 'var(--color-text-main)'
                    }}
                >
                    <option value="Boxed Inventory (Labeled)">Boxed Inventory (Labeled)</option>
                    <option value="Loose Items">Loose Items</option>
                    <option value="Pallets">Pallets</option>
                </select>
            </div>
        </div>
    );
};

export default ScanForm;
