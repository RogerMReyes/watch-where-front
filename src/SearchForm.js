import React from "react";
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import './SearchForm.css';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTitle: '',
    }
  }

  componentDidUpdate() {
    const element = document.getElementById('titles');
    element.scrollIntoView({behavior:"smooth"});
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_SERVER}/getTitles?searchQuery=${this.state.searchTitle}`
    const response = await axios.get(url);
    this.props.updateTitleData(response.data);
    // const element = document.getElementById('titles');
    // element.scrollIntoView({behavior:"smooth"});
  }

  render() {
    return (
      <div className="searchBox">
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <Row className="formRow">
              <Col>
                <Form.Group >
                  <Form.Label>Any show, Any where, Any Time</Form.Label>
                  <Form.Control type="text" placeholder="Search any title..." onChange={(e) => this.setState({ searchTitle: e.target.value })} />
                </Form.Group>
              </Col>
              <Col sm={2}>
                <Button type="submit">Search</Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    )
  }
}

export default SearchForm;