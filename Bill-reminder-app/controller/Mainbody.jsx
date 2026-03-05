import {  useEffect, useState } from "react";
import Crud from "./Crud";
import { useContext } from "react";
import { proContext } from "../Provider/Provider";


function Mainbody(){
const {totalBillAmount,ShowInptField,display,editedData, setBillData,overDue,hiddenAddBill}=useContext(proContext)


//-----------------------------------------//

//----- sending bill data to backend----//
const [formData, setFormData]=useState({
     userBill:"",
     userAmount:"",
     userDate:""
})
useEffect(()=>{
    if(editedData){
         setFormData(editedData)
    }
},[editedData])


async function sendingBillData(e){
    e.preventDefault()
 if(editedData){
   try{
 const res=await fetch('http://localhost:3001/updatebill', {
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(formData)
        })

        if(res.status===200){
            const data=await res.json()
            console.log(data.message)

            setBillData(prev =>
  prev.map(item =>
    item.id === formData.id ? formData : item
  )
)
        }else if(res.status===404){
            const data=await res.json()
            console.log(data.message)
        }
   }catch(err){
    console.log(err)
   }
 }else{
       try{
        const res=await fetch('http://localhost:3001/userbill', {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                id: Date.now(),
                userBill:formData.userBill,
                userAmount:formData.userAmount,
                userDate:formData.userDate,
            })
        })
        if(res.ok){
            console.log("data saved")
        }
        
        
    }catch(err){
   console.log(err)
    }

 }


}



//-------------------------------------------------------//




    return(
        <>
        <div className="bill-records">

            <div className="bill-records-child2">
                 <span>Total Due</span>
                <small>Rs. {totalBillAmount}</small>
            </div>

            <div className="bill-records-child3">
                 <span>Total Over Due</span>
                <small>Rs. {overDue}</small>
            </div>
        </div>

        <div className="add-btn-form">
          <div id="add-btn-container">
              <button id="add-btn"  onClick={ShowInptField} >+Add New Bill</button>
          </div>

            <form className="input-fields" style={{display: display}} onSubmit={sendingBillData} >
            <label>
                <p>Add Bill</p>
                <input type="text" placeholder="Enter Your Bill..." required  id="bill-inpt "  value={formData.userBill} onChange={(e)=>setFormData({...formData, userBill:e.target.value})}></input>
            </label>

            <label>
                <p>Add Amount</p>
                <input type="number" placeholder="Enter Your Amount..." required id="amount-inpt" value={formData.userAmount}  onChange={(e)=>setFormData({...formData, userAmount:e.target.value})}></input>
            </label>
            <label>
                <p>Add Due Data</p>
                <input type="date" placeholder="Enter Your Due Date..." required id="date-inpt" value={formData.userDate}  onChange={(e)=>setFormData({...formData, userDate: e.target.value})}></input>
            </label>

            <button id="add-bill" >Add Bill</button>
            </form>
        </div>

        <Crud ></Crud>
        </>
    )
}
export default Mainbody
