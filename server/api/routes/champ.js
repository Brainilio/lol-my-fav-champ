const Champ = require("../../models/champModel");

module.exports = function(router) {
  router.get("/champ/:id", function(req, res) {
    Champ.findById(req.params.id)
      .exec()
      .then(docs => res.status(200).json(docs))
      .catch(err =>
        res.status(500).json({
          message: "Error finding user",
          error: err
        })
      );
  });

  router.post("/champ", function(req, res) {
    let champ = new Champ(req.body);
    champ.save(function(err, champ) {
      if (err) return console.log(err);
      res.status(200).json(champ);
    });
  });

  router.put("/champ/:id", function(req, res) {
    console.log(req.body);
    let doc = {
      name: req.body.name,
      type: req.body.type,
      lane: req.body.lane,
      cost: req.body.cost
    };
    console.log(doc);
    Champ.update(doc, function(err, respRaw) {
      if (err) return console.log(err);
      res.status(200).json(respRaw);
    });
  });
};
