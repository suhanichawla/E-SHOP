import React,{Component} from "react"
import {Link} from "react-router-dom"
import { getItem ,removeItem} from "../services/localStorage"
import { withRouter } from "react-router-dom";
import defaultIMG from '../images/defaultIMG.png';



class Navbar extends Component{
    handleSignout=()=>{
        removeItem("id")
        removeItem("name")
        removeItem("email")
        removeItem("profilePic")
        this.props.history.push('/')
    }
    render(){
        return(
            <nav className="navbar navbar-expand">
                <div className="container-fluid">
                    <div className="navbar-header">
                    </div>
                    <div className="navRight">E-SHOP!</div>
                    {this.props.isSignedIn ?( 
                        <ul className="nav navbar-nav navbar-right signedinNav">
                            <li>
                            <div style={{display:"inline-block"}}>
                                    <img style={{height:"70px",width:"70px",borderRadius:"50%"}} src={getItem("profilePic") || defaultIMG} />
                                </div>
                            </li>
                           <li>
                            <div>
                                <div style={{display:"inline-block",width:"0.5vw"}}></div>
                                <div style={{display:"inline-block",marginRight:"15px"}}>
                                    <div>Signed in as:</div>
                                    <div>{getItem("name")}</div>
                                    <div>{getItem("email")}</div>
                                </div>
                                
                            </div>
                            </li>
                            <li><a onClick={this.handleSignout}>Logout</a></li>
                        </ul>
                    ):
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/signup">Signup</Link></li>
                        <li><Link to="/signin">Signin</Link></li>
                        <li><Link to="/">Home</Link></li>
                    </ul>
                    } 
                </div>
            </nav>
        )
    }
}


export default withRouter(Navbar);