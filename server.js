const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();

// db 
const db = require('./models');
// or prod mode
// db.sequelize.sync()
// db.sequelize.sync({force: true}).then(() => {
//     console.log("Drop and Resync the Db");
// });

var corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(
    session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
  );
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Enxhi's application." });
});

// routes
require('./routes/auth.routes.js')(app);
require('./routes/user.routes.js')(app);
const PORT = process.env.PORT || 8080;

// set port, listen for requests
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
      );
    });
  });