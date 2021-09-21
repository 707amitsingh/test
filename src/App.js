import "./App.css";
import { useState } from "react";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import LoginPage from "./components/LoginPage/LoginPage";

function App() {

  // TODO - user session will be stored in persisted redux store
  const [token, setToken] = useState();

  const handleLogin = (value) =>  {
    // TODO - handle login
    setToken(value)
  }

  const updateToken = (tokenValue) => {
    setToken(tokenValue)
  }

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => <LandingPage token={token} updateToken={updateToken}/>}/>
        <Route path="/login" render={() => <LoginPage handleLogin={handleLogin}/>}/>
      </Switch>
    </div>
  );
}

export default App;
