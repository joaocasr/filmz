var express = require('express');
var axios = require('axios')
var config = require('../config/config')
var router = express.Router();


router.get('/auth/access_token',function(req,res,next){
  console.log("entrou");
  config.options.method = 'POST';
  config.options.headers['content-type'] = 'application/json';
  config.options.url= config.urlv4+"/auth/access_token";
  console.log(config.options);
  axios.request(config.options).then(resp =>{
    console.log("data from access_token request")
    console.log(resp.data)
    res.jsonp(resp.data)
  }).catch(err =>{
    res.status(404).json({error:err})
  })
})

router.get('/auth/request_token',function(req,res,next){
  config.options.method = 'GET'
  config.options.headers['content-type'] = 'application/json';
  config.options.url= config.url+"/authentication/token/new";
  axios.request(config.options).then(resp =>{
    console.log(resp.data)
    res.jsonp(resp.data)
  }).catch(err =>{
    res.status(404).json({error:err})
  })
})

/***********************************/
// SEARCH ROUTES
/***********************************/

/*GET /search/movie */
router.get('/search/movie', function(req, res, next) {
  config.options.method = 'GET'
  if(req.query.query){
    config.options.url = config.url + "/search/movie?query=" + req.query.query
  }
  if(req.query.page){
    config.options.url += "&page="+req.query.page
  }
  axios.request(config.options).then(resp =>{
    res.jsonp(resp.data);
  }).catch(err =>{
    res.status(404).json({error:err})
  })
  
});


/***********************************/
// TRENDING ROUTES
/***********************************/
/* GET /trending/all/day */
router.get('/trending/all/day', function(req, res, next) {
  config.options.method = 'GET'
  if(req.query.page){
    config.options.url = config.url + "/trending/all/day?page=" + req.query.page
  }else{
    config.options.url = config.url + "/trending/all/day"
  }
  axios.request(config.options).then(resp =>{
    res.jsonp(resp.data);
  }).catch(err =>{
    res.status(404).json({error:err})
  })
});

/* GET /trending/movie/day */
router.get('/trending/movie/day', function(req, res, next) {
  config.options.method = 'GET'
  if(req.query.page){
    config.options.url = config.url + "/trending/movie/day?page=" + req.query.page
  }else{
    config.options.url = config.url + "/trending/movie/day"
  }
  axios.request(config.options).then(resp =>{
    res.jsonp(resp.data);
  }).catch(err =>{
    res.status(404).json({error:err})
  })
});

/* GET /trending/person/day */
router.get('/trending/person/day', function(req, res, next) {
  config.options.method = 'GET'
  if(req.query.page){
    config.options.url = config.url + "/trending/person/day?page=" + req.query.page
  }else{
    config.options.url = config.url + "/trending/person/day"
  }
  axios.request(config.options).then(resp =>{
    res.jsonp(resp.data);
  }).catch(err =>{
    res.status(404).json({error:err})
  })
});

/* GET /trending/tv/day */
router.get('/trending/tv/day', function(req, res, next) {
  config.options.method = 'GET'
  if(req.query.page){
    config.options.url = config.url + "/trending/tv/day?page=" + req.query.page
  }else{
    config.options.url = config.url + "/trending/tv/day"
  }
  axios.request(config.options).then(resp =>{
    res.jsonp(resp.data);
  }).catch(err =>{
    res.status(404).json({error:err})
  })
});
/***********************************/


/***********************************/
// MOVIE LISTS ROUTES
/***********************************/
/* GET /movie/now_playing */
router.get('/movie/now_playing', function(req, res, next) {
  config.options.method = 'GET'
  if(req.query.page){
    config.options.url = config.url + "/movie/now_playing?page=" + req.query.page
  }else{
    config.options.url = config.url + "/movie/now_playing"
  }
  axios.request(config.options).then(resp =>{
    res.jsonp(resp.data);
  }).catch(err =>{
    res.status(404).json({error:err})
  })
});

/* GET /movie/popular */
router.get('/movie/popular', function(req, res, next) {
  config.options.method = 'GET'
  if(req.query.page){
    config.options.url = config.url + "/movie/popular?page=" + req.query.page
  }else{
    config.options.url = config.url + "/movie/popular"
  }
  axios.request(config.options).then(resp =>{
    res.jsonp(resp.data);
  }).catch(err =>{
    res.status(404).json({error:err})
  })
});

/* GET /movie/top_rated */
router.get('/movie/top_rated', function(req, res, next) {
  config.options.method = 'GET'
  if(req.query.page){
    config.options.url = config.url + "/movie/top_rated?page=" + req.query.page
  }else{
    config.options.url = config.url + "/movie/top_rated"
  }
  axios.request(config.options).then(resp =>{
    res.jsonp(resp.data);
  }).catch(err =>{
    res.status(404).json({error:err})
  })
});

