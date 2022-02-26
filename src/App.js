import React, { Component } from "react";
import "./App.css";

import axios from "axios";
import { Form, Button } from "react-bootstrap";

class App extends Component {
  state = {
    zip_code: "",
    temperature: 0,
    valid_response: false,
    checked: "Fahrenheit",
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
      temperature: val,
    });
  }

  setValidResponse(val) {
    this.setState({
      valid_response: val,
    });
  }

  setFahrenheit(val) {
    this.setState({
      checked: "Fahrenheit",
    });
  }

  setCelsius(val) {
    this.setState({
      checked: "Celsius",
    });
  }

  getTemperature() {
    axios
      .get(this.createURL())
      .then((response) => {
        console.log(response);
        this.setValidResponse(true);
        this.setTemperature(response.data.main.temp);
      })
      .catch((error) => {
        this.setValidResponse(false);
        console.log(error);
      });
  }

  getFahrenheit(temp) {
    return 1.8 * (temp - 273.15) + 32;
  }

  getCelsius(temp) {
    return temp - 273.15;
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <Form>
            {/* Text Input */}
            <Form.Group className="mb-3">
              <Form.Label>What's the temperature?</Form.Label>
              <Form.Control
                placeholder="Enter Zip Code"
                onChange={this.setZipCode.bind(this)}
              />
              <Form.Text className="text-muted">
                Please enter a valid Zip Code.
              </Form.Text>
            </Form.Group>

            {/* Select Type */}
            <Form.Group>
              <Form.Check
                type={"radio"}
                label={`Fahrenheit`}
                checked={this.state.checked === "Fahrenheit"}
                onChange={this.setFahrenheit.bind(this)}
              />
              <Form.Check
                type={"radio"}
                label={`Celsius`}
                checked={this.state.checked === "Celsius"}
                onChange={this.setCelsius.bind(this)}
              />
            </Form.Group>
            <br />
            {/* Submit Button */}
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
