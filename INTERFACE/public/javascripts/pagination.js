$(function(){
    $("#forward").on("click",function(){
        var page = $("#actualpage").val()
        console.log("actual:"+ page)
        a = parseInt(page)
        page = a + 1;
        
        console.log("now:"+ page)
        $("#actualpage").val(page)
        $("#actualpage").html(page)

        var myurl="";
        if($("#pagetype").val()=="upcoming"){
            myurl="http://localhost:7777/movie/upcoming?page="+page
            console.log("my url "+myurl)
        }else if($("#pagetype").val()=="trending"){
            myurl="http://localhost:7777/trending/movie/day?page="+page
            console.log("my url "+myurl)
        }else if($("#pagetype").val()=="actors"){
            myurl="http://localhost:7777/person/popular?page="+page
            console.log("my url "+myurl)
        }else if($("#pagetype").val()=="toprank"){
            myurl="http://localhost:7777/movie/top_rated?page="+page
            console.log("my url "+myurl)
        }

        $("#movies-grid-container").empty()
        $.ajax({
            url:myurl,
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
                    var content=""
                    if($("#pagetype").val()=="actors"){
                        var gen ="Masculino"
                        if(movie.gender==1) gen="Feminino"
                        content='<div class="grid-item owl-item active" style="width: auto; "><a class="gPoster" href="filmes/' + movie.name + '"><div class="inner"><div class="p"><img src="https://image.tmdb.org/t/p/w220_and_h330_face' + movie.profile_path + '" /></div><div class="i"><span>' + movie.name + '</span><div class="mi"><div class="y">' + gen + '</div><div class="r">' + Math.round(movie.popularity) +'</div><div class="s"><svg fill="#000000" width="10px" height="10px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffbd0d" d="M3.488 13.184l6.272 6.112-1.472 8.608 7.712-4.064 7.712 4.064-1.472-8.608 6.272-6.112-8.64-1.248-3.872-7.808-3.872 7.808z"></path></svg></div><div class="t">' + movie.known_for_department + '</div></div></div></div></a></div>' 
                    }else{
                        content='<div class="grid-item owl-item active" style="width: auto; "><a class="gPoster" href="filmes/' + movie.title + '" title="Assistir: ' + movie.title + '" ><div class="inner"><div class="p"><img src="https://image.tmdb.org/t/p/w220_and_h330_face' + movie.poster_path + '" alt="Assistir: ' + movie.title + '" /></div><div class="i"><span>' + movie.title + '</span><div class="mi"><div class="y">' + movie.release_date + '</div><div class="r">' + movie.vote_average +'</div><div class="s"><svg fill="#000000" width="10px" height="10px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffbd0d" d="M3.488 13.184l6.272 6.112-1.472 8.608 7.712-4.064 7.712 4.064-1.472-8.608 6.272-6.112-8.64-1.248-3.872-7.808-3.872 7.808z"></path></svg></div><div class="t">' + movie.popularity + '</div></div></div></div></a></div>' 
                    }
                    $("#movies-grid-container").append(content)
                
                    });        
    
            });

    })

    $("#back").on("click",function(){
        var page = $("#actualpage").val()
        console.log("actual:"+ page)
        a = parseInt(page)
        page = a - 1;
        if(page==0){
            page = page +1;
        }

        console.log("now:"+ page)
        $("#actualpage").val(page)
        $("#actualpage").html(page)

        var myurl="";
        if($("#pagetype").val()=="upcoming"){
            myurl="http://localhost:7777/movie/upcoming?page="+page
            console.log("my url "+myurl)
        }else if($("#pagetype").val()=="trending"){
            myurl="http://localhost:7777/trending/movie/day?page="+page
            console.log("my url "+myurl)
        }else if($("#pagetype").val()=="actors"){
            myurl="http://localhost:7777/person/popular?page="+page
            console.log("my url "+myurl)
        }else if($("#pagetype").val()=="toprank"){
            myurl="http://localhost:7777/movie/top_rated?page="+page
            console.log("my url "+myurl)
        }

        $("#movies-grid-container").empty()
        $.ajax({
            url:myurl,
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

                    var content=""
                    if($("#pagetype").val()=="actors"){
                        var gen ="Masculino"
                        if(movie.gender==1) gen="Feminino"
                        content='<div class="grid-item owl-item active" style="width: auto; "><a class="gPoster" href="filmes/' + movie.name + '"><div class="inner"><div class="p"><img src="https://image.tmdb.org/t/p/w220_and_h330_face' + movie.profile_path + '" /></div><div class="i"><span>' + movie.name + '</span><div class="mi"><div class="y">' + gen + '</div><div class="r">' + Math.round(movie.popularity) +'</div><div class="s"><svg fill="#000000" width="10px" height="10px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffbd0d" d="M3.488 13.184l6.272 6.112-1.472 8.608 7.712-4.064 7.712 4.064-1.472-8.608 6.272-6.112-8.64-1.248-3.872-7.808-3.872 7.808z"></path></svg></div><div class="t">' + movie.known_for_department + '</div></div></div></div></a></div>' 
                    }else{
                        content='<div class="grid-item owl-item active" style="width: auto; "><a class="gPoster" href="filmes/' + movie.title + '" title="Assistir: ' + movie.title + '" ><div class="inner"><div class="p"><img src="https://image.tmdb.org/t/p/w220_and_h330_face' + movie.poster_path + '" alt="Assistir: ' + movie.title + '" /></div><div class="i"><span>' + movie.title + '</span><div class="mi"><div class="y">' + movie.release_date + '</div><div class="r">' + movie.vote_average +'</div><div class="s"><svg fill="#000000" width="10px" height="10px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffbd0d" d="M3.488 13.184l6.272 6.112-1.472 8.608 7.712-4.064 7.712 4.064-1.472-8.608 6.272-6.112-8.64-1.248-3.872-7.808-3.872 7.808z"></path></svg></div><div class="t">' + movie.popularity + '</div></div></div></div></a></div>' 
                    }
                    $("#movies-grid-container").append(content)
                });        
    
            });

    })
})