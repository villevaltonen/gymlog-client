import { React, useState } from 'react';
import { AuthenticationProvider, useAuthentication } from "./AuthenticationProvider";

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const [message, setMessage] = useState({
      show: false,
      message: "",
    });
    const [authentication, setAuthentication] = useAuthentication()

    const login = () => {
      try {
        fetch("/api/users/login", { 
        method: "POST",
        body: JSON.stringify(credentials),
        credentials: "include"
        }).then((res) => {
          return res.json();
        }).then((data) => {
          if(!data.error) {
            setMessage({
              show: true,
              message: "Success!"
            })
            const current = new Date()
            setAuthentication({
              ...authentication,
              isAuthenticated: true,
              loginTime: current,
              credentials: {
                username: credentials.username,
                password: credentials.password,
              }
            });
          } else {
            setMessage({
              show: true,
              message: data.error,
            })
          }
        });
      } catch(err) {
        console.log(err);
      }
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      // Verify all fields are filled
      if (credentials.username && credentials.password) {
        login();
      } else {
        setMessage({...message, show: true, message: "All fields are required"});
      }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setCredentials({...credentials, [name]: value});
    }

    return (
      <AuthenticationProvider>
        <div>
            <h1>Login</h1>
             <article>
        <form className="form">
          <div className="form-control">
            <label htlmfor="username">Username: </label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htlmfor="password1">Password: </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" onClick={handleSubmit}>
            Sign in
          </button>
          {message.show ? <p>{message.message}</p> : ""}
        </form>
      </article>
        </div>
        </AuthenticationProvider>
    );
}

export default Login
