const express = require("express");
const router = express.Router();
const passport = require('passport');
const validateMessageInput = require('../../validation/messages');
const Message = require('../../models/Messages');

router.get("/test", (req, res) => {
  res.json({ msg: "This is the message route" });
});

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
