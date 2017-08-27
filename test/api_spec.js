var assert = require("assert");
var db = require("secondthought");

var Membership = require('../index');

describe.only("Main API", function () {
    var memb = {};
    before(function (done) {
        memb = new Membership("membership");
        db.connect({db: "membership"},function (err, db) {
            db.users.destroyAll(function (err, result) {
                done();
            });
        });
    });

    describe("authentication",function () {
        var newUser = {};
        before(function (done) {
           memb.register("c.ashurbeyli@gmail.com","123123","123123",function (err, result) {
               newUser = result.user;
               assert.ok(result.success,"Can't register");
               done();
           });
        });


        it("authenticates", function (done) {
           memb.authenticate("c.ashurbeyli@gmail.com", "123123", function (err, result) {
               result.success.should.equal(true);
               done();
           });
        });

        it("gets by token",function (done) {
            memb.findUserByToken(newUser.authenticationToken,function (err, result) {
               result.should.be.defined;
               done();
            });
        });
    })
});