import React, { useEffect } from 'react';
import ReactStars from "react-stars";
import { useState } from 'react'
import { Circles } from 'react-loader-spinner';
import { getDocs } from 'firebase/firestore';
import { coll } from './Firebase/Firebase';
import { Link } from 'react-router-dom';
export default function Card() {
   const [data,setdata] = useState([])
   const [loding , setLodinhg] = useState(false)
   useEffect(()=>{
      async function getdata(){
           setLodinhg(true)
            
           const _data = await getDocs(coll)
           _data.forEach((doc) => {
            setdata((prv)=>[...prv,{...(doc.data()) , id:doc.id}])
           });
           setLodinhg(false)
      }
      getdata();
   },[])
   
  return (
     <>
     
     <div className="main px-2">

      {
         loding ? <div className=' flex justify-center w-full mt-44' ><Circles height={40} color='yellow'/></div>:
         data.map((e,i)=>{ 
            return(
               <Link to={`/details/${e.id}`}>
               <div className="aim w-44 hover:-translate-y-2 transition-all duration-700 cursor-pointer sha" >
            <img className='w-full h-52 md:h-64' src={e.img} alt="" />
            <div className=' w-full h-full'>
            <span className=' text-orange-800 font-semibold ml-1'>{e.title}</span><br></br>
            <span className=" text-teal-950 font-bold mt-2 ml-1">Year :<span className=' text-orange-800 font-bold ml-7'>{e.year}</span></span><br></br>
            <span className=" text-teal-950 font-bold mt-0 ml-1 flex items-center">Rating :<span className='text-orange-800 font-bold ml-3'><ReactStars size={15} half={true} value={5} edit={false}/></span></span>
            </div>
        </div>
               </Link> 
            )
         })
      }
         
     </div>
       
     </>
  )
}
