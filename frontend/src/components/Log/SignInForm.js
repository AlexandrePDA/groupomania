import React, { useCallback } from "react";
import { Navigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios";
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email("Email invalide").required("Ce champ est requis"),
  password: yup
    .string()
    .min(8, "Le mot de passe doit faire minimum 8 caractères")
    .max(20, "Le mot de passe ne doit pas faire plus de 20 caractères"),
});

const SignInForm = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema)
  });
  
  const onSubmit = () =>  <Navigate replace to="http://localhost:3002/" />;


  // connect with backend
  const handleLogin = useCallback( async (data) => {
    console.log(data);
    const res = await axios.post("http://localhost:3000/api/users/login", data);
    const token = await res.data.data.token;
    localStorage.setItem('token', token);
    <Navigate replace to="http://localhost:3002/" />
  },[]);



  return (
    <form action="" onSubmit={handleSubmit(handleLogin)}  id="sign-form">
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
        value="Se connecter"
        onSubmit={onSubmit}
      />
    </form>
  );
};

export default SignInForm;
