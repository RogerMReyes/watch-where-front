import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Card,Row, Modal,Table } from 'react-bootstrap';
import imgPlaceholder from './imgs/no-image-icon-23489.png';
import './Profile.css';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: this.props.auth0.user.nickname,
      data: [],
      showModal: false,
      selectedTitle: {},
      sD: [],
      hD: [],
      fourK: [],
    };
  }

  recommendation;

  async componentDidMount() {
    await this.getTitlesFromDB()
  }

  getTitlesFromDB = async() => {
    if (this.props.auth0.isAuthenticated) {
      const res = await this.props.auth0.getIdTokenClaims();
      const jwt = res.__raw;
      const config = {
        headers: { "Authorization": `Bearer ${jwt}` }
      }
      const url = `${process.env.REACT_APP_SERVER}/profileTitles`
      const response = await axios(url, config);
      this.setState({ data: response.data }, () => this.recommendation = this.recTitle());
    }
  }

  recTitle = () => {
    const randomTitleIdx = Math.floor(Math.random() * this.state.data.length);
    const randomTitle = this.state.data[randomTitleIdx];
    return (
      <Card className='profileRec' onClick={()=>this.showModal(randomTitle)}>
        <Card.Img variant="top" src={randomTitle.poster.includes('poster') ? randomTitle.poster : imgPlaceholder} />
        <Card.Body>
          <Card.Title>{randomTitle.title}</Card.Title>
          <Card.Text>Release: {randomTitle.releaseDate ? randomTitle.releaseDate : 'unknown'}</Card.Text>
        </Card.Body>
      </Card>
    )
  }

  showModal = async (selectedTitle) => {
      const sD = this.getSources('SD', selectedTitle);
      const hD = this.getSources('HD', selectedTitle);
      const fourK = this.getSources('4K', selectedTitle);
      this.setState({ showModal: true, selectedTitle: selectedTitle, sD: sD, hD: hD, fourK: fourK });
  }

  hideModal = () => {
    this.setState({ showModal: false });
  }

  getSources = (formatType, selectedTitle) => {
    const filteredList = selectedTitle.sources.filter(src => src.format === formatType);
    const formatList = filteredList.map(src => ({ name: src.name, webUrl: src.web_url }));
    const cleanList = [];
    const checkedSources = [];
    formatList.forEach(src => {
      if (!checkedSources.includes(src.name)) {
        cleanList.push(src);
        checkedSources.push(src.name);
      }
    });
    const srtList = cleanList.sort((a, b) => a.name.localeCompare(b.name));
    return srtList;
  }

  updateUsername = async (nickname) => {

  }

  render() {
    return (
      <div className='profile'>
        <div className='profile-top'>
          <div className='userInfo'>
            <h1>Profile:</h1>
            <h2>{this.state.nickname}</h2>
            <Button onClick={this.updateUsername}>Update</Button>
            <p>{this.props.auth0.user.email}</p>
          </div>
          <div className='recTitle'>
            <h2>Recommended:</h2>
            {this.state.data.length > 0 && this.recommendation}
          </div>
        </div>
        <div className='profile-bottom'>
          <h2>Favorites:</h2>
          <Row>
            {this.state.data.length > 0 &&
              this.state.data.map(obj =>
                <Card key={obj.movieId} style={{ width: '20rem', cursor: 'pointer' }} onClick={()=>this.showModal(obj)}>
                  <Card.Img variant="top" src={obj.poster.includes('poster') ? obj.poster : imgPlaceholder} />
                  <Card.Body>
                    <Card.Title>{obj.title}</Card.Title>
                    <Card.Text>Release: {obj.releaseDate ? obj.releaseDate : 'unknown'}</Card.Text>
                  </Card.Body>
                </Card>
              )
            }
          </Row>
        </div>
        <ProfileModal 
            showModal={this.state.showModal}
            hideModal={this.hideModal}
            selectedTitle={this.state.selectedTitle}
            sD={this.state.sD}
            hD={this.state.hD}
            fourK={this.state.fourK}
            auth0={this.props.auth0}
            getTitlesFromDB={this.getTitlesFromDB}
          />
      </div>
    );
  }
}

class ProfileModal extends React.Component {

  handleRemove = async (selectedTitle) => {
    if (this.props.auth0.isAuthenticated) {
      const res = await this.props.auth0.getIdTokenClaims();
      const jwt = res.__raw;
      const config = {
        headers: { "Authorization": `Bearer ${jwt}` }
      }
      const url = `${process.env.REACT_APP_SERVER}/titleInfo/${selectedTitle._id}`
      await axios.delete(url, config);
      this.props.getTitlesFromDB();
      this.props.hideModal();
    }
  }

  render() {
    return (
      <Modal dialogClassName='modalBox' show={this.props.showModal} onHide={this.props.hideModal}>
        <Modal.Header>
          <Modal.Title>{this.props.selectedTitle.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img className="modal-poster" src={this.props.selectedTitle.poster} alt={this.props.selectedTitle.title} />
          {`Overview: ${this.props.selectedTitle.description}`}
        </Modal.Body>
        <Modal.Body style={{ flexDirection: 'column' }}>
          <p><strong>Release Date: </strong> {this.props.selectedTitle.releaseDate}</p>
          <p><strong>User Rating: </strong> {this.props.selectedTitle.userRating}</p>
        </Modal.Body>
        <Modal.Body>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Format</th>
                <th>Sources</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>SD</td>
                <td>{this.props.sD.map((src,idx) => <a key={idx} href={src.webUrl}>{src.name},</a>)}</td>
              </tr>
              <tr>
                <td>HD</td>
                <td>{this.props.hD.map((src,idx) => <a key={idx} href={src.webUrl}>{src.name},</a>)}</td>
              </tr>
              <tr>
                <td>4k</td>
                <td>{this.props.fourK.map((src,idx) => <a key={idx} href={src.webUrl}>{src.name},</a>)}</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          {this.props.auth0.isAuthenticated &&
            <Button variant="danger" onClick={() => this.handleRemove(this.props.selectedTitle)}>
              Remove
            </Button>
          }
          <Button variant="secondary" onClick={this.props.hideModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default withAuth0(Profile);