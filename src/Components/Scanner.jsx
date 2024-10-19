import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import './scanner.css';

export default function Scanner() {
  const [scanResult, setScanResult] = useState('');
  const [isScanning, setIsScanning] = useState(false); // Track scanning state
  const [mode, setMode] = useState(''); // Track camera or file mode
  const videoRef = useRef(null); // Reference for video element
  const imgRef = useRef(null); // Reference for image element
  const codeReader = useRef(null); // Store the reader instance
  const [scanError, setScanError] = useState(''); // Track scan error messages

  // Initialize the code reader on component mount
  useEffect(() => {
    codeReader.current = new BrowserMultiFormatReader(); // Initialize ZXing reader

    return () => {
      if (videoRef.current) stopScanner(); // Cleanup on unmount
    };
  }, []);

  const startCameraScan = () => {
    setMode('camera'); // Switch to camera mode
    setIsScanning(true);
    setScanError(''); // Reset scan error

    codeReader.current
      .decodeFromVideoDevice(null, videoRef.current, (result, error) => {
        if (result) {
          setScanResult(result.getText()); // Set scan result
          stopScanner(); // Stop scanning after successful result
        }
        if (error) {
          console.error('Scan Error:', error);
          setScanError('Scanning failed. Please try again.'); // Set error message
        }
      })
      .catch((err) => {
        console.error('Failed to start camera:', err);
        setScanError('Failed to start camera. Please check your device.'); // Set error message
      });
  };

  const stopScanner = () => {
    if (codeReader.current) {
      codeReader.current.reset(); // Stop video stream
      setIsScanning(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      imgRef.current.src = imageUrl; // Display image temporarily
      imgRef.current.onload = async () => {
        try {
          const result = await codeReader.current.decodeFromImageElement(imgRef.current);
          setScanResult(result.getText());
        } catch (err) {
          console.error('Image Scan Error:', err);
          setScanError('Image scanning failed. Please try again.'); // Set error message
        }
      };
    }
  };

  const resetScanner = () => {
    setScanResult(''); // Clear result
    setScanError(''); // Clear error
    setMode(''); // Reset mode
    setIsScanning(false); // Stop any ongoing scanning
  };

  return (
    <div className="scanner main-center-70vw">
      <h1 className="main-header">QR Reader</h1>

      {/* Option selection */}
      {!isScanning && !scanResult && (
        <div style={{ marginTop: '20px' }}>
          <button onClick={startCameraScan}>Scan from Camera</button>
          <label style={{ marginLeft: '10px' }}>
            <input type="file" accept="image/*" onChange={handleFileUpload} />
            Upload QR Code Image
          </label>
        </div>
      )}

      {/* Camera Scanner */}
      {mode === 'camera' && isScanning && (
        <div style={{ marginTop: '20px' }}>
          <video 
            ref={videoRef} 
            style={{ width: '250px', margin: 'auto', border: '1px solid black' }} 
            autoPlay 
            playsInline 
          />
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <p>Please position the QR code within the camera frame.</p>
            <p>Ensure good lighting and focus for better scanning quality.</p>
          </div>
        </div>
      )}

      {/* Display the uploaded image temporarily */}
      <img ref={imgRef} alt="QR Code" style={{ display: 'none' }} />

      {/* Display Scan Result */}
      {scanResult && (
        <div style={{ marginTop: '20px' }}>
          <p>
            <strong>Scanned Result:</strong> {scanResult}
          </p>
          <button onClick={resetScanner}>Rescan</button>
        </div>
      )}

      {/* Display Scan Errors */}
      {scanError && (
        <div style={{ marginTop: '20px', color: 'red' }}>
          <strong>Error:</strong> {scanError}
        </div>
      )}
    </div>
  );
}
