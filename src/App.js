import './App.css';
import Notestate from './components/context/notes/Notestate';
import Home from './components/Home';
import Navbar from './components/Navbar';
import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  
} from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
function App() {
  return (
    <>
<div className="container">

<Notestate>
    <Router >
    <Navbar/>
     <Switch>
    
          <Route exact path="/login/user">
            <Login/>
          </Route>

          <Route exact path="/signup">
             <Signup/>
          </Route>

          <Route exact path="/">
         <Home/>
          </Route>
        </Switch>
        

    </Router>
    </Notestate>
    </div>

    </>
  );
}

export default App;
