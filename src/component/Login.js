import React from 'react'
import Button from '@mui/material/Button';
import {TailSpin } from 'react-loader-spinner';
import { useState , useContext } from 'react';
import { Link } from 'react-router-dom';
import {query, where, getDocs} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
import { Appstate } from '../App';
import bcrypt from 'bcryptjs'
import swal from 'sweetalert';
import { Sig } from './Firebase/Firebase';
export default function Login() {
    const navigate = useNavigate();
    const useAppstate = useContext(Appstate);
    const [loding,setLoding] = useState(false)
    const [form , setForm] = useState({
        Number:"",
        Password:""
    })
     
    const login=async()=>{
      setLoding(true);
        try {
          const quer = query(Sig, where('Number', '==', form.Number))
          const querySnapshot = await getDocs(quer);
    
          querySnapshot.forEach((doc) => {
            const _data = doc.data();
            const isUser = bcrypt.compareSync(form.Password, _data.Password);
            if(isUser) {
              useAppstate.setLogin(true);
              useAppstate.setUserName(_data.Name);
              swal({
                title: "Logged In",
                icon: "success",
                buttons: false,
                timer: 3000
              })
              navigate('/')
            } else {
              swal({
                title: "Invalid Credentials",
                icon: "error",
                buttons: false,
                timer: 3000
              })
            }
          })
        } catch (error) {
          swal({
            title: error.message,
            icon: "error",
            buttons: false,
            timer: 3000
          })
        }
        setLoding(false);
    }
      
  return (
    <>
     
    <span className=' font-medium text-white text-4xl mt-0 flex justify-center items-center'>Lo<span className=' text-yellow-300'>gin.</span></span>
        
        <div className='md:mt-5 mt-10 md:ml-16 ml-0'>
            <span className='text-white md:ml-80 md:mt-10 ml-5 mt-5 font-medium text-xl'>Number</span>
            <input className=' md:w-1/4 p-1 w-3/5 md:ml-10 ml-7 outline-none text-white bg-gray-800' value={form.Number} onChange={(e)=>setForm({...form, Number:e.target.value})} type="number" id='number' placeholder='Enter mobile-number'  required/>
        </div>
        <div className='md:mt-5 mt-10 md:ml-16 ml-0'>
            <span className='text-white md:ml-80 md:mt-10 ml-5 mt-5 font-medium text-xl'>Password</span>
            <input className=' md:w-1/4 p-1 w-3/5 md:ml-8 ml-5 outline-none text-white bg-gray-800' value={form.Password} onChange={(e)=>setForm({...form, Password:e.target.value})} type="password" id='number' placeholder='Enter mobile-number'  required/>
        </div>

        <div className='flex justify-center items-center mt-10'>
            <button className='text-white'><Button  onClick={login}  variant="contained" color="success">{loding ? <TailSpin height={20}/>: 'Login'}</Button></button><br/>
        </div>
        <div className='flex justify-center items-center mt-5 md:ml-5'>
        <span className='text-white text-sm'>Do you have account? <span>
        <Link to="/signup"><button className=' text-blue-500'>Signup</button></Link></span></span>
        </div>

     
    </>
  )
}
