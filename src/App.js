import React, { Component } from "react";
import "./App.css";

import axios from "axios";
import { Form, Button } from "react-bootstrap";

class App extends Component {
  state = {
    zip_code: "",
    temperature: 0,
    checked: "Fahrenheit",
    checked_final: "",
  };

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

  setFahrenheit() {
    this.setState({
      checked: "Fahrenheit",
    });
  }

  setCelsius() {
    this.setState({
      checked: "Celsius",
    });
  }

  setCheckedFinal() {
    this.setState({
      checked_final: this.state.checked,
    });
  }

  getTemperature() {
    axios
      .get("/locations/" + this.state.zip_code + "?scale=" + this.state.checked)
      .then((response) => {
        console.log(response)
        this.setCheckedFinal()
        this.setTemperature(response.data.temperature)
      })
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
          <br />
          <p>The temperature is: <b>{this.state.temperature} {this.state.checked_final}</b></p>
        </header>
      </div>
    );
  }
}

export default App;
