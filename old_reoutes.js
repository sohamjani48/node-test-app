const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      `<body><h1>It's me Delightful Lodu</h1><h1><form action="/message" method="POST"><input type="text" name="inputMessage"/><button type="submit">Send</button></form></h1></body>`
    );
    res.write("</html>");
    return res.end(); //end the response as if we don't dp this it will give error in next res.write
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First page</title></head>");
  res.write("<body><h1>Hello from Node.js server</h1></body>");
  res.write("</html>");
  res.end();

  // res.write(); //this will give error as we can't change the response once we write it

  // process.exit();  //To terminate the server
};

module.exports = {
  handler: requestHandler,
  someText: "Some hardcoded text",
};
