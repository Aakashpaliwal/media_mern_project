import "./App.css";
import { Container, AppBar, Grow, Grid, Typography } from "@material-ui/core";
import Form from "./components/Form/Form";
import { useEffect, useState } from "react";
import { getPosts } from "./actions/posts";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

function App(props) {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
