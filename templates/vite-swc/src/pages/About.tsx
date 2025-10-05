import { Link } from 'react-router-dom'

function About() {
  return (
    <>
      <h1>About Page</h1>
      <p className="read-the-docs">
        This is a simple about page demonstrating React Router.
      </p>
      <div className="card">
        <p>
          This template includes:
        </p>
        <ul className="list-disc list-inside text-left max-w-md mx-auto mt-4">
          <li>React 19</li>
          <li>TypeScript</li>
          <li>Vite</li>
          <li>Tailwind CSS</li>
          <li>React Router</li>
        </ul>
      </div>
      <div className="mt-4">
        <Link to="/" className="text-blue-500 hover:text-blue-700">
          Go to Home
        </Link>
      </div>
    </>
  )
}

export default About
