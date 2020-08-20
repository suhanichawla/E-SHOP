const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePic:{
        type:String
    },
    contact:{
        type:String,
        required:true
    },
    address:{
        type:String
    }
})

userSchema.pre("save",async function(next){
    try{
        if(!this.isModified("password")){
            return next();
        }
        var hashedPass=await bcrypt.hash(this.password,10)
        this.password=hashedPass
        return next()
    }catch(err){
        return next(err)
    }
})

userSchema.methods.comparePassword=async function(candidatePassword,next){
    try{
        let isMatch=await bcrypt.compare(candidatePassword,this.password)
        return isMatch;
    }catch(err){
        return next(err)
    }
}

const User=mongoose.model("User",userSchema)
module.exports=User;