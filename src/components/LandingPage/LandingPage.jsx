import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Header from "../Header/Header";
import "./LandingPage.css";

const LandingPage = ({ token, updateToken }) => {
  const history = useHistory();

  if (!token) {
    history.push("/login");
  }

  useEffect(() => {
    if (token) {
      setTimeout(() => {
        updateToken("");
      }, 10 * 1000);
    }
  }, [token]);

  return (
    <div className="landingpage-container">
      <Header />
      <div className="landingpage-token-wraper">
        <Card style={{ width: "120rem", height:"20rem" }}>
          <Card.Body>
            <Card.Title>Welcome back!</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Below is your token
            </Card.Subtitle>
            <Card.Text>{token}</Card.Text>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default LandingPage;
