// ====== MENU FUNCTIONALITY ======

const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".site-nav");
const breakpoint = 900; // match your desktop breakpoint

function toggleMenu() {
  if (!nav || !menuButton) return;

  nav.classList.toggle("hide");
  menuButton.classList.toggle("change");
}

function handleResize() {
  if (!nav || !menuButton) return;

  if (window.innerWidth >= breakpoint) {
    // On large screens, always show the nav and reset the button
    nav.classList.remove("hide");
    menuButton.classList.remove("change");
  } else {
    // On small screens, hide the nav if the menu is not "open"
    if (!menuButton.classList.contains("change")) {
      nav.classList.add("hide");
    }
  }
}

// Attach menu events if elements exist
if (menuButton && nav) {
  menuButton.addEventListener("click", toggleMenu);
  window.addEventListener("resize", handleResize);
  window.addEventListener("load", handleResize);
}

// ====== VIEWER TEMPLATE + MODAL ======

const gallery = document.querySelector(".gallery");
const modal = document.querySelector("dialog.viewer");

/**
 * viewerTemplate
 * Accepts an image URL and alt text and returns the template for the viewer.
 */
function viewerTemplate(imageUrl, altText) {
  return `
    <img src="${imageUrl}" alt="${altText}">
    <button class="close-viewer" type="button">X</button>
  `;
}

function openModal(e) {
  if (!modal) return;

  const clicked = e.target;
  // Only respond to clicks on <img> elements inside the gallery
  if (clicked.tagName !== "IMG") return;

  const smallSrc = clicked.getAttribute("src");
  const altText = clicked.alt || "";

  // Example: "images/norris-sm.jpg" -> "images/norris.jpg"
  const largeSrc = smallSrc.includes("-sm")
    ? smallSrc.replace("-sm", "")
    : smallSrc;

  // Use viewerTemplate to build the modal content
  modal.innerHTML = viewerTemplate(largeSrc, altText);

  modal.showModal();
}

// Only wire up the modal if the elements exist
if (gallery && modal) {
  // Open modal on gallery image click
  gallery.addEventListener("click", openModal);

  // Close modal when clicking X or the dark area
  modal.addEventListener("click", (event) => {
    const clicked = event.target;

    // Close if clicked outside the image (on the dialog itself)
    if (clicked === modal) {
      modal.close();
      return;
    }

    // Close if clicked the X button
    if (clicked.classList.contains("close-viewer")) {
      modal.close();
      return;
    }
  });

  // Esc key: <dialog> already closes on Esc when opened with showModal(),
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.open) {
      modal.close();
    }
  });
}

