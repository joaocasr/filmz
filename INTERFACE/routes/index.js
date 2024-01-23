var express = require('express');
var axios = require('axios')
var ap = require('../ap/env')
var router = express.Router();
var fs = require('fs')

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.query.approved){
    res.render('home',{accountid:"johnnytuga"});
    /*axios.get(ap.api_accesspoint+"/auth/access_token").then(resp =>{
      accid=resp.data.account_id
      res.render('home',{accountid:accid});
    }).catch(err =>{
      res.render('error',{error:err})
    })*/
  }
  else{
    res.render('home',{accountid:null});
  } 
  /*axios.get(ap.api_accesspoint+'/movie/upcoming').then(resp =>{
    res.render('home',{brev:resp.data.results});
  }).catch(err =>{
    res.render('error',{error:err})
  })*/
});

router.get('/token', function(req, res, next) {
  console.log("interface - /token")
  const dir = 'tokens/';
  exists=false
  fs.readdirSync(dir).forEach(file => {
    date1 = parseInt(file);
    console.log(date1);
    date2 = new Date().getTime();
    console.log(date2);
    if((Math.abs(date2-date1)/3600000)<1 && exists==false){
      exists=true
      fs.readFile("tokens/"+file,function(err,data){
        if(err) console.log(err)
        else{
          currentToken= data
          console.log("current token: "+currentToken)
          res.redirect("https://www.themoviedb.org/authenticate/"+currentToken+"?redirect_to=http://localhost:7778/?approved=true")
        }
      })
    }
  })
  if(exists==false){
    res.redirect('/auth/request_token')
  }
})

router.get('/auth/request_token',function(req,res,next){
  axios.get(ap.api_accesspoint+"/auth/request_token").then(resp =>{
    var data = new Date().getTime().toString()
    fs.writeFileSync('tokens/'+data,resp.data.request_token);
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

module.exports = router;
