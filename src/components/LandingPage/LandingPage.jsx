import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Header from "../Header/Header";
import Notification from "../Modal/Modal.js";
import { Spinner, Button } from "react-bootstrap";
import "./LandingPage.css";

const LandingPage = ({ token, updateToken }) => {
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setShowModal(false)
  };

  const handleModalAction = () => {
    updateToken("");
    history.push("/login");
  };

  useEffect(() => {
    if (!token) {
      history.push("/login");
    }
  }, [token]);

  const handleValidateToken = async () => {
    var formBody = [];
    const details = {
      appl_session_id: token,
    };
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    };
    setIsLoading(true);
    const response = await fetch(
      "https://demoapps.arkatiss.com/LoginSessionApp/login/tokenValidation",
      options
    ).then((data) => data.json());
    setIsLoading(false);
    if (response.status) {
      document.getElementById("viewHomePage").style.display = "block";
    } else {
      setShowModal(true);
    }
  };

  const handleElasticCall = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: "select * from scanentry" }),
    };
    const response = await fetch("http://tcq.arkatiss.com/_sql", options).then(
      (data) => data.json()
    );
  };

  return (
    <div className="landingpage-container">
      <Header />
      <div className="jumbotron">
        <div className="button-container">
          <Button style={{marginTop: 0}} variant="dark" onClick={handleValidateToken}>
            Validate Token
          </Button>
          <Button variant="dark" onClick={handleElasticCall}>
            Elastic Search
          </Button>
        </div>
      </div>
      {isLoading ? (
        <Spinner
          animation="border"
          role="status"
          style={{ marginLeft: "35.6rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          <div id="viewHomePage" className="mt-2" style={{ display: "none" }}>
            <Card id="tokenCard">
              <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">
                  <p>Welcome to LIMN LABS</p>
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </div>
        </>
      )}

      <Notification
        show={showModal}
        handleClose={handleClose}
        handleModalAction={handleModalAction}
      >
        {<p>Token will expire in 30 sec. Please continue to login.</p>}
      </Notification>
    </div>
  );
};

export default LandingPage;
