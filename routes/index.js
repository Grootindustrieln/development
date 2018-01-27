var Client = require('hubspot');
var client = new Client();
var async = require('async');
var Mailgun = require('mailgun-js');
var util = require('util');
var chai = require('chai');
var expect = chai.expect;
var crypto = require('crypto');
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

const authHelpers = require('../config/_helpers');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : 'criticodev.ce8wv7rrgmue.us-west-2.rds.amazonaws.com',
    user : 'criticoAdmin',
    password : 'YzEIvkrVKz6m22DoUUmEbT4QwHtH3wm7RvWEc3hQ',
    database : 'Dev_Playground'
  },
  pool: { min: 1, max: 10 }
});




const local = require('../config/local');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

function handleResponse(res, code, statusMsg) {
  res.status(code).json({
    status: statusMsg
  });
}

// // // // // // // // //
//website specific routes
// // // // // // // // //

// index page 
router.get('/', function(req, res) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.render('pages/index', { user: req.user, company: req.company, plan: req.plan });
});

// how it works page
router.get('/how-it-works', function(req, res) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.render('pages/howitworks', { user: req.user, company: req.company, plan: req.plan });
});

//  pricing page 
router.get('/pricing', function(req, res) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.render('pages/pricing', { user: req.user, company: req.company, plan: req.plan });
});

//  faq page 
router.get('/faq', function(req, res) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.render('pages/faq', { user: req.user, company: req.company, plan: req.plan });
});

//  company page 
router.get('/company', function(req, res) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.render('pages/company', { user: req.user, company: req.company, plan: req.plan });
});

//  terms & conditions page 
router.get('/terms', function(req, res) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.render('pages/terms', { user: req.user, company: req.company, plan: req.plan });
});

//  privacy policy page 
router.get('/privacy', function(req, res) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.render('pages/privacy', { user: req.user, company: req.company, plan: req.plan });
});

//  register page 
router.get('/register', function(req, res) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.render('pages/register', { user: req.user, company: req.company, plan: req.plan });
});

//  login page 
router.get('/login', function(req, res) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.render('pages/login', { user: req.user, company: req.company, plan: req.plan });
});

//  forgot password page 
router.get('/forgot-password', function(req, res) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.render('pages/forgotpassword', { user: req.user, company: req.company, plan: req.plan });
});

// password reset page 
router.get('/reset-password', function(req, res) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.render('pages/passwordreset', { user: req.user, company: req.company, plan: req.plan });
});

//  testing ground page 
router.get('/working', function(req, res) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.render('pages/working', { user: req.user, company: req.company, plan: req.plan });
});

// // // // // // // //
//app specific routes//
// // // // // // // //

//  app dashboard page 
router.get('/app/dashboard', function(req, res) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  var user = req.user;
  if (!user) {
    res.redirect('../login');
  }
  else {
  console.log(req.company);
  res.render('pages/app/dashboard', { user: req.user, company: req.company, plan: req.plan });
  }
});

//  updated app dashboard page 
router.get('/app/dashboard_old', function(req, res) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  var user = req.user;
  if (!user) {
    res.redirect('../login');
  }
  else {
  console.log(req.company);
  res.render('pages/app/dashboard_old', { user: req.user, company: req.company, plan: req.plan });
  }
});

//  updated app dashboard page2.0
router.get('/app/dashboard-updated', function(req, res) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  var user = req.user;
  if (!user) {
    res.redirect('../login');
  }
  else {
  console.log(req.company);
  res.render('pages/app/dashboard-updated', { user: req.user, company: req.company, plan: req.plan });
  }
});

//  user profile page 
router.get('/app/profile', function(req, res) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  var user = req.user;
  if (!user) {
    res.redirect('../login');
  }
  else {
  res.render('pages/app/profile', { user: req.user, company: req.company, plan: req.plan });
  }
});

//  user account page 
router.get('/app/account', function(req, res) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  var user = req.user;
  if (!user) {
    res.redirect('../login');
  }
  else {
  res.render('pages/app/account', { user: req.user, company: req.company, plan: req.plan });
  }
});

//  user preferences page 
router.get('/app/preferences', function(req, res) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  var user = req.user;
  if (!user) {
    res.redirect('../login');
  }
  else {
  res.render('pages/app/preferences', {  user: req.user, company: req.company, plan: req.plan });
  }
});

