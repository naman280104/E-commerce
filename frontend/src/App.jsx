import { useState } from 'react'
import './App.css'
import Nav from './components/Nav'
import {BrowserRouter,Route,Routes, useNavigate} from 'react-router-dom'
import Add from './components/Add'
import Update from './components/Update'
import Profile from './components/Profile'
import Footer from './components/Footer'
import SignUp from './components/Signup'
import PrivateComponent from './components/PrivateComponent'
import Login from './components/Login'
import ProductList from './components/ProductList'

function App() {
  const auth = localStorage.getItem('user');
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path='/' element={<PrivateComponent/>}>
        <Route path='/' element={<ProductList/>}/>
        <Route path='/add' element={<Add/>}></Route>
        <Route path='/update/:id' element={<Update/>}></Route>
        </Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
