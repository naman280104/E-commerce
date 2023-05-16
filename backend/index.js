const express = require('express');



require('./db/config');

const cors = require('cors');
const User = require('./db/User');
const Product = require('./db/Product');
const app = express();

const Jwt = require('jsonwebtoken');
const jwtKey='e-comm';

app.use(express.json());
app.use(cors());

app.post('/register',async (req,resp)=>{
    let getuser =await User.findOne({email: req.body.email}).select('-password')
    console.log(getuser)
    if(getuser==null){
    let user = new User(req.body);
    let result  = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({result},jwtKey,{expiresIn:'2h'},(err,token)=>{
        if(err) resp.send({result: "Something Went wrong try again after some time"});
        else resp.send({result,auth:token});
    })
    }
    else resp.send({result:"User Already exist"});
});


app.post('/login',async (req,resp)=>{
    if(req.body.password && req.body.email){
        let user =await User.findOne(req.body).select('-password');
        if(user)
        {
            Jwt.sign({user},jwtKey,{expiresIn:'2h'},(err,token)=>{
                if(err) resp.send({result: "Something Went wrong try again after some time"});
                else resp.send({user,auth:token});
            })
        } 
        else resp.send({result:"No User Found"});
    }
    else resp.send({result:"incorrect cred type"});
})

app.post('/add-product',verifyToken,async(req,resp)=>{
    let product = new Product(req.body);
    let result  = await product.save();
    result = result.toObject();
    resp.send(result);
})


app.get('/products',verifyToken,async (req,resp)=>{
    console.log(req.query,"342")
    let products = await Product.find(
        {"userId":req.query._id}
        );
    if(products.length>0){
        resp.send(products)
    }
    else resp.send({"result":"No product Found"})
})


app.delete('/product/:id',verifyToken,async(req,resp)=>{
    const result = await Product.deleteOne({_id:req.params.id})
    resp.send(result);

})


app.get('/product/:id',verifyToken,async(req,resp)=>{
    const result = await Product.findOne({_id:req.params.id})
    if(result) resp.send(result)
    else resp.send({result:"No Result Find"})
})

app.put('/update/:id',verifyToken,async(req,resp)=>{
    console.log(req.body)
    const result = await Product.updateOne({_id:req.params.id},req.body)
    if(result) resp.send(result)
    else resp.send({result:"NO id to update"})
})


app.get('/search/:key',verifyToken,async(req,resp)=>{
    const result = await Product.find(
        {"$or":[
            {name:{$regex:req.params.key}},
            {price:{$regex:req.params.key}},
            {category:{$regex:req.params.key}},
            {company:{$regex:req.params.key}},
        ],
        "userId":req.query._id
        }
    )

    if(result) resp.send(result)
    else resp.send({result:"No searched"})
})


function verifyToken(req,resp,next){
    console.log(req.headers);
    let token = req.headers['authorization'];
    console.log("token ",token)
    console.log("token ",typeof token)
    if(token){
        console.log(token);
        Jwt.verify(token,jwtKey,(err,valid)=>{
            if(err){
                console.log(err)
            resp.status(401).send({result: "Please add valid token"});
            }
            else{
                next();
            }
        })
    }
    else{
        resp.status(403).send({result: "Please add token with header"})
    }
}

app.listen(5000);