import React, { useRef,useEffect, useState, useMemo } from 'react';
/* eslint import/no-webpack-loader-syntax: off */
import Map, {Marker, Popup} from 'react-map-gl';
import CITIES from '../../../src/data/cities.json'
import LeftSidebar from '../../Components/LeftSidebar';
import PlaceCard from '../../Components/PlaceCard';
import axios from "axios"
import NavBar from '../../Components/NavBar';
import { useQuery,gql } from '@apollo/client';

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

const MapApp =()=> {
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
  const {pins}  = data;

  return(
    <div className='container'>
    {console.log(data)}
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
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_GL_ACCESS_TOKEN}
        >



          {
            pins.map((pin,index)=>{

              
          return <Marker
            key={index}
            longitude={pin.location.longitude}
            latitude={pin.location.longitude}
            color="dodgerblue"
            anchor="bottom"
            onClick={e => {
                e.originalEvent.stopPropagation();
                setPopupInfo(pin);
              }}
          /> 
  
            
        })}
    

        {popupInfo && (
              <Popup
                anchor="top"
                longitude={Number(popupInfo.longitude)}
                latitude={Number(popupInfo.latitude)}
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