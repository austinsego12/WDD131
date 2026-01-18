const themeSelector = document.querySelector("#themeSelector");
const logo = document.querySelector("#logo");

function changeTheme() {
  const selectedTheme = themeSelector.value;

  if (selectedTheme === "dark") {
    document.body.classList.add("dark");
    logo.setAttribute("src", "images/byui-logo-white.png");
  } else {
    document.body.classList.remove("dark");
    logo.setAttribute("src", "images/byui-logo.png");
  }
}

themeSelector.addEventListener("change", changeTheme);

