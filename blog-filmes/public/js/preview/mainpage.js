const mpFile = document.getElementById("mpFile")
// const mpFile02 = document.getElementById("mpFile02")
// const mpFile03 = document.getElementById("mpFile03")
// const mpFile04 = document.getElementById("mpFile04")

mpFile.addEventListener("change", mpChangeImage)
// mpFile02.addEventListener("change", mpChamgeImage)
// mpFile03.addEventListener("change", mpChamgeImage)
// mpFile04.addEventListener("change", mpChamgeImage)

let mpBannerPreview = ""
let mpBtChooseImage = ""
let mpLabelImage = ""


function mpChangeImage (e) {

    getElements(e)

    mpLabelImage.innerHTML = ""

    var teste = []

    var files = e.target.files
    var filesLength = files.length

    for (let i = 0; i < filesLength; i++) {
        teste.push(files[i])
    }

    if(teste.length > 0) {
        teste.forEach((element) => {
            previewImage(element)  
        })
    }       
}

function previewImage(element) {
    mpBtChooseImage.innerHTML = "Change the Banners"

    const reader = new FileReader();

    reader.addEventListener("load", function(e) {

        // const imgElement = mpLabelImage.querySelector("img")
        // imgElement.parentNode.removeChild(imgElement)

        const img = document.createElement("img")

        const readerTarget = e.target.result
        console.log(readerTarget);

        img.src = readerTarget

        mpLabelImage.appendChild(img)

    })

    reader.readAsDataURL(element)
}

function getElements(e) {
    mpBannerPreview = e.target.parentNode
    mpBtChooseImage = mpBannerPreview.querySelector("[data-inputSelected]")
    mpLabelImage = mpBannerPreview.querySelector("[data-mpLabelImage]")
}
