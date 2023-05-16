const express = require('express');
require('./db/config');

const cors = require('cors');
const User = require('./db/User');
const Product = require('./db/Product');
const app = express();

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
    resp.send(result);
    }
    else resp.send({result:"User Already exist"});
});


app.post('/login',async (req,resp)=>{
    if(req.body.password && req.body.email){
        let user =await User.findOne(req.body).select('-password');
        if(user) resp.send(user);
        else resp.send({result:"No User Found"});
    }
    else resp.send({result:"incorrect cred type"});
})

app.post('/add-product',async(req,resp)=>{
    let product = new Product(req.body);
    let result  = await product.save();
    result = result.toObject();
    resp.send(result);
})

app.listen(5000);