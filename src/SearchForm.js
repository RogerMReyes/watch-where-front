import React from "react";
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import axios from "axios";

class SearchForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchTitle: '',
    }
  }

  handleSubmit = async(e) =>{
    e.preventDefault();
    const url = `${process.env.REACT_APP_SERVER}/getTitles?searchQuery=${this.state.searchTitle}`
    const response = await axios.get(url);
    this.props.updateTitleData(response.data);
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Row className="align-items-center">
            <Col>
              <Form.Group>
                <Form.Control type="text" placeholder="Search any title..." onChange={(e)=>this.setState({searchTitle: e.target.value})}/>
              </Form.Group>
            </Col>
            <Col sm={2}>
              <Button type="submit">Search</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    )
  }
}

export default SearchForm;