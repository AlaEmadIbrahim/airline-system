"use strict";
require("dotenv").config();
const port = process.env.PORT || 3000;
const { faker } = require("@faker-js/faker");
const uuid = require("uuid").v4;
const io = require("socket.io-client");
let host = `http://localhost:${port}/`;

const systemConnection = io.connect(host);

const time = new Date();
const airlines = "Royal Jordanian Airlines";
const destination = `${faker.address.city()} , ${faker.address.countryCode()}`; 
const pilot = faker.name.findName();
const flightID = uuid();

setInterval(() => {
  let flight = {
    event: "new-flight",
    time,
    Details: {
      airlines,
      destination,
      pilot,
      flightID,
    },
  };

  console.log(
    `Manager : a new flight with ${flight.Details.flightID} has been scheduled`
  );
  systemConnection.emit("new-flight", flight);
}, 10000);

setTimeout(() => {
  systemConnection.on("arrived", flightArrived);

  function flightArrived(payload) {
    console.log(
      `Manager : we’re greatly thankful for the amazing flight, ${payload.Details.pilot} `
    );
  }
}, 8000);
