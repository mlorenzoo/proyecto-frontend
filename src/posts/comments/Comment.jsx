import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { delComment } from "./slices/thunks";

import TimeAgo from "react-timeago";
import catStrings from "react-timeago/lib/language-strings/ca";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

export const Comment = ({ comment }) => {
  const { user, authToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  const formatter = buildFormatter(catStrings);

  const handleDeleteComment = () => {
    dispatch(delComment(comment, authToken));
  };
  

  return (
    <div className="px-10">
      <div className="bg-white max-w-xl rounded-2xl px-10 py-8 hover:shadow-2xl transition duration-500">
        <div className="mt-4">
          <h1 className="text-lg text-gray-700 font-semibold hover:underline cursor-pointer">
            Comentario de {comment.user.name}
          </h1>
        
          <p className="mt-4 text-md text-gray-600">{comment.comment}</p>
          <div className="flex justify-between items-center">
            <div className="mt-4 flex items-center space-x-4 py-6">
              <div className="text-sm font-semibold">
                <span className="font-normal">
                  <TimeAgo
                    date={comment.created_at}
                    formatter={formatter}
                  ></TimeAgo>{" "}
                </span>
              </div>
            </div>
            {comment?.author?.name === user?.id && (
              <button
                onClick={handleDeleteComment}
                type="button"
                className="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              >
                Esborrar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
