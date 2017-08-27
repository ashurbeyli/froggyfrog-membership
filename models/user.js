var assert = require("assert")
var utility = require("../lib/utility")

var User = function(args){
	assert.ok(args.email, "email is required")
	var user = {};

	if(args.id){
		user.id = args.id;
	}
	user.email = args.email;
	user.createdAt = args.createdAt || new Date();
	user.status = args.status || "pending";
	user.signInCount = args.signInCount || 0;
	user.lastLoginAt = args.lastLoginAt || new Date();
	user.currentLoginAt = args.currentLoginAt || new Date();
	user.authenticationToken = args.authenticationToken || utility.randomString(23);
	user.hashedPassword = args.hashedPassword || null;

	return user;
};

module.exports = User;