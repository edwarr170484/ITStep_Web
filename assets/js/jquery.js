
$(document).ready(function() {
    $("body").css({
        'backgroundColor': 'white',
        'margin': 0,
        'padding': 0
    });

    $("#show").click(function(){
        $(".wrapper div").animate({
            'width': '150px',
            'height': '50px'
        });
    });

    $( "#accordion" ).accordion({
        collapsible: true
    });

    $(".owl-carousel").owlCarousel({
        margin: 30,
        loop: true,
        autoplay: true,
        items: 1
    });
});


/*$("#toggle").click(function(){
    let display = $(".text").css('display');
    $(this).text('Открыть текст');

    if(display == 'none') {
        $(this).text('Закрыть текст');
    }

    $(".text").slideToggle();
});*/

$("#toggle").click(function(){
    $(this).text('Открыть текст');

    if($(".text").hasClass('closed')) {
        $(this).text('Закрыть текст');
        $(".text").removeClass('closed').removeClass('disabled').slideToggle();
    } else {
        $(".text").addClass('closed').addClass('disabled').slideToggle();
    }
}); 

$("#addItem").on('click', function(){
    let count = $("#list li").length;
    let text = 'Ссылка ' + (count + 1);
    let href = $("#link").val();

    let item = $(`<li><a href="${href}">${text}</a></li>`);

    $("#list").append(item);

    $("#link").val(null);
});