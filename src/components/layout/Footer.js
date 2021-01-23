import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  display: grid;
  justify-content: center;
  backround-color: white;
  font-family: Arial;
  font-size: 14px;
  margin-top: 20px;
`;

const Navbar = () => {
  return (
    <StyledFooter>
      Copyright &copy; {new Date().getFullYear()} Ville Valtonen
    </StyledFooter>
  );
};

export default Navbar;
