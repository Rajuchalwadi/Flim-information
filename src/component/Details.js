import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { doc,getDoc } from 'firebase/firestore'
import { db } from './Firebase/Firebase'
import { useParams } from 'react-router-dom'
import { Circles } from 'react-loader-spinner'
import Review from './Review'

export default function Details() {

    const [loding , setLoding] = useState(true)

    const {id} = useParams();
    const [data , setData] = useState({
        title:"",
        year:"",
        img:"",
        description:""
    })

    useEffect(()=>{
        async function getData(){
            setData(true)
            const _doc = doc(db,"Movie",id);
            const _data = await getDoc(_doc);
            setData(_data.data());
            setLoding(false)
        }
        getData();
    },[])
  return (
    <>
    { loding ? <div className='className=" mt-44 justify-center items-center w-full flex'><Circles height={40} color='white'/></div>:
    <div className="flex w-full flex-col md:w-full md:flex-row video1">
        <img className=' h-96 md:w-80 ml-7 md:sticky md:top-20  hover:-translate-y-2 transition-all duration-700 w-80 md:ml-20 ' src={data.img} alt="" />
        <div className="flex md:flex-col flex-col">
            <span className='text-white text-3xl md:w-52 md:h-9 font-bold w-full h-10 md:ml-11 text-center md:text-start md:mt-0 mt-5'>{data.title}<br/><span className='md:ml-1 text-center text-yellow-200'>( 2022 )</span></span><br></br>
            <span className=''><ReactStars className='md:mt-5 md:ml-11 ml-36 mt-1' size={25} edit={false} value={4.5}/></span><br/>
            <div className="md:w-4/5 md:ml-11 md:mt-0  w-4/5 ml-9 mt-0 text-justify">
            <p className='text-white mt-0'>{data.description}</p><br/>
            <p className='bat'></p>
            <Review id={id}/>
        </div>
        </div>
         
    </div>
}
    </>
  )
}
