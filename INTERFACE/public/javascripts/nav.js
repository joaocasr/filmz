function changeActual(id){
    
        var v1 = document.getElementById("home");
        var v2 = document.getElementById("filmes");
        var v3 = document.getElementById("series")
    
        v1.classList.remove("active");
        v2.classList.remove("active");
        v3.classList.remove("active");
    
    
        var actual = document.getElementById(id);
        actual.classList.add("active");
}

function changeSpan(id){
    
        var v1 = document.getElementById("trending");
        var v2 = document.getElementById("upcoming");
        var v3 = document.getElementById("actors")
        var v4 = document.getElementById("toprank")
    
        v1.classList.remove("active");
        v2.classList.remove("active");
        v3.classList.remove("active");
        v4.classList.remove("active");
    
    
        var actual = document.getElementById(id);
        actual.classList.add("active");
        $("#pagetype").val(id)
        console.log($("#pagetype").val())
}