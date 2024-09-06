import React from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

const TokenDecode = () => {
  const { userInfo } = useSelector((State) => State.auth);

  const userName = (token) => {
    const username =
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";

    const decode = jwtDecode(token);
    const userName = decode[username];

    const name = userName.split("@");
    console.log(name);
    return name[0];
    
  };

    return (
        <>
        <small>{userName(userInfo.jwtToken)}</small>
        </>
    );
};

export default TokenDecode;
