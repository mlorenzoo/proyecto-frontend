import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../userContext';
import { PlaceGrid } from './PlaceGrid';
import { setUsuari, setAuthToken } from '../slices/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';

export const PlacesGrid = () => {
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

  const deletePlace = async (id, e) => {
    const confirma = window.confirm('¿Estás seguro?');
    if (confirma) {
      try {
        const response = await fetch(`https://backend.insjoaquimmir.cat/api/places/${id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'Authorization': `Bearer ${authToken}`
          }
        });
        if (response.ok) {
          const updatedPlaces = places.filter(place => place.id !== id);
          setPlaces(updatedPlaces);
          console.log('Lugar eliminado correctamente');
        } else {
          throw new Error('Error al eliminar el lugar');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <>
      <div className="py-16 bg-gradient-to-br from-green-50 to-cyan-100">  
        <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
          <div className="mb-12 space-y-2 text-center">
            <span className="block w-max mx-auto px-3 py-1.5 border border-green-200 rounded-full bg-green-100 text-green-600 text-4x1">Llistat de Llocs</span>
          </div>
          <div className="grid gap-12 lg:grid-cols-2">
            {places.map(place => (
              <PlaceGrid key={place.id} deletePlace={deletePlace} v={place} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
