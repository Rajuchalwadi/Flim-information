import React, { useEffect, useState , useContext} from 'react'
import ReactStars from 'react-stars'
import { addDoc , getDocs , where , query } from 'firebase/firestore'
import { rev } from './Firebase/Firebase'
import swal from 'sweetalert'
import { Appstate } from '../App'
import { useNavigate } from 'react-router-dom'
import { Circles, TailSpin } from 'react-loader-spinner'
function Review(id) {
    const [rating , setRate] = useState(0)
    const [addnew , setNewreview] = useState(0);
    const [loding , setLoding] = useState(false)
    const [reviewloding , setReviewLoding] = useState(false)
    const [form , setForm] = useState("")
    const [data , setData] = useState([])
    const navigate = useNavigate();
    const useAppstate = useContext(Appstate)
    const reviewadd = async ()=>{
      setLoding(true) 
      if (useAppstate.login) {
        await addDoc(rev,{
          movieid:id,
          name:useAppstate.usename,
          rating:rating,
          review:form,
          timestamp:new Date().getTime()
        })
        setRate(0)
        setNewreview(addnew+1);
        setForm("")
        swal({
          title:"Review Sent",
          icon:"success",
          buttons:false,
          timer:3000
        })
        setLoding(false)
      }
      else{
        navigate("/login")
      }
    }

    useEffect(()=>{
       
      async function getData(){
        setReviewLoding(true)
        setData([])
        let que = query(rev, where("movieid",'==',id))
        const refshanp = await getDocs(que);
        refshanp.forEach((doc)=>{
          setData((prev)=>([...prev , doc.data()]))
          setReviewLoding(false)
        })
      }
      getData();
      setReviewLoding(false)
    },[addnew])
  return (
    <>
    <ReactStars size={20} half={true} value={rating} onChange={(rate)=>setRate(rate)} />
    <div className=" w-full flex justify-center mt-1 items-center">
        <input className=' w-full outline-none bg-neutral-700 p-1 text-white' value={form} onChange={(e)=>setForm(e.target.value)} type="text" placeholder='Share your Thoughts..' /><br/>
    </div>
    <div className='w-full bg-green-800 mt-3 flex justify-center items-center'>
        <button type="button" onClick={reviewadd} className='text-white p-1 text-1xl font-semibold'>{loding ? <TailSpin height={20} color='white'/>: 'Share'}</button>
    </div>      
      <div>
        {
          reviewloding ? <Circles height={30} color='white'/>:
          data.map((e,i)=>{
            return(
              <div className=" w-full">
                <div className=' px-2 p-1 text-blue-500 text-xs bg-slate-900 mt-3'>{e.name} <span className='ml-3 text-white text-xs'>{new Date(e.timestamp).toLocaleString()}</span><br/>
                <ReactStars half={true} height={1} edit={false} value={e.rating}/><br/>
                <p className='text-white text-xs mt-0'>{e.review}</p></div>
              </div>
               
              
            )
          })
        }
      </div>
  
    </>
  )
}

export default Review
