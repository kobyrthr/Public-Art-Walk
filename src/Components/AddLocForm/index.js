import React from 'react'

export default function index() {
  return (
    <div class="location-form">
    <form action="/" method="POST">
        <label for="Name">Name</label>
        <input type="text" name='Name'></input>
        <label for="longitude">Longitude</label>
        <input type="text" name='longitude'></input>
        <label for="latitude">Latitude</label>
        <input type="text" name='latitude'></input>
        <button>Submit</button>
    </form> 
</div>
  )
}




