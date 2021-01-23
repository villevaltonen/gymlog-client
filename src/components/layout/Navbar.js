import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AuthenticationProvider,
  useAuthentication,
} from "../providers/AuthenticationProvider";
import { ResultProvider, useResult } from "../providers/ResultProvider";

const Navbar = () => {
  const [authentication, setAuthentication] = useAuthentication();
  const [result, setResult] = useResult();

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
    setResult({
      results: 0,
      skip: 0,
      limit: 5,
      sets: [],
    });
  };

  return (
    <AuthenticationProvider>
      <ResultProvider>
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
      </ResultProvider>
    </AuthenticationProvider>
  );
};

export default Navbar;