//  integrations page 
router.get('/app/integrations', function(req, res) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  var user = req.user;
  if (!user) {
    res.redirect('../login');
  }
  else {
  res.render('pages/app/integrations', { user: req.user, company: req.company, plan: req.plan });
  }
});

//  billing plan page 
router.get('/app/account/billing', function(req, res) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  var user = req.user;
  if (!user) {
    res.redirect('../login');
  }
  else {
  res.render('pages/app/billing', { user: req.user, company: req.company, plan: req.plan });
  }
});

//  new email template page 
router.get('/app/new-email-template', function(req, res) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  var user = req.user;
  if (!user) {
    res.redirect('../login');
  }
  else {
  res.render('pages/app/newemailtemplate', { user: req.user, company: req.company, plan: req.plan });
  }
});

//  preview template
router.get('/app/preview/:name', function(req, res) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  var user = req.user;
  var name = req.params.name;
  if (!user) {
    res.redirect('../login');
  }
  else {
  res.render('pages/app/previewtemplate', { user: req.user, company: req.company, plan: req.plan, name: name });
  }
});

//  load email template
router.get('/app/templates/emails/:name', function(req, res) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  var user = req.user;
  var name = req.params.name;
  if (!user) {
    res.redirect('../login');
  }
  else {
  var options = {
    root: '/pages/app/templates/emails/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };
  res.sendFile(name, options);
  }
});

//  saved email templates page 
router.get('/app/saved-email-templates', function(req, res) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  var user = req.user;
  if (!user) {
    res.redirect('../login');
  }
  else {
  res.render('pages/app/savedemails', { user: req.user, company: req.company, plan: req.plan});
  }
});

//  email template editor
router.post('/app/create/new-email-template', function(req, res) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  var user = req.user;
  if (!user) {
    res.redirect('../login');
  }
  else {
    
    var template_id = Math.random();
    
    var name = req.body.name;
	  var titles = req.body.titles;
	  var meta = req.body.meta;
	  var links = req.body.links;
	  var styles = req.body.styles;
	  var template = req.body.template;
	  var plain_text = req.body.plain_text;
	  var modules = req.body.modules;
	  var thumbnail = req.body.thumbnail;
	  var path = req.body.path;

  res.set({ 'content-type': 'text/html; charset=utf-8' });	  
  res.render('pages/app/emaileditor', { template_id: template_id, user: req.user, name: name, titles: titles, meta: meta, modules: modules, links: links, styles: styles, template: template, plain_text: plain_text, thumbnail: thumbnail, path: path, company: req.company, plan: req.plan});
  
  }
});


// // // // // // // // // // // 
//functions and operational routes
// // // // // // // // // // //

//  save email template
router.post('/save-email-template', function(req, res) {

  var template_id = req.template_id;
  var template_name = req.template_name;
  var template_plan = req.template_plan;
  var user_id = req.user.id;
  var user_email = req.user.email;
  
  console.log('Email Saved');
  
  res.set({ 'content-type': 'text/html; charset=utf-8' });	  
  res.render('pages/app/dashboard', { user: req.user, company: req.company });
});


// set apikey for hubspot crm connection
// client.useKey('5f2a0694-8935-46a4-b347-6495adeadf85');

// footer signup form handling and push to hubspot crm
router.post('/php/signup.php',function(req,res){
    //validation
    req.checkBody('firstname', 'Invalid postparam').notEmpty();
    req.checkBody('lastname', 'Invalid postparam').notEmpty();
    req.checkBody('email', 'Invalid postparam').isEmail();
    
    req.getValidationResult().then(function(result) {
    if (!result.isEmpty()) {
      res.send(util.inspect(result.array()));
      return;
    }
    else
    {
        client.contacts.createOrUpdate(req.body.email,
        {
          "properties": [
            {
              "property": "email",
              "value": req.body.email
            },
            {
              "property": "firstname",
              "value": req.body.firstname
            },
            {
              "property": "lastname",
              "value": req.body.lastname
            }
          ]
        },
        function(err, data, res){
          if (err) { throw err; }
          expect(res.statusCode).to.equal(200);
          expect(data).to.be.a('object');
        });

        res.send(req.body);
    }
    });
});


// // // // // // // // // // // 
//registration and login routes
// // // // // // // // // // //


