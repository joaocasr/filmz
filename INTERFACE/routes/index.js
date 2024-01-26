var express = require('express');
var axios = require('axios')
var ap = require('../ap/env')
var router = express.Router();
var fs = require('fs')
var jwt = require('jsonwebtoken')

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.cookies.access_token){
    token = req.cookies.access_token;
    current_token = JSON.parse(Buffer.from(token.split('.')[1], 'base64'));
    res.render('home',{accountid:"johnnytuga",rtoken:current_token.request_token});
  }
  else{
    res.render('home',{accountid:null,rtoken:null});
  } 
});

router.get('/token', function(req, res, next) {
  console.log("/token")
  exists=false
  var token=null
  var current_token = null
  var expiration = null
  var now = null
  if(req.cookies.access_token!=null){
    token = req.cookies.access_token
    exists=true
    current_token = JSON.parse(Buffer.from(token.split('.')[1], 'base64'));
    expiration = new Date(current_token.expires_at).getTime()- 3600000
    now = new Date().getTime()  
  }
  console.log(current_token)
  console.log("ahora:"+now)
  console.log("exp:"+expiration)
  if(exists && now<expiration && now-current_token.timestamp<900000){
    res.redirect("https://www.themoviedb.org/authenticate/"+current_token.request_token+"?redirect_to=http://localhost:7778/?approved=true")
  }else{
    res.redirect('/auth/request_token')
  }
})

router.get('/auth/request_token',function(req,res,next){
  axios.get(ap.api_accesspoint+"/auth/request_token").then(resp =>{
    var data = new Date().getTime()
    resp.data['timestamp']= data
    const token = jwt.sign(resp.data, "MY_TOKEN");
    res.cookie("access_token", token, {
      httpOnly: true
    })
    res.redirect("https://www.themoviedb.org/authenticate/"+resp.data.request_token+"?redirect_to=http://localhost:7778/?approved=true")
  }).catch(err =>{
    res.render('error',{error:err})
  })
});

router.get('/search',function(req,res,next){
  res.render('search',{content:null})
})

router.post('/search',function(req,res,next){
  if(req.body){
    axios.get(ap.api_accesspoint+"/search/movie?query="+req.body.arquivo).then(conteudos=>{
      res.render('search',{content:conteudos.data.results})
    })
  }
})
router.get('/filmes/:idmovie', function(req,res,next){
  axios.get(ap.api_accesspoint+"/movie/"+req.params.idmovie).then(resp =>{
    axios.get(ap.api_accesspoint+"/movie/"+req.params.idmovie+"/images").then(images =>{
      axios.get(ap.api_accesspoint+"/movie/"+req.params.idmovie+"/recommendations").then(recommendations =>{
        res.render('movie',{filme:resp.data,year: resp.data.release_date.substring(0,4), imagens:images.data, movierecs:recommendations.data.results })
      }).catch(err =>{
        res.render('error',{error:err})
      })
      }).catch(err =>{
      res.render('error',{error:err})
    })
  }).catch(err =>{
    res.render('error',{error:err})
  })
})

router.get('/watchlist/:account_id',function(req,res,next){
  axios.get(ap.api_accesspoint+"/account/"+req.params.account_id+"/watchlist/movies").then(mywatchlist=>{
    res.render('watchlist',{watchlist:mywatchlist.data})
  }).catch(err =>{
    res.render('error',{error:err})
  })
})


router.get('/logout',function(req,res,next){  
  res.clearCookie("access_token")
  res.render('home',{accountid:null,rtoken:null});
  res.end()
})

module.exports = router;
