import React from 'react'
import { Link } from 'react-router-dom';

export default function Home() {
  const handleClick=()=>{
    
  };


  return (
    <div className='home main-center-70vw'>
      <h1 className='home-header main-header'>QR - Code</h1>
      <h1 className='home-header main-header'>Reader & Generator</h1>
      <Link to='/generator'><div className="btn generator">Generator</div></Link>
      <Link to='/scanner'><div className="btn scanner">Scanner</div></Link>
    </div>
  )
}
