import { useState, useEffect } from 'react';

function usePersistentState(key, initialValue) {
    const [state, setState] = useState(
        window.localStorage.getItem(key) 
            ? JSON.parse(window.localStorage.getItem(key))
            : initialValue
    );

    useEffect(() => {
        window.localStorage.setItem(key, state)
    }, [key, state])

    return [state, setState];
}

export default usePersistentState;