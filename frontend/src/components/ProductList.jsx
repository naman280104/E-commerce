import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { DeleteItem, GetProducts, SearchItems } from '../api/axios'

export default function ProductList() {
  const navigate = useNavigate();
  const [products,setProducts] = useState([])
  let auth = localStorage.getItem('user');
  auth = JSON.parse(auth);
  useEffect(()=>{
    getProducts();
  },[])
  const getProducts=async ()=>{
    let product = await GetProducts(auth);
    setProducts(product);
    console.warn(product);
  }

  const deleteit=async(item)=>{
    let deleteInfo = await DeleteItem(item);
    console.warn(deleteInfo);
    getProducts();
  }

  const Search=async(item)=>{
    const key = item.target.value;
    let product = await SearchItems(key,auth);
    setProducts(product);
    if(key==''){
      getProducts();
    }
  }

  
  return (
    <div className='product-list'>
      <h3 style={{"marginBottom":"20px"}}>Product List</h3>
      <input style={{"marginBottom":"20px","width":"400px","border":"1px solid skyblue","height":"30px","paddingLeft":"10px"}} onChange={(e)=>Search(e)} type="" name="" id="" placeholder='Search'/>
      <ul><b>
        <li>S.No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Operation</li>
        </b>
      </ul>
      {products.length>0?products.map((item,index)=>
      <ul>
          <li>{index+1}</li>
          <li>{item.name}</li>
          <li>Rs.{item.price}</li>
          <li>{item.category}</li>
          <li>{item.company}</li>
          <li>
            <button style={{"width":"70px","height":"25px"}} onClick={()=>deleteit(item)}>Delete</button>
            <button style={{"width":"70px","height":"25px"}} onClick={()=>navigate('/update/'+item._id)}>Update</button>
            </li>
        </ul>
      ):
      <>
      <ul style={{"marginTop":"20px"}}>
        <li>No products</li>
      </ul>
      <button style={{"width":"100px","height":"25px","marginTop":"10px","backgroundColor":"skyblue"}} onClick={()=>navigate('/add')}>Add products</button>
      </>
      }
    </div>

  )
}
