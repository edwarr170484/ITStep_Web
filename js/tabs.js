document.addEventListener("DOMContentLoaded", function () {
  const tabNav = document.querySelector(".tab-navigation");

  if (tabNav) {
    const pills = tabNav.querySelectorAll(".tab-pill");
    const tabs = tabNav.querySelectorAll(".tab-pane");

    [...pills].map(function (pill) {
      pill.addEventListener("click", function (event) {
        pills.forEach(function (item) {
          item.classList.remove("active");
        });

        this.classList.add("active");
        let tabName = this.dataset.tab;

        [...tabs].forEach(function (tab) {
          if (tab.id == tabName) {
            tab.classList.add("active");
          } else {
            tab.classList.remove("active");
          }
        });
      });
    });
  }

  const accordeons = document.querySelectorAll(".accordeon");
  if (accordeons) {
    [...accordeons].forEach(function (accordeon) {
      const accordeonItems = accordeon.querySelectorAll(".accordeon-item");

      [...accordeonItems].forEach(function (item) {
        item.addEventListener("click", function () {
          if (!this.classList.contains("active")) {
            accordeonItems.forEach(function (item) {
              item.classList.remove("active");
            });

            this.classList.add("active");
          } else {
            this.classList.remove("active");
          }
        });
      });
    });
  }
});
