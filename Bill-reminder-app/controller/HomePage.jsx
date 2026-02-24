import { useCallback, useContext } from "react";
import { proContext } from "../Provider/Provider";
import { useState } from "react";
import { Link } from "react-router-dom"; 
import Mainbody from "./MainBody";

function HomePage(){
    const [on ,setOn]=useState("none")

    const {loginData}=useContext(proContext)

    const  onOff=useCallback(()=>{
       if(on==="none"){
         setOn("block")
       }else{
        setOn("none")
       }
    }, [on])

    return(
        <>
    <nav>
        <div id="nav-child1">
            <i className="fa-solid fa-money-bill" ></i>
            <p>Bill Reminder</p>
        </div>

        <div id="nav-child2"> 
            <button id="acc-btn" onClick={onOff} >{loginData[0]}</button>
             
            <div id="edit" style={{display: on}}>
                <Link to={"/login"}><button className="edit-btn">Create Account</button></Link>

                <button className="edit-btn">Archived</button>
            </div>
        </div>
    </nav>

     <Mainbody/>
        </>
    )
}
export default HomePage;
