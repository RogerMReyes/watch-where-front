import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';
import './Profile.css';
import axios from 'axios';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: this.props.auth0.user.nickname,
      data: []
    };
  }

  async componentDidMount() {
    if (this.props.auth0.isAuthenticated) {
      const res = await this.props.auth0.getIdTokenClaims();
      const jwt = res.__raw;
      const config = {
        headers: { "Authorization": `Bearer ${jwt}` }
      }
      const url = `${process.env.REACT_APP_SERVER}/profileTitles`
      const response = await axios(url, config);
      this.setState({ data: response.data });
    }
  }

  render() {
    return (
      <>
        <div>
          <h1>Profile</h1>
          <h2 style={{ display: 'inline' }}>{this.state.nickname}</h2><Button>Update</Button>
          <p>{this.props.auth0.user.email}</p>
        </div>
        <div>
        </div>
      </>
    );
  }
}

export default withAuth0(Profile);