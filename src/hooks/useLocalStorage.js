import { useEffect, useState } from "react";

export function useLocalStorage(key, defaultValue) {
    const [value, setValue] = useState(defaultValue);

    // Load on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(key);
            if (stored !== null) {
                setValue(JSON.parse(stored));
            }
        } catch (e) {
            console.error("localStorage load error:", e);
        }
    }, []);

    // Save on change
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error("localStorage save error:", e);
        }
    }, [value]);

    return [value, setValue];
}