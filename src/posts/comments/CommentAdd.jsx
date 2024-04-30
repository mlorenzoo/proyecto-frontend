import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "./slices/thunks";

export const CommentAdd = ({ id }) => {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.authToken);

  const [commentText, setCommentText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) {
      setErrorMessage("El comentario no puede estar vacío");
      return;
    }

    dispatch(addComment(id, commentText, authToken));
    setCommentText("");
    setErrorMessage("");
  };

  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border rounded"
          rows="4"
          placeholder="Añade un comentario..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        ></textarea>
        {errorMessage && (
          <div className="text-red-500 mt-2">{errorMessage}</div>
        )}
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Añadir comentario
        </button>
      </form>
    </div>
  );
};