// Register User
router.post('/register.php', (req, res, next)  => {
  
  var emailaddress = req.body.emailaddress;
  var username = req.body.emailaddress;
	var password = req.body.password;
	var company = req.body.company;
	var provider = req.body.provider;
	var plan = req.body.plan;
	
	req.sanitize('provider').blacklist('default');
  req.checkBody('emailaddress', 'missing email').isEmail();
  req.checkBody('password', 'need password').notEmpty();
  req.checkBody('company', 'need company').notEmpty();
  req.checkBody('provider', 'need provider').notEmpty();
  
  req.getValidationResult().then(function(result) {
      if (!result.isEmpty()) {
        res.send(util.inspect(result.array()));
        return;
      }
      else 
      {
        knex('users').where({ username }).first().then((user) => {
          if (user) {
            res.send('username already exists');
          }
          else 
          {
            return authHelpers.createCompany(req, res).then(
            authHelpers.createUser(req, res).then((response) => {
    
            passport.authenticate('local', function(err, user) {
              if (err) {
                console.log(err); 
              }
              if (!user) { 
                console.log('Error') ;
              }
              req.login(user, {}, function(err) {
                
                  if (err) { 
                    console.log(err);
                    return res.json({error:err}); 
                  }
                  return res.send('/app/dashboard');
                });
            })(req, res, next);
            }));
          }
        });
      }
  });
});

// registration form processing - payment
router.post('/registerp.php',function(req, res){
    var emailaddress = req.body.emailaddress;
    var username = req.body.emailaddress;
	  var password = req.body.password;
	  var company = req.body.company;
	  var provider = req.body.provider;
	  var plan = req.body.plan;
	  
	  knex('users').where({ username }).first().then((user) => {
      if (user) {
        res.send('username already exists');
      }
      else 
      {
  	  req.sanitize('provider').blacklist('default');
  	  req.checkBody('emailaddress', 'missing email').isEmail();
  	  req.checkBody('password', 'need password').notEmpty();
  	  req.checkBody('company', 'need company').notEmpty();
  	  req.checkBody('provider', 'need provider').notEmpty();
	  
  	  req.getValidationResult().then(function(result) {
      if (!result.isEmpty()) {
        res.send(util.inspect(result.array()));
        return;
      }
      else {
        res.send('continue');
      }
      });
      }
	  });
});

// payment form processing - registration
router.post('/processregp.php',function(req, res, next){
    var emailaddress = req.body.emailaddress;
    var username = req.body.emailaddress;
	  var password = req.body.password;
	  var company = req.body.company;
	  var provider = req.body.provider;
	  var plan = req.body.plan;
	  
	  var cardname = req.body.cardname;
		var cardnumber = req.body.cardnumber;
		var expirymonth = req.body.expirymonth;
		var expiryyear = req.body.expiryyear;
		var cardcvv = req.body.cardcvv;
		var country = req.body.country;
		var state = req.body.state;
		var postal = req.body.postal;
		
		req.sanitize('expirymonth').blacklist('select');
		req.sanitize('expiryyear').blacklist('select');
		req.sanitize('country').blacklist('select');
		req.sanitize('state').blacklist('select');
		
		req.checkBody('cardname', 'need cardholder name').notEmpty();
		req.checkBody('cardnumber', 'need card number').notEmpty();
		req.checkBody('cardnumber', 'not a valid card number').isCreditCard();
    req.checkBody('expirymonth', 'need month of card expiration').notEmpty();
    req.checkBody('expiryyear', 'need year of card expiration').notEmpty();
    req.checkBody('cardcvv', 'need card CVV code').notEmpty();
    req.checkBody('country', 'need country').notEmpty();
    req.checkBody('state', 'need state').notEmpty();
    req.checkBody('postal', 'need postal code').notEmpty();
    
    req.getValidationResult().then(function(result) {
    if (!result.isEmpty()) {
      res.send(util.inspect(result.array()));
      return;
    }
    else {
      return authHelpers.createUser(req, res).then((response) => {
    
      passport.authenticate('local', function(err, user) {
        if (err) {
          console.log(err); 
        }
          if (!user) { 
            console.log('Error') 
          }
          req.login(user, {}, function(err) {
              if (err) { 
                console.log(err);
                return res.json({error:err}); 
              }
              return res.send('/app/dashboard');
            });
        })(req, res, next);
        });
      }
    });
});

