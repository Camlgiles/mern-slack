const express = require("express");
const router = express.Router();
const passport = require('passport');
const validateMessageInput = require('../../validation/messages');
const Message = require('../../models/Messages');

// test route
router.get("/test", (req, res) => {
  res.json({ msg: "This is the message route" });
});

// message index
router.get("/", (req, res) => {
  Message
    .find()
    .sort({ date: -1 })
    .then(messages => res.json(messages))
    .catch(err => res.status(400).json(err));
});

// all messages from one user
router.get("/user/:user_id", (req, res) => {
  Message
    .find({ user: req.params.user_id })
    .sort({ date: -1 })
    .then(messages => res.json(messages))
    .catch(err => res.status(400).json(err));
});

// find specific message
router.get("/:id", (req, res) => {
  Message
    .findById(req.params.id)
    .then(message => res.json(message))
    .catch(err => res.status(400).json(err));
});

// post new message
router.post("/", 
  passport.authenticate('jwt', { session: false }), 
  (req, res) => {
    const {isValid, errors} = validateMessageInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newMessage = new Message({
      user: req.user.id,
      text: req.body.text
    });

    newMessage
      .save()
      .then(message => res.json(message));
  }
);

module.exports = router;
