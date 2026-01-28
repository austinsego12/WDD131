// responsive menu

const menuButton = document.querySelector(".menu-btn");
const nav = document.querySelector("header nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    nav.classList.toggle("hide");
    menuButton.classList.toggle("change");
  });
}

// gallery modal

const gallery = document.querySelector(".gallery");
const modal = document.querySelector("dialog.viewer");
const modalImage = modal ? modal.querySelector("img") : null;
const closeButton = modal ? modal.querySelector(".close-viewer") : null;

function openModal(e) {
  const clicked = e.target;
  if (clicked.tagName !== "IMG") return;

  const smallSrc = clicked.getAttribute("src");

  // if files use -sm and -lg naming, try to swap
  let largeSrc = smallSrc;
  if (smallSrc.includes("-sm")) {
    largeSrc = smallSrc.replace("-sm", "-lg");
  }

  modalImage.src = largeSrc;
  modalImage.alt = clicked.alt || "";
  modal.showModal();
}

if (gallery && modal && modalImage && closeButton) {
  gallery.addEventListener("click", openModal);

  closeButton.addEventListener("click", () => {
    modal.close();
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });

  // Esc key is handled automatically by showModal with dialog,
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.open) {
      modal.close();
    }
  });
}
