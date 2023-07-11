import React, { useRef, useEffect, useState, useCallback } from 'react';
// import  {AddressAutofill, useConfirmAddress, config}  from '@mapbox/search-js-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { AddressAutofill } from '@mapbox/search-js-react';

// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './Map.css';
import SearchForm from './SearchForm';




function Map() {
mapboxgl.accessToken = 'pk.eyJ1IjoianNlbjA3IiwiYSI6ImNsanI2enp3NDBkYzMzZGxsM2JobTZ4OHgifQ.AuZEXXUmyWFMfTxQAjH_CQ';
const accessToken = 'pk.eyJ1IjoianNlbjA3IiwiYSI6ImNsanI2enp3NDBkYzMzZGxsM2JobTZ4OHgifQ.AuZEXXUmyWFMfTxQAjH_CQ';

    const mapContainer = useRef(0);
    const map = useRef(0);
    const [lng, setLng] = useState(0);
    const [lat, setLat] = useState(55);
    const [zoom, setZoom] = useState(5);
    const [view, setView] = useState('');
    const [address, setAddress] = useState('');
    const [viewport, setViewport] = useState(
        {
        center: [0, 55], //long laT
        zoom: 5,
    });
    const [feature, setFeature] = useState('');
    const [startAddress, setStartAddress] = useState('');
    const [startLngLat, setstartLngLat] = useState([]);
    const [destLngLat, setDestLngLat] = useState([]);
    const [destination, setDestination] = useState('')
    const [instructions, setInstructions] = useState('');
    const [profile, setProfile] = useState('');

    useEffect(() => {

        if (map.current) return; // initialize map
        map.current = new mapboxgl.Map({
        container: mapContainer.current, 
        style: 'mapbox://styles/mapbox/streets-v12',
        attributionControl: false,
        ...viewport
        });
        
    });

//render current listings on map, dummy data for now
    useEffect(() => {

      const geoJson = {
        "features": [
          {
            "type": "Feature",
            "properties": {
              "title": "London",
              "description": "i love the railways, not realllehh"
            },
            "geometry": {
              "coordinates": [-0.1276, 51.5073],
              "type": "Point"
            }
          },
          {
            "type": "Feature",
            "properties": {
              "title": "Sheffield",
              "description": "sheffing"
            },
            "geometry": {
              "coordinates": [-1.4702, 53.3807],
              "type": "Point"
            }
          }]}


          geoJson.features.forEach(function(marker) {
            var el = document.createElement('div');
            el.className = 'marker';

            new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map.current);
          })
      
      
  });
        const setUser = async () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition( async (position)=> {
                    const { latitude, longitude } = position.coords;
                    searchForUser(longitude, latitude);

            

                    if (!map.current) return; // wait for map to initialize
                    // map.current.setCenter([longitude, latitude]);
                    // map.current.setZoom(15)
                    let newTarget = { center: [longitude, latitude], zoom: 15}
                    flyTo(viewport, newTarget);

                });
              } 
              return;

            };
        useEffect(() => {
                if (!map.current) return; // wait for map to initialize
                map.current.on('move', () => {
                setLng(map.current.getCenter().lng.toFixed(4));
                setLat(map.current.getCenter().lat.toFixed(4));
                setZoom(map.current.getZoom().toFixed(2));
            });
        });
        const searchForUser = async (lon, lat) => {

          const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=pk.eyJ1IjoianNlbjA3IiwiYSI6ImNsanI2enp3NDBkYzMzZGxsM2JobTZ4OHgifQ.AuZEXXUmyWFMfTxQAjH_CQ`);
                          const location = await response.json();
                          console.log(location)
                          // let postCode = location.features[0].context[0].text;
                          // let city = location.features[0].context[1].text;
                          // let country = location.features[0].context[4].text;
                          let place_name = location.features[0].place_name;
                          setView(`Searching near: ${place_name}`);
      
      }

      const userSearch = async (search) => {

        try {
            if(search) {
            const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=pk.eyJ1IjoianNlbjA3IiwiYSI6ImNsanI2enp3NDBkYzMzZGxsM2JobTZ4OHgifQ.AuZEXXUmyWFMfTxQAjH_CQ`);
            const location = await response.json();
            let endlon = location.features[0].center[0];
            let endlat = location.features[0].center[1];
            let place_name = location.features[0].place_name;
        
            // if(!endlon || !endlat) {
            //     return;
            // }
            if(place_name) {
            setView(`Searching near: ${place_name}`);
            }
        
            
            else{
                return
            }
            console.log(location)

            const start = {
                center: [lng, lat],
                zoom: zoom,
                };
                const end = {
                center: [endlon, endlat],
                zoom: 15,
                };
        
                flyTo(start, end);
            }
            else {
                return
            }
        }
        catch(error) {
            setView(`Searching near: Unknown Address`);
        }
        }      
        const flyTo = (start, end) => {

          let isAtStart = true;
          const target = isAtStart ? end : start;
          isAtStart = !isAtStart;
      
          map.current.flyTo({
              ...target, // Fly to the selected target
              duration: 5000, // Animate over 12 seconds
              essential: true // This animation is considered essential with
              //respect to prefers-reduced-motion
              });
          }
          const handleInputChange = (e) => {
            setAddress(e.target.value)

        };

        const handleFormSubmit = async (e) => {
            e.preventDefault();
            userSearch(address);

          };

          const handleRetrieve = useCallback(
            (res) => {
              const data = res;
              const feature =data.features[0].properties.full_address;
              const coords = data.features[0].geometry.coordinates;
              setstartLngLat(coords);
              setStartAddress(feature);
              setFeature(feature);
              // console.log(data.features[0])
              // console.log(coords)

              let newTarget = { center: coords, zoom: 15}
            
              flyTo(viewport, newTarget)
              setView(`Searching near: ${data.features[0].properties.place_name}`);

              new mapboxgl.Marker()
              .setLngLat(coords)
              .addTo(map.current);

            },
            [setFeature, viewport]
          );
          
          const handleBRetrieve = useCallback(
            (res) => {

              const data = res;
              const feature =data.features[0].properties.full_address;
              setFeature(feature);
              // setShowMinimap(true);
              // setShowFormExpanded(true);
              // setAddress(feature);
              setDestination(feature);
              let coords = data.features[0].geometry.coordinates;
              setDestLngLat(data.features[0].geometry.coordinates);
              let newTarget = { center: coords, zoom: 15}
              flyTo(viewport, newTarget)
              setView(`Searching near: ${data.features[0].properties.place_name}`);

              const popup = new mapboxgl.Popup({ offset: 25 }).setText(
                'Start'
                );
  
              new mapboxgl.Marker()
              .setLngLat(coords).setPopup( new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                `<h3>end</h3>`
              ))
              .addTo(map.current);
            },[setFeature, viewport]
          );
        
          const removeMarker = async (marker) => {

            marker.remove();

          }
          const handleAInputChange = async (e) => {
            setStartAddress(e.target.value);
        
          }
        
          const handleBInputChange = async (e) => {
        
            setDestination(e.target.value)
        
          }
        
