import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import {getAuth, RecaptchaVerifier, signInWithPhoneNumber} from 'firebase/auth'
import { useState } from 'react';
import {TailSpin } from 'react-loader-spinner';
import swal from 'sweetalert';
import app from './Firebase/Firebase';
import { addDoc } from 'firebase/firestore';
import { Sig } from './Firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs'

const auth = getAuth(app);

export default function Signup() {

    const navigate = useNavigate();
    const [loding , setLoding] = useState(false)
    const [sentotp , setOtpp] = useState(false)
    const [OTP ,setOTP] = useState("")
    const [form , setForm] = useState({
        Name:"",
        Number:"",
        Password:""
    })

    const generateRecaptha=()=>{
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          'size': 'invisible',
          'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
           
      }});
  };
   

   

  const response=()=>{
    setLoding(true)
      generateRecaptha();
      const appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, `+91${form.Number}` , appVerifier)
      .then((confirmationResult) => {
     
    window.confirmationResult = confirmationResult;
    swal({
      title:"OTP SENT",
      icon:"success",
      buttons:false,
      timer:3000
   })
    setOtpp(true);
    setLoding(false)
  }).catch((error) => {
     console.log(error)
  });

  }
  
  const verifyOTP = () => {
    try {
      setLoding(true)
      window.confirmationResult.confirm(OTP).then((result) => {
        uploadData();
        swal({
          text: "Sucessfully Registered",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        navigate("/login") 
        setLoding(false)
      })
    } catch (error) {
      console.log(error);
    }

    
  }

  const uploadData = async () => {
    try {
      const salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(form.Password, salt);
      await addDoc(Sig, {
        Name: form.Name,
        Password: hash,
        Number: form.Number
      });
    } catch(err) {
      console.log(err);
    }
  }
  
      
  return (
    <>
     
    {sentotp ?   
    <>
    <span className=' font-medium text-white text-4xl mt-0 flex justify-center items-center'>Request<span className=' text-yellow-300'>-OTP</span></span>
        
        <div className='md:mt-5 mt-10 md:ml-24 ml-10'>
            <span className='text-white md:ml-80 md:mt-10 ml-5 mt-5 font-medium text-xl'>OTP</span>
            <input className=' md:w-1/4 p-1 w-3/5 md:ml-8 ml-5 outline-none text-white bg-gray-800'  type="number" value={OTP} onChange={(e)=>setOTP(e.target.value)} id='number' placeholder='Enter OTP'  required/>
        </div>

        <div className='flex justify-center items-center mt-10'>
            <button className='text-white'><Button onClick={verifyOTP} variant="contained" color="success">{loding ? <TailSpin height={20}/>:'Confirm-otp'}</Button></button><br/>
        </div>
        </>
        :
        <> 
        <span className=' font-medium text-white text-4xl mt-0 flex justify-center items-center'>Sing<span className=' text-yellow-300'>up</span></span>
        <div className='md:mt-5 mt-10 md:ml-16 ml-0'>
            <span className='text-white md:ml-80 md:mt-10 ml-5 mt-5 font-medium text-xl'>Name</span>
            <input className=' md:w-1/4 p-1 w-3/5 md:ml-16 outline-none text-white bg-gray-800 ml-12' type="text" value={form.Name} onChange={(e)=>setForm({...form , Name:e.target.value})} id='name' placeholder='Enter Name' required />
        </div>
        <div className='md:mt-5 mt-10 md:ml-16 ml-0'>
            <span className='text-white md:ml-80 md:mt-10 ml-5 mt-5 font-medium text-xl'>Number</span>
            <input className=' md:w-1/4 p-1 w-3/5 md:ml-10 ml-7 outline-none text-white bg-gray-800'  type="number" value={form.Number} onChange={(e)=>setForm({...form , Number:e.target.value})} id='number' placeholder='Enter mobile-number'  required/>
        </div>
        <div className='md:mt-5 mt-10 md:ml-16 ml-0'>
            <span className='text-white md:ml-80 md:mt-10 ml-5 mt-5 font-medium text-xl'>Password</span>
            <input className=' md:w-1/4 p-1 w-3/5 md:ml-8 ml-5 outline-none text-white bg-gray-800'  type="password" value={form.Password} onChange={(e)=>setForm({...form , Password:e.target.value})} id='number' placeholder='Enter password'  required/>
        </div>
         
        <div className='flex justify-center items-center mt-10'>
            <button className='text-white' ><Button onClick={response} variant="contained" color="success">{loding ? <TailSpin height={20} color='white'/>:'Request otp'}</Button></button><br/>
        </div>
        <div className='flex justify-center items-center mt-5 md:ml-5'>
        <span className='text-white text-sm'>Already have an account? <span>
        <Link to="/login"><button className=' text-blue-500'>Login</button></Link></span></span>
        </div>
         
        </>}

        <div id="recaptcha-container"></div>
</>
     
  )
}
