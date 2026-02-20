import "./App.css";
import { Route, Routes } from "react-router-dom"
import HomePage from "../controller/HomePage";
import CreateAccount from "../controller/CreateAccount"
function App() {
return(
  <>
   <Routes>
    <Route path="/"  element={<HomePage></HomePage>}></Route>
    <Route path="/login"  element={<CreateAccount></CreateAccount>}></Route>
   </Routes>
 
  </>
)
}

export default App;
 