var express = require('express');
var axios = require('axios')
var config = require('../config/config')
var router = express.Router();


/***********************************/
// POST- ADD TO WATCHLIST
/***********************************/
/* session id needed
router.post('/account/20089216/watchlist', function(req, res, next) {
  config.options.method = 'POST' 
  config.options.body = req.body
  config.options.headers['content-type'] = 'application/json'
  config.options.url = config.url + "/account/20089216/watchlist"
  console.log(config.options)
  console.log(req.body)
  axios.request(config.options).then(resp =>{
    res.jsonp(resp.data);
  }).catch(err =>{
    res.status(404).json({error:err})
  })
  config.options.body={}
  config.options.headers.delete('content-type')
});
*/

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
  console.log("aqui")
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

module.exports = router;
