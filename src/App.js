import React, { Component } from "react";
import "./App.css";

import axios from "axios";
import { Form, Button } from "react-bootstrap";

class App extends Component {
  state = {
    zip_code: "",
    temperature: 0,
    api_key: "a69a12410c5c4afe27ab1395d005f0be",
  };

  createURL() {
    return (
      "https://api.openweathermap.org/data/2.5/weather?zip=" +
      this.state.zip_code +
      ",us&appid=" +
      this.state.api_key
    );
  }

  setZipCode(val) {
    this.setState({
      zip_code: val.target.value,
    });
  }

  setTemperature(val) {
    this.setState({
      temperature: val
    });
  }

  getTemperature() {
    axios
      .get(this.createURL())
      .then((response) => {
        console.log(response);
        this.setTemperature(response.data.main.temp);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getFahrenheit(temp) {

  }

  getCelsius(temp) {

  }

  render() {
    return (
      <div>
        <header className="App-header">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>What's the temperature?</Form.Label>
              <Form.Control
                placeholder="Enter Zip Code"
                onChange={this.setZipCode.bind(this)}
              />
              <Form.Text className="text-muted">
                Please enter a Postal / Zip Code.
              </Form.Text>
            </Form.Group>

            <Button
              variant="primary"
              type="button"
              onClick={this.getTemperature.bind(this)}
            >
              Get Temperature
            </Button>
          </Form>
        </header>
      </div>
    );
  }
}

export default App;
