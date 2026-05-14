import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import BookDemo from './pages/BookDemo'
import Contact from './pages/Contact'
import Blog from './pages/Blog'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/book-demo" replace />} />
        <Route path="/book-demo" element={<BookDemo />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  )
}
