import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("Arkatiss");

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
        'userName': username,
        'password': password,
        'grant_type': 'password',
        'client_id': 'login-app1'
    }
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
        'Access-Control-Allow-Origin': 'http://localhost:3000/login',
        'Access-Control-Allow-Credentials': 'true'
      },
      body: formBody,
    };

    const response = await fetch(
      "https://idsq.arkatiss.com/auth/realms/SpringBootKeycloak/protocol/openid-connect/token",
      options
    ).then((data) => data.json());

    console.log(">>>>>>>> response: ", response);
    handleLogin(response["access_token"] ? response["access_token"] : response)
    history.push('/')
  };

  return (
    <div className="login-container">
      <div className="login-form">
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
      </div>
    </div>
  );
};
export default LoginPage;
