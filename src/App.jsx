import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import AnimeDetail from './pages/AnimeDetail.jsx'

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/anime/:id" element={<AnimeDetail />} />
  </Routes>
)

export default App
