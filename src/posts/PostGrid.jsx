import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { UserContext } from '../userContext';
import { useSelector, useDispatch } from 'react-redux';


export const PostGrid = ({v, deletePost} ) => {

  //let { authToken } = useContext(UserContext)
  const { usuari, authToken } = useSelector (state => state.auth)
  const dispatch = useDispatch()

  //let usuari = authToken.email

  console.log(v)
  console.log(usuari)


  return (
    <div key={v.id } className="p-1 rounded-xl group sm:flex space-x-6 bg-white bg-opacity-50 shadow-xl hover:rounded-2xl">
          <img src={ v.upload } alt="art cover" loading="lazy" width="1000" height="667" className="h-56 sm:h-full w-full sm:w-5/12 object-cover object-top rounded-lg transition duration-500 group-hover:rounded-xl"/>
          <div className="sm:w-7/12 pl-0 p-5">
            <div className="space-y-2">
              <div className="space-y-4">
                <h4 className="text-2xl font-semibold text-cyan-900">{v.name}</h4>
                <p className="text-gray-600">{v.body}</p>
                <p className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                ❤️ { v.favorites_count }
              </p>
              
              </div>
              <Link to={"/posts/"+v.id} className="w-max text-cyan-600"> Llegeix més  </Link>
              { v.author.name === usuari ? 
              (   <>
                  <Link to={"/posts/edit/"+v.id} className="w-max text-cyan-600"> | Editar | </Link>
                  <a href="#" className=" w-max text-cyan-600" onClick={ (e)=> deletePost(v.id,e) }> Esborrar</a>
                   </> 
              ) : ( <></> )}
            </div>
            
          </div>
          <span className="text-sm text-gray-900 font-light px-0 py-1 whitespace-nowrap">
              
              </span>
        </div>
  )
}
