var bcrypt = require('bcryptjs');

// establish connection to postgres
const pool = require('../config/database');

var UserSchema = {
	userid: {
		type: Number
	},
	password_hash: {
		type: String
	},
	emailaddress: {
		type: String
	},
	name_first: {
		type: String
	},
	name_last: {
		type: String
	},
	residence_country: {
		type: String
	},
	residence_state: {
		type: String
	},
	residence_postalcode: {
		type: String
	},
	resetpasswordtoken: {
		type: String
	},
	resetpasswordexpires: {
		type: Date
	}
};

var User = module.exports = ('User', UserSchema);


module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
};

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
};

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
};

module.exports.comparePass = function(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
};