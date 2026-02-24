import { useCallback, useRef, useState } from "react";
import Crud from "./Crud";
import { useContext } from "react";
import { proContext } from "../Provider/Provider";


function Mainbody(){
const {totalBillAmount}=useContext(proContext)

//--- display ; hidden bill form input--/
const [display, setDisplay]=useState("none")
const ShowInptField=useCallback(()=>{
    if(display==="none"){
        setDisplay("block")
    }else{
        setDisplay("none")
    }
}, [display])
//-----------------------------------------//

//----- sending bill data to backend----//
const billRef=useRef()
const amountRef=useRef()
const dateRef=useRef()

async function sendingBillData(e){
    e.preventDefault()
    try{
        const res=await fetch('http://localhost:3001/userbill', {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                id: Date.now(),
                userBill:billRef.current.value,
                userAmount:amountRef.current.value,
                userDate:dateRef.current.value
            })
        })

        if(res.ok){
            let da=await res.json()
            console.log(da.mesage)
            
        }
    }catch(err){
   console.log(err)
    }
}



    return(
        <>
        <div className="bill-records">
            <div className="bill-records-child1">
                <span>Total bill</span>
                <small>Rs. {totalBillAmount}</small>
            </div>

            <div className="bill-records-child2">
                 <span>Total Due</span>
                <small>0</small>
            </div>

            <div className="bill-records-child3">
                 <span>Total Over Due</span>
                <small>0</small>
            </div>

            <div className="bill-records-child4">
                 <span>Total Upcomming Due</span>
                <small>0</small>
            </div>
        </div>

        <div className="add-btn-form">
          <div id="add-btn-container">
              <button id="add-btn"  onClick={ShowInptField}>+Add New Bill</button>
          </div>

            <form className="input-fields" style={{display: display}} onSubmit={sendingBillData} >
            <label>
                <p>Add Bill</p>
                <input type="text" placeholder="Enter Your Bill..." required ref={billRef} id="bill-inpt "></input>
            </label>

            <label>
                <p>Add Amount</p>
                <input type="number" placeholder="Enter Your Amount..." required ref={amountRef} id="amount-inpt"></input>
            </label>
            <label>
                <p>Add Due Data</p>
                <input type="date" placeholder="Enter Your Due Date..." required ref={dateRef} id="date-inpt" ></input>
            </label>

            <button id="add-bill" >Add Bill</button>
            </form>
        </div>

        <Crud></Crud>
        </>
    )
}
export default Mainbody;
