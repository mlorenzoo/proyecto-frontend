import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../userContext';
import { ReviewsContext } from './reviewsContext'

import { v4 as uuidv4 } from 'uuid';


export const ReviewAdd = ({ id }) => {

   let { usuari, setUsuari,authToken,setAuthToken } = useContext(UserContext);
   const [ review, setReview ] = useState("")
   let {setAdd, setRefresca, reviewsCount, setReviewsCount } = useContext(ReviewsContext)

   let reviews = JSON.parse(localStorage.getItem("reviews")) || []



   const addReview=  ()=> {

         
         let temporal= {}
         temporal.review = review
         temporal.created_at = Date.now()
         temporal.id_place=id
         temporal.user = {}
         temporal.user.name = authToken.name
         temporal.user.email = authToken.email

         temporal.id=uuidv4()

         reviews.push(temporal)
         localStorage.setItem('reviews', JSON.stringify(reviews));

         console.log("Todo bien") 
         setReview("")
         setRefresca(true);
         setReviewsCount(reviewsCount+1)

   }
  return (

    <>
      <div class="flex mx-auto items-center justify-center  mt-6 mx-8 mb-4 max-w-lg">
         <form class="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
            <div class="flex flex-wrap -mx-3 mb-6">
               <h2 class="px-4 pt-3 pb-2 text-gray-800 text-lg">Afegeix un nou comentari</h2>
               <div class="w-full md:w-full px-3 mb-2 mt-2">
                  <textarea onChange={ (e) => setReview(e.target.value)}  value= { review } class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" name="body" placeholder='Escriu el teu comentari' required></textarea>
               </div>
               <div class="w-full md:w-full flex items-start md:w-full px-3">
                  <div class="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
                     <svg fill="none" class="w-5 h-5 text-gray-600 mr-1" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                     </svg>
                     <p class="text-xs md:text-sm pt-px">Some HTML is okay.</p>
                  </div>
                  <div class="-mr-1">
                     <input  onClick={ addReview } type='button' class="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100" value='Post Review'/>
                  </div>
               </div>
               </div>
            </form>
      </div>



    </>
  )
}
