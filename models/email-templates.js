var mongoose = require('mongoose');  
var bcrypt = require('bcryptjs');

// template Schema
var TemplateSchema = mongoose.Schema({
	id: {
		type: Number,
	},
	userID: {
		type: Number
	},
	templateName: {
		type: String
	},
	datecreated: {
		type: Date
	},
	datemodified: {
		type: Date
	},
	templatebody: {
		type: String
	},
	templateused: {
		type: String
	}
});

var Template = module.exports = mongoose.model('ETemplate', TemplateSchema);





