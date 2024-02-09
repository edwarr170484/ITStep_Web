let body = $("body");

let css = {
    backgroundColor: "red",
    fontSize: "30px"
}

body.css(css);
//body.text("Hello from Jquery");

body.append(`<h1>Hello from Jquery!!!</h1>`);
body.prepend(`<h1>Start!!!</h1>`);

function hide(){
    $("h1").fadeOut(1500, function(){
        body.css({backgroundColor: "blue"})
    });

    $(".ul li").each(function(){
        $(this).css({fontSize: `${Math.random() * 50}px`});
    });
}