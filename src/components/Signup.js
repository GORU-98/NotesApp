import React, { useState } from 'react'


const Signup =  () => {
  const [info,setinfo]=useState({name:"",email:"",password:""})
  const handlesubmit=async(e)=>{
    e.preventDefault()
    const response = await fetch("http://localhost:5000/createuser",{
      method:"POST",
      headers: {"Content-Type":"application/json"},
      body:JSON.stringify({name:info.name,email:info.email,password:info.password})
      
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
    <h1 className="text-center my-3">Enter Your Details To Signin</h1>
{/* <div className="d-flex align-items-center justify-content-center " style={{height:"80vh"}}> */}
    <form onSubmit={handlesubmit}>
    <div className="mb-3 ">
      <label htmlFor="name" className="form-label">Name</label>
      <input type="name" className="form-control" id="name" value={info.name} name='name' onChange={handlechange} aria-describedby="emailHelp"/>
    </div>
    
    <div className="mb-3 ">
      <label htmlFor="email" className="form-label">Email address</label>
      <input type="email" className="form-control" id="email" value={info.email} name='email' onChange={handlechange} aria-describedby="emailHelp"/>
    </div>

    <div className="mb-3">
      <label htmlFor="password" className="form-label">Password</label>
      <input type="password" className="form-control" id="password" name="password"  value={info.password} onChange={handlechange}  />
    </div>
   
  <div className="text-center my-4">
    <button type="submit" className="btn btn-primary" >Sign In</button>
  </div>
  </form>
  {/* // </div> */}
  </>
  )
}

export default Signup
