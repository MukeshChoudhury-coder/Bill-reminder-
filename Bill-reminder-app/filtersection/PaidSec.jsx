import { useContext } from "react"
import { proContext } from "../Provider/Provider"
function PaidSec(){
    const {paidData}=useContext(proContext)
return (
    <>
    {paidData.length===0 && <h1>There is no paid bill yet!</h1>}
     
     <div>
        {paidData.map((p)=>{
    return <div key={p.id}>
        <p>{p.userBill}</p>
        <p>{p.userAmount}</p>
        <p>{p.status}</p>
        <p>{p.userDate}</p>
    </div>
})}
     </div>
    </>
)
}
export default PaidSec