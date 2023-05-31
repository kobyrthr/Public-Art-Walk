import React, { useState } from 'react';

export default function LeftSidebar({pins}) {

  return (
    <div className='sidebar columns four'>
        <div className='heading'>
          <h1>Locations</h1>
        </div>
        <br></br>
       <div className='loc-list'>
         {pins.map((pin,index)=>{
            return <li className='loc-list-item' key={index}>

            <span>{pin.street}, {pin.postalCode}</span><br></br>
            Artist: {pin.artist}<br></br>
            {/* Year: {pin.year}<br></br> */}

            </li>
         })}
       </div>
        <div id='listings' className='listings'></div>
    </div>
  )
}
