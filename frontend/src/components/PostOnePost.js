import axios from "axios";
import React, { useState, useCallback } from "react";
// import { Redirect } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  title: yup
    .string()
    .min(1, "Veuillez remplir le champ")
    .max(25, "Pas plus de 25 caractères")
    .required(),
  content: yup
    .string()
    .min(1, "Veuillez remplir le champ")
    .max(200, "Pas plus de 200 caractères")
    .required(),
});

const PostOnePost = () => {
  const [post, setPost] = useState("");

  console.log(post);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handlePost = useCallback(async (data) => {
    const res = await axios.post("http://localhost:3000/api/posts/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data,
    });
    setPost(res.data.data);
  }, []);



  return (
    <div className="post">
        <p>Quoi de neuf aujourd'hui ?</p>
        <form action="" onSubmit={handleSubmit(handlePost)}>
          <textarea
            {...register("title")}
            type="text"
            name="title"
            id="title"
            placeholder="Titre du post"
            cols="10"
            rows="7"
          ></textarea>
          {errors.title && <div className="error-title">{errors.title.message}</div>}
          <textarea
            {...register("content")}
            type="text"
            name="content"
            id="content"
            placeholder="Contenu du post"
            cols="30"
            rows="10"
          ></textarea>
          {errors.content && (
            <div className="error-content">{errors.content.message}</div>
          )}
          <input
            type="file"
            id="image"
            name="image"
            accept="image/png, image/jpeg, image/jpg"
          />
          <input type="submit" id="button" value="Poster" />
        </form>

      
    </div>
  );
};

export default PostOnePost;
