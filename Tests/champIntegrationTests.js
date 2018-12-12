var should = require("should"),
  request = require("supertest"),
  app = require("../app.js"),
  mongoose = require("mongoose"),
  Champ = mongoose.model("Champ"),
  agent = request.agent(app);

describe("Champ Crud Test ", function() {
  it("Should allow a champ to be posted and return an _id", function(Done) {
    var champPost = {
      name: "Kassadin",
      type: "Mage",
      lane: "Mid",
      cost: "800"
    };

    agent
      .post("api/champs")
      .send(champPost)
      .expect(200)
      .end(function(err, results) {
        results.body.should.have.property("_id");
        done();
      });
  });
  afterEach(function(done) {
    Champ.remove().exec();
    done();
  });
});
