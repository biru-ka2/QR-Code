import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';


function App() {


  return (
    <>
      <NavBar />
      <div className='main'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
