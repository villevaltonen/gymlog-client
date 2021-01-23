import React from "react";
import { useAuthentication } from "../providers/AuthenticationProvider";
import styled from "styled-components";

const StyledBackgroundDiv = styled.div`
  display: grid;
  height: 50px;
  background-color: #0388fc;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  justify-content: center;
  color: white;
  font-family: Arial;
`;

const StyledVisibleCookieConsentDiv = styled.div`
  padding-top: 15px;
  width: 90vw;
  max-width: 700px;
  text-align: center;
  vertical-align: middle;
`;

const StyledConsentText = styled.p`
  font-size: 14px;
  margin: 0px;
  display: inline;
  float: left;
`;

const StyledConsentButton = styled.button`
  font-size: 14px;
  display: inline;
  float: left;
  margin-left: 5px;
  background: none;
  border: none;
  color: white;
  padding: 0px;
  text-decoration: underline;
`;

const CookieConsent = () => {
  const [authentication, setAuthentication] = useAuthentication();

  const Accept = (e) => {
    e.preventDefault();
    setAuthentication({
      ...authentication,
      cookieConsent: true,
    });
  };

  return (
    <StyledBackgroundDiv>
      <StyledVisibleCookieConsentDiv>
        <StyledConsentText>
          By using Gymlog's services you agree to our cookie policy, including
          personalisation.{" "}
        </StyledConsentText>
        <StyledConsentButton onClick={Accept}>
          Okay, got it!
        </StyledConsentButton>
      </StyledVisibleCookieConsentDiv>
    </StyledBackgroundDiv>
  );
};

export default CookieConsent;
