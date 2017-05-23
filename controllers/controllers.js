/// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var models = require("../models");
var express = require('express');
var router = express.Router();
// ===============================================================================
// URL ROUTING
// ===============================================================================


// WILL NEED TO REMOVE OR CHANGE ONCE WE DECLARE TEAM NAME
var team = "Clemson";

//   ***The One Route to Route them all***
// Route used to retrieve questions for any land
router.get('/land/:land', function(req, res) {
    models.Questions.findAll({
        where: {
            land: req.params.land
        }
    }).then(function(data) {
        console.log(data);
        /*Render index.handlebars on root route*/
        res.render("questions", { question: data });
    });
});



// To check if a usename is unique 
router.get('/username/:username', function(req, res) {
    models.Users.findOne({
        where: {
            userName: req.params.username
        }
    }).then(function(data) {

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





/*Get route for registration page*/
router.get('/registration', function(req, res) {
    models.Users.aggregate('teamname', 'DISTINCT', { plain: false }).then(function(data) {
        res.render("registration", { team : data });
        console.log(data);
    });
});
// To check if a usename is unique
models.Users.findAll({
    where: {
        userName: 'arumita'
    }
}).then(function(data) {
    console.log(data);
});

/*Get route for standings page*/

  router.get('/standings/', function(req, res) {
  models.Users.findAll({
  where: {
  	teamName: team
  	}
  	}).then(function(data) {
    //console.log(data);
    
    
    // NEEDS TO BE UPDATED WITH TEAM NAME ONCE WE DECLARE IT
    
    /*Render index.handlebars on root route*/
    res.render("standings", {
    userName:data,
    team
    });
    });
  });
// To check if a usename is unique
models.Users.findAll({ where: {
  userName:'arumita'
  }}).then(function(data) {

   console.log(data);

  });
//To create an entry for a new user
  
router.get('/', function(req, res) {
    models.Questions.findAll().then(function(data) {
        console.log(data);
        res.render("index");
    });
});

module.exports = router;
