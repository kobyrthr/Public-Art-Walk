import React from 'react'
import { MobileDrawer } from './MobileDrawer/MobileDrawer'
import { PopOverIcon } from './PopOverIcon/PopOverIcon'
import { DocumentCollapse } from './DocumentCollapse/DocumentCollapse'

function NavBar() {
  return (
    <div className='navbar columns twelve'>
        <div>
          <MobileDrawer></MobileDrawer>
          <DocumentCollapse></DocumentCollapse>
        </div>
        <h1> Public Art Walk</h1> 
        {/* <a href="/"><li>Map</li></a>
        <a href="/suggestions"><li>Suggestions</li></a> */}
    </div>
  )
}

export default NavBar