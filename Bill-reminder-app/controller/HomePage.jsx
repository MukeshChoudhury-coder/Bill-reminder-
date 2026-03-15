import { useCallback, useContext, useEffect } from "react";
import { proContext } from "../Provider/Provider";
import { useState } from "react";
import { Link } from "react-router-dom"; 
import Mainbody from "./MainBody";

function HomePage(){
    const [on ,setOn]=useState("none")

    const {loginData, getPaidBills, getSearch,searchVal,setSearchText,searchText,getSearchId}=useContext(proContext)

    const  onOff=useCallback(()=>{
       if(on==="none"){
         setOn("block")
       }else{
        setOn("none")
       }
    }, [on])
    //-----------------------------------------------------//
      //--- ENABLE DISABLE PROFILE BTN--//
      const [enableBtn, setEnableBtn]=useState(false)
      useEffect(()=>{
        if(loginData==="Please Create an Account"){
            setEnableBtn(true)
        }else{
        setEnableBtn(false)
        }
      },[loginData])
    return(
        <>
    <nav>
        <div id="nav-child1">
            <i className="fa-solid fa-money-bill" ></i>
            <p>Bill Reminder</p>
        </div>

        <div id="nav-child2"> 
           <div className="profilr-icon">
             <button id="acc-btn" onClick={onOff} disabled={enableBtn} >{loginData[0]}</button>
            <i className={"fa-solid fa-caret-down"} id="drop-down"></i>
           </div>
             
            <div id="edit"  style={{display: on}} >
                <Link to={"/login"}><button className="edit-btn" >Edit</button></Link>

               <Link to={"/paid"}> <button className="edit-btn" onClick={ getPaidBills}>Paid Bills</button></Link>
               <Link to={"/due"}> <button className="edit-btn" onClick={ getPaidBills}>Over Due</button></Link>

            </div>
        </div>
    </nav>
  <div>
      <form onSubmit={(e)=>e.preventDefault()}>
        <input type="text" placeholder="Search by bill..." 
        value={searchText}
       onChange={(e)=>{
 setSearchText(e.target.value)
 getSearch(e.target.value)
}}
        ></input>
        <button >Search</button>
    </form>

    <div id="Search-result">
      
       
        {Array.isArray(searchVal)&& searchVal.map((s)=>{
         return <Link to={"/search-section"}>
         <div key={s.id} id="search-data" onClick={()=>getSearchId(s.id)}>
                <p>{s.userBill}</p>
                <p>{s.userAmount}</p>
                <p>{s.userDate}</p>
                <p>{s.status}</p>
            </div>
         </Link>
        })}
    </div>
  </div>

   {loginData==="Please Create an Account" ? <div className="create-profile-msg-btn">
    <h1 id="create-profile-text">Create your profile first</h1> 
    <img src="../src/assets/createaccount.png" id="create-profile-img"></img>
   <Link  to={"/login"}> <button id="create-profile-btn">Create Profile</button></Link>
   </div>: <Mainbody></Mainbody> }
        </>
    )
}
export default HomePage;
