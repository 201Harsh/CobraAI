import React, { useEffect, useState } from "react";
import Welcome from "../Pages/Welcome";
import { useNavigate } from "react-router-dom";

const AutoRedirecter = () => {
  const Navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [NotToken, setNotToken] = useState(true);

  useEffect(() => {
    if (token) {
      setNotToken(false);
      Navigate("/dashboard");
    } else {
      setNotToken(true);
    }
  }, [token, Navigate]);

  if (NotToken) {
    return (
      <>
        <Welcome />
      </>
    );
  }

  return null;
};

export default AutoRedirecter;
