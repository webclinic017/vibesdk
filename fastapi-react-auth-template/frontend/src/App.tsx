import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/message')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
  }, [])

  return (
    <div className="App">
      <h1>FastAPI + React</h1>
      <p>Message from backend: {message}</p>
    </div>
  )
}

export default App