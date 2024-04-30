import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { URL_API } from '../constants';

export const PostEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authToken } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${URL_API}posts/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch post data');
        }

        const data = await response.json();
        setPost(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post data:', error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, authToken]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("body", data.body);
    formData.append("visibility", data.visibility);
    formData.append("latitude", data.latitude);
    formData.append("longitude", data.longitude);

    if (data.upload && data.upload.length > 0) {
      formData.append("upload", data.upload[0]);
    }

    try {
      const response = await fetch(`${URL_API}posts/${id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      const datad = await response.json();

      console.log(datad);
      setSuccessMessage('Post updated successfully');
      setErrorMessage(null);
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error) {
      console.error('Error updating post:', error);
      setErrorMessage('Failed to update post. Please try again.');
      setSuccessMessage(null);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {errorMessage && <div>Error: {errorMessage}</div>}
      {successMessage && <div>{successMessage}</div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="body">Body:</label>
        <textarea id="body" {...register('body')} defaultValue={post.body}></textarea>

        <label htmlFor="latitude">Latitude:</label>
        <input id="latitude" {...register('latitude')} defaultValue={post.latitude} readOnly />

        <label htmlFor="longitude">Longitude:</label>
        <input id="longitude" {...register('longitude')} defaultValue={post.longitude} readOnly />

        <label htmlFor="visibility">Visibility:</label>
        <select id="visibility" {...register('visibility')} defaultValue={post.visibility}>
          <option value="1">Public</option>
          <option value="2">Contacts</option>
          <option value="3">Private</option>
        </select>

        <label htmlFor="upload">Upload:</label>
        <input type="file" id="upload" {...register('upload')} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
