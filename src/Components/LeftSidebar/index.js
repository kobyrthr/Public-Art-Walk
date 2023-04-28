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

            <span>{pin.Street}, {pin.PostalCode}</span><br></br>
            Artist: {pin.Artist}<br></br>
            Year: {pin.Year}<br></br>

            </li>
         })}
       </div>
        <div id='listings' className='listings'></div>
    </div>
  )
}
