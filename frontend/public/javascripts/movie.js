//funcao que vai ser triggered no carregamento da pagina
$(function(){

    /*
    for(let i=0;i<20;i++){
        var content='<div class="grid-item owl-item active" style="width: auto; "><a class="gPoster" href="filmes/' + 'movie.title' + '" title="Assistir: ' + 'movie.title' + '" ><div class="inner"><div class="p"><img src="https://image.tmdb.org/t/p/w220_and_h330_face' + '/ekZobS8isE6mA53RAiGDG93hBxL.jpg' + '" alt="Assistir: ' + 'the movie' + '" /></div><div class="i"><span>' + 'the movie' + '</span><div class="mi"><div class="y">' + '2023-07-07' + '</div><div class="r">' + '23.23' +'</div><div class="s"><svg fill="#000000" width="10px" height="10px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffbd0d" d="M3.488 13.184l6.272 6.112-1.472 8.608 7.712-4.064 7.712 4.064-1.472-8.608 6.272-6.112-8.64-1.248-3.872-7.808-3.872 7.808z"></path></svg></div><div class="t">' + '213.23' + '</div></div></div></div></a></div>' 
        $("#movies-grid-container").append(content)
    }*/

    
    $.ajax({
        url:"http://localhost:7777/movie/upcoming",
        data: {
            api_key: "f31c324e8f7bf664a34aedac658bfbf5",
            region: 'US'
        },
        method: 'GET',
        dataType: 'jsonp',
        start_time: new Date().getTime()
        }).fail(function(response) {
          console.log(response);
        }).done(function(data) {
            
            data.results.forEach(movie => {

                var content='<div class="grid-item owl-item active" style="width: auto; "><a class="gPoster" href="filmes/' + movie.id + '" title="Assistir: ' + movie.title + '" ><div class="inner"><div class="p"><img src="https://image.tmdb.org/t/p/w220_and_h330_face' + movie.poster_path + '" alt="Assistir: ' + movie.title + '" /></div><div class="i"><span>' + movie.title + '</span><div class="mi"><div class="y">' + movie.release_date + '</div><div class="r">' + movie.vote_average +'</div><div class="s"><svg fill="#000000" width="10px" height="10px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffbd0d" d="M3.488 13.184l6.272 6.112-1.472 8.608 7.712-4.064 7.712 4.064-1.472-8.608 6.272-6.112-8.64-1.248-3.872-7.808-3.872 7.808z"></path></svg></div><div class="t">' + movie.popularity + '</div></div></div></div></a></div>' 
                $("#movies-grid-container").append(content)
            
                });        
            $("#lastpage").html(data.total_pages)
            $("#lastpage").val(data.total_pages)
    
        });
        
    // trigger trending movies
    $("#trending").on("click",function(){
        $("#movies-grid-container").empty()

        $.ajax({
            url:"http://localhost:7777/trending/movie/day",
            dataType:'jsonp',
            data:{
                api_key:"f31c324e8f7bf664a34aedac658bfbf5",
                region: 'US'
            },
            method: 'GET',
            start_time: new Date().getTime()

        }).fail(function(response){
            console.log(response)
        }).done(function(data){

            data.results.forEach(movie => {

                var content='<div class="grid-item owl-item active" style="width: auto; "><a class="gPoster" href="filmes/' + movie.id + '" title="Assistir: ' + movie.title + '" ><div class="inner"><div class="p"><img src="https://image.tmdb.org/t/p/w220_and_h330_face' + movie.poster_path + '" alt="Assistir: ' + movie.title + '" /></div><div class="i"><span>' + movie.title + '</span><div class="mi"><div class="y">' + movie.release_date + '</div><div class="r">' + movie.vote_average +'</div><div class="s"><svg fill="#000000" width="10px" height="10px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffbd0d" d="M3.488 13.184l6.272 6.112-1.472 8.608 7.712-4.064 7.712 4.064-1.472-8.608 6.272-6.112-8.64-1.248-3.872-7.808-3.872 7.808z"></path></svg></div><div class="t">' + movie.popularity + '</div></div></div></div></a></div>' 
                $("#movies-grid-container").append(content)
            
                });        
            $("#lastpage").html(data.total_pages)
            $("#lastpage").val(data.total_pages)

        })
    })

    //trigger actors movies
    $("#actors").on("click",function(){
        $("#movies-grid-container").empty()

        $.ajax({
            url:"http://localhost:7777/person/popular",
            dataType:'jsonp',
            data:{
                api_key:"f31c324e8f7bf664a34aedac658bfbf5",
                region: 'US'
            },
            method: 'GET',
            start_time: new Date().getTime()

        }).fail(function(response){
            console.log(response)
        }).done(function(data){

            data.results.forEach(actor => {
                var gen ="Masculino"
                if(actor.gender==1) gen="Feminino"
                var content='<div class="grid-item owl-item active" style="width: auto; "><a class="gPoster" href="actors/' + actor.id + '"><div class="inner"><div class="p"><img src="https://image.tmdb.org/t/p/w220_and_h330_face' + actor.profile_path + '" /></div><div class="i"><span>' + actor.name + '</span><div class="mi"><div class="y">' + gen + '</div><div class="r">' + Math.round(actor.popularity) +'</div><div class="s"><svg fill="#000000" width="10px" height="10px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffbd0d" d="M3.488 13.184l6.272 6.112-1.472 8.608 7.712-4.064 7.712 4.064-1.472-8.608 6.272-6.112-8.64-1.248-3.872-7.808-3.872 7.808z"></path></svg></div><div class="t">' + actor.known_for_department + '</div></div></div></div></a></div>' 
                $("#movies-grid-container").append(content)
            
                });        
            $("#lastpage").html(data.total_pages)
            $("#lastpage").val(data.total_pages)

        })
    })

    //trigger ranked movies
    $("#toprank").on("click",function(){
        $("#movies-grid-container").empty()

        $.ajax({
            url:"http://localhost:7777/movie/top_rated ",
            dataType:'jsonp',
            data:{
                api_key:"f31c324e8f7bf664a34aedac658bfbf5",
                region: 'US'
            },
            method: 'GET',
            start_time: new Date().getTime()

        }).fail(function(response){
            console.log(response)
        }).done(function(data){

            data.results.forEach(movie => {

                var content='<div class="grid-item owl-item active" style="width: auto; "><a class="gPoster" href="filmes/' + movie.id + '" title="Assistir: ' + movie.title + '" ><div class="inner"><div class="p"><img src="https://image.tmdb.org/t/p/w220_and_h330_face' + movie.poster_path + '" alt="Assistir: ' + movie.title + '" /></div><div class="i"><span>' + movie.title + '</span><div class="mi"><div class="y">' + movie.release_date + '</div><div class="r">' + movie.vote_average +'</div><div class="s"><svg fill="#000000" width="10px" height="10px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffbd0d" d="M3.488 13.184l6.272 6.112-1.472 8.608 7.712-4.064 7.712 4.064-1.472-8.608 6.272-6.112-8.64-1.248-3.872-7.808-3.872 7.808z"></path></svg></div><div class="t">' + movie.popularity + '</div></div></div></div></a></div>' 
                $("#movies-grid-container").append(content)
            
                });        
            $("#lastpage").html(data.total_pages)
            $("#lastpage").val(data.total_pages)

        })
    })
})
