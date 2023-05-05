//DOM Modal
const body = document.querySelector("body");
const contactModal = document.getElementById("contact_modal");
const modal = document.querySelector('form[name="form-modal"]');
const contactBtn = document.querySelector(".contact_button");
const closeForm = document.querySelector(".icon-close");
const btnClose = document.querySelector(".btn-close");
const numbCharacterLeft = document.getElementById("count-character");
const formData = document.querySelectorAll(".formData");
const modalRegistValid = document.querySelector(".modal-registration-validated");
const textControl = document.querySelectorAll(".text-control");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const message = document.getElementById("your-message");
message.value = '';
const reEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const reName = /^[a-zA-Z]+$/;
let dataErrorFirstN;
let dataErrorLastN;
let dataErrorEmail;
let dataErrorMsg;
for (let data of formData) {
    if (data.children[1].id == 'first') {
        dataErrorFirstN = data; 
    }
    if (data.children[1].id == 'last') {
        dataErrorLastN = data;
    }
    if (data.children[1].id == 'email') {
        dataErrorEmail = data;
    }
    if (data.children[1].id == 'your-message') {
        dataErrorMsg = data;
    }
}
let resultEvent;
let lastNameUser;
let firstNameUser;
let emailUser;
let messageUser;

//Events modal
contactBtn.addEventListener("click", displayModal);
closeForm.addEventListener("click", closeModal);
btnClose.addEventListener("click", closeModal);// button close modal event
message.addEventListener("keyup", controlMsg);
modal.addEventListener("submit", validate);// validate modal event
textControl.forEach((input) => input.addEventListener("change", validateValues));// text constrol input event
message.addEventListener("input", validateValues);

