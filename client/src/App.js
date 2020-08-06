import React from "react";
import { useParams, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { ProvideAuth } from "./utils/use-auth.js";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/Login";
import Profile from "./pages/Profile";

import "./App.css";
function ProfileWrapper() {
  const { name } = useParams();
  return <Profile username={name} />;
}

function App() {
  return (
    <div className="App" >
      <ProvideAuth>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/profile/:name" component={ProfileWrapper} />
          <Route component={NotFound} />
        </Switch>
      </Router>
      </ProvideAuth>
    </div>
  );
}

export default App;
