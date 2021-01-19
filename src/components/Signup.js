import { React, useState } from "react";
import { useAuthentication } from "./AuthenticationProvider";

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
    <div>
      <h1>Sign up</h1>
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
          <div className="form-control">
            <label htlmfor="password2">Confirm password: </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={credentials.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button type="submit" onClick={handleSubmit}>
            Sign up
          </button>
          {message.show ? <p>{message.message}</p> : ""}
        </form>
      </article>
    </div>
  );
};

export default Signup;
