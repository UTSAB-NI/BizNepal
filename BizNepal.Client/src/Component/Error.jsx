import React from "react";
import { Alert } from "react-bootstrap";
const Error = ({ message, variant }) => {
  return (
    <div>
      <Alert variant={variant} dismissible>
        {message}
      </Alert>
    </div>
  );
};

export default Error;
