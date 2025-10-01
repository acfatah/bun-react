import { useState } from 'react'
import { Link } from 'react-router-dom'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex m-auto">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/pages/Home.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div className="mt-4">
        <Link to="/about" className="text-blue-500 hover:text-blue-700">
          Go to About
        </Link>
      </div>
    </>
  )
}

export default Home
