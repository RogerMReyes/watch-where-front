import React from "react";
import { Card, Container, Row } from "react-bootstrap";

import SearchForm from "./SearchForm";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleData: []
    }
  }

  updateTitleData = (data) => this.setState({ titleData: data })

  render() {
    return (
      <>
        <SearchForm updateTitleData={this.updateTitleData} />
        <Container>
          <Row>
          {this.state.titleData.length > 0 &&
            this.state.titleData.map(obj =>
              <Card key={obj.movieId} style={{ width: '18rem' }}>
                <Card.Img variant="top" src={obj.image_url} />
                <Card.Body>
                  <Card.Title>{obj.title}</Card.Title>
                  <Card.Text>Release: {obj.year}</Card.Text>
                </Card.Body>
              </Card>
            )
          }
          </Row>
        </Container>
      </>
    )
  }
}

export default Home;