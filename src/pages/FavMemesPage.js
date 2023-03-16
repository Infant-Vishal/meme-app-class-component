import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row } from "react-bootstrap";
import NavbarComponent from "../components/Navbar";
import MemeCard from "../components/MemeCard";
import "../assets/css/memePage.css";

class FavMemesPage extends Component {
  render() {
    const { favMemeArr } = this.props;

    return (
      <div className="meme-page-bg">
        <NavbarComponent />
        <Container>
          <Row>
            {favMemeArr.map((meme) => {
              return <MemeCard meme={meme} key={meme.id} />;
            })}
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    favMemeArr: state.favMemeReducer.favMemeArr,
  };
};

export default connect(mapStateToProps)(FavMemesPage);
