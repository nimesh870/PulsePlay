const path = require('path');
const fs = require('fs');
const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const musicRoutes = require('./routes/music.routes');
const cors = require('cors');

const app = express();

// CORS
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// Middlewares
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/music', musicRoutes);

const DIST_CANDIDATES = [
    path.join(__dirname, '..', '..', 'frontend', 'dist'),
    path.join(__dirname, 'dist'),
    path.join(__dirname, '..', 'dist'),
];

const distDir = DIST_CANDIDATES.find((dir) =>
    fs.existsSync(path.join(dir, 'index.html'))
);

if (distDir) {
    app.use(express.static(distDir, {
        setHeaders: (res, filePath) => {
            if (filePath.endsWith('.js')) {
                res.setHeader('Content-Type', 'application/javascript');
            } else if (filePath.endsWith('.css')) {
                res.setHeader('Content-Type', 'text/css');
            } else if (filePath.endsWith('.svg')) {
                res.setHeader('Content-Type', 'image/svg+xml');
            } else if (filePath.endsWith('.json')) {
                res.setHeader('Content-Type', 'application/json');
            } else if (filePath.endsWith('.woff2')) {
                res.setHeader('Content-Type', 'font/woff2');
            }
        },
    }));

    app.get('*', (req, res) => {
        res.sendFile(path.join(distDir, 'index.html'));
    });
}

module.exports = app;