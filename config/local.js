const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const authHelpers = require('./_helpers');

const init = require('./passport');
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

const options = {};

init();

passport.use(new LocalStrategy(options, (username, password_hash, done) => {
  // check to see if the username exists
  knex('users').where({ username }).first()
  .then((user) => {
    
    if (!user) return done(null, false);
    if (!authHelpers.comparePass(password_hash, user.password_hash)) {
      return done(null, false);
    } else {
      return done(null, user);
    }
  })
  .catch((err) => { return done(err); });
}));

module.exports = passport;
