import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { Switch, Route } from 'react-router-dom';
import EditProfile from './pages/EditProfile';
import Header from './components/Header';
import Home from './pages/Home';
import ClassProfile from './pages/ClassProfile';
import EditClasses from './pages/EditCourses';
import Login from './pages/Login';
import Register from './pages/Register';
import AddCourse from './pages/AddCourse';
import {
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  EDIT_CLASSES_ROUTE,
  EDIT_PROFILE_ROUTE,
  TEMP_COURSE_ROUTE,
} from './Routes';

const Container = styled.div``;

function App() {
  return (
    <Container>
      <Header />
      <Switch>
        <Route exact path={LOGIN_ROUTE} component={Login} />
        <Route exact path={REGISTER_ROUTE} component={Register} />
        <Route exact path={EDIT_PROFILE_ROUTE} component={EditProfile} />
        <Route exact path={EDIT_CLASSES_ROUTE} component={EditClasses} />
        <Route exact path={TEMP_COURSE_ROUTE} component={AddCourse} />
        <Route exact path="/" component={Home} />
        <Route path="/class" component={ClassProfile} /> */}
      </Switch>
    </Container>
  );
}

export default App;
