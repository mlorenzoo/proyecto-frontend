import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { UserContext } from '../userContext';
import { useSelector, useDispatch } from 'react-redux';


export const PostList = ({v, deletePost}) => {

  const { usuari,authToken } = useSelector (state => state.auth)
  const dispatch = useDispatch() 

    //let { authToken, usuari } = useContext(UserContext)

    // let usuari = authToken.email
    // }
    return (
  
  <>
  { }
  
        <tr key={ v.id } className="bg-gray-100 border-b">

        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        { v.body.substring(0,8)+"..." }
        </td>
        
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          { v.latitude }
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          { v.longitude}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          { v.visibility.name }
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          { v.author.name }
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        ❤️ { v.favorites_count }
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        <Link to={"/posts/"+v.id} className="w-max text-cyan-600"> 👁️ </Link>
        { v.author.name === usuari ? 
        (
            <>
              
              <Link to={"/posts/edit/"+v.id} className="w-max text-cyan-600"><svg width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_429_11139)"><path d="M5 16L4 20L8 19L19.5858 7.41421C20.3668 6.63316 20.3668 5.36683 19.5858 4.58579L19.4142 4.41421C18.6332 3.63316 17.3668 3.63317 16.5858 4.41421L5 16Z" stroke="#292929" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 6L18 9" stroke="#292929" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 20H21" stroke="#292929" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_429_11139"><rect width="24" height="24" fill="white"/></clipPath></defs></svg></Link>
              <a href="#" onClick={ (e)=> deletePost(v.id,e) }><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></a>            
            </>
        ) : ( <></> )}
        
        </td>

      </tr>
  
  
      </>
  
  
    )
}
