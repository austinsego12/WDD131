const themeSelector = document.querySelector("#themeSelector");
const logo = document.querySelector("#logo");

function changeTheme() {
  if (themeSelector.value === "dark") {
    document.body.classList.add("dark");
    logo.src = "images/byui-logo-white.png";
  } else {
    document.body.classList.remove("dark");
    logo.src = "images/byui-logo-blue.webp?v=" + Date.now();
  }
}

themeSelector.addEventListener("change", changeTheme);






