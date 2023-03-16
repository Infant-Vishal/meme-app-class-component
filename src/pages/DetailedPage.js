import React, { Component } from "react";
import { connect } from "react-redux";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { addFavMeme, deleteFavMeme } from "../redux/actions";
import NavbarComponent from "../components/Navbar";
import "../assets/css/memePage.css";

class DetailedPage extends Component {
  constructor(props) {
    super(props);
    this.handleFavMemes = this.handleFavMemes.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
  }

  handleFavMemes(e, meme) {
    e.preventDefault();
    const { favMemeArr, dispatch } = this.props;
    if (favMemeArr.some((element) => element.id === meme.id)) {
      dispatch(deleteFavMeme(meme));
    } else {
      dispatch(addFavMeme(meme));
    }
  }

  handleGoBack(e) {
    window.location.replace("/memes");
  }

  render() {
    const { favMemeArr, detailedPageMeme } = this.props;

    return (
      <div className="meme-page-bg">
        <NavbarComponent />
        <div>
          <div
            key={detailedPageMeme.id}
            className="d-flex flex-row justify-content-center"
          >
            <div className="img-wrapper">
              <img
                src={detailedPageMeme.url}
                alt={detailedPageMeme.name}
                className="meme-img"
              />
              <div
                type="button"
                className="fav-wrapper"
                onClick={(e) => this.handleFavMemes(e, detailedPageMeme)}
              >
                {favMemeArr.some(
                  (element) => element.id === detailedPageMeme.id
                ) ? (
                  <AiFillHeart color="red" fontSize="2em" />
                ) : (
                  <AiOutlineHeart color="white" fontSize="2em" />
                )}
              </div>
              <div className="meme-name slide-up">{detailedPageMeme.name}</div>
            </div>
          </div>
          <div className="d-flex flex-row justify-content-center">
            <button className="btn btn-info mt-4" onClick={this.handleGoBack}>
              Go back
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    favMemeArr: state.favMemeReducer.favMemeArr,
    detailedPageMeme: state.favMemeReducer.detailedPageMeme,
  };
};

export default connect(mapStateToProps)(DetailedPage);
