var express = require('express');
var axios = require('axios')
var ap = require('../ap/env')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
  /*axios.get(ap.api_accesspoint+'/movie/upcoming').then(resp =>{
    res.render('home',{brev:resp.data.results});
  }).catch(err =>{
    res.render('error',{error:err})
  })*/
});

module.exports = router;