const getDirection = async (e) => {
  e.preventDefault();
try {
  if(startLngLat.length === 0 || setDestLngLat.length === 0) return;
      const query = await fetch(
        `https://api.mapbox.com/matching/v5/mapbox/${profile}/${startLngLat[0]},${startLngLat[1]};${destLngLat[0]},${destLngLat[1]}?geometries=geojson&steps=true&radiuses=50;50&access_token=pk.eyJ1IjoianNlbjA3IiwiYSI6ImNsanI2enp3NDBkYzMzZGxsM2JobTZ4OHgifQ.AuZEXXUmyWFMfTxQAjH_CQ`
      );
      const direction = await query.json();
      console.log(direction);
      const coords = direction.matchings[0].geometry;
  
      addRoute(coords);
      console.log(coords)
      console.log(startLngLat)
      console.log(destLngLat)
      }
      catch (e) {
        alert('Directions could not be found.');
      }
        
              
        
          }     
 
          function addRoute(coords) {
            // If a route is already loaded, remove it
            if (map.current.getSource('route')) {
              map.current.removeLayer('route');
              map.current.removeSource('route');
            } else {
              // Add a new layer to the map
              map.current.addLayer({
                id: 'route',
                type: 'line',
                source: {
                  type: 'geojson',
                  data: {
                    type: 'Feature',
                    properties: {},
                    geometry: coords
                  }
                },
                layout: {
                  'line-join': 'round',
                  'line-cap': 'round'
                },
                paint: {
                  'line-color': '#03AA46',
                  'line-width': 8,
                  'line-opacity': 0.8
                }
              });
            }
          }
               
