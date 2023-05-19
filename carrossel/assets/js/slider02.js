let time = 2000;

const images = document.querySelectorAll(".image");

var currentImage = 0;
var max = images.length;


function nextImage() {

    images[currentImage].classList.remove("selected");

    currentImage++;

    if(currentImage >= max) {
        currentImage = 0;
    }

    images[currentImage].classList.add("selected");
}


window.addEventListener("load", start);

function start () {
    setInterval (() => {
        nextImage();
    }, time)  
}