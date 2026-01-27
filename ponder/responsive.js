// Select the menu button and the nav
const menuButton = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

// When the menu button is clicked, toggle the menu visibility and animation
menuButton.addEventListener("click", () => {
  // Show/hide the nav by toggling the 'hide' class
  nav.classList.toggle("hide");

  // Animate the hamburger into an X by toggling the 'change' class
  menuButton.classList.toggle("change");
});
