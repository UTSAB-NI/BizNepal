import { jwtDecode } from "jwt-decode";

const TokenDecode = () => {
  const userName = (token) => {
    const username =
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";

    const decode = jwtDecode(token);
    const claimUserName = decode[username];

    const name = claimUserName.split("@");
    return name[0];
  };

  const userId = (token) => {
    const claimUserid =
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
    const decode = jwtDecode(token);
    const userId = decode[claimUserid];
    return userId;
  };

  return { userName, userId };
};

export default TokenDecode;
