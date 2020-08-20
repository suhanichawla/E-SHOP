
import {setItem,getItem} from './localStorage'

export async function signUp(formData){
    try{
        var res=await fetch('/api/auth/signup',{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(formData)
        })
        var response=await res.text()
        var user=JSON.parse(response)
        setItem("id",user.id)
        setItem("name",user.name)
        setItem("email",user.email)
        setItem("profilePic",user.profilePic)
        return user;
    }catch(e){
        alert(e)
        return null;
    }
    

}   

export async function signIn(formData){
    try{
        var res=await fetch('/api/auth/signin',{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(formData)
        })
        var response=await res.text()
        var user=JSON.parse(response)
        setItem("id",user.id)
        setItem("name",user.name)
        setItem("email",user.email)
        setItem("profilePic",user.profilePic)
        return user;
    }catch(e){
        alert(e)
        return null;
    }
    
}   

export async function getProducts(){
    try{
        var id=getItem("id")
        var res=await fetch(`/api/users/${id}/products`)
        var response=await res.text()
        var products=JSON.parse(response)
        return products
    }catch(e){
        console.log(e)
        return e;

    }
    
}

export async function addProduct(formData){
    try{
        var id=getItem("id")
        var res=await fetch(`/api/users/${id}/products`,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(formData)
        })
        var response=await res.text()
        var product=JSON.parse(response)
        return product
    }catch(e){
        console.log(e)
        return e;
    }
    
}   

export async function deleteProduct(productId){
    try{
        var id=getItem("id")
        var res=await fetch(`/api/users/${id}/products/${productId}`,{
            method:"DELETE",
            headers:{
                "content-type":"application/json"
            },
        })
        var response=await res.text()
        var product=JSON.parse(response)
        return product
    }catch(e){
        console.log(e)
        return e;
    }
}   