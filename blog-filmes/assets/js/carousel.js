const time = 4000;

const images = document.querySelectorAll(".carousel img");

var currentImage = 0;
var max = images.length;

setInterval(() => {
    nextImage();
}, time)

function nextImage() {
    images[currentImage].classList.remove("selected");

    currentImage++;

    if(currentImage >= max) {
        currentImage = 0;
    }

    images[currentImage].classList.add("selected");
}