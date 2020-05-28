const express = require("express");
const bodyParser = require("body-parser");
// const cors = require("cors");

const app = express();
const dbConfig = require("./app/config/db.config");
// var corsOptions = {
//   origin: "localhost:9001",

// };

// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to node application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



const db = require("./app/models");
const Role = db.role;
const ROLES = db.ROLES;
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require("./app/routes/product.routes")(app);
require("./app/routes/category.routes")(app);
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      ROLES.map(function (role, i) {
        new Role({
          name: role
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log(`added ${role} to roles collection`);
        });
      })
    }
  });
}