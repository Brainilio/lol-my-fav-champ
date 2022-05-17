const router = require('express').Router()
const verify = require('./verifyToken')
const Champ = require('../modules/champModel')

//collection data
router.get('/', verify,(req, res) => { 
    const data = {
          champions: {  title: "hi"  }       
     }

     //this is the user you can find.
     res.send(req.user)
})

module.exports = router;