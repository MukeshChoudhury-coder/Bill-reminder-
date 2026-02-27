import { useContext } from "react"
import { proContext } from "../Provider/Provider"
function Crud(){
    const {billData,geteditInpt}=useContext(proContext)

return(
    <>
    
    <div id="Crud-data-container">
        <span id="crud-title">
            Your Bills
        </span>

        <div id="date-sataus-due-etc-container">
           <div id="date-sataus-due-etc" >
            <p>Bill</p>
            <p>Amount</p>
            <p>Due Date</p>
            <p>Status</p>
            <p>Action</p>
           </div>

           <div id="show-users-bill">

           {Array.isArray(billData)&&billData.map((e)=>{
            return <div id="bill-container" key={e.id}>
                 <div id="Paid-btn-container" >
                    <button>Paid</button>
                    <p>{e.userBill}</p>
                 </div>
             <p>{e.userAmount}</p>
             <p>{e.userDate}</p>
             <p></p>
             <div id="status">
                <button><i className={"fa-solid fa-trash"}></i></button>
                <button onClick={()=>geteditInpt(e.id)}><i className={"fa-solid fa-marker"}></i></button>
             </div>
            </div>

           })}
           </div>
        </div>
    </div>
    </>
)
}
export default Crud
