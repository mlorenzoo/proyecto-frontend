import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../userContext';
import { useSelector, useDispatch } from 'react-redux';

export const PlaceEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuari,authToken, } = useSelector (state => state.auth)
  const dispatch = useDispatch() 
  const [error, setError] = useState('');
  const [formulari, setFormulari] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const getPlace = async () => {
      try {
        const response = await fetch(`https://backend.insjoaquimmir.cat/api/places/${id}`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${authToken}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setFormulari(data.data);
        } else {
          setError('No s\'ha pogut obtenir la informació del lloc.');
        }
      } catch (error) {
        setError('No s\'ha pogut connectar amb el servidor.');
      }
    };
    getPlace();
  }, [id, authToken]);

  const handleChange = (e) => {
    setError('');
    setFormulari({
      ...formulari,
      [e.target.name]: e.target.value,
    });
  };

  const editar = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://backend.insjoaquimmir.cat/api/places/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(formulari)
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage('La edició s\'ha completat correctament.');
      } else {
        setError(data.message || 'Error al editar el lloc.');
      }
    } catch (error) {
      setError('No s\'ha pogut connectar amb el servidor.');
    }
  };

  return (
    <>
      <div className="py-9 pl-9">
        <div className="py-9 flex flex-col gap-y-2">
          <label className="text-gray-600" htmlFor="name">
            Nom
          </label>
          <input
            type="text"
            name="name"
            value={formulari.name || ''}
            className="w-1/3 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
            onChange={handleChange}
          />
        </div>

        <div className="w-1/3">
          <label className="text-gray-600">Descripció</label>
          <textarea
            name="description"
            value={formulari.description || ''}
            className="
              w-full
              h-32
              px-4
              py-3
              border-2 border-gray-300
              rounded-sm
              outline-none
              focus:border-blue-400
            "
            placeholder="Explica'ns alguna cosa d'aquest lloc..."
            onChange={handleChange}
          ></textarea>

          <span className="flex flex-col gap-y-2">
            <label className="text-gray-600" htmlFor="longitude">
              Longitud
            </label>
            <input
              type="text"
              name="longitude"
              value={formulari.longitude || ''}
              onChange={handleChange}
              className="w-1/3 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
            />
          </span>
          <span className="flex flex-col gap-y-2">
            <label className="text-gray-600" htmlFor="latitude">
              Latitud
            </label>
            <input
              type="text"
              name="latitude"
              value={formulari.latitude || ''}
              onChange={handleChange}
              className="w-1/3 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
            />
          </span>

          <label htmlFor="visibility" className="block mb-2 text-sm text-gray-600 dark:text-white">
            Selecciona la visibilitat
          </label>
          <select
            name="visibility"
            value={formulari.visibility || ''}
            id="visibility"
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option defaultValue value="">
              ----
            </option>
            <option value="1">Public</option>
            <option value="2">Contactes</option>
            <option value="3">Privat</option>
          </select>
        </div>

        <div className="py-9">
          {error && <div className="flex w-full items-center space-x-2 rounded-2xl bg-red-50 mb-4 px-4 ring-2 ring-red-200 ">{error}</div>}
          {successMessage && <div className="flex w-full items-center space-x-2 rounded-2xl bg-green-50 mb-4 px-4 ring-2 ring-green-200 ">{successMessage}</div>}
          <button onClick={editar} type="submit" className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Editar Entrada
          </button>
          <button onClick={() => navigate(-1)} type="submit" className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
};