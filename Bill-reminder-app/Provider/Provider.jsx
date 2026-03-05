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

 },[billData])
 
 //------------------------------------//

 //--------- calculating the total bill amount----//
 const [totalBillAmount, setBillAmount]=useState(0)
 useMemo(()=>{
    const total=billData.reduce((acc,t)=>{
           return acc+=Number(t.userAmount);
    },0)

    setBillAmount(total)
   
 },[billData])

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
const [idd, setId]=useState()
 function getDeleteId(value){
    setId(value)
}

useEffect(()=>{
   if(!idd){
    return
   }
   fetch(`http://localhost:3001/deleteapi?id=${idd}`,{
    method:"DELETE"
   })
   .then(res=>res.json())
   .then(data=>{
    console.log(data.dltmsg)
     setBillData(prev=>prev.filter(item=> item.id!==idd))
   })
   .catch(err=>console.log(err))
},[idd])
//--------------------------------------------------//
   //--------OVER DUE CALCULATION---------------//
const [overDue, setOverDue]=useState(0)

useMemo(()=>{
    let checkOverDue=billData.filter((d)=>{
        return d.status==="Over Due"
    })


    let overDues=checkOverDue.reduce((acc, sum)=>{
             return acc+=Number(sum.userAmount)
    }, 0)
    setOverDue(overDues)

},[billData])
//---------------------------------------------------------//
  //--ADDING PAID FEATURE--//
  const [paidId, getPaidIds]=useState()
  function  getPiadId(paidVal){
 getPaidIds(paidVal)
  }
  useEffect(()=>{
  if(!paidId){
    return 
  }
    fetch(`http://localhost:3001/paidapi?id=${paidId}`,{method:"PUT"})
  .then(res=>res.json())
  .then(data=>console.log(data.paidStatus))
  .catch(err=>console.log(err))
 
  },[paidId])
  //-------------------------------------------------------------------//
    //--- FILTERING PAID DATA FROM billData-----//
    const [paidData, setPaidData]=useState([])
 let getPaidBills=useEffect(()=>{
    let getPaid
      if(billData){
           getPaid=billData.filter((p)=>{
            return p.status==="PAID"
        })

      }

        if(!getPaid){
       return
       }else{
         setPaidData(getPaid)
       }
    }, [billData])
  //---------------------------------------------------------//
    //-------FILTERING OVERDUE BILLS FROM billData---------//
    const [overDueBill, setOverDueBill]=useState([])
    useEffect(()=>{
        let getDueBills=billData.filter((b)=>{
          return b.status==="Over Due"
        })

        if(!getDueBills){
          return;
        }
        setOverDueBill(getDueBills)
    },[billData])
   
  return(
        <>
        <proContext.Provider value={{loginData,getData,billData, totalBillAmount,geteditInpt, ShowInptField,display, editedData, setBillData,getDeleteId,overDue,getPiadId,paidData,getPaidBills,overDueBill}}>
            {children}
        </proContext.Provider>
        </>
    )
}
export default Provider ;

