import React, { memo } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const getZipCode = (zip) => {
    console.warn(zip.target.value)
};

const UserInput = memo(() => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>What's the temperature?</Form.Label>
        <Form.Control type="entry" 
                      placeholder="Enter Zip Code"
                      onChange={getZipCode}/>
        <Form.Text className="text-muted">
          Please enter a Postal / Zip Code.
        </Form.Text>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
});

export default UserInput;
