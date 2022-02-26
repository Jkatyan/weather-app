import React, { Component } from "react";
import "./App.css";

import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";

class App extends Component {
  state = {
    visible: false
  };

  toggle() {
    this.setState({
      visible: !this.state.visible
    });
  }

  getZipCode(zip) {
    /*
    axios.get()
    .then(response => {
        console.log(reponse)
    })
    .catch(error => {
        console.log(error)
    })
    */
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>What's the temperature?</Form.Label>
                <Form.Control
                  type="entry"
                  placeholder="Enter Zip Code"
                  onChange={this.getZipCode}
                />
                <Form.Text className="text-muted">
                  Please enter a Postal / Zip Code.
                </Form.Text>
              </Form.Group>

              <Button variant="primary"
                      type="button"
                      onClick={this.toggle.bind(this)}>
                Submit
              </Button>
            </Form>
          </>
          <br />
          <Alert
            variant="info"
            show={this.state.visible}
            onClose={this.toggle.bind(this)}
            dismissible>
            <Alert.Heading>Temperature:</Alert.Heading>
            <p>
              Current Temperature Here!
            </p>
          </Alert>
        </header>
      </div>
    );
  }
}

export default App;
