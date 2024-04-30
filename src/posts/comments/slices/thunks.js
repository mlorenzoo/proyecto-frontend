import { setAdd, setError, setComments, setCommentsCount, startLoadingComments } from "./commentsSlice";

export const getComments = (page = 0, id, authToken, usuari="") => {
    return async (dispatch, getState) => {

        dispatch(startLoadingComments());

        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "GET",
        };
        const url = "https://backend.insjoaquimmir.cat/api/posts/" + id + "/comments";

        try {
            const data = await fetch(url, headers);

            if (data.status === 401) {
                throw new Error("No autorizado");
            }

            const resposta = await data.json();

            if (resposta.success === true && Array.isArray(resposta.data)) {
                dispatch(setComments(resposta.data));
            } else {
                dispatch(setError(resposta.message));
                return;
            }

            resposta.data.map((v) => {
                if (v.user.email === usuari) {
                    dispatch (setAdd(false));
                    console.log("Te comment");
                }
            });
        } catch (error) {
            dispatch(setError("No autorizado"));
        }
    };
}


export const delComment = (comment, authToken) => {
    return async (dispatch, getState) => {
        const data = await fetch(
            "https://backend.insjoaquimmir.cat/api/posts/" +
              comment.post.id +
              "/comments/" +
              comment.id,
              {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + authToken,
                },
                method: "DELETE",
              }
          );
          const resposta = await data.json();
    
          console.log(resposta);
          if (resposta.success == true) {
            dispatch(setAdd(true));
            dispatch(getComments(0, comment.post.id, authToken));
            const state = getState();
            dispatch(setCommentsCount(state.comment.commentsCount - 1));
          }


    };
};

export const addComment = (postId, commentText, authToken) => {
  return async (dispatch, getState) => {
      dispatch(startLoadingComments());

      const headers = {
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + authToken,
          },
          method: "POST",
          body: JSON.stringify({ comment: commentText }),
        };

      const url = `https://backend.insjoaquimmir.cat/api/posts/${postId}/comments`;

      const data = await fetch(url, headers);
      const resposta = await data.json();

      console.log(resposta);

      if (resposta.success === true) {
          dispatch(setAdd(true));
          dispatch(getComments(0, postId, authToken));
          
          // Update commentsCount
          const state = getState();
          dispatch(setCommentsCount(state.comment.commentsCount + 1)); // Assuming you want to increment the count
      } else {
          dispatch(setError(resposta.message));
      }
  };
};