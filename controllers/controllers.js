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

//post route to collect/validate/save registration info 

router.post('/registration', function(req, res, next) {
    console.log("Start POST" + req.body);

  req.check('email', 'Invalid email address').isEmail();
  req.check('password', 'Passwords dont match').equals(req.body.confirmPassword);
  req.check('password', 'Password too short').isLength({min: 4});
  req.check('username', 'Username cannot be empty').isLength({min: 1});
  req.check('name', 'Name cannot be empty').isLength({min: 1});
  var errors = req.validationErrors();
  if (errors) {
  	console.log(errors);
  	//To populate teamname dropdown
  	 models.Users2s.aggregate('teamname', 'DISTINCT', { plain: false }).then(function(data) {
  	 //find if username already exists
  	 models.Users2s.findAll({ where: {
     userName:req.body.username
     }}).then(function(data2) {
     //find if new team name already exists
     models.Users2s.findAll({ where: {
     teamName:req.body.newteam
     }}).then(function(data3) {
     	
     	console.log("data3 is " + data3 + "length is:" + data3.length)


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
    // This runs if all validation has been passed
    // Create a new user row in table
    if (team=true){
      var userTeam = req.body.team
    };
    if (team=false){
      var userTeam = req.body.newteam
    };

    models.Users2s.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      userName: req.body.name,
      teamName: userTeam

    }).then(function(data) {
    // This is the page destination after new user has been registered
      res.render('standings');
    });
    req.session.success = true;
    return;
  }
  
});

// POST route for creating a new user
  router.post("/api/newuser", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.Users.create({
      userName: req.body.userName,
      teamName: req.body.teamName
    }).then(function(data) {
      // We have access to the new todo as an argument inside of the callback function
      console.log("END POINT" + data);
    });
  });



// To check if a usename is unique 
router.get('/username/:username', function(req, res) {
    models.Users2s.findOne({
        where: {
            userName: req.params.username
        }
    }).then(function(data) {

        console.log(data);

    });
});
//To create an entry for a new user and log to console
router.get('/username/:username', function(req, res) {
  models.Users2s.create({
      userName: 'testUsername',
      teamName: 'teamName'
  }).then(function(data) {
      console.log(data);
  });
});



/*Get route for registration page*/
router.get('/registration', function(req, res) {
    models.Users2s.aggregate('teamname', 'DISTINCT', { plain: false }).then(function(data) {
    	data.push({DISTINCT:'Add New Team'})
        res.render("registration", { team : data });
        console.log(data);
    });
});


// To check if a usename is unique
// models.Users2s.findAll({
//     where: {
//         userName: 'arumita'
//     }
// }).then(function(data) {
//     console.log(data);
// });

/*Get route for standings page*/

  router.get('/standings/', function(req, res) {
  models.Users2s.findAll({
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



router.get('/', function(req, res) {
    models.Questions.findAll().then(function(data) {
        console.log(data);
        res.render("index");
    });
});

module.exports = router;
