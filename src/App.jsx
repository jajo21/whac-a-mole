import React, {useEffect, useRef, useState} from 'react'
import {createRoot} from 'react-dom/client';


const Time = () => {
    const [time, setTime] = useState(Date.now())
    const timer = useRef(null)
    useEffect(() => {
        timer.current = setInterval(() => setTime(Date.now()), 1000)
        return () => clearInterval(timer.current)
    }, [])
    return <h1>{`Time: ${time}`}</h1>
}

function App() {
    return (
        <Time />
    )
}
export default App;

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

