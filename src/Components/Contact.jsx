import React from 'react'
import call from '../assets/call.svg'
import mail from '../assets/mail.svg'
import linkedin from '../assets/linkedin.svg'


import './pages.css'

export default function Contact() {
  return (
    <div className='contact-main main-center-70vw'>
      <h1 className='main-header'>Contac Us :</h1>
      <ul className='contact-menu'>
        <li><img src={call} alt="call" /> : 8076196059</li>
        <li><img src={mail} alt="mail" /> : ag1161534@gmail.com</li>
        <li><img src={linkedin} alt="linkedin" /> : xxxxxxxxxxxxxxxxxx</li>
        <li></li>
      </ul>
    </div>
  )
}
