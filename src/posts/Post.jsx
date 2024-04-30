import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { CommentsList } from "./comments/CommentsList";
import { CommentAdd } from "./comments/CommentAdd";

export const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuari, authToken } = useSelector(state => state.auth) || {};
  const { commentsCount = 0 } = useSelector((state) => state.comment) || {};
  const dispatch = useDispatch();

  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://backend.insjoaquimmir.cat/api/posts/${id}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch post data");
        }

        const data = await response.json();
        setIsLoading(false);
        setPost(data.data);
        setLiked(data.data.likes?.includes(authToken?.email) || false);
      } catch (error) {
        console.error("Error fetching post data:", error);
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id, authToken]);

  const deletePost = async (id, e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://backend.insjoaquimmir.cat/api/posts/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      navigate("/posts");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleLike = async (e) => {
    e.preventDefault();

    try {
      const updatedLikes = liked ? 
        post.likes?.filter(email => email !== authToken.email) || [] :
        [...(post.likes || []), authToken.email];

      setLiked(!liked);
      setPost(prevPost => ({ ...prevPost, likes: updatedLikes }));
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <div className="md:grid md:grid-col-1 md:grid-flow-row gap-4 md:mx-auto p-6 justify-center dark:bg-gray-900 dark:text-gray-100">
          <div className="relative overflow-hidden bg-no-repeat bg-cover col-span-1">
            <img
              src={`https://backend.insjoaquimmir.cat/storage/${post?.file?.filepath}`}
              alt="Imagen del post"
              className="w-200px h-96 items-center"
            />
          </div>

          <div className="max-w-xl">
            <span className="bg-blue-200 col-span-1 block pb-2 text-sm dark:text-gray-400">
              Enviada per: {post?.author?.name || 'Autor desconocido'}
            </span>
            <span className="self-center px-9 bg-gray-200 col-span-2 text-x2 font-semibold">
              Latitud: {post?.latitude}
            </span>
            <span className="self-center px-7 bg-gray-200 text-x2 font-semibold">
              Longitud: {post?.longitude}
            </span>
            <div className="bg-orange-100 py-3 text-x2 font-semibold">
              Descripció
            </div>
            <p className=" bg-yellow-100">{post?.body}</p>
            <div className="mt-10 h-12 max-h-full md:max-h-screen">
              {post?.author?.name === usuari && (
                <>
                  <Link
                    to={"/posts/edit/" + id}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-10 px-4 h-10 md:h-10 uppercase"
                  >
                    Editar
                  </Link>
                  <a
                    href="#"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-10 md:h-10 uppercase"
                    onClick={(e) => deletePost(id, e)}
                  >
                    Esborrar
                  </a>
                </>
              )}
              <button
                onClick={handleLike}
                className={`bg-${liked ? 'blue-300' : 'blue-500'} hover:bg-${liked ? 'blue-400' : 'blue-700'} text-white font-bold py-2 px-4 h-10 md:h-10 uppercase`}
              >
                {liked ? `- ❤️ ${post?.likes?.length || 0}` : `+ ❤️ ${post?.likes?.length || 0}`}
              </button>
              <CommentsList id={post?.id} authToken={authToken} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

