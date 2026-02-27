import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { proContext } from "../Provider/Provider";


function CreateAccountFormInpt(){
    const {getData}=useContext(proContext)

    //--- creating enable disable btn---//
    const [enable, setEnable]=useState(true)
    const[opacity, setOpacity]=useState(0)
const userNameRef= useRef()
const userNum=useRef()
//-- success or err message---//
const [resOk, setResOk]=useState("")
// sending user`s login data to backend---//
async function postData(e){
    e.preventDefault();

    console.log("dependency change")
  try{
      const res= await fetch(`http://localhost:3001/api`,{
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({
            username:userNameRef.current.value,
            usernumber:userNum.current.value
        })
      })
      
  if(res.ok){
      
  }
      if(res.status===200){
        let data=res.json()
        setResOk(data.message)
      setEnable(false)
      setOpacity(100)
      }
  }catch(err){
    console.log(err)
  }

  
}

    return(
        <>
        <div id="form-inpt">

            <p>{resOk}</p>
            <form onSubmit={postData}>
            <label>
                <p>Enter Your Name</p>
                <input type="Text" placeholder="Enter your name....." id="name-inpt"  ref={userNameRef}></input>
            </label>
            <label>
                <p>Enter Your Number</p>
                <input type="number" placeholder="Enter your number....." ref={userNum}></input>
            </label>

           <button id="create-button" >Create Account</button>

            <p id="form-para">Your Details will be securely stored.</p>
        </form>
       <Link to="/"> <button className="back-home-btn " disabled={enable} style={{opacity}} type="submit" onClick={getData}>Go back to home</button></Link>
        </div>
        </>
    )
}
export default CreateAccountFormInpt; 
