import React, { Component } from "react";
import { Card } from "react-bootstrap";
import * as yup from "yup";
import _ from "lodash";
import { toast, ToastContainer } from "react-toastify";
import "../../assets/css/loginPage.css";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.loginCredentials = {
      email: "infantvishal@gmail.com",
      password: "qwerty123",
    };
    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const values = { email, password };
    const validationSchema = yup.object({
      email: yup
        .string()
        .email("Please enter the valid email")
        .required("Please enter the valid email"),
      password: yup.string().required("Please enter the valid password"),
    });
    const isValid = validationSchema.isValidSync(values);
    if (isValid && _.isEqual(values, this.loginCredentials)) {
      localStorage.setItem("memePageLoggedIn", true);
      toast.success("Updated successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      window.location.replace("/memes");
    } else {
      toast.error("Invalid crendentials", {
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

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div className="login-overall-bg">
        <ToastContainer />
        <Card style={{ width: "30rem" }}>
          <Card.Body>
            <Card.Title className="text-center">Login</Card.Title>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  type="text"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Enter your Email Address"
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Enter your Password"
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default LoginPage;
