const gallery = document.querySelector('.gallery');
const modal = document.querySelector('dialog');
const modalImage = modal.querySelector('img');
const closeButton = modal.querySelector('.close-viewer');

// Open modal when a thumbnail is clicked
gallery.addEventListener('click', openModal);

function openModal(e) {
    const clicked = e.target;

    // Only respond if an image was clicked
    if (clicked.tagName !== 'IMG') {
        return;
    }

    // Small image src, e.g. "images/book-sm.jpg"
    const smallSrc = clicked.getAttribute('src');

    // Convert to full image src, e.g. "images/book-full.jpg"
    const bigSrc = smallSrc.replace('-sm', '-full');

    // Set modal image src and alt
    modalImage.setAttribute('src', bigSrc);
    modalImage.setAttribute('alt', clicked.getAttribute('alt'));

    // Show the modal
    modal.showModal();
}

// Close modal on X button
closeButton.addEventListener('click', () => {
    modal.close();
});

// Close modal when clicking outside the image (on the dark overlay)
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close();
    }
});

// Close modal with Esc key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.open) {
        modal.close();
    }
});

