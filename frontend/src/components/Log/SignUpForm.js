import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios";
import * as yup from "yup";

const schema = yup.object({
  username: yup.string().required("Ce champ est requis"),
  email: yup.string().email("Email invalide").required("Ce champ est requis"),
  password: yup
    .string()
    .min(8, "Le mot de passe doit faire minimum 8 caractères")
    .max(20, "Le mot de passe ne doit pas faire plus de 20 caractères"),
});

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => console.log(data);

  // connect with backend
  const handleSignUp = useCallback( async (data) => {
    const res = await axios.post("http://localhost:3000/api/users/signup", data);
    console.log(res);
  },[]);


  

  return (
    <form onSubmit={handleSubmit(handleSignUp)} id="sign-form">
      {isSubmitSuccessful && <div className="alert-success">Vous êtes bien inscrit.<br/> Veuillez vous connecter<br /></div>}
      <label htmlFor="pseudo">Pseudo</label>
      <br />
      <input {...register("username")} />
      <br />
      {errors.username && <div>{errors.username.message}</div>}
      <br />
      <label htmlFor="email">Email </label>
      <br />
      <input {...register("email")} />
      <br />
      {errors.email && <div>{errors.email.message}</div>}
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input {...register("password")} type='password' />
      <br />
      {errors.password && <div>{errors.password.message}</div>}
      <br />
      <input
        type="submit"
        id="button"
        value="S'inscrire"
        onSubmit={onSubmit}
      />
    </form>
  );
};

export default SignUpForm;
