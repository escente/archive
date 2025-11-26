let currentIndex = 0;
const images = Array.from(document.querySelectorAll(".gallery-item img")).map(
    (img) => img.getAttribute("onclick").match(/'(.*?)'/)[1]
);

function openLightbox(src) {
    currentIndex = images.indexOf(src);
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    lightbox.style.display = "block";
    lightboxImg.src = src;
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

function changeSlide(n) {
    currentIndex += n;
    if (currentIndex >= images.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = images.length - 1;
    document.getElementById("lightbox-img").src = images[currentIndex];
}

// Close when clicking outside the image (on the background)
document.getElementById("lightbox").addEventListener('click', (e) => {
    // e.target is what you clicked on. e.currentTarget is the lightbox container.
    // If they match, it means you clicked the background, not the image.
    if (e.target === e.currentTarget ) {
        closeLightbox();
    }
});

// Keyboard navigation
// Add these variables at the top to track touch positions
let touchStartX = 0;
let touchStartY = 0;
const swipeThreshold = 30; // Minimum swipe distance in pixels

document.addEventListener("keydown", function (e) {
    if (document.getElementById("lightbox").style.display === "block") {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") changeSlide(-1);
        if (e.key === "ArrowRight") changeSlide(1);
    }
});