/* GET /movie/upcoming */
router.get('/movie/upcoming', function(req, res, next) {
  config.options.method = 'GET'
  if(req.query.page){
    console.log("page entry")
    config.options.url = config.url + "/movie/upcoming?page=" + req.query.page
    console.log(config.options.url)
  }else{
    config.options.url = config.url + "/movie/upcoming"
  }
  axios.request(config.options).then(resp =>{
    res.jsonp(resp.data);
  }).catch(err =>{
    res.status(404).json({error:err})
  })
});
/***********************************/
/*GET /movie/{id} */
router.get('/movie/:id', function(req, res, next) {
  config.options.method = 'GET'
  config.options.url = config.url + "/movie/" + req.params.id
  axios.request(config.options).then(resp =>{
    res.jsonp(resp.data);
  }).catch(err =>{
    res.status(404).json({error:err})
  })
});
/***********************************/

/*GET /movie/{id}/images */
router.get('/movie/:id/images', function(req, res, next) {
  config.options.method = 'GET'
  config.options.url = config.url + "/movie/" + req.params.id +"/images"
  axios.request(config.options).then(resp =>{
    res.jsonp(resp.data);
  }).catch(err =>{
    res.status(404).json({error:err})
  })
});
/***********************************/

/*GET /movie/{id}/videos */
router.get('/movie/:id/videos', function(req, res, next) {
  config.options.method = 'GET'
  config.options.url = config.url + "/movie/" + req.params.id +"/videos"
  axios.request(config.options).then(resp =>{
    res.jsonp(resp.data);
  }).catch(err =>{
    res.status(404).json({error:err})
  })
});
/***********************************/
/*GET /movie/{id}/recommendations */
router.get('/movie/:id/recommendations', function(req, res, next) {
  config.options.method = 'GET'
  config.options.url = config.url + "/movie/" + req.params.id +"/recommendations"
  axios.request(config.options).then(resp =>{
    res.jsonp(resp.data);
  }).catch(err =>{
    res.status(404).json({error:err})
  })
});
/***********************************/


/***********************************/
// GENRES ROUTES
/***********************************/

/* GET /genre/movie/list */
router.get('/genre/movie/list', function(req, res, next) {
  config.options.method = 'GET'
  if(req.query.page){
    config.options.url = config.url + "/genre/movie/list?page=" + req.query.page
  }else{
    config.options.url = config.url + "/genre/movie/list"
  }
  axios.request(config.options).then(resp =>{
    res.jsonp(resp.data);
  }).catch(err =>{
    res.status(404).json({error:err})
  })
});

router.get('/person/popular', function(req, res, next) {
  config.options.method = 'GET'
  if(req.query.page){
    config.options.url = config.url + "/person/popular?page=" + req.query.page
  }else{
    config.options.url = config.url + "/person/popular"
  }  
  axios.request(config.options).then(resp =>{
    res.jsonp(resp.data);
  }).catch(err =>{
    res.status(404).json({error:err})
  })
});


/***********************************/
// GET- GET ALL WATCHLIST
/***********************************/
router.get('/account/:account_id/watchlist/movies',function(req,res,next){
  config.options.method = 'GET'
  config.options.url = config.url + "/account/"+req.params.account_id+"/watchlist/movies"
  axios.request(config.options).then(resp =>{
    res.jsonp(resp.data)
  }).catch(err =>{
    res.status(404).json({error:err})
  })
})

/***********************************/
// POST- ADD TO WATCHLIST
/***********************************/
//"{'media_type': 'movie', 'media_id': 550, 'watchlist': true}"

router.post('/account/:account_id/watchlist', function(req, res, next) {
  config.options.method = 'POST'
  config.options.headers['Content-Type'] = 'application/json'
  config.options.headers['Accept']='application/json'
  config.options.url = config.url + "/authentication/session/new?api_key="+config.my_api_key+"&request_token="+req.body.mytoken
  axios.request(config.options).then(resp =>{
    sessionid=resp.data.session_id
    console.log("sessão id _:"+sessionid)
    req.body['media_type'] = 'movie'
    req.body['media_id'] = 550
    req.body['watchlist'] = true
    config.options.body = req.body
    config.options.url = config.url + "/account/"+req.params.account_id+"/watchlist?api_key="+config.my_api_key+"&session_id="+sessionid
    axios.request(config.options).then(resp =>{
      res.jsonp(resp.data);
    }).catch(err =>{
      res.status(404).json({error:err})
    })    
  }).catch(err =>{
    res.status(404).json({error:err})
  })
});


module.exports = router;
