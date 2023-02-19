const carousel = document.getElementById("carousel");
var final = carousel.style.right;
const times = 6;
var flag = -3;


link();
const copyLink = link();

addImageRight(link());
addImageLeft(link());


const arrowLeft = document.querySelector(".button-prev");
arrowLeft.addEventListener("click", moveCarouselPrev);
arrowLeft.addEventListener("click", criaTresEsquerda);
// arrowLeft.addEventListener("click", deletedAddlImage);

const arrowRight = document.querySelector(".button-next");
arrowRight.addEventListener("click", criaTresDireita);
arrowRight.addEventListener("click", moveCarouselNext);
// arrowRight.addEventListener("click", deletelAddrImage);


function moveCarouselPrev() {
  var inicial = carousel.offsetLeft;
  carousel.style.setProperty("left", inicial + "px");
}

function moveCarouselNext() {

  if (carousel.classList.length == 2) {
    if (carousel.classList[1] == "left") {
      var inicial = carousel.offsetLeft;
      inicial += -580;
      console.log(inicial);
      carousel.style.setProperty("left", inicial + "px");
    } else {
      let name = carousel.classList[1];
      carousel.classList.remove(name);
      carousel.classList.add("left")
      var inicial = carousel.offsetLeft;
      inicial += -580;
      carousel.style.setProperty("left", inicial + "px");
    }
  }
}


function addImageRight(src) {

  for (i = 0; i < times; i++) {

    let image = document.createElement("img");
    
    image.className = ("slider-image img");
    image.src = src[i];
    image.textoAlt = "Movie"
    
    carousel.appendChild(image);
  }
}

function addImageLeft(src) {

  let num = 1;

  for (i = 0; i < times; i++) {

    let back = copyLink.length - num;

    let firstChild = carousel.firstChild;
    let image = document.createElement("img");
    
    image.className = ("slider-image img");
    image.src = src[back];
    image.textoAlt = "Movie"
    
    carousel.appendChild(image);
  
    carousel.insertBefore(image, firstChild);

    num++;
  }
}

function link () {
  const images = document.querySelectorAll("#carousel .img");
  let source = [];

  for (i = 0; i < images.length; i++) {
   let adress = images[i].src.split("/");
   let cont = adress.length - 3;
   let link = "";  
  
    link += "./" + adress[cont];
    cont++;
    link += "/" + adress[cont];
    cont++;
    link += "/" + adress[cont];

    source.push(link);
    cont = adress.length - 3;
  }

  return source;
}


function criaTresDireita () {
  for (i = 0; i < 3; i++) {

    var num = Number(copyLink.length + flag);

    if (flag == 0) { 
      flag = -9;
      var num = Number(copyLink.length + flag);
    }

    let image = document.createElement("img");
    image.className = ("slider-image img");
    image.src = copyLink[num];
    image.textoAlt = "Movie"
    
    carousel.appendChild(image);

    flag++;
  }
}

var number = -7;

function criaTresEsquerda () {
  for (i = 0; i < 2; i++) {

    if(number == -10){
      number = -1;
    }

    var num02 = Number(copyLink.length + number);

    let firstChild = carousel.firstChild;
    let image = document.createElement("img");
    
    image.className = ("slider-image img");
    image.src = copyLink[num02];
    image.textoAlt = "Movie"
    
    carousel.appendChild(image);
    carousel.insertBefore(image, firstChild);

    number--;
  }
}







// function deletelAddrImage () {

//   let img = carousel.querySelectorAll("img");

//   for (i = 0; i < 3; i++) {
//     carousel.removeChild(img[i]);
//   }

//   //Cria imagem para direita

//   for (i = 0; i < 3; i++) {

//     var num = Number(copyLink.length + flag);

//     if (flag == 0) { 
//       flag = -9;
//       var num = Number(copyLink.length + flag);
//     }

//     let image = document.createElement("img");
//     image.className = ("slider-image img");
//     image.src = copyLink[num];
//     image.textoAlt = "Movie"
    
//     carousel.appendChild(image);

//     console.log(num);

//     flag++;
//   }
// }

// function deletedAddlImage () {

//   for (i = 0; i < 3; i++) {
//     let elemento = document.querySelectorAll("#carousel img");
//     let num = elemento.length - 1;

//     elemento[num].parentNode.removeChild(elemento[num]);
//   }

//   //Cria imagem para esquerda

//   for (i = 0; i < 3; i++) {

//     if(number == -10){
//       number = -1;
//     }

//     var num02 = Number(copyLink.length + number);

//     let firstChild = carousel.firstChild;
//     let image = document.createElement("img");
//     image.className = ("slider-image img");
//     image.src = copyLink[num02];
//     image.textoAlt = "Movie"
    
//     carousel.appendChild(image);
//     carousel.insertBefore(image, firstChild);

//     number--;
//   }
// }



