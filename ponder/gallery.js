const gallery = document.querySelector('.gallery');
const modal = document.querySelector('dialog');
const modalImage = modal.querySelector('img');
const closeButton = modal.querySelector('.close-viewer');

// Open modal when clicking a thumbnail
gallery.addEventListener('click', openModal);

function openModal(e) {
  // Only respond if they clicked an <img>, not empty space
  const clickedImage = e.target;
  if (clickedImage.tagName !== 'IMG') {
    return;
  }

  // Get the small image source, e.g. "images/book-sm.jpg"
  const smallSrc = clickedImage.getAttribute('src');

  // Build the large image source by switching "-sm" to "-lg"
  // e.g. "images/book-sm.jpg" → "images/book-lg.jpg"
  const largeSrc = smallSrc.replace('-sm', '-lg');

  // Set modal image src and alt
  modalImage.src = largeSrc;
  modalImage.alt = clickedImage.alt || '';

  // Show the modal
  modal.showModal();
}

// Close modal on button click
closeButton.addEventListener('click', () => {
  modal.close();
});

// Close modal if clicking outside the image (dark background)
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.close();
  }
});
