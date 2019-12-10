const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const users = require('./routes/api/users');
const messages = require('./routes/api/messages');
const User = require('./models/User');
const bodyParser = require('body-parser');


mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));


// app will respond to postman
app.use(bodyParser.urlencoded({
  extended: false
}));

// app will respond to json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send("Hello World");
});

app.use("/api/users", users);
app.use("/api/messages", messages);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})