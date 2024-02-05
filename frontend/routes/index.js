var express = require('express');
var axios = require('axios')
var ap = require('../ap/env')
var router = express.Router();
var jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.cookies.access_token){
    token = req.cookies.access_token;
    current_token = JSON.parse(Buffer.from(token.split('.')[1], 'base64'));
    res.render('home',{username:current_token.user,rtoken:current_token.request_token});
  }
  else{
    res.render('home',{username:null,rtoken:null});
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
    console.log(current_token)
    console.log("ahora:"+now)
    console.log("exp:"+expiration)
  }
  if(exists && now<expiration && now-current_token.timestamp<900000){
    res.clearCookie("access_token");
    res.redirect("https://www.themoviedb.org/authenticate/"+current_token.request_token+"?redirect_to=http://localhost:7778/");
    res.end();
  }else{
    res.redirect('/auth/request_token');
  }
})

router.get('/auth/request_token',function(req,res,next){
  axios.get(ap.api_accesspoint+"/auth/request_token").then(resp =>{
    axios.get(ap.api_accesspoint+"/account").then(userinfo=>{
      var data = new Date().getTime()
      resp.data['timestamp']= data
      resp.data['user']= userinfo.data['username']
      resp.data['id']= userinfo.data['id']
      console.log(userinfo.data)
      const token = jwt.sign(resp.data, "MY_TOKEN");
      res.cookie("access_token", token, {
        httpOnly: true
      })
      res.redirect("https://www.themoviedb.org/authenticate/"+resp.data.request_token+"?redirect_to=http://localhost:7778/")
  
    }).catch(err =>{
      res.render('error',{error:err})
    })
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
  var token = req.cookies.access_token;
  var current_token = JSON.parse(Buffer.from(token.split('.')[1], 'base64'));
  axios.get(ap.api_accesspoint+"/movie/"+req.params.idmovie).then(resp =>{
    axios.get(ap.api_accesspoint+"/movie/"+req.params.idmovie+"/images").then(images =>{
      axios.get(ap.api_accesspoint+"/movie/"+req.params.idmovie+"/recommendations").then(recommendations =>{
        res.render('movie',{filme:resp.data.dados,year: resp.data.dados.release_date.substring(0,4), imagens:images.data, movierecs:recommendations.data.results,
          watchlist:resp.data.pref.watchlist,
          favourite:resp.data.pref.favourite,
          username:current_token.user,
          rtoken:current_token.request_token })
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
  var token = req.cookies.access_token;
  var current_token = JSON.parse(Buffer.from(token.split('.')[1], 'base64'));
  axios.get(ap.api_accesspoint+"/account/"+req.params.account_id+"/watchlist/movies").then(mywatchlist=>{
    res.render('watchlist',{username:current_token.user,watchlist:mywatchlist.data})
  }).catch(err =>{
    res.render('error',{error:err})
  })
})

router.get('/favourites',function(req,res,next){
  var token = req.cookies.access_token;
  var current_token = JSON.parse(Buffer.from(token.split('.')[1], 'base64'));
  axios.get(ap.api_accesspoint+"/account/"+current_token.id+"/favorite/movies").then(favourites=>{
    res.render('favourites',{username:current_token.user,myfavourites:favourites.data,id:current_token.id})
  }).catch(err =>{
    res.render('error',{error:err})
  })
})

router.get('/logout',function(req,res,next){  
  res.clearCookie("access_token");
  res.render('home',{username:null,rtoken:null});
  res.end();
})

module.exports = router;
