$(document).ready(function(){
    getData();

    setInterval(getData, 3000);
});


async function getData() {
    let response = await fetch('https://catfact.ninja/fact');

    if (response.ok) { 
        let data = await response.json();
        let products = `<div class="product">
                                <h3>Интересное о котах:</h3>
                                <div class="product-data">
                                    <p>${data.fact}</p>
                                </div>
                                <div class="product-price">
                                    <span>${data.length}</span>
                                </div>
                        </div>`;
        $(".phones").html(products);             
    } else {
        alert("Ошибка HTTP: " + response.status);
    }


    /*let xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://catfact.ninja/fact');

    xhr.send();

    xhr.onload = function() {
        let data = JSON.parse(xhr.response);
        let products = `<div class="product">
                                <h3>Интересное о котах:</h3>
                                <div class="product-data">
                                    <p>${data.fact}</p>
                                </div>
                                <div class="product-price">
                                    <span>${data.length}</span>
                                </div>
                        </div>`;

        $(".phones").html(products);
    };*/
}