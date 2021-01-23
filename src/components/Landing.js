import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLanding = styled.div`
  display: grid;
  margin-top: 50px;
  font-family: Arial;
  width: 90vw;
  max-width: 700px;
  justify-content: center;
`;

const StyledLinkDiv = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto;
`;

const StyledLink = styled(Link)`
  color: white;
  background-color: #0388fc;
  border: 2px solid #034282;
  border-radius: 5px;
  text-decoration: none;
  font-size: 22px;
  margin: 20px;
  padding: 6px;
  text-align: center;
`;

const Landing = () => {
  return (
    <StyledLanding>
      <h1>Welcome to Gymlog!</h1>
      <StyledLinkDiv>
        <StyledLink to="/dashboard">Dashboard</StyledLink>
        <StyledLink to="/signup">Sign up</StyledLink>
      </StyledLinkDiv>
    </StyledLanding>
  );
};

export default Landing;
