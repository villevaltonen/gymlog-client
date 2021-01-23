import { React, useState } from "react";
import { useAuthentication } from "./providers/AuthenticationProvider";
import styled from "styled-components";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState({
    show: false,
    message: "",
  });
  const [authentication, setAuthentication] = useAuthentication();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authentication.cookieConsent) {
      // Verify all fields are filled
      if (
        credentials.username &&
        credentials.password &&
        credentials.confirmPassword
      ) {
        // Verify that passwords are matching
        if (credentials.password === credentials.confirmPassword) {
          setMessage({ ...message, show: false });
          const newCredentials = {
            username: credentials.username,
            password: credentials.password,
          };
          try {
            fetch("/api/users/register", {
              method: "POST",
              body: JSON.stringify(newCredentials),
              credentials: "include",
            })
              .then((res) => {
                return res.json();
              })
              .then((data) => {
                console.log(data);

                if (!data.error) {
                  setMessage({
                    show: true,
                    message: "Success!",
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
        } else {
          setMessage({
            ...message,
            show: true,
            message: "Passwords don't match",
          });
        }
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
        message: "Enabling cookies is required for using the service",
      });
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCredentials({ ...credentials, [name]: value });
  };

  const StyledSignup = styled.div`
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

  return (
    <StyledSignup>
      <h1>Sign up</h1>
      <StyledForm>
        <StyledLabel htlmfor="username">Username: </StyledLabel>
        <input
          type="text"
          id="username"
          name="username"
          value={credentials.username}
          onChange={handleChange}
        />
        <StyledLabel htlmfor="password1">Password: </StyledLabel>
        <input
          type="password"
          id="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <StyledLabel htlmfor="password2">Confirm password: </StyledLabel>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={credentials.confirmPassword}
          onChange={handleChange}
        />
        <StyledButtonDiv>
          <StyledButton type="submit" onClick={handleSubmit}>
            Sign up
          </StyledButton>
          {message.show ? (
            <StyledErrorMessage>{message.message}</StyledErrorMessage>
          ) : (
            ""
          )}
        </StyledButtonDiv>
      </StyledForm>
    </StyledSignup>
  );
};

export default Signup;
