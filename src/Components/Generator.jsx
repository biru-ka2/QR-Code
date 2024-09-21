import React from 'react'
import QRCode from 'qrcode'
import { useState } from 'react'
import './Generator.css'

function Generator() {
  const [url, setUrl] = useState("");
  const [qr, setQr] = useState("");
  // function to generate qr code
  const GenerateQRCode = () => {
    QRCode.toDataURL(
      url,
      {
        width: 800,
        margin: 2,
        color: {
          dark: '#485261',
          light: '#e6f0ff'
        },
      },
      (err, url) => {
        if (err) return console.log(err);

        console.log(url);
        setQr(url);
      }
    );
  };

  return (
    <div className="generator main-center-70vw">
      <h1 className='main-header'>QR Generator</h1>
      <input
        type="text"
        placeholder='e.g. https://google.com'
        value={url}
        onChange={(e) => { setUrl(e.target.value) }}
      />
      <button className='generate-btn' onClick={GenerateQRCode}>Generate</button>
      {qr &&(
        <>
          <img className='img' src={qr} alt="qr-image" />
          <button className='download'><a href={qr} download={'qrcode.png'}>Download</a></button>
        </>
      )}

    </div>
  )
}

export default Generator;
