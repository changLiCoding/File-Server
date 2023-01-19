
// client.js
const net = require("net");
const PORT = 3000;
const conn = net.createConnection({
  host: "localhost",
  port: PORT,
});
conn.setEncoding("utf8");

process.stdin.on('data', (message) => {
  conn.write(`${message}`);
});

conn.on("connect", () => {
  conn.write("Client is connected to the Server!");
});

conn.on("data", (data) => {
  console.log("Server says: ", data);
});