//Functions
function displayModal() {
    modal.style.display = "block";
    body.style.overflow = "hidden";
    contactModal.style.display = "block";
}
function closeModal() {
    modal.reset();
    formData.forEach((data) => {
        delete data.dataset.error;
        delete data.dataset.correct;
        delete data.dataset.errorVisible;
    });
    modal.style.display = "none";
    body.style.overflow = "scroll";
    contactModal.style.display = "none";
    modalRegistValid.style.display = "none";
}
function controlName(name) {// control name form
    return reName.test(name.value);
}
function controlEmail(email) {// control email form 
    return reEmail.test(email.value);
}
function controlMsg() {
    message.value = message.value.substring(0, 500);
    const lengthMsg = message.value.length;
    const countMsg = (500 - lengthMsg);
     if (countMsg == 1) {
        numbCharacterLeft.textContent = countMsg;
        numbCharacterLeft.textContent += " caractère restant";
    }
    else if (lengthMsg == 500){
        numbCharacterLeft.textContent = "Vous avez atteint le maximum de caractère";
    }
    else {
        numbCharacterLeft.textContent = countMsg + " caractères restants";
    }
}
function validateFirstName(dataError) {// check value first name

    if (firstName.value == "" && dataError.dataset.error == "Champ vide.") {
        dataError.dataset.correct = "false";
        resultEvent = "false";
    }
    else if (firstName.value == "") {
        dataError.dataset.errorVisible = "false";
        dataError.dataset.error = "";
        dataError.dataset.correct = "false";
        resultEvent = "false";
    }
    else if (controlName(firstName) == false) {
        dataError.dataset.errorVisible = "true";
        dataError.dataset.error = "Le prénom doit contenir que des lettres.";
        dataError.dataset.correct = "false";
        resultEvent = "false";
    }
    else if (firstName.value.length < 3) {
        dataError.dataset.errorVisible = "true";
        dataError.dataset.error = "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
        dataError.dataset.correct = "false";
        resultEvent = "false";
    }
    else {
        dataError.dataset.errorVisible = "false";
        dataError.dataset.error = "";
        dataError.dataset.correct = "true";
        resultEvent = "true";
        firstNameUser = firstName.value;

    }
    return {resultEvent,firstNameUser};
}
function validateLastName(dataError) {// check value last name

    if (lastName.value == "" && dataError.dataset.error == "Champ vide.") {
        dataError.dataset.correct = "false";
        resultEvent = "false";
    }
    else if (lastName.value == "") {
        dataError.dataset.errorVisible = "false";
        dataError.dataset.error = "";
        dataError.dataset.correct = "false";
        resultEvent = "false";
    }
    else if (controlName(lastName) == false) {
        dataError.dataset.errorVisible = "true";
        dataError.dataset.error = "Le nom doit contenir que des lettres.";
        dataError.dataset.correct = "false";
        resultEvent = "false";
    }
    else if (lastName.value.length < 3) {
        dataError.dataset.errorVisible = "true";
        dataError.dataset.error = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
        dataError.dataset.correct = "false";
        resultEvent = "false";
    }
    else {
        dataError.dataset.errorVisible = "false";
        dataError.dataset.error = "";
        dataError.dataset.correct = "true";
        resultEvent = "true";
        lastNameUser = lastName.value;
    }
    return {resultEvent,lastNameUser};

}
function validateEmail(dataError) {// check value email

    if (email.value == "" && dataError.dataset.error == "Champ vide.") {
        dataError.dataset.correct = "false";
        resultEvent = "false";
    }
    else if (email.value == "") {
        dataError.dataset.errorVisible = "false";
        dataError.dataset.error = "";
        dataError.dataset.correct = "false";
        resultEvent = "false";
    }
    else if (controlEmail(email) == false) {
        dataError.dataset.errorVisible = "true";
        dataError.dataset.error = "Email non valide.";
        dataError.dataset.correct = "false";
        resultEvent = "false";

    }
    else {
        dataError.dataset.errorVisible = "false";
        dataError.dataset.error = "";
        dataError.dataset.correct = "true";
        resultEvent = "true";
        emailUser = email.value;
    }
    return {resultEvent,emailUser};
}
function validateMsg(dataError) { // check value message 
    

    if (message.value == "" && dataError.dataset.error == "Champ vide.") {
        dataError.dataset.correct = "false";
        resultEvent = "false";
    }
    else if (message.value == "") {
        dataError.dataset.errorVisible = "false";
        dataError.dataset.error = "";
        dataError.dataset.correct = "false";
        resultEvent = "false";
    }
    else if(message.value.length < 20){
        dataError.dataset.errorVisible = "true";
        dataError.dataset.error = "Veuillez entrer 20 caractères ou plus pour votre message.";
        dataError.dataset.correct = "false";
        resultEvent = "false";
    }
    else {
        dataError.dataset.errorVisible = "false";
        dataError.dataset.error = "";
        dataError.dataset.correct = "true";
        resultEvent = "true";
        messageUser = message.value;
    }
    return {resultEvent,messageUser};
}
function emptyFieldsModal() {// check value empty

    if (firstName.value == "") {
        dataErrorFirstN.dataset.errorVisible = "true";
        dataErrorFirstN.dataset.error = "Champ vide.";
    }
    if (lastName.value == "") {
        dataErrorLastN.dataset.errorVisible = "true";
        dataErrorLastN.dataset.error = "Champ vide.";
    }
    if (email.value == "") {
        dataErrorEmail.dataset.errorVisible = "true";
        dataErrorEmail.dataset.error = "Champ vide.";
    }
    
    if(message.value == "" || message.value.length == 0){
        dataErrorMsg.dataset.errorVisible = "true";
        dataErrorMsg.dataset.error = "Champ vide.";

}
}
function validateValues() {// check values form

    validateFirstName(dataErrorFirstN);
    validateLastName(dataErrorLastN);
    validateEmail(dataErrorEmail);
    validateMsg(dataErrorMsg);

}
function validate(event) {// validate modal form

    event.preventDefault();

    if (validateFirstName(dataErrorFirstN)["resultEvent"] == "true" && validateLastName(dataErrorLastN)["resultEvent"] == "true"
        && validateEmail(dataErrorEmail)["resultEvent"] == "true" && validateMsg(dataErrorMsg)["resultEvent"] == "true" ) {

        //infos user 
        firstNameUser = validateFirstName(dataErrorFirstN)["firstNameUser"];
        lastNameUser = validateLastName(dataErrorLastN)["lastNameUser"];
        emailUser = validateEmail(dataErrorEmail)["emailUser"];
        messageUser = validateMsg(dataErrorEmail)["messageUser"];
        const infosUser = infosUserForm(firstNameUser,lastNameUser,emailUser,messageUser);
        console.log(infosUser);
        infosUser.textInfosUser();

        launchValidateModal();
    }
    else {
        emptyFieldsModal();
    }
}
function launchValidateModal() {// launch confirmation modal
    modal.style.display = "none";
    modalRegistValid.style.display = "block";
}