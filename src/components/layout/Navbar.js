import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AuthenticationProvider,
  useAuthentication,
} from "../providers/AuthenticationProvider";
import { ResultProvider, useResult } from "../providers/ResultProvider";
import styled from "styled-components";

const StyledNavbarDiv = styled.nav`
  display: grid;
  height: 50px;
  background-color: #0388fc;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  justify-content: center;
  z-index: 50;
`;

const StyledNavbar = styled.nav`
  width: 90vw;
  max-width: 700px;
  margin-left: -20px;
`;

const StyledNavLiLeft = styled.li`
  float: left;
  list-style: none;
  padding-right: 20px;
`;

const StyledNavLiRight = styled.li`
  float: right;
  list-style: none;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-family: Arial;
  font-size: 18px;
`;

const StyledButton = styled.button`
  background-color: #0388fc;
  border: none;
  color: white;
  font-size: 18px;
  outline-color: white;
`;

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
        <StyledNavbarDiv>
          <StyledNavbar>
            <ul>
              <StyledNavLiLeft>
                <StyledLink to="/">Home</StyledLink>
              </StyledNavLiLeft>
              {authentication.isAuthenticated ? (
                <StyledNavLiLeft>
                  <StyledLink to="/dashboard">Dashboard</StyledLink>
                </StyledNavLiLeft>
              ) : (
                <StyledNavLiLeft>
                  <StyledLink to="/dashboard">Login</StyledLink>
                </StyledNavLiLeft>
              )}
              {authentication.isAuthenticated ? (
                <StyledNavLiRight>
                  <StyledButton onClick={logout}>Logout</StyledButton>
                </StyledNavLiRight>
              ) : (
                <StyledNavLiRight>
                  <StyledLink to="/signup">Sign up</StyledLink>
                </StyledNavLiRight>
              )}
            </ul>
          </StyledNavbar>
        </StyledNavbarDiv>
      </ResultProvider>
    </AuthenticationProvider>
  );
};

export default Navbar;
