import axios from 'axios'


export async function postUser(params){
    let baseURL = 'http://localhost:5000'
    await axios.post(`${baseURL}/register`,params)
    .then(res =>{
        console.log(res.data);
        if(res.data.result!="User Already exist") localStorage.setItem("user",JSON.stringify(res.data));
    })
    .catch((err)=>console.log(err));
}


export async function LoginUser(params){
    let baseURL = 'http://localhost:5000'
    let user={};
    await axios.post(`${baseURL}/login`,params)
    .then((res)=>{
        user = res;
        console.log(res.data);
        try{
            if(res.data.email) localStorage.setItem("user",JSON.stringify(res.data));
            else throw "error caught";
        }
        catch(err){
            console.log(err);
        }
    })
    .catch((err)=>"error");
    // console.log("user is ",user);
    return user;
}


export async function AddProduct(params){
    let baseURL = 'http://localhost:5000'
    let product={}
    await axios.post(`${baseURL}/add-product`,params)
    .then(res =>{
        product=res.data
    })
    .catch((err)=>console.log(err));
    return product;
}