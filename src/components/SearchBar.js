import React, { Component } from "react";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInputVal: "",
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch() {
    const { memeData, setFilteredMemeData } = this.props;
    const searchResult = memeData.filter((meme) =>
      meme.name.toLowerCase().includes(this.state.searchInputVal.toLowerCase())
    );

    if (searchResult.length !== 0) {
      setFilteredMemeData(searchResult);
    } else {
      setFilteredMemeData(["No data"]);
    }
  }

  render() {
    return (
      <div>
        <div className="d-flex flex-row justify-content-center mt-5">
          <input
            type="search"
            className="form-control w-75 me-4"
            placeholder="Search by Meme Name"
            onChange={(e) => this.setState({ searchInputVal: e.target.value })}
          />
          <button className="btn btn-success" onClick={this.handleSearch}>
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default SearchBar;
