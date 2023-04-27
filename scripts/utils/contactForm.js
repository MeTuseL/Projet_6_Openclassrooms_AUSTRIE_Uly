//DOM Modal
const modal = document.getElementById("contact_modal");
const contactBtn = document.querySelector(".photograph-header .contact_button");
const closeForm = document.querySelector(".icon-close");

//Events modal
contactBtn.addEventListener("click",displayModal);
closeForm.addEventListener("click",closeModal);

//Functions
function displayModal() {
	modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}