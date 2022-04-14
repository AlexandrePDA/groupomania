import React, { useState } from "react";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailError = document.querySelector(".email-error");

  // Regex
  const emailValidator = () => {
    const regEx = /^[A-Za-z0-9\-.]+@([A-Za-z0-9-]+.)+[A-Za-z0-9-]{2,4}$/;
    if (!regEx.test(email) || setEmail === "") {
      emailError.innerText = "Veuillez indiquer votre email";
    } else {
      emailError.innerText = "";
    }
  };


  const handleSignUp = (e) => {
    e.preventDefault()
    console.log(name);
  };

  return (
    <form action="" onSubmit={handleSignUp} id="sign-form">
      <label htmlFor="pseudo">Pseudo</label>
      <br />
      <input
        type="text"
        name="pseudo"
        id="pseudo"
        required
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <br />
      <br />
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
      <input
        type="submit"
        id="button"
        onClick={emailValidator}
        value="Se connecter"
      />
    </form>
  );
};

export default SignUpForm;
