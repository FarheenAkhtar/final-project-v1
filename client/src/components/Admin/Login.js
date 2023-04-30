import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { currentUser, setCurrentUser } = useContext(UserContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {
          window.localStorage.setItem(
            "currentUser",
            JSON.stringify(formData.email)
          );
          setCurrentUser(formData.email);
          window.location.href = "/admin/view-recipe";
          window.alert("Login successful");
        } else {
          window.alert("Login unsuccessful");
        }
      })
      .catch((err) => window.alert(err));
  };

  return (
    <div className="login_form_main_container">
      <form onSubmit={handleSubmit} className="login_form">
        <h2>Login</h2>
        <label>
          Email:
          <input type="email" name="email" onChange={handleChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" onChange={handleChange} />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
