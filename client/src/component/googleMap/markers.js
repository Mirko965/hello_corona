const Markers = (map, markers, handleMarker, options) => {
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
  if (markers) {
    return markers.map(link => {
      const infoWindow = new window.google.maps.InfoWindow({
        content: content(link)
      });
      const marker = new window.google.maps.Marker({
        map,
        position: link.coords,
        title: link.title,
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue.png'
      })
      map.setCenter(options.center);
      map.setZoom(options.zoom);
      marker.addListener('click', () => handleMarker(marker));
      marker.addListener('mouseover', () => {
        // map.setZoom(6);
        // map.setCenter(marker.getPosition());
        infoWindow.open(map, marker);
      })
      marker.addListener('mouseout', () => {
        infoWindow.close();
      })
      return null
    })
  }
}

export default Markers