import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AddProduct } from '../api/axios'

export default function Add() {
  const navigate = useNavigate()
  const [name,setName] = useState('')
  const [price,setPrice] = useState('')
  const [category,setCategory] = useState('')
  const [company,setCompany] = useState('')



  const addProduct=async()=>{
    const user = localStorage.getItem('user')
    const userId = JSON.parse(user)._id
    console.log(userId)
    const product = await AddProduct({name,price,userId,category,company});
    console.log(product)
    if(product){
      console.log("Product Added")
      navigate('/')
    }

  }
  return (
    <div className='add-product'>
      <form action="#" onSubmit={(e)=>{addProduct();e.preventDefault();}}>
      <h1>Add Product</h1>
      <input className='inputBox' type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter product name' required />
      <input className='inputBox' type="text" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder='Enter product price' required />
      <input className='inputBox' type="text" value={category} onChange={(e)=>setCategory(e.target.value)} placeholder='Enter product category' required />
      <input className='inputBox' type="text" value={company} onChange={(e)=>setCompany(e.target.value)} placeholder='Enter product company' required />
      <button type="submit" >Add Product</button>
      </form>
    </div>
  )
}
