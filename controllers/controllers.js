/// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var models= require("../models");
var express = require('express');
var router = express.Router();
// ===============================================================================
// ROUTING
// ===============================================================================


//To select distinct team names
models.Users.aggregate('teamName', 'DISTINCT', { plain: false }).then(function(data) {

   console.log(data);
  });


router.get('/', function(req, res) {
  models.Questions.findAll().then(function(data) {
    console.log(data);
    /*Render index.handlebars on root route*/
    res.render("index");
  });
});

/*Get route for questions page*/
  router.get('/questions', function(req, res) {
  models.Questions.findAll().then(function(data) {
    console.log(data);
    /*Render index.handlebars on root route*/
    res.render("questions");
  });
});


/*Get route for standings page*/
  router.get('/standings', function(req, res) {
  models.Users.findAll().then(function(data) {
    console.log(data);
    
    /*Render index.handlebars on root route*/
    res.render("standings");
  });
// To check if a usename is unique
models.Users.findAll({ where: {
  userName:'arumita'
  }}).then(function(data) {

   console.log(data);

  });
//To create an entry for a new user
  models.Users.create({
      userName: 'testUsername',
      teamName: 'teamName'
    }).then(function(data) {
      // We have access to the new todo as an argument inside of the callback function
     console.log(data);
    });



module.exports = router;