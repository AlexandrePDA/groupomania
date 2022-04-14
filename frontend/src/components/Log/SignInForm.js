import React, { useState } from "react";
import axios from "axios";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailError = document.querySelector(".email-error");
  const passwordError = document.querySelector(".password-error");

  // Regex
  const emailValidator = () => {
    const regEx = /^[A-Za-z0-9\-.]+@([A-Za-z0-9-]+.)+[A-Za-z0-9-]{2,4}$/;
    if(!regEx.test(email) || setEmail === "") {
      emailError.innerHTML = "Veuillez remplir correctement le champ"
    } else {
      emailError.innerHTML = ""
    }
  }

  const handleLogin = (e) => {
    e.preventDefault();

    axios({
      method: "POST",
      url: "http://localhost:3000/api/users/login",
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          window.location = "/";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };



  return (
    <form action="" onSubmit={handleLogin} id="sign-form">
      <label htmlFor="email">Email </label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        required
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <br />
      <div className="email-error"></div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        required
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <br />
      <div className="password-error"></div>
      <br />
      <input type="submit" id="button" onClick={emailValidator} value="Se connecter" />
    </form>
  );
};

export default SignInForm;
