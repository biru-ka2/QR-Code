import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { BrowserMultiFormatReader } from '@zxing/browser';
import './Scanner.css';

export default function Scanner() {
  const [scanResult, setScanResult] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [mode, setMode] = useState('');
  const videoRef = useRef(null);
  const imgRef = useRef(null);
  const canvasRef = useRef(null);
  const codeReader = useRef(null);
  const [scanError, setScanError] = useState('');

  useEffect(() => {
    codeReader.current = new BrowserMultiFormatReader();
    return () => stopScanner();
  }, []);

  const startCameraScan = async () => {
    setMode('camera');
    setScanError('');
    setScanResult('');
    setIsScanning(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setScanError('Failed to access camera. Please check permissions.');
    }
  };

  const captureAndScan = async () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

      try {
        const result = await codeReader.current.decodeFromCanvas(canvasRef.current);
        setScanResult(result.getText());
        stopScanner();
      } catch (err) {
        console.error('Scan Error:', err);
        setScanError('No QR code detected. Please try again.');
      }
    }
  };

  const stopScanner = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
    }
    setIsScanning(false);
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      imgRef.current.src = imageUrl;
      imgRef.current.onload = async () => {
        try {
          const result = await codeReader.current.decodeFromImageElement(imgRef.current);
          setScanResult(result.getText());
        } catch (err) {
          console.error('Image Scan Error:', err);
          setScanError('Image scanning failed. Please try again.');
        }
      };
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  return (
    <div className="scanner main-center-70vw">
      <h1 className="main-header">QR Reader</h1>
      {!isScanning && !scanResult && (
        <div className='scanner-option'>
          <button className='camera-scan' onClick={startCameraScan}><h3>Camera</h3></button>
          <div {...getRootProps()} className={`upload ${isDragActive ? 'active' : ''}`}>
            <input {...getInputProps()} />
            <h3>Upload or Drag & Drop</h3>
          </div>
        </div>
      )}

      {mode === 'camera' && isScanning && (
        <div style={{ marginTop: '20px' }}>
          <video ref={videoRef} style={{ width: '250px', border: '1px solid black' }} autoPlay playsInline />
          <canvas ref={canvasRef} style={{ display: 'none' }} width="250" height="200"></canvas>
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <button onClick={captureAndScan}>Capture & Scan</button>
          </div>
        </div>
      )}

      <img ref={imgRef} alt="QR Code" style={{ display: 'none' }} />

      {scanResult && (
        <div style={{ marginTop: '20px' }}>
          <p><strong>Scanned Result:</strong> {scanResult}</p>
          <button onClick={() => { setScanResult(''); setScanError(''); setMode(''); }}>Rescan</button>
        </div>
      )}

      {scanError && (
        <div style={{ marginTop: '20px', color: 'red' }}>
          <strong>Error:</strong> {scanError}
        </div>
      )}
    </div>
  );
}
