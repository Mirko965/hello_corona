import React, { useRef, useEffect, useState } from 'react'

const GoogleMap = ({ options, links }) => {
  const googleMapRef = useRef();
  const [map, setMap] = useState()
  
  const mapStyles = {
    width: '100%',
    height: '40rem',
  };
  const content = (link) => {
    return `
            <div>
              <h3><b>${link.title}</b></h3>
              <p><b>Cases</b>: ${link.cases}</p>
              <p><b>Today Cases</b>: ${link.todayCases}</p>
              <p><b>Deaths</b>: ${link.deaths}</p>
              <p><b>Today Deaths</b>: ${link.todayDeaths}</p>
              <p><b>Recovered</b>: ${link.recovered}</p>
            </div>
           `
  }
  const addMarkers = (map) => {
    if (links) {
      return links.map((link) => {
        const infoWindow = new window.google.maps.InfoWindow({
          content: content(link)
        });
        const marker = new window.google.maps.Marker({
          map,
          position: link.coords,
          title: link.title,
          icon: 'http://maps.google.com/mapfiles/ms/icons/blue.png'
        })
        marker.addListener('click', () => {
          map.setZoom(6);
          map.setCenter(marker.getPosition());
        });
        marker.addListener('mouseover', () => {
          /* map.setZoom(6); */
          /* map.setCenter(marker.getPosition()); */
          infoWindow.open(map, marker);
        })
        marker.addListener('mouseout', () => {
          infoWindow.close();
        })
      })
    }
  }
  
  // useEffect Hook
  useEffect(() => {
    const createGoogleMap = () => setMap(new window.google.maps.Map(googleMapRef.current, options));
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}`
      document.head.appendChild(script);
      script.addEventListener('load', createGoogleMap)
      return () => script.removeEventListener('load', createGoogleMap)
    }
    createGoogleMap()
  }, [options]);
  if (map) addMarkers(map)
  
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