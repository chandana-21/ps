import Dexie from 'dexie';

export const db = new Dexie('SmartStockDB');

db.version(4).stores({
    scans: '++id, location, type, status, actualCount, expectedCount, timestamp', // Primary key and indexed props
    issues: '++id, priority, location, expected, expectedQty, actual, actualQty, date, status'
}).upgrade(tx => {
    // Remove title from issues
    return tx.table('issues').toCollection().modify(issue => {
        delete issue.title;
    });
});

// Seed data if database is empty
db.on('populate', () => {
    db.scans.bulkAdd([
        { location: 'Warehouse A - Aisle 3', actualCount: 145, expectedCount: 145, status: 'Verified', timestamp: new Date(Date.now() - 10 * 60000).toISOString() }, // 10 mins ago
        { location: 'Warehouse B - Shelf 12', actualCount: 89, expectedCount: 95, status: 'Discrepancy', timestamp: new Date(Date.now() - 25 * 60000).toISOString() }, // 25 mins ago
        { location: 'Storage Room C', actualCount: 203, expectedCount: 203, status: 'Verified', timestamp: new Date(Date.now() - 60 * 60000).toISOString() }, // 1 hour ago
    ]);

    db.issues.bulkAdd([
        {
            priority: 'high',
            date: '2024-01-15',
            location: 'Warehouse B - Shelf 12',
            expected: 'Resistors Pack',
            expectedQty: 100,
            actual: 'Resistors Pack',
            actualQty: 95, // Discrepancy of 5
            status: 'Under Review'
        }
    ]);
});
