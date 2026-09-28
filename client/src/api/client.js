const API_BASE_URL =
    import.meta.env.VITE_API_URL || (
        import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');

export async function apiRequest(path, { token, ...options } = {}) {
    let response;
    try {
        response = await fetch(`${API_BASE_URL}${path}`, {
            ...options,
            headers: {
                ...(options.body ? { 'Content-Type': 'application/json' } : {}),
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...options.headers,
            },
        });
    } catch {
        throw new Error('Cannot reach the hospital API. Check that the backend and MongoDB are running.');
    }

    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(result.message || 'The request could not be completed.');
    }
    return result;
}