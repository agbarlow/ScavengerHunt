// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var models= require("../models");
var express = require('express');
var router = express.Router();
// ===============================================================================
// ROUTING
// ===============================================================================
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

module.exports = router;