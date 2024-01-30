$(function(){
    $("#assistir").on("click",function(){
        const el = document.getElementById("elmovie")
        el.removeAttribute("hidden")
    })
})

function displayTrailer(movieid){
    console.log("aqui está o id do video");
    console.log(movieid);
    $.ajax({
            url:"http://localhost:7777/movie/"+movieid+"/videos",
            data:{
                api_key:"f31c324e8f7bf664a34aedac658bfbf5",
                region: 'US'
            },
            method: 'GET',
            dataType:'jsonp',
            start_time: new Date().getTime()
        }).fail(function(response){
            console.log("failed")
            console.log(response)
        }).done(function(data){

            let key = data.results[0].key
            console.log("eis a key:")
            console.log(key)

            var link = $('<iframe id="trailerframe" width="420" height="315" src="https://www.youtube.com/embed/'+key+'?autoplay=0&mute=0"></iframe>')

            $("#framedivtrailer").append(link)
            $("#framedivtrailer").modal()
    })

}

function watchlistclick(movieid,account_id,token){
    console.log("entrou na watchlistclick");
    console.log(movieid);
    console.log(account_id);
    console.log(token);
    if(token==undefined){
        return 0;
    }
    $.post("http://localhost:7777/account/"+account_id+"/watchlist/"+token,
        {
            media_type: 'movie',
            media_id: movieid,
            watchlist: true
        },
        function(data, statusText, xhr){
            console.log(xhr)
            console.log("aqui")
            console.log(xhr.status)
            if(xhr.status==200){
                console.log("eureka.")
            }else{
                console.log("already exists or token invalid.")
            }
        });
}
