import React from "react";
import SearchForm from "./SearchForm";
import TitleCards from "./TitleCards";

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
        <TitleCards titleData={this.state.titleData} />
      </>
    )
  }
}

export default Home;