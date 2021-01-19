import React from "react";
import { useAuthentication } from "../providers/AuthenticationProvider";

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
    <div>
      {authentication.cookieConsent ? (
        ""
      ) : (
        <div>
          <p>
            By using Gymlog's services you agree to our cookie policy, including
            personalisation.{" "}
          </p>
          <button onClick={Accept}>Close</button>
        </div>
      )}
    </div>
  );
};

export default CookieConsent;
