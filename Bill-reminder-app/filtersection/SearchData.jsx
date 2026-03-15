import { useContext } from "react"
import { proContext } from "../Provider/Provider"
function SearchData(){
const {searchContainer}=useContext(proContext)

return(
    <>
   {Array.isArray(searchContainer)&& searchContainer.map((s)=>{
    return <div key={s.id} id="search-sec" className="data-containers">
        <p>{s.userBill}</p>
        <p>{s.userAmount}</p>
        <p>{s.status}</p>
        <p>{s.userDate}</p>
    </div>
   })}
    </>
)
}
export default SearchData