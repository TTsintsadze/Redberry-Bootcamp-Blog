import { useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/home/Home';
import Blog from './pages/Blog/Blog';
import CreateBlog from './pages/Blog/CreateBlog';
import { AppProvider } from './context/Context.jsx'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/create-blog" element={<CreateBlog />} />
        </Routes>
      </Router>
    </>

  );
}

export default App