// login form processing
router.post('/login.php', function(req,res){
  
  // Validation
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('emailaddress', 'Email is not valid').isEmail();
  
	req.getValidationResult().then(function(result) {
    if (!result.isEmpty()) {
      console.log(util.inspect(result.array()))
      res.send(util.inspect(result.array()));
      return;
    }
    else
    {
		passport.authenticate('local', function(err, user, company) {
      if (req.xhr) {
        if (err)   { 
          return res.json({ error: err.message }); 
        }
        if (!user) { 
          return res.send('invalid'); 
        }
        req.login(user, {}, function(err) {
          
          if (err) { 
            return res.json({error:err}); 
          }
          return res.send('/app/dashboard');
        });
      } 
      
      }
    )(req, res);
	  } 
});
});

// logout processing
router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/login');
});

// forgot password processing
router.post('/forgot.php', function(req, res, next){
  
  var emailaddress = req.body.emailaddress;
  var username = req.body.emailaddress;
  var host = req.hostname;
  
  req.checkBody('emailaddress', 'Email is required').notEmpty();
	req.checkBody('emailaddress', 'Email is not valid').isEmail();
	
	req.getValidationResult().then(function(result) {
    if (!result.isEmpty()) {
      res.send(util.inspect(result.array()));
      return;
    }
    else
    {
    async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      return knex('users').where({ username }).first().then((user) => {
        if (!user) {
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('/forgot');
        }

        var resetPasswordExpires = Date.now() + 3600000; // 1 hour

        return knex(`public.users`).where({ username }).first().update({
          password_resettoken: token,
          password_resettoken_expiration: resetPasswordExpires
        }).then((user) => {
        
          console.log(emailaddress);
          
          var api_key = 'key-aadb7e54ff49b2085a08a2ad3643eb5e';
          var domain = 'critico.io';
          var mailgun = new Mailgun({apiKey: api_key, domain: domain});
          var from_who = 'support@critico.io';
          var to_whom = emailaddress;
          var data = {
              from: from_who,
              to: to_whom,
              subject: 'Reset your Critico Password',
              html: '<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>' +
                    '<p>Please click on the following link, or paste this into your browser to complete the process:</p>' +
                    '<p>https://' + host +  '/reset-password?res_t=' + token + '</p>' +
                    '<p>If you did not request this, please ignore this email and your password will remain unchanged.</p>'
          };
          
          mailgun.messages().send(data, function (err, body){
            if (err) {
              console.log("got an error: ", err);
              res.send('failure');
            }
            else 
            {
              console.log(body);
              res.send('success');
            }
          });
        });
      });
    }],
    function(err) {
    if (err) return next(err);
    res.redirect('/forgot');
    });
    }
  });
});

// reset password processing
router.post('/resetpassword.php', function(req, res, next){
  var password_resettoken = req.body.token;
  
  req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('confirm', 'no match passwords').equals(req.body.password);
	
	req.getValidationResult().then(function(result) {
    if (!result.isEmpty()) {
      res.send(util.inspect(result.array()));
      return;
    }
    else
    {
  	async.waterfall([
      function(done) {
        return knex('users').where('password_resettoken', req.body.token).first().then((user) => {
        if (!user) {
          console.log('Password reset token is invalid or has expired.');
        }
        else
        {
         console.log('we have a user!'); 
          var new_password = req.body.password;
          
          const salt = bcrypt.genSaltSync();
          const hash = bcrypt.hashSync(new_password, salt);
          
          console.log(password_resettoken);
          console.log(req.body.token);
          
          return knex('users').where('password_resettoken', req.body.token).first().update({
            password_hash: hash,
            password_resettoken: '0',
            password_resettoken_expiration: '0'
          }).then((user) => {
            
          var api_key = 'key-aadb7e54ff49b2085a08a2ad3643eb5e';
          var domain = 'critico.io';
          var mailgun = new Mailgun({apiKey: api_key, domain: domain});
          var from_who = 'support@critico.io';
          var to_whom = user.emailaddress;
          var data = {
              from: from_who,
              to: to_whom,
              subject: 'Your Critico Password is Reset',
              html: '<p>You are receiving this because your Critico password has been reset</p>'
          };

          mailgun.messages().send(data, function (err, body){
            //If there is an error, render the error page
            if (err) {
              console.log("got an error: ", err);
              res.send('failure');
            }
            //Else we can greet and leave
            else {
                console.log(body);
                res.send('success');
            }
          });
      
          });
        }
        });
      },
    
      
    ]);
    }
  });
});

module.exports = router;