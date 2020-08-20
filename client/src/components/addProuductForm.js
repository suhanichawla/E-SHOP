import React, { Component } from 'react';

export default class AddProductForm extends Component {
    constructor(props){
        super(props)
        this.state={
            name:'',
            description:'',
            price:0,
        }
    }
    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        this.props.addProduct({...this.state})
        alert("Product has been added")
        this.setState(
            {
                name:'',
                description:'',
                price:0,
            }
        )
    }
  render() {
    return (
        <div style={{textAlign:"center",marginLeft:"20vw",padding:"20px",fontSize:"20px"}}>
        <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">Name of the product:</label>
        <input className="form-control" 
            id="name" name="name" 
            onChange={this.handleChange} 
            value={this.state.name} 
            type="text" 
        />
        <label htmlFor="price">Price of the product:</label>
        <input className="form-control" 
            id="price" name="price" 
            onChange={this.handleChange}
            value={this.state.price}
            type="text" 
        />
        <br />
        <label 
            htmlFor="description"
            style={{marginTop:'5px'}}
        >
            Description of the product:
        </label>
        <br />
        <textarea
            id="description"
            name="description"
            rows="4"
            cols="50"
            autoComplete="off"
            value={this.state.description}
            onChange={this.handleChange}/>
            <br />
            <br />
        <input type="submit" value="Submit" />
        </form>
        </div>
    );
  }
}
