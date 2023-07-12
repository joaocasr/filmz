$(function(){
    var url = window.location.href
    const subdomains = url.split("/")
    const size = subdomains.length
    var movieID = subdomains[size-1]

    $.ajax({
        url:"http://localhost:7777/movie/"+movieID+"/recommendations",
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
            
            var content=""
            for(let i=0; i<10;i++){
                movie=data.results[i]
                content='<div class="grid-item owl-item active" style="width: auto; "><a class="gPoster" href="/filmes/' + movie.id + '" title="Assistir: ' + movie.title + '" ><div class="inner"><div class="p"><img src="https://image.tmdb.org/t/p/w220_and_h330_face' + movie.poster_path + '" alt="Assistir: ' + movie.title + '" /></div><div class="i"><span>' + movie.title + '</span><div class="mi"><div class="y">' + movie.release_date + '</div><div class="r">' + movie.vote_average +'</div><div class="s"><svg fill="#000000" width="10px" height="10px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffbd0d" d="M3.488 13.184l6.272 6.112-1.472 8.608 7.712-4.064 7.712 4.064-1.472-8.608 6.272-6.112-8.64-1.248-3.872-7.808-3.872 7.808z"></path></svg></div><div class="t">' + movie.popularity + '</div></div></div></div></a></div>' 
                $("#recommendations-grid-container").append(content)
            }
    })
})