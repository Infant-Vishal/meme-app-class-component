import React, { Component } from "react";
import axios from "axios";
import { Container, Row } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import NavbarComponent from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import MemeCard from "../components/MemeCard";
import "../assets/css/memePage.css";

class MemePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memeData: [],
      filteredMemeData: [],
      loading: true,
    };
  }

  getMemeData = async () => {
    try {
      const response = await axios.get("https://api.imgflip.com/get_memes");
      this.setState({
        loading: false,
        memeData: response.data.data.memes,
      });
    } catch (err) {
      toast.error(`${err.message}`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  componentDidMount() {
    this.getMemeData();
  }

  outputData = () => {
    const { filteredMemeData, memeData } = this.state;
    if (filteredMemeData.length === 0) {
      return memeData;
    } else {
      return filteredMemeData;
    }
  };

  render() {
    const { loading, filteredMemeData } = this.state;

    return (
      <div className="meme-page-bg">
        <ToastContainer />
        <NavbarComponent />
        <SearchBar
          memeData={this.state.memeData}
          setFilteredMemeData={(data) =>
            this.setState({ filteredMemeData: data })
          }
          filteredMemeData={this.state.filteredMemeData}
        />
        <div>
          {loading ? <div>Loading...</div> : null}
          {filteredMemeData[0] === "No data" ? (
            <div className="text-center mt-5">
              <h3>No Data Found</h3>
            </div>
          ) : (
            <Container>
              <Row>
                {this.outputData().map((meme) => {
                  return <MemeCard meme={meme} key={meme.id} />;
                })}
              </Row>
            </Container>
          )}
        </div>
      </div>
    );
  }
}

export default MemePage;
