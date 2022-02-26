import React, { Component } from "react";
import "./App.css";

import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";

class App extends Component {

  state = {
    visible: false,
    zip_code: '',
    api_key: 'a69a12410c5c4afe27ab1395d005f0be'
  };

  toggle() {
    this.setState({
      visible: !this.state.visible
    });
  }

  createURL() {
    return (
      'https://api.openweathermap.org/data/2.5/weather?zip=' + this.state.zip_code
                                              + ',us&appid=' + this.state.api_key
    );
  }
  
  setZipCode(val) {
    this.setState({
      zip_code: val.target.value
    });
  }

  getZipCode() {
    axios.get(this.createURL())
    .then(response => {
        console.log(response)
    })
    .catch(error => {
        console.log(error)
    })
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
                  onChange={this.setZipCode.bind(this)}
                />
                <Form.Text className="text-muted">
                  Please enter a Postal / Zip Code.
                </Form.Text>
              </Form.Group>

              <Button variant="primary"
                      type="button"
                      onClick={this.getZipCode.bind(this)}>
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
