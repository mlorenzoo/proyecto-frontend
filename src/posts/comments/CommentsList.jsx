import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Comment } from "./Comment";
import { CommentAdd } from "./CommentAdd";
import { getComments } from "./slices/thunks";
import { setCommentsCount } from "./slices/commentsSlice";


export const CommentsList = ({ id, authToken }) => {
  const dispatch = useDispatch();
  const { comments = [], commentsCount = 0, error = "" } = useSelector((state) => state.comment) || {};

  useEffect(() => {
    if (!Array.isArray(comments)) {
      console.error("El estado 'comments' no es un array");
      return;
    }
    dispatch(setCommentsCount(comments.length)); // Comentarios actuales en el estado
    dispatch(getComments(0, id, authToken)); // Usar authToken
  }, [dispatch, id, authToken, comments]); // Asegúrate de incluir authToken y comments en las dependencias

  return (
    <>
      {error && (
        <div className="flex mb-4 w-full items-center space-x-2 rounded-2xl bg-red-50 px-4 ring-2 ring-red-200">
          Error: {error.message || error}
        </div>
      )}

      {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
      ))}

      {commentsCount > 0 && <CommentAdd id={id} />}
    </>
  );
};
