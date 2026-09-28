import { app, initializeDatabase } from '../server/server.js';

export default async function handler(request, response) {
    try {
        await initializeDatabase();
        const requestUrl = new URL(request.url, 'https://vercel.local');
        const apiPath = requestUrl.searchParams.get('path');
        if (apiPath) {
            requestUrl.searchParams.delete('path');
            request.url = `/api/${apiPath}${requestUrl.search}`;
        }
        return app(request, response);
    } catch (error) {
        console.error('API initialization failed:', error.message);
        return response.status(503).json({ message: 'The hospital API is unavailable. Check its database configuration.' });
    }
}