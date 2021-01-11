import { React, useState } from 'react';

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const [ message, setMessage] = useState({
      show: false,
      message: "",
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      // Verify all fields are filled
      if (credentials.username && credentials.password) {
          console.log(window.location.origin)
          try {
            fetch("/api/users/login", { 
            method: "POST",
            body: JSON.stringify(credentials),
            credentials: "include"
           }).then((res) => {
             console.log(res);
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
    );
}

export default Login
