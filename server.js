// server.js
const net = require("net");
const fs = require('fs');
const PORT = 3000;
const server = net.createServer();

server.on("connection",(client) => {
  console.log("New client connected!");
  client.setEncoding("utf8"); // interpret data as text
  client.write("Server message: Welcome to the server!");

  client.on("data", (message) => {
    console.log("Message from client: ",message);

    if (message.startsWith('fileName ')) {

      let file = message.split(' ')[1];
      file = file.replace(/\r|\n/ig,"");
      console.log(`what we got from client: ${file}`);
      fs.readFile(`./${file}`,'utf-8',(err,data) => {
        client.write(`Reading the file named: ${file}`);
        client.write(data);
      });
    }
  });
});

server.listen(PORT, function() {
  console.log(`Server is on at port: ${PORT}.`);
});
