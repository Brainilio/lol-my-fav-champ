var express = require("express");

var routes = function(Champ) {
  var champRouter = express.Router();
  var champController = require("../controllers/champController")(Champ);
  champRouter
    .route("/")
    .post(champController.post)
    .get(champController.get);

  champRouter.use("/:champId", function(req, res, next) {
    Champ.findById(req.params.champId, function(err, champ) {
      if (err) res.status(500).send(err);
      else if (champ) {
        req.champ = champ;
        next();
      } else {
        res.status(404).send("no champ found");
      }
    });
  });
  champRouter
    .route("/:champId")
    .get(function(req, res) {
      res.json(req.champ);
    })
    .put(function(req, res) {
      req.champ.Type = req.body.Type;
      req.champ.Cost = req.body.Cost;
      req.champ.Lane = req.body.Lane;
      req.champ.save();
      res.json(req.champ);
    })
    .patch(function(req, res) {
      if (req.body._id) delete req.body._id;
      for (var p in req.body) {
        req.champ[p] = req.body[p];
      }
      req.champ.save(function(err) {
        if (err) res.status(500).send(err);
        else {
          res.json(req.champ);
        }
      });
    })
    .delete(function(req, res) {
      req.champ.remove(function(err) {
        if (err) res.status(500).send(err);
        else {
          res.status(204).send("Removed");
        }
      });
    });

  return champRouter;
};

module.exports = routes;
