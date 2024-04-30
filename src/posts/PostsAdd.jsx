  import React, { useContext, useState, useEffect } from 'react';
  import { useForm } from 'react-hook-form';
  import { UserContext } from '../userContext';
  import 'leaflet/dist/leaflet.css';
  import '../App.css';
  import { Marker, Popup, useMap, MapContainer, TileLayer } from 'react-leaflet';
  import { URL_API } from '../constants';
  import { useSelector, useDispatch } from 'react-redux';


  export const PostsAdd = ({ setAfegir }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
      criteriaMode: 'all',
      defaultValues: {
        latitude: 0,
        longitude: 0,
      },
    });

    //const { authToken } = useContext(UserContext);
    const [formulari, setFormulari] = useState({});
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loadingGeoLocation, setLoadingGeoLocation] = useState(true);
    const [position, setPosition] = useState(null);
    const { usuari, authToken } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
      const getUserPosition = async () => {
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            },
            (error) => {
              reject(error);
            }
          );
        });
      };

      const getLocation = async () => {
        try {
          const userPosition = await getUserPosition();

          setFormulari({
            ...formulari,
            latitude: userPosition.latitude,
            longitude: userPosition.longitude,
          });

          setPosition([userPosition.latitude, userPosition.longitude]);
        } catch (error) {
          console.error('Error getting location', error);
        } finally {
          setLoadingGeoLocation(false);
        }
      };

      if (loadingGeoLocation) {
        getLocation();
      }
    }, [loadingGeoLocation]);
    

    const LocationMarker = () => {
      const map = useMap();

      return position === null ? null : (
        <Marker position={position}>
          <Popup>You are here</Popup>
        </Marker>
      );
    };

    const afegir = async (data) => {
      const { body, upload, latitude, longitude, visibility } = data;

      console.log(formulari)
      const formData = new FormData();
      formData.append('body', body);
      formData.append('upload', upload[0]);
      formData.append('latitude', latitude);
      formData.append('longitude', longitude);
      formData.append('visibility', visibility);

      try {
        const response = await fetch(URL_API + 'posts', {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          method: 'POST',
          body: formData,
        });
        const responseData = await response.json();

        if (response.ok) {
          setSuccessMessage('Post added successfully!');
          reset({ latitude, longitude });
          setFormulari({ ...formulari, latitude, longitude });
        } else {
          console.error('Error adding post:', response.status, responseData);
          setErrorMessage(responseData.message || 'Error adding post');
        }
      } catch (error) {
        console.error('Error adding post', error);
        setErrorMessage('Error adding post');
      }
    };

    const resetForm = () => {
      setSuccessMessage(null);
      setErrorMessage(null);
      reset({ latitude: formulari.latitude, longitude: formulari.longitude });
    };

    return (
      <>
        <div className="py-9 pl-9">
          <div className="w-1/3">
            <label className="text-gray-600">Body</label>
            <textarea
              {...register('body', {
                required: false,
                maxLength: {
                  value: 255,
                  message: 'Maximum length of body is 255 characters',
                },
              })}
              value={formulari.body}
              name="body"
              //onChange={handleChange}
              className="w-full h-32 px-4 py-3 border-2 border-gray-300 rounded-sm outline-none focus:border-blue-400"
              placeholder="Tell us something about this place..."
            ></textarea>
            {errors.body && (
              <p className="text-red-600 bg-yellow-200 p-2">{errors.body.message}</p>
            )}

            <span className="flex flex-col gap-y-2">
              <label className="text-gray-600" htmlFor="latitude">
                Latitud
              </label>
              <input
                type="text"
                {...register('latitude', { required: false })}
                className="w-1/3 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
                value={formulari.latitude}
                readOnly
              />
            </span>
            {errors.latitude && (
              <p className="text-red-600 bg-yellow-200 p-2">{errors.latitude.message}</p>
            )}

            <span className="flex flex-col gap-y-2">
              <label className="text-gray-600" htmlFor="longitude">
                Longitud
              </label>
              <input
                type="text"
                {...register('longitude', { required: false })}
                className="w-1/3 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
                value={formulari.longitude}
                readOnly
              />
            </span>
            {errors.longitude && (
              <p className="text-red-600 bg-yellow-200 p-2">{errors.longitude.message}</p>
            )}

            <span className="mb-3 w-96">
              <label htmlFor="formFile" className="form-label inline-block mb-2 text-gray-600">
                Imatge PNG, JPG or GIF (MAX. 800x400px)
              </label>
              <input
                {...register('upload', {
                  required: false,
                  pattern: {
                    value: /^(ftp|http|https):\/\/[^ "]+(?:\.jpg|\.jpeg|\.png|\.gif)$/,
                    message: 'Please enter a valid URL',
                  },
                })}
                //onChange={handleChange}
                className="form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="file"
                id="upload"
              />
            </span>
            {errors.upload && (
              <p className="text-red-600 bg-yellow-200 p-2">{errors.upload.message}</p>
            )}

            <span className="mb-3 w-96">
              <label className="text-gray-600" htmlFor="visibility">
                Visibility
              </label>
              <select
                {...register('visibility', { required: false })}
                // value={formulari.visibility}
                // onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
              >
                <option defaultValue value="1">Público</option>
                <option value="2">Contactos</option>
                <option value="3">Privado</option>
              </select>
            </span>
            {errors.visibility && (
              <p className="text-red-600 bg-yellow-200 p-2">{errors.visibility.message}</p>
            )}

            <button
              onClick={handleSubmit(afegir)}
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Añadir Entrada
            </button>
          </div>
        </div>

        {successMessage && (
          <div className="py-4 px-8 bg-green-500 text-white rounded-md">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="py-4 px-8 bg-red-500 text-white rounded-md">
            {errorMessage}
          </div>
        )}

        <MapContainer style={{ height: 280 }} center={{ lat: 1.887, lng: 0.444 }} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {loadingGeoLocation ? null : <LocationMarker />}
        </MapContainer>

        <div className="py-4">
          <button
            onClick={resetForm}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Volver Atrás
          </button>
        </div>
      </>
    );
  };
