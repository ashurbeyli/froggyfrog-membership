var Registration = require("../lib/registration");
var db = require("secondthought");

describe("Registration", function(){
	var reg = {};
	before(function (done) {
		db.connect({db: "membership"},function (err, db) {
			reg = new Registration(db);
			done();
        });
    });
	describe("a valid application",function(){
		var regResult = {};
		before(function(done){
			db.users.destroyAll(function (err, desRes) {
                regResult = reg.applyForMembership({
                    email: "c.ashurbeyli@gmail.com",
                    password: "123123",
                    confirm: "123123"
                },function (err, result) {
                    regResult = result;
                    done();
                });
            });
		});


		it("is successfull", function(){
			regResult.success.should.equal(true);
		});
		it("creates a user",function(){
			regResult.user.should.be.defined;
		});
		it("creates a log entry", function(){
			regResult.log.should.be.defined;
		});
		it("sets the user's status to approved",function () {
			regResult.user.status.should.equal("approved");
        });
		it("offers a welcome message",function () {
			regResult.message.should.equal("Welcome!");
        });
		it("increments the signInCount",function () {
			regResult.user.signInCount.should.equal(1);
        });

	});
	describe("an empty or null email",function(){
		it("is not successfull");
		it("tells user that email is required");
	});
	describe("empty or null password", function(){
		it("is not successfull");
		it("tells user that password is required")
	});
	describe("password and confirm mismatch",function(){
		it("is not successfull");
		it("tels user passwords dont match")
	});
	describe("email already exists",function(){
		it("is not successfull")
		it("tells user that email already exists")
	})


});