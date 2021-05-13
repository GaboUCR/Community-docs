import React, {useState} from "react";
import {SignUp, LogIn} from "./forms"
import {TextEditor} from "./posts"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function TopNavigationNotLogged(props){

	return(
		<Router>

    <nav id="top"  className = "flex bg-light-blue">
      <Link to = "/" className ="m-5">Share</Link>

      <nav className="my-5 absolute right-0" >
        <Link to = "/log-in" className="mx-5">Log in</Link>
        <Link to = "/sign-up" className ="mx-5" >Sign up</Link>
      </nav>

    </nav>

		<Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/log-in">
            <LogIn setId={props.setId} />
          </Route>
          <Route path="/sign-up">
            <SignUp />
          </Route>
    </Switch>

		</Router>
		);
}

function TopNavigationLogged(props){
  const[username, get_username] = useState("");

  const requestOptions = {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({id: props.id})};

  fetch('http://127.0.0.1:5000/user', requestOptions).then(response => response.json())
  .then((data) => {get_username(data.username)});

	return(
		<Router>

      <nav className = "flex bg-light-blue">
        <Link to = "/" className ="m-5">Share</Link>
        <nav className="my-5 mx-5 absolute right-0">
          <Link className="mx-5" to='/write'>write a post</Link>
          <Link className="mx-5">{username}</Link>
        </nav>
      </nav>

  		<Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/write">
          <TextEditor />
        </Route>
      </Switch>

		</Router>
		);
}

function TopNavigation(props){

  if (props.id === -1){
    return <TopNavigationNotLogged setId={props.setId} />
  }

  else{
    return <TopNavigationLogged id={props.id}/>
  }
}

function Home(){

	return <h1>This is home bitch</h1>;
}


export default TopNavigation;
