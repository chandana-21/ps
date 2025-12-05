import React from 'react';

const ScanForm = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
            <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                    Location
                </label>
                <select style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-surface)',
                    fontSize: 'var(--font-size-base)',
                    color: 'var(--color-text-main)'
                }}>
                    <option>Select a location</option>
                    <option>Warehouse A - Aisle 3</option>
                    <option>Warehouse B - Shelf 12</option>
                    <option>Storage Room C</option>
                </select>
            </div>

            <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                    Inventory Type
                </label>
                <select style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-surface)',
                    fontSize: 'var(--font-size-base)',
                    color: 'var(--color-text-main)'
                }}>
                    <option>Boxed Inventory (Labeled)</option>
                    <option>Loose Items</option>
                    <option>Pallets</option>
                </select>
            </div>
        </div>
    );
};

export default ScanForm;
