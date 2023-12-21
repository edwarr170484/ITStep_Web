let products = [
  { name: "Наушники", count: 1, price: 10 },
  { name: "Lamborgini", count: 1, price: 45123 },
  { name: "Хлеб", count: 2, price: 3.5 },
];

let productsList = document.createElement("div");
productsList.id = "products";

let counter = 1;
let totals = {
  count: 0,
  price: 0,
};

productsList.insertAdjacentHTML(
  "afterBegin",
  `<div class="product">
    <div class="product-name"><b>Имя товара</b></div>
    <div class="product-count"><b>Количество</b></div>
    <div class="product-price"><b>Цена</b></div>
    </div>`
);

products.forEach((product) => {
  productsList.insertAdjacentHTML(
    "beforeend",
    `<div class="product">
            <div class="product-name">${counter}. ${product.name}</div>
            <div class="product-count">${product.count}</div>
            <div class="product-price">${product.price}$</div>
        </div>`
  );
  totals.count += product.count;
  totals.price += product.count * product.price;
  counter++;
});

productsList.insertAdjacentHTML(
  "beforeend",
  `<div class="product">
            <div class="product-name"><b>Всего</b></div>
            <div class="product-count"><b>${totals.count}</b></div>
            <div class="product-price"><b>${totals.price}$</b> </div>
        </div>`
);

document.body.append(productsList);

let button = document.createElement("button");
button.id = "main-button";
button.classList.add("button");
button.innerText = "Подтвердить заказ";
document.body.append(button);

button.addEventListener("click", function () {
  let cover = document.createElement("div");
  cover.id = "modal-cover";
  cover.classList.add("modal-cover");

  let dialog = document.createElement("div");
  dialog.classList.add("modal-dialog");

  let header = document.createElement("h1");
  header.classList.add("modal-header");
  header.innerText = "Подтвердить заказ";
  header.style.fontSize = "20px";
  header.style.marginTop = "0";

  let text = document.createElement("p");
  text.innerText = "Вы дейстительно хотите подтвердить заказ?";
  text.style.marginTop = "0";

  let buttonConfirm = document.createElement("button");
  buttonConfirm.classList.add("button");
  buttonConfirm.innerText = "Одобрить";
  buttonConfirm.style.width = "100%";
  buttonConfirm.style.marginBottom = "10px";

  buttonConfirm.addEventListener("click", () => {
    document.getElementById("modal-cover").remove();
    productsList.classList.add("approved");
    button.remove();
  });

  let buttonClose = document.createElement("button");
  buttonClose.classList.add("button");
  buttonClose.innerText = "Отменить";
  buttonClose.style.width = "100%";
  buttonClose.style.backgroundColor = "gray";

  buttonClose.addEventListener("click", () => {
    document.getElementById("modal-cover").remove();
    productsList.classList.add("canceled");
    button.remove();
  });

  dialog.append(header);
  dialog.append(text);
  dialog.append(buttonConfirm);
  dialog.append(buttonClose);

  cover.append(dialog);
  document.body.append(cover);
});
