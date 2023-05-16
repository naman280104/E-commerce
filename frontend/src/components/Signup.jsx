
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postUser } from '../api/axios'

export default function SignUp() {
    const navigate = useNavigate()
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth) navigate('/')
    },[])

    const collectData=()=>{
        // if(name=="" && email=="" && password=="") alert("please fill required crdentials")
        // else
        postUser({name,email,password})
        .then((res)=>{
            navigate('/');
        });
    }

    return (
    <div className='signup'>
        <form action='#' onSubmit={(e)=>{collectData();e.preventDefault();}}>
        <h1>Register</h1>
        <input className='inputBox' type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter Name' required/>
        <input className='inputBox' type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email' required/>
        <input className='inputBox' type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter password' required />
        <button type="submit">Sign Up</button>
        </form>
    </div>
  )
}
