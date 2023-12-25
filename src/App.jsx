import { useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/home/Home';
import Blog from './pages/Blog/Blog';
import CreateBlog from './pages/Blog/CreateBlog';
import { AppProvider } from './context/Context.jsx'
import NotFound from './pages/notFound/NotFound';
import { AnimatePresence } from 'framer-motion';
import { useGlobalContext } from './context/Context';

function App() {
  const {isLogged} = useGlobalContext()

  return (
    <>
      <AnimatePresence>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog/:id" element={<Blog />} />
            {isLogged === "isLogged" ? (
              <Route path="/create-blog" element={<CreateBlog />} />
            ) : (
              <Route path="/create-blog" element={<NotFound />} />
            )}
          </Routes>
        </Router>
      </AnimatePresence>
    </>

  );
}

export default App
