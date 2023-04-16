const images = document.querySelectorAll(".carrousel-image");

let timer = 4000;

var currentImage = 0;
var max = images.length;


window.addEventListener("load", start);

function start () {
    setInterval (() => {
        nextImage();
    }, timer)  
}

function nextImage() {

    images[currentImage].classList.remove("selected");

    currentImage++;

    if(currentImage >= max) {
        currentImage = 0;
    }

    images[currentImage].classList.add("selected");
}

