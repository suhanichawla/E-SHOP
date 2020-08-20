var express=require("express")
var app=express()
var bodyParser=require("body-parser")
var cors=require("cors")
var authRoutes=require("./routes/auth")
var productRoutes=require("./routes/products")
var errorHandler=require("./handlers/error")
const port=process.env.PORT || 8080;

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


//test route
app.get('/hello',(req,res,next)=>{
    res.send("hello to u too")
})


app.use("/api/auth",authRoutes)
app.use("/api/users/:id/products",productRoutes)

app.use((req,res,next)=>{
    let err=new Error("NOT FOUND")
    err.status=404
    next(err)
})

app.use(errorHandler)

app.listen(port,()=>{
    console.log(`SERVER STARTED ON ${port}`)
})
