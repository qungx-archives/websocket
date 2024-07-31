const http = require("http");
const WebSocketServer = require("websocket").server;
let connection = null;

// Create a HTTP Server to receive request
const httpserver = http.createServer((req, res) => {
  console.log("we have received a request");
});

// create a websocket
const websocket = new WebSocketServer({
  "httpServer": httpserver
});

websocket.on("request", request => {
  connection = request.accept(null, request.origin);
  connection.on("onopen", () => console.log("Opened!"));
  connection.on("onclose", () => console.log("Closed!"));
  connection.on("onmessage", message => {
    console.log(`Received message ${message}`)
  });
});

httpserver.listen(8081, () =>
  console.log("My server is listening on port 8081"),
);