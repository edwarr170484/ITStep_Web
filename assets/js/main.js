let menuToggler = document.querySelector(".menu-toggler");
let nav = document.getElementById("menu");

if (menuToggler) {
  menuToggler.addEventListener("click", (e) => {
    if (menuToggler.classList.contains("pushed")) {
      menuToggler.classList.remove("pushed");
      nav.classList.remove("opened");
    } else {
      menuToggler.classList.add("pushed");
      nav.classList.add("opened");
    }
  });
}
