import { useEffect, useState } from 'react';
import { apiRequest } from '../api/client';
import { useAuth } from '../context/AuthContext';

export function useDashboard(role, fallbackData) {
    const { token } = useAuth();
    const [data, setData] = useState(fallbackData);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!token) return;
        let active = true;
        apiRequest(`/dashboard/${role}`, { token })
            .then((dashboard) => {
                if (active) {
                    setData(dashboard);
                    setError('');
                }
            })
            .catch((requestError) => {
                if (active) setError(requestError.message);
            });

        return () => {
            active = false;
        };
    }, [role, token]);

    return { data, error, setData };
}