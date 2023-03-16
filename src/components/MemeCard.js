import React, { Component } from "react";
import { connect } from "react-redux";
import { Col } from "react-bootstrap";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { addFavMeme, deleteFavMeme, detailedPageMeme } from "../redux/actions";
import "../assets/css/memePage.css";

class MemeCard extends Component {
  constructor(props) {
    super(props);

    this.handleDetailedPage = this.handleDetailedPage.bind(this);
    this.handleFavMemes = this.handleFavMemes.bind(this);
  }

  handleDetailedPage(e, meme) {
    e.preventDefault();
    const { dispatch } = this.props;
    if (e.target.nodeName === "IMG") {
      dispatch(detailedPageMeme(meme));
      window.location.replace("/detailed_page");
    }
  }

  handleFavMemes(e, meme) {
    const { dispatch, favMemeArr } = this.props;
    e.preventDefault();
    if (favMemeArr.some((element) => element.id === meme.id)) {
      dispatch(deleteFavMeme(meme));
    } else {
      dispatch(addFavMeme(meme));
    }
  }

  render() {
    const { meme, favMemeArr } = this.props;
    return (
      <Col lg={6}>
        <div
          className="d-flex flex-row justify-content-center"
          onClick={(e) => this.handleDetailedPage(e, meme)}
        >
          <div className="img-wrapper">
            <img src={meme.url} alt={meme.name} className="meme-img" />
            <div
              type="button"
              className="fav-wrapper"
              onClick={(e) => this.handleFavMemes(e, meme)}
            >
              {favMemeArr.some((element) => element.id === meme.id) ? (
                <AiFillHeart color="red" fontSize="2em" />
              ) : (
                <AiOutlineHeart color="white" fontSize="2em" />
              )}
            </div>
            <div className="meme-name slide-up">{meme.name}</div>
          </div>
        </div>
      </Col>
    );
  }
}

const mapStateToProps = (state) => ({
  favMemeArr: state.favMemeReducer.favMemeArr,
});

export default connect(mapStateToProps)(MemeCard);
