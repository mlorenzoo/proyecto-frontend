import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../userContext';
import { PostsAdd } from './PostsAdd';
import { PostGrid } from './PostGrid'; // Ajusta esto según tu estructura de archivos
import { URL_API } from '../constants'; // Ajusta esto según tu estructura de archivos
import { useSelector, useDispatch } from 'react-redux';


export const PostsGrid = () => {
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  //const { authToken, usuari } = useContext(UserContext);
  const { usuari, authToken } = useSelector (state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${URL_API}posts`, {
          headers: {
            Accept: 'application/json',
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

        setPosts(posts.filter((objecte) => objecte.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="py-16 bg-gradient-to-br from-green-50 to-cyan-100">
        <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
          <div className="mb-12 space-y-2 text-center">
            <span className="block w-max mx-auto px-3 py-1.5 border border-green-200 rounded-full bg-green-100 text-green-600 text-4x1">
              Llistat de Llocs
            </span>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {posts.map((v, i) => {
              return (
                <React.Fragment key={v.id}>
                  {v.visibility.id === 1 || v.author.email === usuari ? (
                    <PostGrid deletePost={deletePost} key={v.id} v={v} />
                  ) : null}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
