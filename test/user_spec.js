var User = require("../models/user")
var should = require("should")

describe("User", function(){

	describe("defaults", function(){

		var user = {};

		before(function(){
			user = new User({email: "c.ashurbeyli@gmail.com"})
		});

		it("email is c.ashurbeyl", function(){
			user.email.should.equal("c.ashurbeyli@gmail.com")
		});
		it("has an authentication token",function(){
			user.authenticationToken.should.be.defined;
		});
		it("has a pending status",function(){
			user.status.should.equal("pending")
		});
		it("has a created date",function(){
			user.createdAt.should.be.defined;
		});
		it("has a signCount of 0",function(){
			user.signInCount.should.equal(0)
		});
		it("has lastLogin",function(){
			user.lastLoginAt.should.be.defined;
		});
		it("has currentLogin",function(){
			user.currentLoginAt.should.be.defined;
		})


	})

})