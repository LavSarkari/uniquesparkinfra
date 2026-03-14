import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const isVercel = process.env.VERCEL === '1';
const isProduction = process.env.NODE_ENV === 'production';
const isServerless = isVercel || isProduction;

// Path to the bundled database (read-only in production)
const bundledDbPath = path.join(process.cwd(), 'data', 'uniquespark.db');
// Path to the writable database
const dbPath = isServerless ? '/tmp/uniquespark.db' : bundledDbPath;

// Ensure writable directory exists
if (isServerless) {
    const dataDir = path.dirname(dbPath);
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Copy the bundled database to /tmp if it doesn't exist there yet
    // This preserves seeded data across some invocations (within the same container lifecycle)
    if (fs.existsSync(bundledDbPath) && !fs.existsSync(dbPath)) {
        try {
            fs.copyFileSync(bundledDbPath, dbPath);
        } catch (e) {
            console.error('Failed to copy bundled database to /tmp', e);
        }
    }
} else {
    // Local dev flow
    const dataDir = path.dirname(dbPath);
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
}

const db = new Database(dbPath);

// Initialize tables
db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT,
        brand TEXT,
        city TEXT,
        interest TEXT,
        utm_source TEXT,
        utm_medium TEXT,
        utm_campaign TEXT,
        utm_adset TEXT,
        utm_keyword TEXT,
        gclid TEXT,
        fbclid TEXT,
        timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
        pipeline_stage TEXT DEFAULT 'New Lead'
    );

    CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        category TEXT NOT NULL,
        year INTEGER,
        lat REAL NOT NULL,
        lng REAL NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
`);

export default db;
