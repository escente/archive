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

// Close lightbox when clicking outside
document.getElementById("lightbox-img").addEventListener("click", function (e) {
    if (e.target === this) closeLightbox();
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

// Add touch event listeners
document.addEventListener("touchstart", function (e) {
    if (document.getElementById("lightbox").style.display === "block") {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }
});

document.addEventListener("touchend", function (e) {
    if (document.getElementById("lightbox").style.display === "block") {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        // Check if it's a horizontal swipe (not vertical scroll)
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > swipeThreshold) {
                changeSlide(-1); // Swipe right to go previous
            } else if (deltaX < -swipeThreshold) {
                changeSlide(1); // Swipe left to go next
            }
        }

        // Tap to close (if minimal movement)
        if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
            if (!e.target.closest(".lightbox-content")) {
                closeLightbox();
            }
        }
    }
});
