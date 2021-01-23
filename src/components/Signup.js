import { React, useState } from "react";
import { useAuthentication } from "./providers/AuthenticationProvider";
import styled from "styled-components";

const StyledSignup = styled.div`
  display: grid;
  margin-top: 50px;
  font-family: Arial;
  width: 90vw;
  max-width: 700px;
  justify-content: left;
`;

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
  border: 2px solid #034282;
  border-radius: 5px;
`;

const StyledErrorMessage = styled.p`
  color: red;
`;

const StyledSuccessMessage = styled.p`
  color: green;
`;

const Signup = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    show: false,
    message: "",
  });
  const [success, setSuccess] = useState({
    show: false,
    message: "Success",
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
          setErrorMessage({ ...errorMessage, show: false });
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
                if (!data.error) {
                  setErrorMessage({
                    ...errorMessage,
                    show: false,
                  });
                  setSuccess({
                    ...success,
                    show: true,
                  });
                } else {
                  setErrorMessage({
                    show: true,
                    message: data.error,
                  });
                }
              });
          } catch (err) {
            console.log(err);
          }
        } else {
          setErrorMessage({
            ...errorMessage,
            show: true,
            message: "Passwords don't match",
            color: "red",
          });
          setSuccess({
            ...success,
            show: false,
          });
        }
      } else {
        setErrorMessage({
          ...errorMessage,
          show: true,
          message: "All fields are required",
          color: "red",
        });
        setSuccess({
          ...success,
          show: false,
        });
      }
    } else {
      setErrorMessage({
        show: true,
        message: "Enabling cookies is required for using the service",
        color: "red",
      });
      setSuccess({
        ...success,
        show: false,
      });
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <StyledSignup>
      <h1>Sign up</h1>
      <form>
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
          {errorMessage.show ? (
            <StyledErrorMessage>{errorMessage.message}</StyledErrorMessage>
          ) : (
            ""
          )}
          {success.show ? (
            <StyledSuccessMessage>{success.message}</StyledSuccessMessage>
          ) : (
            ""
          )}
        </StyledButtonDiv>
      </form>
    </StyledSignup>
  );
};

export default Signup;
