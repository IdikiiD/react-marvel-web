// src/hooks/useHttp.js
import { useState, useCallback } from "react";

export const useHttp = () => {

    const [process, setProcess] = useState('waiting');


    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
        setProcess('waiting');

        try {
            const response = await fetch(url, { method, body, headers });
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }
            const data = await response.json();
            setProcess('confirmed');

            return data;
        } catch (e) {
            setProcess('error');

            throw e;
        }
    }, []);

    const clearError = useCallback(() => setProcess('error'), []);

    return  {request, process, clearError, setProcess };
};
