import React from 'react';
import { Card, Modal, Button, Row, Table } from 'react-bootstrap';
import axios from 'axios';
import imgPlaceholder from './imgs/no-image-icon-23489.png';
import './TitleCards.css';

class TitleCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      selectedTitle: {},
      sD: '',
      hD: '',
      fourK: '',
    }
  }

  showModal = async (movieId) => {
    const url = `${process.env.REACT_APP_SERVER}/titleInfo?titleID=${movieId}`;
    const response = await axios.get(url);
    const sD = this.getSources('SD', response.data);
    const hD = this.getSources('HD', response.data);
    const fourK = this.getSources('4K', response.data);
    this.setState({ showModal: true, selectedTitle: response.data, sD: sD, hD: hD, fourK: fourK });
  }

  hideModal = () => {
    this.setState({ showModal: false });
  }

  getSources = (formatType, selectedTitle) => {
    const filteredList = selectedTitle.sources.filter(src => src.format === formatType);
    const formatList = filteredList.map(src => src.name);
    const cleanList = [...new Set(formatList.sort())];
    const srcString = cleanList.join(', ');
    return srcString;
  }

  render() {
    return (
      <div className='titles'>
        <Row>
          {this.props.titleData.length > 0 &&
            this.props.titleData.map(obj =>
              <Card key={obj.movieId} style={{ width: '14rem' }} onClick={() => this.showModal(obj.movieId)}>
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
          />
        </Row>
      </div>
    )
  }
}

class TitleModal extends React.Component {

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
                <td>{this.props.sD}</td>
              </tr>
              <tr>
                <td>HD</td>
                <td>{this.props.hD}</td>

              </tr>
              <tr>
                <td>4k</td>
                <td>{this.props.fourK}</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={this.props.hideModal}>
            Add to Favorites
          </Button>
          <Button variant="secondary" onClick={this.props.hideModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default TitleCards;