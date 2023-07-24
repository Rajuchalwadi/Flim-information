import React, { useContext } from 'react'
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from 'react-router-dom';
import { Appstate } from '../App';
export default function Header() {
  const useAppstate = useContext(Appstate);
  return (
    <div className='flex sticky top-0 z-10 w-full bg-black justify-between items-center'>
      <a href="/" className=' w-9 mt-2'><span className=' w-9 cursor-pointer bash' ><img src="https://png.pngtree.com/png-clipart/20210330/ourmid/pngtree-blue-movie-film-cartoon-pop-movie-sticker-png-image_3158542.jpg" alt="" /></span>  </a>
       <span className='text-slate-100 font-bold text-2xl mr-auto mt-2 ml-2'>Flim <span className=' text-yellow-300'>-Information</span></span>
      {useAppstate.login ?
      <Link to={"/add"}><span className="brat font-bold mr-4"><Button variant="contained" size="small"><AddCircleOutlineIcon className=' mr-1'/>Add-Movie</Button></span> </Link> :
      <Link to={"/login"}><span className="brat font-bold mr-4"><Button variant="contained" size="small">Login</Button></span> </Link>
      }
    </div>
  )
}
