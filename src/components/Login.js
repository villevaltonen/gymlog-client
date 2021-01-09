import { React, useState } from 'react';

const Login = props => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const [ warning, setWarning] = useState({
      show: false,
      message: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (credentials.email && credentials.password) {
            setWarning({...warning, show: false});
            // TODO: send request to login API
            console.log(credentials);
        } else {
          setWarning({...warning, show: true, message: "All fields are required"});
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
            <label htlmfor="email">Email: </label>
            <input
              type="text"
              id="email"
              name="email"
              value={credentials.email}
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
            Sign up
          </button>
          {warning.show ? <p>{warning.message}</p> : ""}
        </form>
      </article>
        </div>
    );
}

export default Login
