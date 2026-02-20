import CreateAccountFormInpt from "./CreateAccountFormInpt";
function CreateAccount(){
     return(
    <>
    <div id="container">
      <div id="child1"> 
        <i id="fa-solid fa-money-bill" ></i>
        <p className="child1-para">Bill Reminder</p>
      </div>
      <div id="contant">
        <img src="/src/assets/createaccount.png" id="contant-child"></img>

     <p id="contant-child2">Create Account</p>
     <p id="contant-child3" >Enter your details to get started and customize your experence</p>
      </div>
      <CreateAccountFormInpt />
    </div>
    </>
  )
}
export default CreateAccount;