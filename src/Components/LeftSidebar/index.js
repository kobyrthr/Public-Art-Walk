import React, { useState } from 'react';
import styles from './LeftSidebar.module.css'

export default function LeftSidebar({pins}) {

  return (
    <div className= {styles.sidebar}>
        <div className='heading'>
          <h1>Locations</h1>
        </div>
        <br></br>
       <div className={styles.locList}>
         {pins.map((pin,index)=>{
            return <li className={styles.locListItem} key={index}>

            <span>{pin.street}, {pin.postalCode}</span><br></br>
            Artist: {pin.artist}<br></br>
            {/* Year: {pin.year}<br></br> */}

            </li>
         })}
       </div>
        <div id={styles.listings} className={styles.listings}></div>
    </div>
  )
}
