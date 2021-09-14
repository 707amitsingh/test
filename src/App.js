import "./App.css";
import { useState } from "react";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import LoginPage from "./components/LoginPage/LoginPage";

function App() {

  const [token, setToken] = useState();

  const handleLogin = (value) =>  {
    setToken(value)
  }

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => <LandingPage token={token}/>}/>
        <Route path="/login" render={() => <LoginPage handleLogin={handleLogin}/>}/>
      </Switch>
    </div>
  );
}

export default App;