const resetForm = () => {
  setStartAddress('');
  setDestination('');
  setstartLngLat([])
  setDestLngLat([]);
 }
 useEffect(() => {
  console.log(profile)
}, [profile])

  return (
    <section className='map-component'>
      <div className="map_box">
        <div className="map_box_wrapper">
          <div className="map_box-longlat">
          <div className="sidebar-container">
                <button id="userMap" onClick={setUser}> Find your location </button>
                <div className="sidebar">Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} | {view}
                </div>
            </div>
          <div className="map_box_container">
            <div ref={mapContainer} className="map-container" />
            </div>
            </div>
            <div className='map-side'>
            <SearchForm
              value={address}
              handleInputChange={handleInputChange}
              handleFormSubmit={handleFormSubmit}
              placeholder='find address'
            />
 <div id="instructions">{instructions}</div>
            {/* <GetDirections /> */}
            <form className="form-address">

          <div className="start-dest">

            <label className="start-destination-label">Start Destination</label>
            <AddressAutofill accessToken={accessToken} onRetrieve={handleRetrieve}>
              <input
                className="form-control"
                placeholder="Start typing your address, e.g. 123 Main..."
                autoComplete="address-line2"
                id="mapbox-autofill"
                value={startAddress}
                onChange={handleAInputChange}
    
              />
            </AddressAutofill>
            </div>

<div className="end-dest">
<label className="end-destination-label">End Destination</label>
<AddressAutofill accessToken={accessToken} onRetrieve={handleBRetrieve} >
<input
  className="form-control"
  placeholder="Start typing your address, e.g. 123 Main..."
  autoComplete="address-line2"
  id="mapbox-autofill"
  value={destination} onChange={handleBInputChange}

/>
</AddressAutofill>
<div class="mapbox-directions-profile mapbox-directions-component-keyline mapbox-directions-clearfix">
    
    <input id="mapbox-directions-profile-driving" type="radio" name="profile" value="mapbox/driving" onClick={()=> { setProfile('driving') }}/>
    <label for="mapbox-directions-profile-driving">Driving</label>
    <input id="mapbox-directions-profile-walking" type="radio" name="profile" value="mapbox/walking" onClick={()=> { setProfile('walking') }}/>
    <label for="mapbox-directions-profile-walking">Walking</label>
    <input id="mapbox-directions-profile-cycling" type="radio" name="profile" value="mapbox/cycling" onClick={()=> { setProfile('cycling') }}/>
    <label for="mapbox-directions-profile-cycling">Cycling</label>
  </div>
          <div className="button-wrapper">
            <button className="btn btn-info" id="btn-direction" onClick={getDirection}>
              Get directions
            </button>
            <button type="button" className="btn btn-info" id="btn-reset" onClick={resetForm}>
              Reset
            </button>
          </div>
          </div>
        
  </form>
  </div>          
  </div>
  </div>
            


</section>
    );
}


 export default Map;
