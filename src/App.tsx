// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Home from "./components/Home"
// import Bofe from "./components/Bofe"
import News from "./components/News"
import BookShelf from "./components/BookShelf"
import Bofe from "./components/Bofe"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Bofe" element={<Bofe />} />
        <Route path="/News" element={<News />} /> 
        <Route path="/bookShelf" element={<BookShelf />} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App
