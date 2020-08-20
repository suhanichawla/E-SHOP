import React,{Component} from "react"
import { signUp,signIn } from "../services/apiCalls";
import { withRouter } from "react-router-dom";
import Navbar from './navbar'
class Authform extends Component{
    constructor(props){
        super(props)
        this.state={
            email:"",
            username:"",
            password:"",
            profilePic:"",
            name:"",
            address:"",
            contact:""
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    async handleSubmit(e) {

        e.preventDefault();
        const authType=this.props.signup ? "signup" :"signin";
        if(authType=="signup"){
            if(this.state.name.length==0 || this.state.email.length==0||this.state.username.length==0||this.state.password.length==0||this.state.contact.length==0||this.state.address.length==0){
                alert("Please fill all required fields")
            }
            else{
                var user=await signUp({...this.state})
                if(user.username){
                    this.props.history.push("/");
                }else{
                    alert(user.error.message)
                    this.setState(
                        {
                            email:"",
                            username:"",
                            password:"",
                            profilePic:"",
                            name:"",
                            address:"",
                            contact:""
                        }
                    )
                    this.props.history.push("/signup");
                }
            }
        }else{
            if(this.state.username.length==0 || this.state.password.length==0){
                alert("Please fill all required fields")
            }else{
                var user=await signIn({username:this.state.username,password:this.state.password})
                if(user.username){
                    this.props.history.push("/");
                }else{
                    alert("Either username or password is incorrect")
                    this.setState(
                        {
                            username:"",
                            password:"",
                        }
                    )
                    this.props.history.push("/signin");
                }
                
           }
        }
        
    }
    render(){
        const {email,username,password,profilePic}=this.state;
        const {heading,buttontext,signup}=this.props;
        return(
            <div>
                <Navbar isSignedIn={false}/>
                <div className="text-center container col-md-8" id="authForm">
                    <div className="col-md-6" style={{marginTop:"15px"}}>
                        <form onSubmit={this.handleSubmit}>
                            <h2>{heading}</h2>
                            {/* {error.message && <div className="alert alert-danger">{error.message}</div>} */}
                            <label htmlFor="username">Username:</label>
                            <input className="form-control" 
                                id="username" name="username" 
                                onChange={this.handleChange} 
                                value={username} 
                                type="text" 
                            />
                            <label htmlFor="password">Password:</label>
                            <input className="form-control" 
                                id="password" name="password" 
                                value={password}
                                onChange={this.handleChange}
                                type="password" 
                            />
                            {signup && (
                                <div>
                                <label htmlFor="email">Email:</label>
                                <input className="form-control" 
                                    id="email" name="email" 
                                    onChange={this.handleChange} 
                                    value={email} 
                                    type="text" 
                                />
                                <label htmlFor="profilePic">Profile Picture:</label>
                                <input className="form-control" 
                                    id="profilePic" name="profilePic" 
                                    onChange={this.handleChange} 
                                    value={profilePic} 
                                    type="text" 
                                />
                                <label htmlFor="contact">Contact:</label>
                                <input className="form-control" 
                                    id="contact" name="contact" 
                                    onChange={this.handleChange}
                                    type="text" 
                                />
                                <label htmlFor="name">Name:</label>
                                <input className="form-control" 
                                    id="name" name="name" 
                                    onChange={this.handleChange}
                                    type="text" 
                                />
                                <label htmlFor="address">Address:</label>
                                <input className="form-control" 
                                    id="address" name="address" 
                                    onChange={this.handleChange}
                                    type="text" 
                                />
                                </div>

                                
                            )}
                            <button className="btn btn-primary btn-block btn-lg " id="authSubmit" type="submit">{buttontext}</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Authform);