import { React, useState } from "react";
import {
  AuthenticationProvider,
  useAuthentication,
} from "./providers/AuthenticationProvider";
import styled from "styled-components";

const StyledLogin = styled.div`
  display: grid;
  margin-top: 50px;
  font-family: Arial;
  width: 90vw;
  max-width: 700px;
  justify-content: left;
`;

const StyledForm = styled.form``;

const StyledLabel = styled.label`
  display: block;
  margin-top: 10px;
`;

const StyledButtonDiv = styled.div`
    display: grid:
    justify-content: center;
  `;

const StyledButton = styled.button`
  margin-top: 10px;
  background-color: #0388fc;
  border: none;
  color: white;
  font-size: 16px;
  outline-color: white;
  border: 2px solid #034282;
  border-radius: 5px;
`;

const StyledErrorMessage = styled.p`
  color: red;
`;

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState({
    show: false,
    message: "",
  });
  const [authentication, setAuthentication] = useAuthentication();

  const login = () => {
    try {
      fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify(credentials),
        credentials: "include",
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (!data.error) {
            setMessage({
              show: true,
              message: "Success!",
            });
            const current = new Date();
            setAuthentication({
              ...authentication,
              isAuthenticated: true,
              loginTime: current,
              credentials: {
                username: credentials.username,
                password: credentials.password,
              },
            });
          } else {
            setMessage({
              show: true,
              message: data.error,
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authentication.cookieConsent) {
      // Verify all fields are filled
      if (credentials.username && credentials.password) {
        login();
      } else {
        setMessage({
          ...message,
          show: true,
          message: "All fields are required",
        });
      }
    } else {
      setMessage({
        show: true,
        message: "Cookies are required for using the service",
      });
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <AuthenticationProvider>
      <StyledLogin>
        <div>
          <h1>Login</h1>
          <StyledForm>
            <div>
              <StyledLabel htlmfor="username">Username: </StyledLabel>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
              />
            </div>
            <StyledLabel htlmfor="password1">Password: </StyledLabel>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
            />
            <StyledButtonDiv>
              <StyledButton type="submit" onClick={handleSubmit}>
                Sign in
              </StyledButton>
              {message.show ? <p>{message.message}</p> : ""}
            </StyledButtonDiv>
          </StyledForm>
        </div>
      </StyledLogin>
    </AuthenticationProvider>
  );
};

export default Login;
