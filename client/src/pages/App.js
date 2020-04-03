import React from 'react';
import styled from 'styled-components/macro';
import EditProfile from './EditProfile';
import Header from '../components/Header';
import Home from './Home';
import { Switch, Route } from 'react-router-dom';
import ClassProfile from './ClassProfile';

const Container = styled.div``;

function App() {
  return (
    <Container>
      <Header />
      <Switch>
        <Route exact path="/profile" component={EditProfile} />
        <Route exact path="/" component={Home} />
        <Route path="/class" component={ClassProfile} />
      </Switch>
    </Container>
  );
}

export default App;
