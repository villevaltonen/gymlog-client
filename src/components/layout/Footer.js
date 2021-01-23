import React from "react";
import styled from "styled-components";
import CookieConsent from "../layout/CookieConsent";
import { useAuthentication } from "../providers/AuthenticationProvider";

const StyledFooter = styled.footer`
  backround-color: white;
  font-family: Arial;
  font-size: 14px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
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
