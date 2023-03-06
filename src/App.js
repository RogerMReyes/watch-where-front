import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';

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
        </Routes>
        <Footer />
      </Router>
    )
  }
}

export default App;
