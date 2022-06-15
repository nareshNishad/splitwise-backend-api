//import the require dependencies
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var cors = require("cors");
var apiRoutes = require("./api");

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/api", apiRoutes);

//use cors to allow cross origin resource sharing
// app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

const db = require("./models");
db.sequelize.sync();

// Setup an express server and define port to listen all incoming requests for this application
const setUpExpress = () => {
  const port = process.env.APP_PORT || 3001;

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};

setUpExpress();
