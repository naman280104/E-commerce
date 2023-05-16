import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginUser } from '../api/axios'

export default function Login() {
    const navigate = useNavigate()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const Loginbtn=async ()=>{
        let res = await LoginUser({email,password});
        if(res.data.result!='No User Found' && res.data.result!='incorrect cred type'){
            navigate('/');
        }
    }
    
    
    return (
    <div className="login" >
        <form action='#' onSubmit={(e)=>{Loginbtn();e.preventDefault();}}>
        <h1>Login Page</h1>
        <input className='inputBox' type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email' required/>
        <input className='inputBox' type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter password' required/>  
        <button type="submit">Login</button>
        </form>
    </div>
  )
}


