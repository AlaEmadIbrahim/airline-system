"use strict";

require("dotenv").config();
const port = process.env.PORT || 3000;
const io = require("socket.io-client");
let host = `http://localhost:${port}/airline`;

const systemConnection = io.connect(host);


// Listen to 'fligt'
systemConnection.emit("get_all");
systemConnection.on("flights", (flights) => {
  console.log(`Pilot:Sorry i didn't catch this flight ID${flights.id}`);
  systemConnection.emit("recived", flights);
});
 
systemConnection.on("new-flight", handlearrived);
systemConnection.on("new-flight", handletookoff);

function handlearrived(payload) {
  setTimeout(() => {
    payload.event = "arrived";
    payload.time = new Date();
    console.log(
      `Pilot: flight with ID '${payload.Details.flightID}' arrived`
    );
    systemConnection.emit("arrived", payload);
  }, 8000);
}

function handletookoff(payload) {
  setTimeout(() => {
    payload.event = "took-off";
    payload.time = new Date();
    console.log(`Pilot: flight with ID ‘${payload.Details.flightID}’ took-off`);
    systemConnection.emit("took-off", payload);
  }, 4000);
}