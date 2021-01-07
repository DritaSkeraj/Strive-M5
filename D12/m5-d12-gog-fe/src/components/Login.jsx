import React, { Component } from "react";
import { Modal, Form, Button } from "react-bootstrap";

class Login extends Component {
  state = { userName: "", email: "" };

  handleInputChange = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    this.setState({ [name]: value });
  };

  handleLogin = (e) => {
    const { userName, email } = this.state;
    e.preventDefault();
    localStorage.setItem("name", userName);
    localStorage.setItem("email", email);
    console.log(localStorage.getItem("name"), localStorage.getItem("email"));
    this.setState({ userName: "", email: "" }, () => this.props.closeLogin());
  };

  render() {
    const { userName, email } = this.state;
    const { showLogin, closeLogin } = this.props;

    return (
      <Modal show={showLogin} onHide={closeLogin}>
        <Modal.Header closeButton className="border-0">
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.handleLogin}>
          <Modal.Body>
            <Form.Group controlId="loginForm">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="userName"
                value={userName}
                onChange={this.handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={this.handleInputChange}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="d-flex border-0">
            <Button
              variant="secondary"
              onClick={closeLogin}
              style={{ flex: "0 0 auto" }}
            >
              Close
            </Button>
            <Button
              type="submit"
              variant="primary"
              style={{ flex: "1 0 auto" }}
            >
              Sign in
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default Login;
