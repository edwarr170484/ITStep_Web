function sendForm(event){
    let error = {};

    let address = event.target[6].value;

    if(address.length < 10){
        error.address = "Ваш адрес слишком короток";
        let addresField = document.getElementById("address-error");
        addresField.innerHTML = error.address;
        addresField.previousElementSibling.classList.add("error");
    }else{
        error.address = null;
        let addresField = document.getElementById("address-error");
        addresField.innerHTML = '';
        addresField.previousElementSibling.classList.remove("error");
    }

    let name = event.target[0].value;
    let nameTemplate = /^[А-Я][а-яА-Я\s]*[а-я]$/g;

    if(!nameTemplate.test(name)){
        error.name = "Введите корректное имя";
        let nameField = document.getElementById("name-error");
        nameField.innerHTML = error.name;
        nameField.previousElementSibling.classList.add("error");
    }else{
        error.name = null;
        let nameField = document.getElementById("name-error");
        nameField.innerHTML = '';
        nameField.previousElementSibling.classList.remove("error");
    }

    let phone = event.target[3].value;
    let phoneTemplate = /^\+375[0-9]{9}$/g;

    if(!phoneTemplate.test(phone)){
        error.phone = "Введите правильный номер телефона (+375ХХХХХХХХХ)";
        let phoneField = document.getElementById("phone-error");
        phoneField.innerHTML = error.phone;
        phoneField.previousElementSibling.classList.add("error");
    }else{
        error.name = null;
        let phoneField = document.getElementById("name-error");
        phoneField.innerHTML = '';
        phoneField.previousElementSibling.classList.remove("error");
    }

    return false;
}