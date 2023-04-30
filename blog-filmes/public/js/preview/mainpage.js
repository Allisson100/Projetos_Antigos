var mpFile = document.getElementById("mpFile");

let correctInputLabelImage = ""
let correctLabelText = ""
let chooseAnImage = ""

if (mpFile) {
    getButton()
}

function getButton() {

    const btChooseImage = document.querySelectorAll("[data-inputSelected]")
    btChooseImage.forEach(elemento => elemento.addEventListener("click", selectCorrectLabelImage))
}

function selectCorrectLabelImage(e) {

    mpFile = document.getElementById("mpFile");

    mpFile.value = ""

    let a = e.target.parentNode
    var b = a.parentNode
    let c = b.querySelector("[data-mpLabelImage]")
    let d = b.querySelector("[data-mpFileText]")
    let f = b.querySelector("[data-inputSelected]")
    correctInputLabelImage = c
    correctLabelText = d    
    chooseAnImage = f

    if (mpFile) {
        mpFile.addEventListener("change", mpChangeImage);
    }
}

function nameFile () {
    var name  = mpFile.files[0].name;
    correctLabelText.textContent = "File selected: " + name;
    
}

function mpChangeImage(e) {
    const mpInputTarget = e.target;
    const mpFile = mpInputTarget.files[0];

    if(mpFile) {
        chooseAnImage.innerHTML = "Change image";        

        const reader = new FileReader();

        reader.addEventListener("load", function(e) {

            const element = correctInputLabelImage.querySelector("img")
            element.parentNode.removeChild(element)

            const img = document.createElement("img");

            const readerTarget = e.target.result;

            img.src = readerTarget;

            correctInputLabelImage.appendChild(img);
        })

        reader.readAsDataURL(mpFile);

        nameFile()
    }
}


// ------------------ Add Banner -----------------------------------------

const btAddBanner = document.querySelector("[data-btAddBanner]")
const mainDiv = document.querySelector("[data-mainDiv]");

if(btAddBanner) {
    btAddBanner.addEventListener("click", addNewBanner)
}


function addNewBanner () {

    let div = document.createElement("div")
    div.className = "mpBannerPreview" 

    div.innerHTML += `
        <div class="mpButtonSelect">        
            <label for="mpFile" id="mpChooseAnImage" class="main-btn --chooseFile --mpButton" data-inputSelected="inputImage">Choose an image</label>

            <i class="fa-solid fa-trash fa-2xl" style="color: #ffffff;" data-icon=""></i>
        </div>

        <label id="mpLabelImage" data-mpLabelImage="">
            <img src="/img/banner/fundoCinza.png" alt="">
        </label>

        <input class="formPost-input --diplay-none" type="file" id="mpFile" name="file" data-empty="" required>
        <label class="mpName" id="mpFile-text" data-mpFileText="">No image selected ...</label>
    `

    mainDiv.appendChild(div)

    getButton()
    chooseAllIcon()
}

// ------------------ Delete Banner -----------------------------------------

function chooseAllIcon() {
    const icons = document.querySelectorAll("[data-icon]")
    icons.forEach(e => e.addEventListener("click", deleteBanner))
}

function deleteBanner(e) {
    const parent = e.target.parentNode.parentNode
    var getConfirm = confirm("Do you really sure you want to delete this banner ?")

    if (getConfirm == true) {
        parent.remove()
    }
}
