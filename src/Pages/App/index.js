import React, { useRef,useEffect, useState, useMemo } from 'react';
/* eslint import/no-webpack-loader-syntax: off */
import Map, {Marker, Popup} from 'react-map-gl';
import CITIES from '../../../src/data/cities.json'
import LeftSidebar from '../../Components/LeftSidebar';
import PlaceCard from '../../Components/PlaceCard';
import axios from "axios"
import NavBar from '../../Components/NavBar';


const MapApp =()=> {
  const [pins, setPins] = useState([])
  const [showPopup, setShowPopup] = useState(true);
  const [popupInfo, setPopupInfo] = useState(null);
  const slash = "http://localhost:4000/api"

  useEffect(()=>{
    const getPins = async () =>{
      try {
        const allPins = await axios.get(slash+'/pins');
        setPins(allPins.data)
      } catch (error) {
        console.log(error)
      }
    }
    getPins();
  },[])

  return(
    
<div className='container'>
    <div className=" row">
      <NavBar className=" columns twelve"/>
    </div>
    <div className='row'>
      <LeftSidebar pins={pins}/>
      <div className='map-wrapper columns eight'>
        <Map
          initialViewState={{
            longitude: -76.6122,
            latitude: 39.2904,
            zoom: 12
          }}
          style={{height: '100vh'}}
          mapStyle="mapbox://styles/mapbox/light-v10"
          mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        >



          {
            pins.map((city,index)=>{
          return <Marker
            key={`marker-${index}`}
            longitude={city.lng}
            latitude={city.lat}
            color="dodgerblue"
            anchor="bottom"
            onClick={e => {
                e.originalEvent.stopPropagation();
                setPopupInfo(city);
              }}
          />
        })}
    

        {popupInfo && (
              <Popup
                anchor="top"
                longitude={Number(popupInfo.lng)}
                latitude={Number(popupInfo.lat)}
                onClose={() => setPopupInfo(null)}
              >
                <div>

                  <strong>Artist</strong>: {popupInfo.Artist}<br></br>
                  <strong>Address</strong>: {popupInfo.Street}, PostalCode: {popupInfo.PostalCode}<br></br>
                  <strong>Year</strong>: {popupInfo.Year}<br></br>
                </div>
                <img width="100%" src={popupInfo.img_url} />
              </Popup>
            )}

        

        </Map>
      </div>
    
    </div>
        
</div>
  )

}

export default MapApp  