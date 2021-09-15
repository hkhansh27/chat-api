const http = require("http");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const userRouter = require("./router/user");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 8080;

app.use("/user", userRouter);

app.use((error, req, res, next) => {
  console.log("💥💥💥💥💥💥💥");
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});
const server = http.createServer(app);
server.listen(port);
server.on("listening", () => console.log("Listening on port ", port));
