var express=require("express")
const router=express.Router({mergeParams:true})

const db=require("../models")


//url- /api/users/:id/products
createProduct= async function(req,res,next){
    try{
        console.log("body is ",req.body)
        var {description,name,price}=req.body
        let product=await db.Product.create({
            name,
            description,
            price
        })
        return res.status(200).json(product);

    }catch(e){
        return next(e);
    }
}
//api/users/:id/events/:product_id

deleteProduct= async function(req,res,next){
    try{
        let found_product=await db.Product.findById(req.params.product_id)
        await found_product.remove();
        return res.status(200).json(found_product)
    }catch(e){
        return next(e);

    }
}
getProducts= async function(req,res,next){
    try{
        let products=await db.Product.find({})
        return res.status(200).send(products)
    }catch(e){
        console.log(e);
    }
}


router.route("/")
.post(createProduct)
.get(getProducts);

router.route("/:product_id")
.delete(deleteProduct);


module.exports=router