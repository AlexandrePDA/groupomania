import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BsFillTrashFill } from "react-icons/bs";

const schema = yup.object({
  comment: yup
    .string()
    .min(1, "Veuillez remplir le champ")
    .max(35, "Pas plus de 35 caractères")
    .required(),
});

const Comments = (item) => {
  const [usernameComm, setUsernameComm] = useState("");
  const [deleteComment, setDeleteComment] = useState(false)


  console.log(item.props.props.user.email);

  const commentaires = item.props.props.commentaire;


  const commentairesMap = commentaires.map((comm) => (comm.id))

  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });


  // verfiy if u can delete comment with id
  useEffect(() => {
    const verifyDeletePost = () => {
      const userId = localStorage.getItem("userId");
      const commentId = commentairesMap;
      if (Number(userId) === commentId) {
        setDeleteComment(true)
      } else {
        setDeleteComment(false)
      }
    };
    verifyDeletePost();
  }, [commentairesMap]);

  // backend
    // post
  const handlePostComment = useCallback(async (data) => {
    const res = await axios.post(
      `http://localhost:3000/api/posts/${item.props.props.id}/comments`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setUsernameComm(res.data.data.user.username);
  }, []);

  // delete
  const handleDelete = async () => {
    console.log("yes");
  }

  return (
    <div className="comments">

      <div className="showComment">
        {commentaires.map((comm) => (
          <ul>
            <li key={comm.id} className="commentaires">
              <div className="info_user">
                <p className="user_comment">{usernameComm}</p>
                {deleteComment ? (
                   <p className="trash-comm" onClick={handleDelete}>
                   <BsFillTrashFill />
                 </p>
                ) : ("")}
               
              </div>
              {comm.comment}
            </li>
          </ul>
        ))}
      </div>

      <form onSubmit={handleSubmit(handlePostComment)}>
        <textarea
          {...register("comment")}
          name="comment"
          id="comment"
          cols="25"
          rows="2"
          placeholder={
            item.props.props.commentaire.length > 0
              ? "Réagissez"
              : "Commentez le premier"
          }
        ></textarea>
        <input type="submit" id="button" value="Commentez" />
      </form>
    </div>
  );
};

export default Comments;
