import React from "react";
import styled from "styled-components";
import CookieConsent from "../layout/CookieConsent";
import { useAuthentication } from "../providers/AuthenticationProvider";

const StyledFooter = styled.footer`
  display: grid;
  justify-content: center;
  backround-color: white;
  font-family: Arial;
  font-size: 14px;
  margin-top: 20px;
`;

const Navbar = () => {
  const [authentication, setAuthentication] = useAuthentication();

  return (
    <div>
      {authentication.cookieConsent ? "" : <CookieConsent />}
      <StyledFooter>
        Copyright &copy; {new Date().getFullYear()} Ville Valtonen
      </StyledFooter>
    </div>
  );
};

export default Navbar;
