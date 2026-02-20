import { createContext, useEffect, useState } from "react";

export const proContext=createContext([])

function Provider({children}){

const [loginData , setLoginData]=useState()
//------- fetching user`s login data-----//
useEffect((e)=>{
    fetch(`http://localhost:3001/logindata`)
    .then(res=>res.json)
    .then(data=> setLoginData(data))
    console.log(loginData)
}, [])
    

    return(
        <>
        <proContext.Provider value={null}>
            {children}
        </proContext.Provider>
        </>
    )
}
export default Provider ;