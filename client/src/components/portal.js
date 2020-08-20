import React, { Component } from 'react';
import Navbar from './navbar'
import {getProducts,addProduct,deleteProduct} from '../services/apiCalls'
import {Route,withRouter} from 'react-router-dom'
import AddProductForm from './addProuductForm';
class Portal extends Component {
    constructor(props){
        super(props)
        this.state={
            productList:[],
            showAdd:false,
        }
    }
    componentDidMount(){
        getProducts().then((products)=>{
            this.setState({...this.state,productList:products})
        })
    }

    goToAdd=()=>{
        this.setState({...this.state,showAdd:true})
    }

    deleteProduct=(id)=>{
        deleteProduct(id).then((product)=>{
            alert(`${product.name} has been deleted`)
            getProducts().then((products)=>{
                this.setState({...this.state,productList:products})
            })
        })
    }

    viewProducts=()=>{
        this.setState({...this.state,showAdd:false})
    }
    addProduct= async (obj)=>{
        await addProduct(obj)
        getProducts().then((products)=>{
            this.setState({...this.state,productList:products})
        })
    }
  render() {
    return (
         <div>
         <Navbar isSignedIn={true}/>
         <div style={{display:"flex"}}>
        
        <div className="sidebar">
            <div className="section top">
            <div className="item" style={{fontWeight: this.state.showAdd ? "normal":"bold"}} onClick={this.viewProducts}>View Products</div>
            <div className="item" style={{fontWeight: this.state.showAdd ? "bold":"normal"}} onClick={this.goToAdd} >Add Products</div>
            <div className="item">Option 3</div>
            </div>
            <div className="section bot">
            <div className="item">Settings</div>
            <div className="item">Questions?</div>
            </div>
        </div>
        {this.state.showAdd ? <AddProductForm addProduct={this.addProduct}/> 
            :
        <div style={{textAlign:"center",width:"75%"}}>
            <ul style={{display:"flex",flexWrap:"wrap",padding:"20px",listStyleType:"none"}}>
            {this.state.productList.map((product,index)=>{
                return  <li style={{padding:"10px",marginLeft:"5px",marginTop:"15px",width:"30%"}} key={product._id}>
                <div className="card border-secondary mb-3" style={{maxWidth: "18rem"}}>
                <div className="card-header bg-transparent border-secondary">{product.name}</div>
                <div className="card-body text-secondary">
                <h5 className="card-title">Cost: {"Rs: "+product.price}</h5>
                <p className="card-text">{product.description}</p>
                </div>
                <div className="card-footer bg-transparent border-secondary"><button onClick={()=>this.deleteProduct(product._id)}>Delete Item</button></div>
                </div>
                </li>
            
            })}
            </ul>
        </div>}
      </div>
      </div>
    );
  }
}

export default withRouter(Portal);