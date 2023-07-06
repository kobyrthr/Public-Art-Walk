import React, { useState } from 'react';
import styles from './LeftSidebar.module.css'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Box, 
  Center, 
  Stack, 
  StackDivider, 
  Text,
  useDisclosure,
  Button
} from '@chakra-ui/react'
export default function LeftSidebar({pins}) {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <>
    {/* // CUSTOM COMPONENT */}
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
    


    {/* // CHAKRA COMPONENT */}
    <div>
    <div className={styles.drawerbtn}>
    <Button ref={btnRef} colorScheme='teal' onClick={onOpen} >
        Show Locations
    </Button>
    </div>
    <Drawer
    isOpen={isOpen}
    placement='bottom'
    onClose={onClose}
    finalFocusRef={btnRef}
    >
    <DrawerOverlay />
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader>Locations</DrawerHeader>
      <DrawerBody>
      <div className= {styles.mobileSidebar}>
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
      </DrawerBody>
    </DrawerContent>
  </Drawer>

    </div>

    
    
    </>
    
  )
}
