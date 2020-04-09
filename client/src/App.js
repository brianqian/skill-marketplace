import React from 'react';
import styled from 'styled-components/macro';
import { Switch, Route } from 'react-router-dom';
import EditProfile from './pages/EditProfile';
import Header from './components/Header';
import Home from './pages/Home';
import ClassProfile from './pages/ClassProfile';
import Login from "./pages/Login";
import Register from "./pages/Register"

const Container = styled.div``;

function App() {
  return (
    <Container>
      <Header />
      <Switch>
        <Route exact path="/profile" component={EditProfile} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Home} />
        <Route path="/class" component={ClassProfile} />
      </Switch>
    </Container>
  );
}

export default App;
