import React,{useState,useEffect} from "react"
import axios from "axios"
import NavBar from '../../Components/NavBar';

const SubmitPage = ()=>{
const slash = "http://localhost:4000/api/suggestions"
const [suggestions, setSuggestions] = useState([])
const [Name, setName]= useState("")
const [Street, setStreet]= useState("")
const [Zip_Code, setZip_Code]= useState("")
const [Artist, setArtist]= useState("")
const [Details, setDetails]= useState("")
const [show, setShow] = useState(true)
const [suggestionId, setSuggestionId] = useState("")



const getSuggestions = async()=>{
    try {
        //GET ALL THE SUGGESTIONS FROM THE SERVER
        const allSuggestions = await axios.get(slash)
        // SET THE SUGGESTION DATA TO THE SUGGESTIONS STATE ARRAY
        setSuggestions(allSuggestions.data)
    } catch (error) {
        console.log(error)
    }
}
useEffect(()=>{
    // CALL THE GETSUGGESTIONS FUNCTION
    getSuggestions()
},[])

const suggestionPost = async(e)=>{
    e.preventDefault()
    const newSuggestion = {Name,Street,Zip_Code,Artist,Details}
    try {
        const res = await axios.post(slash, newSuggestion)
        console.log(res)
        getSuggestions() 
        closeEdit() 
    } catch (error) {
        
    }
}

const suggestionDelete = async (id)=>{
    try {
        //SEND THE DELETE REQUEST FOR THE SELECTED ITEM
        const deletedSuggestion = await axios.delete(slash+`/${id}`)
        console.log("Deleted",deletedSuggestion)
        //RERENDER THE SUGGESTIONS LIST
        getSuggestions()
    } catch (error) {
        console.log(error)
    } 
}

const openEdit = async (id)=>{
    try {
        //SET THE SELECTED SUGGESTION STATE TO ALL SUGGESTIONS WHERE THE THE SUGGESITON ID MATCHES THE ID PASSED BY OUR ONCLICK
        let suggestion = suggestions.filter(x=>x._id===id)
        //CHANGE SHOW STATE TO FALES
        setShow(false)
        //SET THE STATE FOR THE FORM FIELD TO RENDER THE INFO FROM THE SELECTED SUGGESTION
        setSuggestionId(suggestion[0]._id) 
        setStreet(suggestion[0].Street) 
        setZip_Code(suggestion[0].Zip_Code)
        setArtist(suggestion[0].Artist)
        setDetails(suggestion[0].Details)    
    } catch (error) {
        console.log(error)
    } 
}

const closeEdit = async (id)=>{
    try {
        // CHANGE SHOW STATE TO TRUE TO CLOSE THE EDIT FORM
        setShow(true)
        // RESET THE STATE OF THE FORM
        setSuggestionId("") 
        setName("")
        setStreet("")
        setZip_Code("")
        setArtist("")
        setDetails("")
      
    } catch (error) {
        console.log(error)
    } 
}

const suggestionEdit = async (e)=>{
    try {
        // PREVENT THE BUTTON FROM AUTOMATICALLY SUBMITTING WHEN CLICKED
        e.preventDefault()
        // GATHER THE CURRENT ITEM DETAILS FROM THE CURRENT STATE
        const updatedSuggestion = {Name, Street, Artist, Details, Zip_Code}
        // HIT THE PUT ROUTE AND PASS THE CURRENT FORM DETAILS TO THE SUGGESTION ID
        const res = await axios.put(slash+`/${suggestionId}`, updatedSuggestion)
        // RESET THE SUGGESTION LIST
        getSuggestions()  
        // TOGLLE THE DETAILS FORM OFF
          setShow(true)
        // RESET THE STATE OF THE FORM
        window.location.reload()
    } catch (error) {
        console.log(error)
    } 
}

    return(
        <div className="container">
            <div className="row">
                <NavBar/>
            </div>
            <div className="row sgstPage">            
                {show? 
                <div className="columns eight suggest-wrapper">

                <form className="suggestForm" action="/" method="POST">
                    <h1> Suggest A New Location</h1>
                    <label for="title">Your Name</label>
                    <input type="text" name="title" value={Name} onChange={e=>setName(e.target.value)}></input>
                    <label for="Street">Street</label>
                    <input type="text" name="Street" value={Street} onChange={e=>setStreet(e.target.value)}></input>
                    <label for="Zip Code">Zip Code</label>
                    <input type="text" name="Zip Code" value={Zip_Code} onChange={e=>setZip_Code(e.target.value)}></input>
                    <label for="Artist">Artist</label>
                    <input type="text" name="Artist" value={Artist} onChange={e=>setArtist(e.target.value)}></input>
                    <label for="">Details</label>
                    <textarea type="text" name="Details" value={Details} onChange={e=>setDetails(e.target.value)}></textarea>
                    <button onClick={(e)=>suggestionPost(e)}>Save</button>
                    <button type="reset" onClick={(e)=>{window.location.reload()}}>Cancel</button>
                </form>

                </div>
                :
                    
                <div className="columns eight suggest-wrapper">

                <form className="suggestForm" action="/" method="POST">
                    <h1> Edit A Suggestion</h1>
                    <label for="title">Your Name</label>
                    <input type="text" name="title" value={Name} onChange={e=>setName(e.target.value)}></input>
                    <label for="Street">Street</label>
                    <input type="text" name="Street" value={Street} onChange={e=>setStreet(e.target.value)}></input>
                    <label for="Zip Code">Zip Code</label>
                    <input type="text" name="Zip Code" value={Zip_Code} onChange={e=>setZip_Code(e.target.value)}></input>
                    <label for="Artist">Artist</label>
                    <input type="text" name="Artist" value={Artist} onChange={e=>setArtist(e.target.value)}></input>
                    <label for="">Details</label>
                    <textarea type="text" name="Details" value={Details} onChange={e=>setDetails(e.target.value)}></textarea>
                    <button type="submit" onClick={(e)=>suggestionEdit(e)}>Save</button>
                    <button type="reset" onClick={(e)=>closeEdit()}>Cancel</button>
                </form>

                </div>
                    
                }            

                <div className="columns four loc-list-wrapper">
                    <h3>Suggested Locations</h3>
                    <div className = "loc-list">

                    {
                        suggestions.map((suggestion,index)=>{
                            return <li className="loc-list-item">

                                <span>{suggestion.Street}, {suggestion.Zip_Code}</span><br></br>
                                Details: {suggestion.Details}<br></br>
                                Status: {suggestion.Status}<br></br>
                                
                                {/* <form action={`/suggestions/${suggestion._id}`}>
                                </form> */}
                                <button onClick={(e)=>suggestionDelete(suggestion._id)}>Delete</button>
                                <button onClick={(e)=>openEdit(suggestion._id)}>Edit</button>
                            </li>
                        })
                    }

                        <div className="icn-btn"></div>
                        <div className="icn-btn"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubmitPage