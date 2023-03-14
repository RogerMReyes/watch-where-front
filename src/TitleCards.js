import React from 'react';
import { Card, Modal, Button, Row, Table, Alert } from 'react-bootstrap';
import axios from 'axios';
import imgPlaceholder from './imgs/no-image-icon-23489.png';
import { withAuth0 } from '@auth0/auth0-react';
import './TitleCards.css';

class TitleCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      selectedTitle: {},
      sD: [],
      hD: [],
      fourK: [],
    }
  }

  showModal = async (movieId) => {
    if (this.props.auth0.isAuthenticated) {
      const res = await this.props.auth0.getIdTokenClaims();
      const jwt = res.__raw;
      const config = {
        headers: { "Authorization": `Bearer ${jwt}` }
      }
      const url = `${process.env.REACT_APP_SERVER}/titleInfo?titleID=${movieId}`;
      const response = await axios.get(url, config);
      const sD = this.getSources('SD', response.data);
      const hD = this.getSources('HD', response.data);
      const fourK = this.getSources('4K', response.data);
      this.setState({ showModal: true, selectedTitle: response.data, sD: sD, hD: hD, fourK: fourK });
    }
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

  render() {
    return (
      <div id='titles'>
        <Row>
          {this.props.titleData.length > 0 &&
            this.props.titleData.map(obj =>
              <Card key={obj.movieId} style={{ width: '14rem', cursor: 'pointer' }} onClick={() => this.showModal(obj.movieId)}>
                <Card.Img variant="top" src={obj.image_url.includes('poster') ? obj.image_url : imgPlaceholder} />
                <Card.Body>
                  <Card.Title>{obj.title}</Card.Title>
                  <Card.Text>Release: {obj.year ? obj.year : 'unknown'}</Card.Text>
                </Card.Body>
              </Card>
            )
          }
          <TitleModal
            showModal={this.state.showModal}
            hideModal={this.hideModal}
            selectedTitle={this.state.selectedTitle}
            sD={this.state.sD}
            hD={this.state.hD}
            fourK={this.state.fourK}
            auth0={this.props.auth0}
          />
        </Row>
      </div>
    )
  }
}

class TitleModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
    }
  }

  handleDismiss() {
    this.setState({ showAlert: false });
  }

  handleShow() {
    this.setState({ showAlert: true });
  }

  handleFav = async () => {
    if (this.props.auth0.isAuthenticated) {
      const res = await this.props.auth0.getIdTokenClaims();
      const jwt = res.__raw;
      const config = {
        headers: { "Authorization": `Bearer ${jwt}` }
      }
      const url = `${process.env.REACT_APP_SERVER}/titleInfo`;
      axios.post(url, this.props.selectedTitle, config);
      this.setState({ showAlert: true });
    }
  };

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
                <td>{this.props.sD.map((src, idx) => <a key={idx} href={src.webUrl}>{src.name},</a>)}</td>
              </tr>
              <tr>
                <td>HD</td>
                <td>{this.props.hD.map((src, idx) => <a key={idx} href={src.webUrl}>{src.name},</a>)}</td>
              </tr>
              <tr>
                <td>4k</td>
                <td>{this.props.fourK.map((src, idx) => <a key={idx} href={src.webUrl}>{src.name},</a>)}</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Alert show={this.state.showAlert} variant="success" onClose={this.handleDismiss}>
            <p>Title added Successfully!</p>
          </Alert>
          {this.props.auth0.isAuthenticated &&
            <Button variant="success" onClick={this.handleFav}>
              Add to Favorites
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

export default withAuth0(TitleCards);