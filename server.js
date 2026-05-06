const express = require('express');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const { nanoid } = require('nanoid');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static('public'));

let db;

// Inisialisasi Database
(async () => {
    db = await open({
        filename: './data/database.sqlite',
        driver: sqlite3.Database
    });
    await db.exec(`
        CREATE TABLE IF NOT EXISTS urls (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_url TEXT NOT NULL,
            short_code TEXT UNIQUE NOT NULL,
            clicks INTEGER DEFAULT 0
        )
    `);
})();

// API: Generate Short URL
app.post('/shorten', async (req, res) => {
    const { fullUrl } = req.body;
    if (!fullUrl) return res.status(400).json({ error: 'URL is required' });

    const shortCode = nanoid(6); // Menghasilkan 6 karakter unik
    await db.run(
        'INSERT INTO urls (full_url, short_code) VALUES (?, ?)',
        [fullUrl, shortCode]
    );

    res.json({ shortUrl: `${req.protocol}://${req.get('host')}/${shortCode}` });
});

// API: Statistik
app.get('/stats/:code', async (req, res) => {
    const data = await db.get('SELECT full_url, clicks FROM urls WHERE short_code = ?', [req.params.code]);
    if (data) {
        res.json(data);
    } else {
        res.status(404).json({ error: 'Not found' });
    }
});

// Redirect Logic
app.get('/:code', async (req, res) => {
    const { code } = req.params;
    const urlEntry = await db.get('SELECT full_url FROM urls WHERE short_code = ?', [code]);

    if (urlEntry) {
        await db.run('UPDATE urls SET clicks = clicks + 1 WHERE short_code = ?', [code]);
        return res.redirect(urlEntry.full_url);
    }
    res.status(404).send('URL tidak ditemukan');
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));