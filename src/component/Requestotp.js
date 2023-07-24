import React from 'react'
import Button from '@mui/material/Button';
export default function Requestotp() {
  return (
    <>
     
    <span className=' font-medium text-white text-4xl mt-0 flex justify-center items-center'>Request<span className=' text-yellow-300'>-OTP</span></span>
        
        <div className='md:mt-5 mt-10 md:ml-24 ml-10'>
            <span className='text-white md:ml-80 md:mt-10 ml-5 mt-5 font-medium text-xl'>OTP</span>
            <input className=' md:w-1/4 p-1 w-3/5 md:ml-8 ml-5 outline-none text-white bg-gray-800'  type="number" id='number' placeholder='Enter OTP'  required/>
        </div>

        <div className='flex justify-center items-center mt-10'>
            <button className='text-white'><Button variant="contained" color="success">Submit</Button></button><br/>
        </div>
              

     
    </>
  )
}
