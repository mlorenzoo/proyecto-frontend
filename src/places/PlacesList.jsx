import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../userContext';
import { PlaceList } from './PlaceList';
import { setUsuari, setAuthToken } from '../slices/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Header } from '../components/layout/Header';


export const PlacesList = () => {
  const [places, setPlaces] = useState([]);
  const { usuari, authToken } = useSelector (state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch('https://backend.insjoaquimmir.cat/api/places', {
          headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'Authorization': `Bearer ${authToken}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setPlaces(data.data);
          console.log(data);
        } else {
          throw new Error('Error al obtener los lugares');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchPlaces();
  }, [authToken]);

  const deletePlace = (id, e) => {
    const confirma = window.confirm('¿Estás seguro?');
    if (confirma) {
      const newPlaces = places.filter((objecte) => objecte.id !== id);
      setPlaces(newPlaces);
      // Aquí puedes hacer una petición a tu API para eliminar el lugar también si es necesario
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-white border-b">
                  <tr>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Nom
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Descripció
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Latitud
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Longitud
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Visibilitat
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Autoria
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Favorits
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      👁️📝
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {places.map((place) => {
                    return (
                      (place.visibility.id === 1 ) && (
                        <PlaceList deletePlace={deletePlace} key={place.id} v={place} />
                      )
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
