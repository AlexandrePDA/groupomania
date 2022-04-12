import React, { useState } from "react";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e) => {};

  return (
    <form action="" onSubmit={handleSignUp} id="sign-form">
      <label htmlFor="pseudo">Pseudo </label>
      <br />
      <input
        type="text"
        name="pseudo"
        id="pseudo"
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
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <br />
      <div className="password-error"></div>
      <br />
      <input type="submit" id="button" value="Se connecter" />
    </form>
  );
};

export default SignUpForm;
