var count = 100;

const gallery = document.getElementById("gallery");

setInterval(function () {
    nextImage(gallery);
}, 3000)



function nextImage(gallery) {

    if(count > 400) {
        count = 0;
    }

    gallery.style.marginLeft = "-" + count + "%";
    count += 100;
}