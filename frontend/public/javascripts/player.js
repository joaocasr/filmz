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
    var b = $("#watchlistbtn").data()
    let watchlist = b.button.mwatchlist
    console.log("entrou na watchlistclick");
    console.log("button data: "+JSON.stringify(b));
    const svgcontainer = $("#watchlistbtn").find('a')
    console.log("watchlist value: "+watchlist);

    if(token==undefined){
        return 0;
    }
    if (watchlist === true) {
        console.log("oi1");
        $("#watchlist_marked").hide();
        svgcontainer.html('<svg xmlns="http://www.w3.org/2000/svg" id="watchlist_unmarked" width="50px" height="50px" viewBox="0 0 24 24" fill="white"><path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M2.25 6C2.25 5.58579 2.58579 5.25 3 5.25H20C20.4142 5.25 20.75 5.58579 20.75 6C20.75 6.41421 20.4142 6.75 20 6.75H3C2.58579 6.75 2.25 6.41421 2.25 6ZM2.25 11C2.25 10.5858 2.58579 10.25 3 10.25H11C11.4142 10.25 11.75 10.5858 11.75 11C11.75 11.4142 11.4142 11.75 11 11.75H3C2.58579 11.75 2.25 11.4142 2.25 11ZM2.25 16C2.25 15.5858 2.58579 15.25 3 15.25H11C11.4142 15.25 11.75 15.5858 11.75 16C11.75 16.4142 11.4142 16.75 11 16.75H3C2.58579 16.75 2.25 16.4142 2.25 16Z" fill="white"/><path d="M14.4697 10.4697C14.7626 10.1768 15.2374 10.1768 15.5303 10.4697L17.5 12.4393L19.4697 10.4697C19.7626 10.1768 20.2374 10.1768 20.5303 10.4697C20.8232 10.7626 20.8232 11.2374 20.5303 11.5303L18.5607 13.5L20.5303 15.4697C20.8232 15.7626 20.8232 16.2374 20.5303 16.5303C20.2374 16.8232 19.7626 16.8232 19.4697 16.5303L17.5 14.5607L15.5303 16.5303C15.2374 16.8232 14.7626 16.8232 14.4697 16.5303C14.1768 16.2374 14.1768 15.7626 14.4697 15.4697L16.4393 13.5L14.4697 11.5303C14.1768 11.2374 14.1768 10.7626 14.4697 10.4697Z" fill="white"/></svg>')  
    }else if (watchlist === false) {
        console.log("oi2");
        $("#watchlist_unmarked").hide();
        svgcontainer.html('<svg id="watchlist_marked" xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24" fill="none"><path d="M14 16L16.1 18.5L20 13.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 14H3" stroke="white" stroke-width="1.5" stroke-linecap="round"/><path d="M10 18H3" stroke="white" stroke-width="1.5" stroke-linecap="round"/><path d="M3 6L13.5 6M20 6L17.75 6" stroke="white" stroke-width="1.5" stroke-linecap="round"/><path d="M20 10L9.5 10M3 10H5.25" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg>')
    }
    let newwatchlist=false;
    if(watchlist===false){
        newwatchlist=true;
    }
    console.log("next value: "+newwatchlist);
    $('#watchlistbtn').data('button', {"mwatchlist":newwatchlist});

    $.ajax({
        type:"POST",
        url:"http://localhost:7777/account/"+account_id+"/watchlist/"+token,
        data:{
            media_type: 'movie',
            media_id: movieid,
            watchlist: true
        },
        statusCode:{
            404: function (response) {
                console.log("error :"+response);
            }/*,
            200: function (response) {
                console.log("success :olarilole");
            }*/
        }, success: function () {
            console.log("success");
        },
        dataType: 'json'
    });
}

function favouriteclick(id,username,token){
    var favdata = $("#favouritebtn").data()
    console.log("button data: "+JSON.stringify(favdata));
    var isliked = favdata.button.mfavourite
    var svgcontainer = $("#favouritebtn").find('a')
    console.log("isliked value: "+isliked);

    if(isliked===true){
        $("#fav_marked").hide();
        svgcontainer.html('<svg id="fav_unmarked" transform="translate(0 -5)" viewBox="0 0 24 24" id="favourite" data-name="Line Color" xmlns="http://www.w3.org/2000/svg" class="icon line-color" fill="white" width="42px" height="42px"><path id="primary" d="M19.57,5.44a4.91,4.91,0,0,1,0,6.93L12,20,4.43,12.37A4.91,4.91,0,0,1,7.87,4a4.9,4.9,0,0,1,3.44,1.44,4.46,4.46,0,0,1,.69.88,4.46,4.46,0,0,1,.69-.88,4.83,4.83,0,0,1,6.88,0Z" style="fill: none; stroke: white; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/></svg>')
    }else if(isliked==false){
        $("#fav_unmarked").hide(); // creio que os hides sejam desnecessarios já que na linha seguinte colocamos o codigo html que está aninhado à tag a
        svgcontainer.html('<svg id="fav_marked" transform="translate(0 -5)" xmlns="http://www.w3.org/2000/svg" fill="red" width="42px" height="42px" viewBox="0 0 24 24" id="favourite-alt" class="icon glyph"><path d="M16.5,3A5.38,5.38,0,0,0,12,5.57,5.38,5.38,0,0,0,7.5,3,5.8,5.8,0,0,0,2,9c0,8.75,9.22,12.72,9.61,12.88a1,1,0,0,0,.78,0C12.78,21.76,22,17.79,22,9A5.8,5.8,0,0,0,16.5,3Z"/></svg>')
    }

    let newisliked = false;
    if(isliked===false){
        newisliked=true;
    }
    console.log("next value: "+newisliked);
    $('#favouritebtn').data('button', {"mfavourite":newisliked});

}
