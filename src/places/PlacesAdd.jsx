import React, { useContext, useState, useEffect } from 'react';
import { Marker, Popup, useMapEvents ,MapContainer, TileLayer } from 'react-leaflet';
import { UserContext } from '../userContext';
import 'leaflet/dist/leaflet.css';
import "../App.css";
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

export const PlacesAdd = ({ setAfegir }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [coordenades, setCoordenades] = useState({ latitude: '0', longitude: '0' });
  const { usuari, authToken } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [position, setPosition] = useState(null);
  const [formularioEnviado, setFormularioEnviado] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setCoordenades({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      });
    });
  }, []);

  function LocationMarker() {
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }

  const fetchAdd = async (formData) => {
    try {
      const response = await fetch('https://backend.insjoaquimmir.cat/api/places', {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        method: "POST",
        body: formData
      });
      
      if (response.ok) {
        const data = await response.json();
        reset();
        setFormularioEnviado(true);
      } else {
        throw new Error('Error al añadir lugar' + response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("upload", data.upload[0]);
    formData.append("latitude", data.latitude);
    formData.append("longitude", data.longitude);
    formData.append("visibility", data.visibility);

    fetchAdd(formData);
  };

  const volver = (e) => {
    e.preventDefault();
    setAfegir(false);
  };

  return (
    <>
      <div className="py-9 pl-9">
        {formularioEnviado && (
          <div className="bg-green-200 text-green-900 p-4 mb-4 rounded">
            ¡El formulario se ha enviado correctamente!
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-9 flex flex-col gap-y-2">
            <label className="text-gray-600" htmlFor="Name">Nom</label>
            <input
              type="text"
              {...register("name", {
                required: "Por favor, introdueix el títol",
                maxLength: {
                  value: 99,
                  message: "Mida màxima del títol, 99 caràcters"
                }
              })}
              className="w-1/3 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
            />
            {errors.name && <p className="text-red-600 bg-yellow-200 p-2">{errors.name.message}</p>}
          </div>

          <div className="w-1/3">
            <label className="text-gray-600">Descripció</label>
            <textarea 
              {...register("description", {
                required: "Por favor, introdueix la descripció",
                maxLength: {
                  value: 255,
                  message: "Mida màxima de la descripció, 255 caràcters"
                }
              })} 
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
            ></textarea>
            {errors.description && <p className="text-red-600 bg-yellow-200 p-2">{errors.description.message}</p>}
          </div>

          <div className="mb-3 w-96">
            <label htmlFor="formFile" className="form-label inline-block mb-2 text-gray-600">Imatge PNG, JPG or GIF (MAX. 800x400px)</label>
            <input 
              {...register("upload", {
                required: "Si us plau, introduex la URL d'una imatge",
                pattern: {
                  value: /^(ftp|http|https):\/\/[^ "]+(?:\.jpg|\.jpeg|\.png|\.gif)$/,
                  message: "Si us plau, introdueix una URL válida"
                }
              })}
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
              type="file" 
              id="upload"
            />
            {errors.upload && <p className="text-red-600 bg-yellow-200 p-2">{errors.upload.message}</p>}
          </div>

          <span className="flex flex-col gap-y-2">
            <label className="text-gray-600" htmlFor="Name">Longitud</label>
            <input
              type="text"
              {...register("longitude", { required: "Por favor, introduce la longitud" })}
              className="w-1/3 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
              value={coordenades.longitude}
            />
            {errors.longitude && <p className="text-red-600 bg-yellow-200 p-2">{errors.longitude.message}</p>}
          </span>

          <span className="flex flex-col gap-y-2">
            <label className="text-gray-600" htmlFor="Name">Latitud</label>
            <input
              type="text"
              {...register("latitude", { required: "Si us plau, introdueix la latitud" })}
              className="w-1/3 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
              value={coordenades.latitude}
            />
            {errors.latitude && <p className="text-red-600 bg-yellow-200 p-2">{errors.latitude.message}</p>}
          </span>

          <label htmlFor="visibility" className="block mb-2 text-sm text-gray-600 dark:text-white">Selecciona la visibilitat</label>
          <select {...register("visibility", { required: "Por favor, introdueix la latitud" })} id="visibility"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option defaultValue value="1">Public</option>
            <option value="2">Contactes</option>
            <option value="3">Privat</option>
          </select>

          <div className="py-9">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              Afegir Entrada
            </button>
            <button onClick={volver} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full ml-4">
              Cancelar
            </button>
          </div>
        </form>
        <MapContainer style={{ height: 280 }} center={[coordenades.latitude, coordenades.longitude]} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
        </MapContainer>
      </div>
    </>
  );
};
