import React, { useState } from 'react'
// import { useHistory} from 'react-router-dom'
// import {createBrowserHistory} from 'history'


const Login =  () => {
  const [info,setinfo]=useState({email:"",password:""})
  // const history=useHistory();
  const handlesubmit=async(e)=>{
    e.preventDefault()
    const response = await fetch("http://localhost:5000/login/user",{
      method:"POST",
      headers: {"Content-Type":"application/json"},
      body:JSON.stringify({email:info.email,password:info.password})
      
    })
    let data= await response.json();
    console.log(data)
    if(data){
      localStorage.setItem("token",data.authtoken)
      // history.push("/signup")
      window.location.href="/"
    //  forceRefresh=true
    }else{
      console.log("token not found")
    }

  }

  const handlechange =(e)=>{
    setinfo({...info,[e.target.name]:e.target.value})
  }

  return (
    <>
{/* <div className="d-flex align-items-center justify-content-center " style={{height:"80vh"}}> */}
<h1 className='my-3 text-center'>Enter Your Details to Login </h1>
    <form onSubmit={handlesubmit}>
    <div className="mb-3 ">
      <label htmlFor="email" className="form-label">Email address</label>
      <input type="email" className="form-control" id="email" value={info.email} name='email' onChange={handlechange} aria-describedby="emailHelp"/>
    </div>

    <div className="mb-3">
      <label htmlFor="password" className="form-label">Password</label>
      <input type="password" className="form-control" id="password" name="password"  value={info.password} onChange={handlechange}  />
    </div>
  <div className="text-center my-4">
    <button type="submit" className="btn btn-primary" >Log In</button>
  </div>
   
  </form>
  {/* // </div> */}

  </>
  )
}

export default Login
