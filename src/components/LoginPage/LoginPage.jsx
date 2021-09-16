import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("Please Enter your credentials");

  const history = useHistory();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginSubmit = async () => {
    var formBody = [];
    const details = {
      username: username,
      password: password,
      session_exists: false,
      token: "",
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
      "https://demoapps.arkatiss.com/LoginSessionApp/login/sessionapi",
      options
    ).then((data) => data.json());
    setIsLoading(false);
    if (!response.token) {
      handleLogin(
        response["access_token"] ? response["access_token"] : response
      );
      history.push("/");
    } else {
      alert(
        `Unable to login with credentials. Username: ${username} Password: ${password}`
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <>
            <p>{message}</p>
            <input
              value={username}
              onChange={handleUsernameChange}
              placeholder="Username"
            />
            <input
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
            />
            <button onClick={handleLoginSubmit}>Login</button>
          </>
        )}
      </div>
      )
    </div>
  );
};
export default LoginPage;
