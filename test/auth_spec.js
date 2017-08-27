var db = require("secondthought");
var assert = require("assert");
var should = require("should");

var Registration = require("../lib/registration");
var Auth = require('../lib/authentication');

describe("Authentication", function () {

    var reg = {};
    var auth = {};
    before(function (done) {
        db.connect({db: "membership"},function (err, db) {
            reg = new Registration(db);
            auth = new Auth(db);

            //register user
            db.users.destroyAll(function (err, desRes) {
                regResult = reg.applyForMembership({
                    email: "c.ashurbeyli@gmail.com",
                    password: "123123",
                    confirm: "123123"
                },function (err, regResult) {
                    assert.ok(regResult.success);
                    done();
                });
            });
        });
    });


    describe("a valid login", function () {
        var authResult = {};
        before(function(done){
            //log them in...
            auth.authenticate({
                email: "c.ashurbeyli@gmail.com",
                password: "123123"
            },function (err, result) {
                assert(err === null, err);
                authResult = result;
                done();
            });
        });

        it("is successfull",function () {
           authResult.success.should.equal(true)
        });
        it("return a user",function () {
            should.exists(authResult.user);
        });
        it("create a log entry",function () {
            should.exists(authResult.log);
        });
        it("updates the user stats",function () {
            authResult.user.signInCount.should.equal(2);
        });
        it("updates the signin dates",function () {
            should.exists(authResult.user.lastLoginAt);
            should.exists(authResult.user.currentLoginAt);
        });

    });

    describe("empty email", function () {
        var authResult = {};
        before(function(done){
            //log them in...
            auth.authenticate({
                email: null,
                password: "123123"
            },function (err, result) {
                assert(err === null, err);
                authResult = result;
                done();
            });
        });

        it("is not successful",function () {
            authResult.success.should.equal(false)
        });
        it("returns a message saying 'Invalid login'",function () {
            authResult.message.should.equal("Invalid email or password")
        });
    });

    describe("empty password", function () {
        var authResult = {};
        before(function(done){
            //log them in...
            auth.authenticate({
                email: null,
                password: null,
            },function (err, result) {
                assert(err === null, err);
                authResult = result;
                done();
            });
        });

        it("is not successful",function () {
            authResult.success.should.equal(false)
        });
        it("returns a message saying 'Invalid login'",function () {
            authResult.message.should.equal("Invalid email or password")
        });
    });

    describe("password doesn't match", function () {
        var authResult = {};
        before(function(done){
            //log them in...
            auth.authenticate({
                email: "c.ashurbeyli@gmail.com",
                password: "12312"
            },function (err, result) {
                assert(err === null, err);
                authResult = result;
                done();
            });
        });

        it("is not successful",function () {
            authResult.success.should.equal(false)
        });
        it("returns a message saying 'Invalid login'",function () {
            authResult.message.should.equal("Invalid email or password")
        });
    });

    describe("email not found", function () {
        var authResult = {};
        before(function(done){
            //log them in...
            auth.authenticate({
                email: "c.ashurbeyli@gmail.co",
                password: "123123"
            },function (err, result) {
                assert(err === null, err);
                authResult = result;
                done();
            });
        });

        it("is not successful",function () {
            authResult.success.should.equal(false)
        });
        it("returns a message saying 'Invalid login'",function () {
            authResult.message.should.equal("Invalid email or password")
        });
    });

});