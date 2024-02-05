var MovieModel = require('../schema/schema')

module.exports.addtoWatchlist = async movieid =>{
    try{
        var n = await MovieModel.find({"_id":idmovie}).count();
        if(n==0){
            MovieModel.create({
                "_id":movieid,
                "favourite":false,
                "watchlist":true 
             }).then(data =>{
                 return {
                     "_id":movieid,
                     "favourite":false,
                     "watchlist":true 
                  };
             }).catch(erro =>{
                 return erro
             })
        }else{
            MovieModel.updateOne({"_id":movieid},{$set:{"watchlist":true}}).then(data=>{
                console.log(data)
                MovieModel.findOne({"_id":movieid}).then(dados=>{
                    return dados
                }).catch(erro=>{
                    return erro
                })
            }).catch(erro=>{
                return erro;
            })
        }
    }catch(err){
        return err;
    }
}

module.exports.addtoFavourite = movieid => {
    if(MovieModel.find({"_id":movieid}).count()==0){
        MovieModel.create({
           "_id":movieid,
           "favourite":true,
           "watchlist":false 
        }).then(data =>{
            return {
                "_id":movieid,
                "favourite":true,
                "watchlist":false 
            };
        }).catch(erro =>{
            return erro
        })
    }else{
        MovieModel.updateOne({"_id":movieid},{$set:{"favourite":true}}).then(data=>{
            console.log(data)
            MovieModel.findOne({"_id":movieid}).then(dados=>{
                return dados
            }).catch(erro=>{
                return erro
            })
        }).catch(erro=>{
            return erro;
        })
    }
}

module.exports.getpreferences= async idmovie =>{
    try{
        var n = await MovieModel.find({"_id":idmovie}).count();
        if(n==0){
            var a = {"_id":idmovie,"favourite":false,"watchlist":false};
            return a
        }else{
            MovieModel.findOne({"_id":idmovie}).then(dados=>{
                return dados
            }).catch(erro=>{
                return erro
            })
        }
    }catch(err){
        return err;
    }
}
