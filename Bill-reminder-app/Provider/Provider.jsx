import { createContext, useEffect, useState } from "react";

export const proContext=createContext()

function Provider({children}){

const [loginData , setLoginData]=useState("Please Create an Account")
//------- fetching user`s login data-----//
const getData=useEffect(()=>{
    fetch(`http://localhost:3001/logindata`)
    .then(res=>res.json())
    .then(data=>{
        setLoginData(data.username)
        console.log(loginData)
    })
},[setLoginData] )
 //-------------------------------------------//   




    return(
        <>
        <proContext.Provider value={{loginData,getData}}>
            {children}
        </proContext.Provider>
        </>
    )
}
export default Provider ;
