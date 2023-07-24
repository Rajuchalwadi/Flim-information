import React from 'react'
import { useState } from 'react'
import { addDoc } from 'firebase/firestore';
import { coll } from './Firebase/Firebase';
import {TailSpin} from 'react-loader-spinner';
import { Appstate } from '../App';
import { useContext } from 'react';
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom';
export default function Addmovie() {
  const [loding,setLoding] = useState(false)
  const navigate=useNavigate();
    const[form,setForm] = useState({
        title:"",
        year:"",
        description:"",
        img:""  
    })
    const useAppstate = useContext(Appstate)
    const addmovie=async()=>{
      setLoding(true)
      if (useAppstate.login) {
        await addDoc(coll,form);
      swal({
         title:"Success full",
         icon:"success",
         buttons:false,
         timer:3000
      })
      setForm({
        title:"",
        year:"",
        description:"",
        img:""  
      })
      setLoding(false)
    }
    else{
      navigate("/login")
    }
      }
  
       

  return (
     <>
       <section class=" text-white body-font relative">
  <div class="container px-5  mx-auto">
    <div class="flex flex-col text-center w-full mb-10">
      <h1 class="sm:text-3xl text-2xl font-bold title-font mb-4 text-white">Add<span className=' font-bold text-3xl text-yellow-300'>-Movies</span></h1>
      <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Add your Amazing Movie Details Below..</p>
    </div>
    <div class="lg:w-1/2 md:w-2/3 mx-auto">
      <div class="flex flex-wrap -m-2">
        <div class="p-2 w-1/2">
          <div class="relative">
            <label for="name" class="leading-7 text-sm text-white">Movie-Title</label>
            <input type="text" id="name" name="name" value={form.title} onChange={(e)=>setForm({...form,title: e.target.value})} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div class="p-2 w-1/2">
          <div class="relative">
            <label for="email" class="leading-7 text-sm text-white">Movie-Year</label>
            <input type="email" id="email" name="email" value={form.year} onChange={(e)=>setForm({...form , year: e.target.value})} class="w-full bg-white   rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div class="p-2 w-full">
          <div class="relative">
            <label for="message" class="leading-7 text-sm text-white">Description</label>
            <textarea id="message" name="message" value={form.description} onChange={(e)=>setForm({...form , description: e.target.value})} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
          </div>
        </div>
        <div class="p-2 w-full">
          <div class="relative">
            <label for="message" class="leading-7 text-sm text-white">Image-Url</label>
            <textarea id="message" name="message" value={form.img} onChange={(e)=>setForm({...form , img: e.target.value})} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200  text-base outline-none text-gray-700 pt-1  px-3 resize-none leading-4 transition-colors duration-200 ease-in-out"></textarea>
          </div>
        </div>
        <div class="p-2 w-full">
          <button  onClick={addmovie} class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">{loding ? <TailSpin height={25} color='white'/>: 'Submit'}</button>
        </div>
      </div>
    </div>
  </div>
</section>
     </>
  )
}
