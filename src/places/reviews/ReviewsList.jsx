import React from "react";
import { useEffect } from "react";
import { Review } from "./Review";

import { useContext } from "react";
import { UserContext } from "../../userContext";

import { useState } from "react";
import { ReviewAdd } from "./ReviewAdd";
import { ReviewsContext } from "./reviewsContext";
// Fem servir un context únicament dins de tots els components de Reviews

export const ReviewsList = ({ id }) => {
  let {  authToken, setAuthToken } = useContext(UserContext);

  // Obtenim l'usuari
  let usuari =authToken.email
  let compta 
  
  let [error, setError] = useState("");
  const [refresca, setRefresca] = useState(false);
  const [add, setAdd] = useState(true);
  const [reviewsCount, setReviewsCount] = useState(0);

  // Obtenim els reviews de localStorage i iniciem la variable d'estat
  // const [reviews, setReviews] = useState([JSON.parse(localStorage.getItem("reviews")) || []])

  const [reviews, setReviews] = useState(JSON.parse(localStorage.getItem("reviews")) || [])
  
  
   useEffect(() => {

    setReviews(JSON.parse(localStorage.getItem("reviews")) || [])
    console.log("aaa")
    console.log(reviews)

   
  //   listReviews();
    setRefresca(false);
   }, [refresca]);

   useEffect(()=> {

    compta=0 
    

    // setTrobats( reviews.filter(objecte => objecte.id_place === id));

    reviews.map((v) => {
      console.error(v.user.email, usuari)
      if (v.user.email === usuari && v.id_place === id) {
 
        setAdd(false);
        console.log("Te revdddiew");

      }
      if (v.id_place === id)
          compta++
      console.log(compta)
    });
    setReviewsCount(compta)
    //console.warn(trobats)

   },[reviews])

  return (
    
    <>
    <ReviewsContext.Provider
      value={{ setAdd, setRefresca, reviewsCount, setReviewsCount }}
    >
      {add ? <ReviewAdd id={id} /> : <></>}
      <div class="flex mx-auto items-center justify-center  mt-6 mx-8 mb-4 max-w-lg">
        {reviewsCount == 0 ? (
          <div className="flex mb-4 w-full items-center space-x-2 rounded-2xl bg-red-50 px-4 ring-2 ring-red-200">
            No hi ha reviews
          </div>
        ) : (
          <div className="flex mb-4 w-full items-center space-x-2 rounded-2xl bg-blue-50 px-4 ring-2 ring-blue-200">
            Hi ha {reviewsCount} {reviewsCount > 1 ? " ressenyes" : " ressenya"}{" "}
          </div>
        )}
      </div>

      {error ? (
        <div className="flex mb-4 w-full items-center space-x-2 rounded-2xl bg-red-50 px-4 ring-2 ring-red-200 ">
          {error}
        </div>
      ) : (
        <></>
      )}

      {reviews.map((v) => {

        if (v.id_place == id ) return <Review key={v.id} review={v} />
        else  return <></> 
      })}
      </ReviewsContext.Provider>
    </>
  );
};
