import React from 'react'
import {
  BrowserRouter as Router,
  Link, 
} from "react-router-dom";


const Navbar = () => {
  const handlelogout=()=>{
    localStorage.removeItem('token')
    window.location.href="/login/user"
  }
  return (
    <>
    <Router forceRefresh={true}>

    <div>
          <nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <h1 className="navbar-brand" >NOTES</h1>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item mx-2 ">
          <Link className="nav-Link active"  style={{color:"black",textDecoration:"none"}} to="/">Home</Link>
        </li>
        <li className="nav-item mx-2 ">
          <Link className="nav-Link" to="/" style={{color:"black",textDecoration:"none"}} >About</Link>
        </li>
       
      </ul>

      {!localStorage.getItem('token') ? <div><Link className="btn btn-primary mx-2" 
      to="/login/user"role="button">Login</Link> <Link className="btn btn-primary mx-2" to="/signup" role="button">Sign Up</Link></div> : <Link className="btn btn-primary mx-2" onClick={handlelogout} role="button" to="/login/user">Log Out</Link>}

    </div>
  </div>
</nav>

    </div>
    </Router>
    </>
  )
}

export default Navbar
