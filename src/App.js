import React from "react";
import "./assets/css/App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products";
import Details from "./components/Details";
import DondeEstamos from "./components/DondeEstamos";
import Gestor from "./components/Gestor";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/home" component={Home}></Route>
      <Route path="/dondeEstamos" component={DondeEstamos}></Route>
      <Route path="/productos" component={Products}></Route>
      <Route path="/details/:id" component={Details}></Route>
      <Route path="/gestor" component={Gestor}></Route>
    </Switch>
  );
}

export default App;
