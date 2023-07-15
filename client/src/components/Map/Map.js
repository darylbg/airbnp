import React, { useRef, useEffect, useState, useCallback } from 'react';
// import  {AddressAutofill, useConfirmAddress, config}  from '@mapbox/search-js-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { AddressAutofill } from '@mapbox/search-js-react';
import { useQuery } from "@apollo/client";

// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './Map.css';
import SearchForm from './SearchForm';
import { QUERY_GET_ALL_LISTINGS } from "../../utils/queries";
// import Haversine from 'haversine';




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
        center: [-2.5195, 53.0636], //long laT
        zoom: 5,
    });
    const [feature, setFeature] = useState('');
    const [startAddress, setStartAddress] = useState('');
    const [startLngLat, setstartLngLat] = useState([]);
    const [destLngLat, setDestLngLat] = useState([]);
    const [destination, setDestination] = useState('')
    const [instructions, setInstructions] = useState('');
    const [profile, setProfile] = useState('');
    const [error, setError] = useState('');

    const { data: dataAllListings } = useQuery(QUERY_GET_ALL_LISTINGS);
    const listings = dataAllListings?.getAllListings || [];
  
    const [listing, setAllListings] = useState({...listings});

 
    // useEffect(() => {

    // console.log(profile)

    // },[profile])

    useEffect(() => {

        if (map.current) return; // initialize map
        map.current = new mapboxgl.Map({
        container: mapContainer.current, 
        style: 'mapbox://styles/mapbox/streets-v12',
        attributionControl: false,
        ...viewport
        });

    });


    useEffect(() => {

      setAllListings(listings);
      Object.keys(listing).forEach(function(key, index) {
        const { lng, lat, title, price, description, address } = listing[key]

        const el = document.createElement('div');
        el.className ='marker'
      
        const m = new mapboxgl.Marker(el)
                    .setLngLat([lng, lat]).setPopup( new mapboxgl.Popup({ offset: 25 }) // add popups
                    .setHTML(
                      `<h2 class="marker-h2"><b>${title}<b></h2>
                      <h3 class="marker-h3">${description}</h3>
                      <h3 class="marker-h4"> ${address} </h3>
                      <h4 class="marker-h4"><b> £${price} <b></h4>`
                    ))
                    .addTo(map.current);

                    el.addEventListener('click', async function(e) {
                      const profile = document.getElementById('directions-profile');
                      profile.style.display='inline';

                      let ele = document.getElementsByName("profile");
                      for(var i=0;i<ele.length;i++){
                      ele[i].checked = false;
                      }

                      const markerCoords = [m._lngLat.lng, m._lngLat.lat];
                 
                      setDestination(address);
                      setDestLngLat(markerCoords);

                    })
                    
                
         
      });

    },[listing],[destLngLat])

    useEffect(() => {
      
 
      })
           

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

                    new mapboxgl.Marker().setLngLat([longitude,latitude]).addTo(map.current);
          

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
                          // console.log(location)
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
  
              new mapboxgl.Marker()
              .setLngLat(coords).setPopup( new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                `<h3>end</h3>`
              ))
              .addTo(map.current);
            },[setFeature, viewport]
          );

          const handleAInputChange = async (e) => {
            setStartAddress(e.target.value);
        
          }
        
          const handleBInputChange = async (e) => {
        
            setDestination(e.target.value)
        
          }
         
          const getRoute = async (e) => {

            const p = e;

            try{
              console.log(destLngLat);
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition( async (position)=> {
                    const { latitude, longitude } = position.coords;
  
            const query = await fetch(
              `https://api.mapbox.com/directions/v5/mapbox/${p}/${longitude},${latitude};${destLngLat[0]},${destLngLat[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
              { method: 'GET' }
            );
  
            const json = await query.json();
            const data = json.routes[0];
            const route = data.geometry.coordinates;
            const geojson = {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: route
              }
            };
            // if the route already exists on the map, we'll reset it using setData
            if (map.current.getSource('route')) {
              map.current.getSource('route').setData(geojson);
            }
            else {
              addRouteLayer(geojson);
            }
            // otherwise, we'll make a new request

          //  let instructions = document.getElementById('instructions');
          //  instructions.style.display='block';
          
          //   const steps = data.legs[0].steps;
          
          // let tripInstructions = '';
          // for (const step of steps) {
          //   tripInstructions += `<li>${step.maneuver.instruction}</li>`;
          // }
          // instructions.innerHTML = `<p><strong>Trip duration: ${Math.floor(
          //   data.duration / 60
          // )} min </strong></p><ol>${tripInstructions}</ol>`;
                })
              }
                
            }
            catch(error) {
              setError(`Please fill in all of the fields!`)
            }
          }
          
          const addRouteLayer = (geojson) => {
            map.current.addLayer({
              id: 'route',
              type: 'line',
              source: {
                type: 'geojson',
                data: geojson
              },
              layout: {
                'line-join': 'round',
                'line-cap': 'round'
              },
              paint: {
                'line-color': '#3887be',
                'line-width': 5,
                'line-opacity': 0.75
              }
            });
          
          
          }
               
const resetForm = () => {
  setStartAddress('');
  setDestination('');
  setstartLngLat([])
  setDestLngLat([]);
  let instructions = document.getElementById('instructions');
  instructions.style.display='none';
  instructions.innerHTML = ``;

  setError('');

 }
//  useEffect(() => {
//   console.log(profile)
// }, [])


  return (
    // ignore
    <section className='map-component'> 

<div className="map_box">
{/* map_box_wrapper wraps the whole component together to display in a row  */}
        <div className="map_box_wrapper">  

{/* map_box-longlat wraps the map and the top-bar component together into one component */}
        <div className="map_box-longlat">

{/* top bar component */}
          <div className="topbar-container">
            <p> Click on the locate me button i dare ya</p>
          {/* <button id="userMap" onClick={setUser}> Locate me </button> */}
                {/* <div className="sidebar">Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} | {view}
                </div> */}
            </div>

{/* main map component */}
          <div className="map_box_container">
          <button id="userMap" onClick={setUser}> Locate me </button>
            <div ref={mapContainer} className="map-container" />
            </div>
            </div>

    <div id='directions-profile'>

    <input id="driving" type="radio" value="driving" name="profile"  onClick={(e)=> { 

    getRoute(e.target.value);
    }}/>
    <label for="driving">Driving</label>

    <input id="walking" type="radio" name="profile" value="walking" onClick={(e)=> { 

    getRoute(e.target.value);
    }}/>
    <label for="walking">Walking</label>

    <input id="cycling" type="radio" name="profile" value="cycling" onClick={(e)=> { 

    getRoute(e.target.value);
    }}/>
    <label for="cycling">Cycling</label>


    </div>

          </div>

        

  </div>

            


</section>
    );
}


 export default Map;
