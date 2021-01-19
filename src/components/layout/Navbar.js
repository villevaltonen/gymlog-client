import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AuthenticationProvider,
  useAuthentication,
} from "../providers/AuthenticationProvider";

const Navbar = () => {
  const [authentication, setAuthentication] = useAuthentication();

  useEffect(() => {
    return;
  }, [authentication]);

  const logout = () => {
    setAuthentication({
      ...authentication,
      isAuthenticated: false,
      loginTime: "",
      credentials: {},
    });
  };

  return (
    <AuthenticationProvider>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {authentication.isAuthenticated ? (
            ""
          ) : (
            <li>
              <Link to="/signup">Sign up</Link>
            </li>
          )}
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          {authentication.isAuthenticated ? (
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          ) : (
            ""
          )}
        </ul>
      </nav>
    </AuthenticationProvider>
  );
};

export default Navbar;
