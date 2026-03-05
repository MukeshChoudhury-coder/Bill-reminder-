import "./App.css";
import { Route, Routes } from "react-router-dom"
import HomePage from "../controller/HomePage";
import CreateAccount from "../controller/CreateAccount"
import PaidSec from "../filtersection/PaidSec";
import OverDueSec from "../filtersection/OverDueSec";

function App() {
return(
  <>
   <Routes>
    <Route path="/"  element={<HomePage></HomePage>}></Route>
    <Route path="/login"  element={<CreateAccount></CreateAccount>}></Route>
    <Route path="/paid" element={<PaidSec></PaidSec>}></Route>
    <Route path="/due" element={<OverDueSec></OverDueSec>}></Route>
   </Routes> 
 
  </>
)
}

export default App;
