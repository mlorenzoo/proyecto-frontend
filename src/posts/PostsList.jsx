import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../userContext';
import { PostsAdd } from './PostsAdd';
import { PostList } from './PostList';
import { URL_API } from '../constants';
import { useSelector, useDispatch } from 'react-redux';


export const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { usuari, authToken } = useSelector (state => state.auth)
  const dispatch = useDispatch()
  //const { authToken, usuari } = useContext(UserContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${URL_API}posts`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener los datos de la API');
        }

        const data = await response.json();
        setPosts(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, [authToken.token, refresh]);

  const deletePost = async (id, e) => {
    let confirma = window.confirm('Estás seguro?');

    if (confirma) {
      try {
        const response = await fetch(`${URL_API}posts/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${authToken.token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al eliminar el post');
        }

        setPosts(posts.filter(objecte => objecte.id !== id));
      } catch (error) {
        console.error(error);
      }
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
                      Descripción
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Latitud
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Longitud
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Visibilidad
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Autoría
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Likes
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      👁️📝
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((v) => (
                    <React.Fragment key={v.id}>
                      {v.visibility.id === 1 || v.author.email === usuari ? (
                        <PostList deletePost={deletePost} v={v} />
                      ) : null}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
