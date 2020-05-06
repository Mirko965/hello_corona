import React, {useRef, useEffect, useState, useCallback} from 'react'
import Markers from "./markers";
import './GoogleMap.css'

const GoogleMap = ({ options, markers, handleMarker }) => {
  const googleMapRef = useRef();
  const [map, setMap] = useState()

  const mapStyles = {
    width: '100%',
    height: '40rem',
  };

  const create = useCallback(() => {
    const option = {
      center: { lat: 0, lng: 0 },
      zoom: 2,
    }
    const createGoogleMap = () => setMap(new window.google.maps.Map(googleMapRef.current, option));
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP}`
      document.head.appendChild(script);
      script.addEventListener('load', createGoogleMap)
      return () => script.removeEventListener('load', createGoogleMap)
    }
    createGoogleMap()
  }, [])
  
  useEffect(() => {
    create()
  }, [create]);
  
  if (map) Markers(map, markers, handleMarker, options)

  return (
    <div
      ref={googleMapRef}
      style={mapStyles}
    />
  )
}

GoogleMap.defaultProps = {
  options: {
    center: { lat: 0, lng: 0 },
    zoom: 2,
  },
  className: 'myMap'
}
export default GoogleMap
