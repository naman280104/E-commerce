import axios from 'axios'


export async function postUser(params){
    let baseURL = 'http://localhost:5000'
    await axios.post(`${baseURL}/register`,params)
    .then(res =>{
        console.log(res.data);
        if(res.data.result!="User Already exist") 
        {
            localStorage.setItem("user",JSON.stringify(res.data.result))
            localStorage.setItem("token",JSON.stringify(res.data.auth))
        };
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
            if(res.data.user){
                localStorage.setItem("user",JSON.stringify(res.data.user));
                localStorage.setItem("token",JSON.stringify(res.data.auth));
            }
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
    await axios.post(`${baseURL}/add-product`,params,{headers:{Authorization:JSON.parse(localStorage.getItem('token'))}})
    .then(res =>{
        product=res.data
    })
    .catch((err)=>console.log(err));
    return product;
}



export async function GetProducts(user){
    let baseURL = 'http://localhost:5000'
    let product={}
    console.log("helloooo",user._id)
    await axios.get(`${baseURL}/products`,{params:user,headers:{Authorization:JSON.parse(localStorage.getItem('token'))}})
    .then(res =>{
        product=res.data
    })
    .catch((err)=>console.log(err));
    return product;
}

export async function DeleteItem(params){
    let baseURL = 'http://localhost:5000'
    let deleteInfo={}
    console.log("params are",params._id)
    await axios.delete(`${baseURL}/product/${params._id}`,{headers:{Authorization:JSON.parse(localStorage.getItem('token'))}})
    .then(res =>{
        deleteInfo=res.data
        console.log(res)
    })
    .catch((err)=>console.log(err));
    return deleteInfo;
}


export async function GetItem(params){
    let baseURL = 'http://localhost:5000'
    let Item={}
    await axios.get(`${baseURL}/product/${params.id}`,{headers:{Authorization:JSON.parse(localStorage.getItem('token'))}})
    .then(res =>{
        Item=res.data
        console.log(res)
    })
    .catch((err)=>console.log(err));
    return Item;
}

export async function UpdatItem(params,item){
    let baseURL = 'http://localhost:5000'
    let Item={}
    console.log(item)
    await axios.put(`${baseURL}/update/${params.id}`,item,{headers:{Authorization:JSON.parse(localStorage.getItem('token'))}})
    .then(res =>{
        Item=res.data
        console.log(res)
    })
    .catch((err)=>console.log(err));
    return Item;
}


export async function SearchItems(params,user){
    let baseURL = 'http://localhost:5000'
    let Item={}
    console.log("parmas are ",params)
    await axios.get(`${baseURL}/search/${params}`,{params:user,headers:{Authorization:JSON.parse(localStorage.getItem('token'))}})
    .then(res =>{
        Item=res.data
        console.log(res)
    })
    .catch((err)=>console.log(err));
    console.log(Item)
    return Item;
}


