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

 /*models.Users.findAll({
  attributes: [
    'teamName','DISTINCT'
   // 'DISTINCT(teamName)'
  ],
 
})*/
models.Users.aggregate('teamName', 'DISTINCT', { plain: false }).then(function(data) {

   console.log(data);

  });

models.Users.findAll({ where: {
  userName:'arumita'
  }}).then(function(data) {

   console.log(data);

  });

  models.Users.create({
      userName: 'testUsername',
      teamName: 'teamName'
    }).then(function(data) {
      // We have access to the new todo as an argument inside of the callback function
     console.log(data);
    });



module.exports = router;