import { React, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AuthenticationProvider, useAuthentication } from "../AuthenticationProvider";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useAuthentication() 

  useEffect(() => {
    return
  }, [isAuthenticated])

  return (
    <AuthenticationProvider>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {isAuthenticated ? "" : <li><Link to="/login">Login</Link></li>}
          <li> 
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>
    </AuthenticationProvider>
  );
};

export default Navbar
