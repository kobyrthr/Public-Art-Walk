import React, { useRef,useEffect, useState, useMemo } from 'react';
/* eslint import/no-webpack-loader-syntax: off */
import ReactMapGL, { FlyToInterpolator, NavigationControl, Marker, Popup} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import CITIES from '../../data/cities.json'
import LeftSidebar from '../../Components/LeftSidebar';
import PlaceCard from '../../Components/PlaceCard';
import axios from "axios"
import NavBar from '../../Components/NavBar';
import { useQuery,gql } from '@apollo/client';
import styles from "./MapPage.module.css";

// @ts-ignore
    // eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
    mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const QUERY = gql`
  
  
query Assets {
  pins {
    artist
    city
    location {
      latitude
      longitude
    }
    image {
      url
    }
    postalCode
    state
    street
  }
}
`;

const MapPage =()=> {
  const { loading, error, data } = useQuery(QUERY,{});
 

  // const [pins, setPins] = useState([])
  const [showPopup, setShowPopup] = useState(true);
  const [popupInfo, setPopupInfo] = useState(null);
  // const slash = "http://localhost:4000/api"

  // useEffect(()=>{
  //   const getPins = async () =>{
  //     try {
  //       const allPins = await axios.get(slash+'/pins');
  //       setPins(allPins.data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   getPins();
  // },[])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const pins  = data.pins;

  return(
    <div className='container'>
    {/* {console.log(data.pins)} */}
    <div className="row">
      <NavBar className=" columns twelve"/>
    </div>
    <div className={styles.section}>
      <LeftSidebar pins={pins}/>
      <div className={styles.mapWrapper}>
        <ReactMapGL
          initialViewState={{
            longitude: -76.6122,
            latitude: 39.2904,
            zoom: 13,
            pitch:60
          }}
          style={{height: '100vh'}}
          mapStyle="mapbox://styles/mapbox/light-v10"
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_GL_ACCESS_TOKEN}
        >

          {
            pins.map((pin,index)=>{

          return <>
          {console.log(`I am a pin: ${pin}`)}
          <Marker
            key={index}
            longitude={pin.location.longitude}
            latitude={pin.location.latitude}
            color="dodgerblue"
            anchor="bottom"
            onClick={e => {
                e.originalEvent.stopPropagation();
                setPopupInfo(pin);
              }}
          /> 
          </>
  
            
        })}
    

        {popupInfo && (
              <Popup
                anchor="top"
                longitude={Number(popupInfo.location.longitude)}
                latitude={Number(popupInfo.location.latitude)}
                onClose={() => setPopupInfo(null)}
              >
                <div>

                  <strong>Artist</strong>: {popupInfo.artist}<br></br>
                  <strong>Address</strong>: {popupInfo.street}, PostalCode: {popupInfo.postalCode}<br></br>
                  {/* <strong>Year</strong>: {popupInfo.Year}<br></br> */}
                </div>
                <img width="100%" src={popupInfo.image.url} />
              </Popup>
            )}

        

        </ReactMapGL>
      </div>
    
    </div>
        
</div>
  )

}

export default MapPage  