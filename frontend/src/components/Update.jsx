
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import { AddProduct, GetItem, UpdatItem } from '../api/axios'

export default function Update() {
  const navigate = useNavigate()
  const params = useParams()
  const [name,setName] = useState('')
  const [price,setPrice] = useState('')
  const [category,setCategory] = useState('')
  const [company,setCompany] = useState('')


  useEffect(()=>{
    setitemDetails();
  },[])

  const setitemDetails=async()=>{
    const item  = await GetItem(params)
    console.log("item is",item)
    setName(item.name)
    setPrice(item.price)
    setCategory(item.category)
    setCompany(item.company)
  }

  const updateProduct=async()=>{
    const result = await UpdatItem(params,{name,price,category,company});
    console.log(result)
    if(result){
      console.log("Product Updated")
      navigate('/')
    }

  }
  return (
    <div className='add-product'>
      <form action="#" onSubmit={(e)=>{updateProduct();e.preventDefault();}}>
      <h1>Update Product</h1>
      <input className='inputBox' type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter product name' required />
      <input className='inputBox' type="text" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder='Enter product price' required />
      <input className='inputBox' type="text" value={category} onChange={(e)=>setCategory(e.target.value)} placeholder='Enter product category' required />
      <input className='inputBox' type="text" value={company} onChange={(e)=>setCompany(e.target.value)} placeholder='Enter product company' required />
      <button type="submit" >Update Product</button>
      </form>
    </div>
  )
}
