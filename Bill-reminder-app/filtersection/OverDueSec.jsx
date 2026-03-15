import { useContext } from "react"
import { proContext } from "../Provider/Provider"
function OverDueSec(){
const {overDueBill}=useContext(proContext)

return (
    <>
    {overDueBill.length===0 && <h1>There is no over due yet!</h1>}
     
     <div>
        {overDueBill.map((p)=>{
    return <div key={p.id} className="data-containers">
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
export default OverDueSec
