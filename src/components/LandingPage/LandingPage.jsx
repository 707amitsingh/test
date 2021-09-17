import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Header from "../Header/Header";
import Notification from "../Modal/Modal.js"
import "./LandingPage.css";

const LandingPage = ({ token, updateToken }) => {
  const history = useHistory();

  const [showModal, setShowModal] = useState(false)

  if (!token) {
    history.push("/login");
  }

  const handleClose = () => {
    setTimeout(() => {
      setShowModal(true)
    }, 10 * 1000);
    setShowModal(false)
  }

  const handleModalAction = () => {
    updateToken("");
  }

  useEffect(() => {
    if (token) {
      setTimeout(() => {
        setShowModal(true)
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
          </Card.Body>
        </Card>
      </div>
      <Notification show={showModal} handleClose={handleClose} handleModalAction={handleModalAction}>{<p>Your token is about to expire. Note this warning will show up in every 10 sec</p>}</Notification>
    </div>
  );
};

export default LandingPage;
