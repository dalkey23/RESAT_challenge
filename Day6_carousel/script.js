document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slider img");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    let currentSlide = 0;

    function showSlide(n) {
        slides.forEach(slide => {
            slide.style.display = "none";
        });
        slides[n].style.display = "block";
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    nextButton.addEventListener("click", nextSlide);
    prevButton.addEventListener("click", prevSlide);

    showSlide(currentSlide);
});
