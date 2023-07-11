var express = require('express');
var axios = require('axios')
var ap = require('../ap/env')
var router = express.Router();
var fs = require('fs')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
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
    date1 = new Date(file).getDate()
    date2 = new Date().getDate()
    if((Math.abs(date2-date1)/3600000)<1 && exists==false){
      exists=true
      fs.readFile("tokens/"+file,function(err,data){
        if(err) console.log(err)
        else{
          currentToken= data
          console.log("current token: "+currentToken)
          axios.get(ap.api_accesspoint+'/session/'+currentToken).then(resp =>{
            sessionid=resp.data.session_id
            console.log("session ID:" +  sessionid)
            res.render('home',{sid:sessionid,token:currentToken})
          }).catch(err =>{
            res.render('error',{error:err})
          })
        }
      })
    }
  })
  if(exists==false){
    res.redirect('/auth')
  }
})

router.get('/auth',function(req,res,next){
  console.log("interface - /auth")
  axios.get(ap.api_accesspoint+'/auth').then(resp =>{
    var data = new Date().toString()
    fs.writeFileSync('tokens/'+data,resp.data.request_token)
    res.redirect('https://www.themoviedb.org/authenticate/'+resp.data.request_token+"?redirect_to=http://localhost:7778/")
  }).catch(err =>{
    res.render('error',{error:err})
  })
});

router.get('/filmes/:idmovie', function(req,res,next){
  axios.get(ap.api_accesspoint+"/movie/"+req.params.idmovie).then(resp =>{
    axios.get(ap.api_accesspoint+"/movie/"+req.params.idmovie+"/images").then(images =>{
      res.render('movie',{filme:resp.data,year: resp.data.release_date.substring(0,4), imagens:images.data})
      }).catch(err =>{
      res.render('error',{error:err})
    })
  }).catch(err =>{
    res.render('error',{error:err})
  })
})

module.exports = router;
