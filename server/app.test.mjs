import axios from "axios";

describe("GET /", () => {
    test("Missing Zip Code", async () => {
      var testResponse = "";
      var testStatus = 0;
      await axios
        .get("http://localhost:3000/")
        .catch((error) => {
          testResponse = error.response.data;
          testStatus = error.response.status;
        });
      expect(testResponse).toBe("Please specify a location.");
      expect(testStatus).toBe(400);
    });
});

describe("GET /locations", () => {
    test("Missing Zip Code", async () => {
      var testResponse = "";
      var testStatus = 0;
      await axios
        .get("http://localhost:3000/locations")
        .catch((error) => {
          testResponse = error.response.data;
          testStatus = error.response.status;
        });
      expect(testResponse).toBe("Please specify a location.");
      expect(testStatus).toBe(400);
    });
});

describe("GET /locations/:zipcode", () => {
  test("Valid Zip Code", async () => {
    var testResponse = "";
    var testStatus = 0;
    await axios
      .get("http://localhost:3000/locations/01748")
      .then((response) => {
        testResponse = response.data.scale;
        testStatus = response.status;
      });
    expect(testResponse).toBe("Fahrenheit");
    expect(testStatus).toBe(200);
  });

  test("Valid Zip Code, Valid Scale", async () => {
    var testResponse = "";
    var testStatus = 0;
    await axios
      .get("http://localhost:3000/locations/01748?scale=Celsius")
      .then((response) => {
        testResponse = response.data.scale;
        testStatus = response.status;
      });
    expect(testResponse).toBe("Celsius");
    expect(testStatus).toBe(200);
  });

  test("Valid Zip Code, Invalid Scale", async () => {
    var testResponse = "";
    var testStatus = 0;
    await axios
      .get("http://localhost:3000/locations/01748?scale=ABCD")
      .then((response) => {
        testResponse = response.data.scale;
        testStatus = response.status;
      });
    expect(testResponse).toBe("Fahrenheit");
    expect(testStatus).toBe(200);
  });

  test("Invalid Zip Code", async () => {
    var testResponse = "";
    var testStatus = 0;
    await axios.get("http://localhost:3000/locations/00000").catch((error) => {
      testResponse = error.response.data;
      testStatus = error.response.status;
    });
    expect(testResponse).toBe("Please enter a valid Zip Code.");
    expect(testStatus).toBe(400);
  });
});
