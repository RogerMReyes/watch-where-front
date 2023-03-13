import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import Profile from './Profile';
import About from './About';
import { withAuth0 } from '@auth0/auth0-react';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Header />
        <Routes>
          <Route
            exact path="/"
            element={<Home />}
          >
          </Route>
          <Route
            path='/Profile'
            element={this.props.auth0.isAuthenticated && <Profile />}>
          </Route>
          <Route
            path='/About'
            element={<About />}
          >
          </Route>
        </Routes>
        <Footer />
      </Router>
    )
  }
}

export default withAuth0(App);
