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
var team = "teamName";

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

//post route to collect/validate/save registration info 

router.post('/register', function(req, res, next) {
    console.log(req.body);

  req.check('email', 'Invalid email address').isEmail();
  req.check('password', 'Passwords dont match').equals(req.body.confirmPassword);
  req.check('password', 'Password too short').isLength({min: 4});
  req.check('username', 'Username cannot be empty').isLength({min: 1});
  req.check('name', 'Name cannot be empty').isLength({min: 1});
  var errors = req.validationErrors();
  if (errors) {
  	console.log(errors);
  	//To populate teamname dropdown
  	 models.Users.aggregate('teamname', 'DISTINCT', { plain: false }).then(function(data) {
  	 //find if username already exists
  	 models.Users.findAll({ where: {
     userName:req.body.username
     }}).then(function(data2) {
     //find if new team name already exists
     models.Users.findAll({ where: {
     teamName:req.body.newteam
     }}).then(function(data3) {
     	
     	console.log("data3 is ",data3,data3.length)

    if(data3.length>0)
    {
    errors.push({ param: 'teamname', msg: 'teamname already exists', value: '' });
    console.log(errors);
    }
    if(data2.length>0)
    {
    errors.push({ param: 'username', msg: 'username already exists', value: '' });
    console.log(errors);
    }
  });  
  });

    	data.push({DISTINCT:'Add New Team'})
    	
 
        res.render('registration', {
      error: errors,
       team : data 
    });
        
    });
  	
    req.session.errors = errors;
    req.session.success = false;
  } else {
    req.session.success = true;
  }
  
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
    	data.push({DISTINCT:'Add New Team'})
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
  	},
  	order: "score DESC"
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

//To create an entry for a new user
  
router.get('/', function(req, res) {
    models.Questions.findAll().then(function(data) {
        console.log(data);
        res.render("index");
    });
});

module.exports = router;
