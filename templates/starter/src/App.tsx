import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './styles/App.css'
import About from './pages/About'
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col pb-4 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
