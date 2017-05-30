var db = require("../models");

module.exports = function(app) {

// POST route for creating a new user
  app.post("/api/newuser", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.Users.create({
      userName: req.body.userName,
      teamName: req.body.teamName
    }).then(function(dbUser) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(dbUser);
    });
  });


};

