document.body.addEventListener("keydown", function(event){
  if(event.keyCode == 82){
    
  }
});

if(window.localStorage.getItem("users"))
{
  let users = JSON.parse(window.localStorage.getItem("users"));
  let cardList = document.getElementsByClassName("card-list")[0];

  if(cardList){
    if(users.length > 0){
      cardList.innerHTML = "";

      users.forEach(function(user){
        let newCard = `<div class="card" draggable="true" ondragstart="drag.start(event)" id="${user.id}">
                      <img src="img/student-avatar.png" alt="" ondragstart="event.preventDefault()"/>
                      <div class="card-name">${user.name}</div>
                      <div class="card-age">Возраст: ${user.age} лет</div>
                      <button type="button" onclick="editUser(${user.id})">Инфо</button>
                  </div>`;
        cardList.insertAdjacentHTML("beforeEnd", newCard);
      });
    }
  }
}

function sendForm(event) {
  let error = 0;

  error += validate(
    event.target[0],
    /^[А-Я][а-яА-Я\s]*[а-я]$/g,
    "Введите корректное имя"
  );
  error += validate(
    event.target[3],
    /^\+375[0-9]{9}$/g,
    "Введите правильный номер телефона (+375ХХХХХХХХХ)"
  );
  error += validate(
    event.target[4],
    /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/g,
    "Введите корректный адрес электронной почты"
  );
  error += validate(
    event.target[5],
    /^(https?:\/\/)?[0-9a-z-_]*(\.[0-9a-z-_]+)*(\.[a-z]+)+(\/[0-9a-z-_]*)*?\/?$/g,
    "Введите корректный адрес URL"
  );
  error += validate(
    event.target[6],
    /[\w\W\d\D]{10,}/g,
    "Ваш адрес слишком короток"
  );

  if (error === 0) {
    let cardList = document.getElementsByClassName("card-list")[0];

    if (cardList) {
      let now = new Date();
      let birthday = new Date(event.target[1].value);
      let id = Math.floor(Math.random() * 1000);

      let newCard = `<div class="card" draggable="true" ondragstart="drag.start(event)" id="user-${id}">
                      <img src="img/student-avatar.png" alt="" ondragstart="event.preventDefault()"/>
                      <div class="card-name">${event.target[0].value}</div>
                      <div class="card-age">Возраст: ${
                        now.getFullYear() - birthday.getFullYear()
                      } лет</div>
                      <button type="button">Инфо</button>
                  </div>`;

      let cards = document.getElementsByClassName("card");

      if (cards.length > 0) {
        cardList.insertAdjacentHTML("beforeEnd", newCard);
      } else {
        cardList.innerHTML = newCard;
      }

      let user = {
        id: id,
        name: event.target[0].value,
        birthday: event.target[1].value,
        age: now.getFullYear() - birthday.getFullYear(),
        pol: event.target[2].value,
        phone: event.target[3].value,
        email: event.target[4].value,
        url: event.target[5].value,
        address: event.target[6].value
      }

      let users = [];

      if(window.localStorage.getItem("users"))
      {
        users = JSON.parse(window.localStorage.getItem("users"));
      }

      users.push(user);
      
      window.localStorage.setItem("users", JSON.stringify(users));
    }
  }

  return false;
}

function validate(element, regexTemplate, errorMessage) {
  let val = element.value;
  let errorField = document.createElement("div");
  errorField.classList.add("error");

  if (element.nextElementSibling) {
    element.nextElementSibling.remove();
    element.classList.remove("error");
  }

  if (!regexTemplate.test(val)) {
    errorField.innerText = errorMessage;
    element.parentElement.append(errorField);
    element.classList.add("error");
    return true;
  } else {
    return false;
  }
}

let drag = {
  el(e, className) {
    let el = e.target;

    while (!el.classList.contains(className)) {
      el = el.parentElement;
    }

    return el;
  },
  start(e) {
    let el = this.el(e, "card");
    e.dataTransfer.setData("text/html", el.id);
    e.dataTransfer.effectAllowed = "move";
  },
  enter(e) {
    e.preventDefault();
    this.el(e, "card-remove").classList.add("active");
    e.dataTransfer.dropEffect = "move";
  },
  over(e) {
    this.enter(e);
  },
  leave(e) {
    this.el(e, "card-remove").classList.remove("active");
  },
  drop(e) {
    let backet = this.el(e, "card-remove");

    if (confirm("Вы действительно хотите удалить карточку?")) {
      let cardList = document.getElementsByClassName("card-list")[0];
      let cards = document.getElementsByClassName("card");
      let card = document.getElementById(e.dataTransfer.getData("text/html"));

      if (card) {
        card.remove();
        backet.classList.remove("active");
        backet.classList.add("action");
        setInterval(() => {
          backet.classList.remove("action");
        }, 500);

        if (cards.length <= 0) {
          cardList.innerHTML = "<p>Список пока пуст</p>";
        }
      }
    } else {
      this.leave(e);
    }
  },
};
