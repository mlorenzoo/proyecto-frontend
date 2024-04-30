import React from 'react'
import { Link } from 'react-router-dom'
import { setAuthToken, setUsuari } from '../slices/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';

export const PlaceList = ({v, deletePlace}) => {
  
  const { usuari,authToken, } = useSelector (state => state.auth)
  const dispatch = useDispatch() 
    let img = "https://backend.insjoaquimmir.cat/storage/" + v.file.filepath
    
    // }
    return (
  
  <>
        <tr key={ v.id } className="bg-gray-100 border-b">
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          { v.name }
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        { v.description.substring(0,8)+"..." }
        </td>
        
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          { v.latitude }
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          { v.longitude}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          { v.visibility.id }
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          { v.author.name }
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        ❤️ { v.favorites_count }
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        <Link to={"/places/"+v.id} className="w-max text-cyan-600"> 👁️ </Link>
        { v.author.name === usuari ? 
        (
            <>
              <Link to={"/places/edit/"+v.id} className="w-max text-cyan-600"><svg width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_429_11139)"><path d="M5 16L4 20L8 19L19.5858 7.41421C20.3668 6.63316 20.3668 5.36683 19.5858 4.58579L19.4142 4.41421C18.6332 3.63316 17.3668 3.63317 16.5858 4.41421L5 16Z" stroke="#292929" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 6L18 9" stroke="#292929" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M13 20H21" stroke="#292929" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></g><defs><clipPath id="clip0_429_11139"><rect width="24" height="24" fill="white"/></clipPath></defs></svg></Link>
              <a href="#" onClick={ (e)=> deletePlace(v.id,e) }><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></a>      

            </>
        ) : ( <></> )}
        
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          <img src={img } alt="" />
        </td>

      </tr>
  
  
      </>
  
  
    )
}