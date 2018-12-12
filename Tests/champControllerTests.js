var should = require("should"),
  sinon = require("sinon");

describe("Champ Controller Test:", function() {
  describe("Post", function() {
    it("should not allow an empty lane on post", function() {
      var Champ = function(champ) {
        this.save = function() {};
      };

      var req = {
        body: {
          name: "Malphite"
        }
      };
      var res = {
        status: sinon.spy(),
        send: sinon.spy()
      };

      var champController = require("../Controllers/champController")(Champ);

      champController.post(req, res);

      res.status
        .calledWith(400)
        .should.equal(true, "Bad Status " + res.status.args[0][0]);
      res.send.calledWith("Lane is required").should.equal(true);
    });
  });
});
