import { createContext, useEffect, useMemo, useState, useCallback } from "react";

export const proContext=createContext()

function Provider({children}){

    //--- display ; hidden bill form input--/
    const [display, setDisplay]=useState("none")
    const ShowInptField=useCallback(()=>{
        if(display==="none"){
            setDisplay("block")
        }else{
            setDisplay("none")
        }
    }, [display])

const [loginData , setLoginData]=useState("Please Create an Account")
//------- fetching user`s login data-----//
const getData=useEffect(()=>{
    fetch(`http://localhost:3001/logindata`)
    .then(res=>res.json())
    .then(data=>{
        setLoginData(data.username)
    })
},[] )

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
   
 },[])

//----------------------------------------//

//---------EDIT POST AND SEND TO THE BACKEND---//
const [editedData, setEditedData]=useState()

const geteditInpt=(value)=>{
setDisplay("block")

 const selected = billData.find((e) => e.id === value)

  setEditedData(selected)
}
//-----------------------------------------------------//


//----DELETE DATA FOR BILL.TXT------//




    return(
        <>
        <proContext.Provider value={{loginData,getData,billData, totalBillAmount,geteditInpt, ShowInptField,display, editedData, setBillData}}>
            {children}
        </proContext.Provider>
        </>
    )
}
export default Provider ;

