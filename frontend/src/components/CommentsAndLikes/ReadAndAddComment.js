import React, { useCallback, useMemo, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CardComm from "./CardComm";

const schema = yup.object({
  comment: yup
    .string()
    .min(1, "Veuillez remplir le champ")
    .max(35, "Pas plus de 35 caractères")
    .required(),
});

const ReadAndAddComment = (item) => {
  const [post, setPost] = useState("");

  // maps pour obtenir tous les commentaires par post
  const commentaires = item.props.props.props.commentaire;

  const commentaireMap = useMemo(() => commentaires.map((comm) => comm.comment)
  , [commentaires]) 

  
  const {
    register,
    handleSubmit,
    formState : {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(errors);
  // rajouter message error.comment.message 

  console.log(item.props.props.props.id);

  // backend
  const handlePostComment = useCallback(
    async (data) => {
      console.log("yes");
      const res = await axios.post(
        `http://localhost:3000/api/posts/${item.props.props.props.id}/comments`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPost(res.data.data);
    },
    []
  );

  return (
    <div className="showComment">
      <ul>
        <li>
          {item.props.props.props.commentaire.length > 0
            ? commentaires.map((comm) => (
                <CardComm key={comm.id} props={comm} />
              ))
            : "Aucun commentaire"}
        </li>
      </ul>

      {/* Nouveau commentaire */}
   <form onSubmit={handleSubmit(handlePostComment)}>
        <textarea
          {...register("comment")}
          name="comment"
          id="comment"
          cols="25"
          rows="2"
          placeholder="Réagissez..." 
        ></textarea>
        <input type="submit" id="button" value="Commentez" />
      </form>
      
    </div>
  );
};

export default ReadAndAddComment;


