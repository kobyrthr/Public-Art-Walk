import React from 'react'
import styles from "./LandingPage.module.css";


function Home() {
  return (
    <div className={styles.homeDiv}>
        <h1>PUBLIC ART WALK</h1>
        <a href="/Map"><button>Open Map</button> </a>
    </div>
  )
}

export default Home