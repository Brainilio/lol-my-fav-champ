var champController = function(Champ) {
  var post = function(req, res) {
    var champ = new Champ(req.body);

    if (!req.body.lane) {
      res.status(400);
      res.send("Lane is required");
    } else {
      champ.save();
      res.status(201);
      res.send(champ);
    }
  };

  var get = function(req, res) {
    var query = req.query;
    Champ.find(query, function(err, champs) {
      if (err) console.log(err);
      else {
        var returnChamps = [];
        champs.forEach(function(element, index, array) {
          var newChamp = element.toJSON();
          newChamp.links = {};
          newChamp.links.self =
            "http://" + req.headers.host + "/api/champs/" + newChamp._id;
          returnChamps.push(newChamp);
        });

        res.json(returnChamps);
      }
    });
  };

  return {
    post: post,
    get: get
  };
};

module.exports = champController;
