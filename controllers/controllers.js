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


// WILL NEED TO REMOVE OR CHANGE ONCE WE DECLARE TEAM NAME
var team = "Clemson";


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

/*Breaking up each 'land' into it's own route
we can change how this works later on if we want -SB*/
  router.get('/Adventureland/', function(req, res) {
  models.Questions.findAll({
  where: {
    land: 'Adventureland'
  }
}).then(function(data) {
    console.log(data);
    /*Render index.handlebars on root route*/
    res.render("questions", {question:data});
  });
});

  router.get('/Frontierland/', function(req, res) {
  models.Questions.findAll({
  where: {
    land: 'Frontierland'
  }
}).then(function(data) {
    console.log(data);
    /*Render index.handlebars on root route*/
    res.render("questions", {question:data});
  });
});

  router.get('/LibertySquare/', function(req, res) {
  models.Questions.findAll({
  where: {
    land: 'Liberty Square'
  }
}).then(function(data) {
    console.log(data);
    /*Render index.handlebars on root route*/
    res.render("questions", {question:data});
  });
});

  router.get('/Fantasyland/', function(req, res) {
  models.Questions.findAll({
  where: {
    land: 'Fantasyland'
  }
}).then(function(data) {
    console.log(data);
    /*Render index.handlebars on root route*/
    res.render("questions", {question:data});
  });
});

  router.get('/Tomorrowland/', function(req, res) {
  models.Questions.findAll({
  where: {
    land: 'Tomorrowland'
  }
}).then(function(data) {
    console.log(data);
    /*Render index.handlebars on root route*/
    res.render("questions", {question:data});
  });
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
  models.Users.create({
      userName: 'testUsername',
      teamName: 'teamName'
    }).then(function(data) {
      // We have access to the new todo as an argument inside of the callback function
     console.log(data);
    });



module.exports = router;