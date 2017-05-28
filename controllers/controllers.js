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
/*restrict function ensures that only a person who has logged in can view this page(AD)*/
/*to get details of current user use session variable req.session.user[0].userName to 
query database and display appropriate questions(AD)*/
router.get('/land/:land', restrict, function(req, res) {
    models.Questions.findAll({
        where: {
            land: req.params.land
        }
    }).then(function(data) {
        //console.log(data);
        res.render("questions", {
            //username of logged in person will be displayed on top(AD)
            user: req.session.user[0].userName,
            question: data
        });
    });
});

//post route to collect/validate/save registration info 
router.post('/registration', function(req, res, next) {
    /*This IF statement is so that if team=default (default is when
    the dropdown is set to Add New Team), then team gets
    the value of newteam. -SB */
    if (req.body.team === "default") {
        req.body.team = req.body.newteam;
    }

    /* Validation checks for user inputs. Added 'team' as a required field. -SB */
    req.check('email', 'Invalid email address format.').isEmail();
    req.check('password', 'Passwords do not match.').equals(req.body.confirmPassword);
    req.check('password', 'Password must be at least 6 characters.').isLength({ min: 6 });
    req.check('username', 'Username is a required field.').isLength({ min: 1 });
    req.check('name', 'Name is a required field.').isLength({ min: 1 });
    req.check('team', 'You must join an existing team, or create a new one.').isLength({ min: 1 });
    var errors = req.validationErrors();

    /*If none of the errors above are triggered, errors gets set to 'false'
    instead of an array.  Since the validation below pushes errors to an
    array, we have to change it to an array IF it passes the above validation. -SB */
    if (!errors) {
        errors = [];
    }

    /*inputData will store the users inputs in order to repopulate them
    when there is an error* -SB */
    var inputData = {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        team: req.body.team
    }

    //To populate teamname dropdown
    models.Users.aggregate('teamname', 'DISTINCT', {
        plain: false
    }).then(function(data) {
        models.Users.findOne({
            where: {
                userName: req.body.username
            }
        }).then(function(data2) {
            if (data2) {
                errors.push({ param: 'username', msg: 'Username has already registered.', value: '' });
            }
            //find if new team name already exists
            models.Users.findOne({
                where: {
                    teamName: req.body.newteam
                }
            }).then(function(data3) {
                if (data3) {
                    errors.push({ param: 'teamname', msg: 'Team already exists.', value: '' });
                }
                if (errors.length > 0) {
                    /* If errors, reload the page and send back the errors
                    along with the users current inputs to repopulate forms. -SB */
                    res.render('registration', {
                        error: errors,
                        team: data,
                        inputData: inputData
                    });
                    req.session.errors = errors;
                    req.session.success = false;
                } else {
                    /* No errors, create the user and save it to the database.*/
                    req.session.success = true;
                    models.Users.create({
                        "userName": req.body.username,
                        "teamName": req.body.team,
                        "score": 0,
                        "password": req.body.password,
                        "email": req.body.email,
                        "name": req.body.name
                    }).then(function(data) {
                        /*then, redirect to login page. we can change this later to log in directly*/
                        res.redirect('/');
                    });
                }
            });
        });
    });
});

// Login page validations with database
router.post('/', function(req, res) {
    models.Users.findAll({
        where: {
            userName: req.body.username
        }
    }).then(function(data2) {
        console.log(JSON.stringify(data2));
        //find if username exists
        var errors = [];
        if (data2.length < 1) {
            errors.push({ param: 'username', msg: 'Username Does Not Exist', value: '' });
            res.render("index", { error: errors });
        }
        if (data2.length > 0) {
            if (JSON.parse(JSON.stringify(data2))[0].password == req.body.password) { // Regenerate session when signing in
                // to prevent fixation
                req.session.regenerate(function() {
                    // Store the user's primary key
                    // in the session store to be retrieved,
                    // or in this case the entire user object
                    var user = JSON.parse(JSON.stringify(data2));
                    req.session.user = user;
                    console.log("user is", user[0].userName);
                    req.session.success = 'Authenticated as ' + user[0].userName + ' click to <a href="/logout">logout</a>. ' + ' You may now access <a href="/restricted">/restricted</a>.';
                    res.render('questions', { user: req.session.user[0].userName });
                });
            } else {
                errors.push({ param: 'password', msg: 'Password Is Incorrect', value: '' });
                res.render("index", { error: errors });

            }
        }

    });
});

// To check if a usename is unique 
router.get('/username/:username', function(req, res) {
    models.Users.findOne({
        where: {
            userName: req.params.username
        }
    }).then(function(data) {

        // console.log(data);

    });
});


/*Get route for registration page*/
router.get('/registration', function(req, res) {
    models.Users.aggregate('teamname', 'DISTINCT', { plain: false }).then(function(data) {
        res.render("registration", { team: data });
        //  console.log(data);
    });
});



/*Get route for standings page*/
/*restrict function ensures that only a person who has logged in can view this page(AD)*/
/*to get details of current user use session variable req.session.user[0].userName to 
query database and display appropriate standings data(AD)*/
router.get('/standings/', restrict, function(req, res) {
    models.Users.findAll({
        where: {
            teamName: team
        },
        order: "score DESC"
    }).then(function(data) {
        //console.log(data);
        // NEEDS TO BE UPDATED WITH TEAM NAME ONCE WE DECLARE IT
        res.render("standings", {
            //username of logged in person will be displayed on top(AD)
            user: req.session.user[0].userName,
            userName: data,
            team
        });
    });
});
// To check if a usename is unique

//To create an entry for a new user

router.get('/', function(req, res) {
    models.Questions.findAll().then(function(data) {
        //console.log(data);
        res.render("index");
    });
});
//
// Logout endpoint
router.get('/logout', function(req, res) {
    // destroy session and logout(AD)
    req.session.destroy(function() {
        //redirect to login page(AD)
        res.redirect('/');
    });
});
/*restrict function ensures that only a person who has logged in can view this page(AD)*/
function restrict(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.session.error = 'Access denied!';
        /*If not logged in they are redirectected to the login page (AD)*/
        res.redirect('/');
    }
}

module.exports = router;
