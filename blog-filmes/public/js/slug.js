const inputSlug = document.getElementById("categoryForm-slug")
const inputName = document.getElementById("categoryForm-name");

const formPostInputSlug = document.getElementById("formPost-slug");
const formPostInputTitle = document.getElementById("formPost-title");

if (inputSlug == null || inputName == null) {

}else {
    inputName.addEventListener("keyup", slugName);
}

if (formPostInputSlug == null || formPostInputTitle == null) {

}else {
    formPostInputTitle.addEventListener("keyup", formPostSlugName);
}


function slugName () {

    if (inputSlug.value == null) {

    }else {
        inputSlug.value = inputName.value.toLowerCase();
    }
}

function formPostSlugName () {
    if (formPostInputSlug.value == null) {

    }else {
        formPostInputSlug.value = formPostInputTitle.value.toLowerCase();
    }
}


