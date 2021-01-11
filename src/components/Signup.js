import { React, useState } from 'react'

const Register = () => {
  const [credentials, setCredentials] = useState({
      username: "",
      password: "",
      verifyPassword: "",
  });
  const [ message, setMessage] = useState({
    show: false,
    message: "",
  });

  const handleSubmit = (e) => {
      e.preventDefault();
      // Verify all fields are filled
      if (credentials.username && credentials.password && credentials.verifyPassword) {
        // Verify that passwords are matching
        if(credentials.password === credentials.verifyPassword) {
          setMessage({...message, show: false});
          const newCredentials = {
            username: credentials.username,
            password: credentials.password,
          }
          try {
            fetch("/api/users/register", { 
            method: "POST",
            body: JSON.stringify(newCredentials),
            credentials: "include"
           }).then((res) => {
             return res.json();
           }).then((data) => {
              console.log(data);

             if(!data.error) {
               setMessage({
                 show: true,
                 message: "Success!"
               })
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
        } else {
          setMessage({...message, show: true, message: "Passwords don't match"});
        }
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
          <label htlmfor="password2">Verify password: </label>
          <input
            type="password"
            id="verifyPassword"
            name="verifyPassword"
            value={credentials.verifyPassword}
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
}

export default Register
