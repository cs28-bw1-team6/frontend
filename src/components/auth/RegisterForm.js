import React, { useState } from "react";
import axios from 'axios'

const LoginForm = (props) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password1: "",
    password2: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios.post(
      "https://team6-castle-production.herokuapp.com/api/registration/",
      credentials
    ).then((res) => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/");
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err.response);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Register</h3>
      {isLoading && <div>Hang tight...</div>}
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={credentials.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password1"
        placeholder="Password"
        value={credentials.password1}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password2"
        placeholder="Password"
        value={credentials.password2}
        onChange={handleChange}
      />
      <button type="submit">Log in</button>
    </form>
  );
};

export default LoginForm;
