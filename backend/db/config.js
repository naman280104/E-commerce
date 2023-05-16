const mongoose = require('mongoose');

const DB = 'mongodb+srv://naman280104:namangoyal@e-commerce.5cpcbw3.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(DB).then(()=>{
    console.log("connectino succesful")
}).catch((err)=>console.log(err,121));
