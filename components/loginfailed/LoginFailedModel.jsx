import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { useAuth } from "../../providers/AuthProvider";

export const LoginFailedModel = () => {
  const { setLoginFailedModel } = useAuth();
  return (
    <div className="login-failed">
      <RiCloseLine
        className="close-login-failed-icon"
        onClick={() => setLoginFailedModel(false)}
      />

      <ul>
        <li>Invalid Email address and Password!!</li>
      </ul>
    </div>
  );
};
