import { createServer } from 'node:http';
import { Databases, Client } from 'node-appwrite';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

const key = process.env.thomasDev;
const databaseID = "673c4f1b00129f34b96a"
const establishmentsID = "673c5142003d61bb913a";
const codesID = "673c4f49003246467a94";

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("670145c3000f4c561037")
    .setKey(key)

const databases = new Databases(client);

// API endpoint to get establishments
app.get('/api/establishments', async (req, res) => {
    try {
        const response = await databases.listDocuments(
            databaseID,
            establishmentsID
        );
        res.json(response.documents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/codes', async (req, res) => {
    try {
        const response = await databases.listDocuments(
            databaseID,
            codesID
        );
        res.json(response.documents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Serve map page
app.get('/map', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'map', 'index.html'));
});

app.get('/map', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'map', 'index.html'));
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});