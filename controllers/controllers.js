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

/*Get route for questions page*/
  router.get('/questions', function(req, res) {
  models.Questions.findAll().then(function(data) {
    console.log(data);
    /*Render index.handlebars on root route*/
    res.render("questions");
  });
});

module.exports = router;