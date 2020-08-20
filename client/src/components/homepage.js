import React, { Component } from 'react';
import Navbar from './navbar'
import homePage from '../images/homePage.png'

export default class Homepage extends Component {
  render() {
    return (
    <div >
        <Navbar isSignedIn={false}/>
        <div style={{textAlign:"center",marginTop:"15px"}}>
            <div> <h1>Hey! Welcome to E-SHOP! </h1></div>
            <img src={homePage} alt="Logo" style={{height:"400px",width:"400px"}}/>
        </div>
      </div>
    );
  }
}
