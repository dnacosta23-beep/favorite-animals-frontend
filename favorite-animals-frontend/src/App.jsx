
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [animals, setAnimals] = useState([])
  const [name, setName] = useState('')

  const API_URL = 'http://127.0.0.1:5000'

  async function fetchAnimals() {
    const response = await fetch(`${API_URL}/animals`)
    const data = await response.json()
    setAnimals(data)
  }

  useEffect(() => {
    fetchAnimals()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()

    const newAnimal = {
      name: name
    }

    await fetch(`${API_URL}/animals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newAnimal)
    })

    setName('')
    fetchAnimals()
  }

  return (
    <div className="app">
      <h1>Favorite Animals Tracker</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter an animal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add Animal</button>
      </form>

      <h2>Animals</h2>

      <ul>
        {animals.map((animal) => (
          <li key={animal.id}>{animal.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App

