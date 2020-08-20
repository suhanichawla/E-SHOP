import React, { Component } from 'react';
import {Switch,Route} from "react-router-dom"
import AuthForm from './components/authForm'
import {getItem} from './services/localStorage'
import Homepage from './components/homepage'
import Navbar from './components/navbar'
import Portal from './components/portal'
export default class Main extends Component {
  render() {
    return (
        <div>
        <div >
        <Switch>
          <Route exact path="/" render={props => getItem("id")==null ? <Homepage {...props}/> :<Portal {...props}/>}></Route>
          <Route exact path="/signup"  render={props => <AuthForm  buttontext="Sign me up!" signup heading="Join E-SHOP" {...props}/>}></Route>
          <Route exact path="/signin"  render={props => <AuthForm  buttontext="Log in" heading="Welcome back" {...props}/>}></Route>
          <Route exact path="/home" render={props => <Portal {...props}/> }></Route>
        </Switch>
        </div>
        </div>
    );
  }
}
