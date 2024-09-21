import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import Generator from './Components/Generator';
import Scanner from './Components/Scanner';


function App() {


  return (
    <><div className='app'>
      <NavBar />
      <div className='main'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/generator" element={<Generator />} />
          <Route path="/Scanner" element={<Scanner />} />
        </Routes>
      </div>
      <Footer />
      </div>
    </>
  )
}

export default App
