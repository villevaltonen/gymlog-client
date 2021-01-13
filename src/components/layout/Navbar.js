import { React, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AuthenticationProvider, useAuthentication } from "../AuthenticationProvider";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useAuthentication() 

  useEffect(() => {
    return
  }, [isAuthenticated])

  const logout = () => {
    setIsAuthenticated(false);
  }

  return (
    <AuthenticationProvider>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {isAuthenticated ? "" : <li><Link to="/signup">Sign up</Link></li>}
          <li> 
            <Link to="/dashboard">Dashboard</Link>
          </li>
          {isAuthenticated ? <li><button onClick={logout}>Logout</button></li> : ""}
        </ul>
      </nav>
    </AuthenticationProvider>
  );
};

export default Navbar
