/// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var models= require("../models");
var express = require('express');
var router = express.Router();
// ===============================================================================
// URL ROUTING
// ===============================================================================


/*Get route for standings page*/
router.get('/standings', function(req, res) {
  models.Users.findAll().then(function(data) {
    console.log(data);
    
    /*Render index.handlebars on root route*/
    res.render("standings");
    });
  });


//   ***The One Route to Route them all***
// Route used to retrieve questions for any land
router.get('/:land', function(req, res) {
  models.Questions.findAll({
  where: {
    land: req.params.land
    include: [{model: Questions}]
  }
}).then(function(data) {
    console.log(data);
    /*Render index.handlebars on root route*/
    res.render("questions", {question:data});
  });
});



// To check if a usename is unique 
router.get('/:username', function(req, res) {
  models.Users.findOne({ where: {
    userName:req.params.username
  }}).then(function(data) {

    console.log(data);

  });
});
//To create an entry for a new user and log to console
models.Users.create({
    userName: 'testUsername',
    teamName: 'teamName'
  }).then(function(data) {
    console.log(data);
  });

//To select distinct team names
models.Users.aggregate('teamName', 'DISTINCT', {
  plain: false 
}).then(function(data) {
   console.log(data);
  });



router.get('/', function(req, res) {
  models.Questions.findAll().then(function(data) {
    console.log(data);
    res.render("index");
  });
});




module.exports = router;