import { createContext, useEffect, useMemo, useState } from "react";

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
   

 //-- FETCHING BILL DATA FROM BACKEND---//
 const [billData, setBillData]=useState([])

useEffect(()=>{
    fetch("http://localhost:3001/userbill")
    .then(res=>res.json())
   .then( dataa=>{
     setBillData(dataa)
   })
   .catch(err=> console.log(err))

 },[])
 //------------------------------------//

 //--------- calculating the total bill amount----//
 const [totalBillAmount, setBillAmount]=useState(0)
 useMemo(()=>{
    const total=billData.reduce((acc,t)=>{
           return acc+=Number(t.userAmount);
    },0)

    setBillAmount(total)
 }, [billData])
    return(
        <>
        <proContext.Provider value={{loginData,getData,billData, totalBillAmount}}>
            {children}
        </proContext.Provider>
        </>
    )
}
export default Provider ;

