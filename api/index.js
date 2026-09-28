import { app, initializeDatabase } from '../server/server.js';

export default async function handler(request, response) {
    try {
        await initializeDatabase();
        return app(request, response);
    } catch (error) {
        console.error('API initialization failed:', error.message);
        return response.status(503).json({ message: 'The hospital API is unavailable. Check its database configuration.' });
    }
}