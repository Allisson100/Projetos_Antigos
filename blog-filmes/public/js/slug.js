const inputSlug = document.getElementById("slug")
const inputName = document.getElementById("name");
inputName.addEventListener("keyup", slugName);

function slugName () {
    
    inputSlug.value = inputName.value.toLowerCase();
}