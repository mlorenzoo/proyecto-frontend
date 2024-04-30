import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { UserContext } from '../userContext';
import { setUsuari, setAuthToken } from '../slices/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';

export const PlaceGrid = ({v, deletePlace} ) => {

  const { usuari, authToken } = useSelector (state => state.auth)
  const dispatch = useDispatch()

  let img = "https://backend.insjoaquimmir.cat/storage/" + v.file.filepath

  console.log(v)
  console.log(usuari)

  


  return (
    <div key={v.id } className="p-1 rounded-xl group sm:flex space-x-6 bg-white bg-opacity-50 shadow-xl hover:rounded-2xl">
          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"> <img src={img } alt="" /> </td>
          <div className="sm:w-7/12 pl-0 p-5">
            <div className="space-y-2">
              <div className="space-y-4">
                <h4 className="text-2xl font-semibold text-cyan-900">{v.name}</h4>
                <p className="text-gray-600">{v.description}</p>
                <p className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                ❤️ { v.favorites_count }
              </p>
              
              </div>
              <Link to={"/places/"+v.id} className="w-max text-cyan-600"> Llegeix més  </Link>
              { v.author.name === usuari ? 
              (   <>
                  <Link to={"/places/edit/"+v.id} className="w-max text-cyan-600"> |📝| </Link>
                  <a href="#" className=" w-max text-cyan-600" onClick={ (e)=> deletePlace(v.id,e) }> 🗑️|</a>
                   </> 
              ) : ( <></> )}
            </div>
            
          </div>
          <span className="text-sm text-gray-900 font-light px-0 py-1 whitespace-nowrap">
              
              </span>
        </div>
  )
}
