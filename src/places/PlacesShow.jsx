import "leaflet/dist/leaflet.css";
import "../App.css";
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../userContext";
import { useSelector, useDispatch } from 'react-redux';

export const PlacesShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuari, authToken } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const [place, setPlace] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchPlace = async () => {
    try {
      const response = await fetch(
        `https://backend.insjoaquimmir.cat/api/places/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch place data");
      }

      const data = await response.json();
      console.log(data)
      setPlace(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching place data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {


    fetchPlace();
  }, [id]);

  console.log(place);
  return (
    <>
      {isLoading ? (
        "Espera..."
      ) : (
        <div className="md:grid md:grid-cols-1 md:grid-flow-row gap-4 md:mx-auto p-6 justify-center dark:text-gray-100">
          <div className="relative overflow-hidden bg-no-repeat bg-cover col-span-1">
            <img
              src={`https://backend.insjoaquimmir.cat/storage/${place.file?.filepath}`}
              alt=""
              className="col-span-1 w-200 h-96 items-center"
            />
            <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-40 transition duration-300 ease-in-out bg-white"></div>
          </div>

          <div className="max-w-xl">
            <h2 className="bg-blue-300 col-span-1 text-xl font-semibold">
              {place.name}
            </h2>
            <span className="bg-blue-200 col-span-1 block pb-2 text-sm dark:text-gray-400">
              Enviada per: {place.author?.name}
            </span>
            <span className="self-center px-9 bg-gray-200 col-span-2 text-x2 font-semibold">
              Latitud: {place.latitude}{" "}
            </span>
            <span className="self-center px-7 bg-gray-200 text-x2 font-semibold">
              Longitud: {place.longitude}
            </span>

            <div className="bg-orange-100 py-3 text-x2 font-semibold">
              Descripció
            </div>
            <p className="bg-yellow-100">{place.description}</p>
            <div className="mt-10 h-12 max-h-full md:max-h-screen">
              {place.author?.email === authToken.email && (
                <>
                  <Link
                    to={`/places/edit/${id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-10 px-4 h-10 md:h-10 uppercase"
                  >
                    Editar
                  </Link>
                  <a
                    href="#"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-10 md:h-10 uppercase"
                    onClick={(e) => deletePlace(id, e)}
                  >
                    Esborrar
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};