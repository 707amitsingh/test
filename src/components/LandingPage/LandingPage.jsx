import React from "react";
import { useHistory } from "react-router-dom"
import Header from "../Header/Header"
import "./LandingPage.css";

const LandingPage = ({ token }) => {
  const history = useHistory();
  console.log(">>>>>>>>>>. token: ", token)

  if(!token) {
    history.push("/login")
  }

  return (
    <div className="landingpage-container">
      <Header />
      <h2>Welcome back!</h2>
      <p>{`Your Token is: ${token}`}</p>
      
    </div>
  );
};

export default LandingPage;
