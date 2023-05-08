function infosUserForm(firstName,lastName,email,message) {

    function displayInfosUser(){// user infos list
        console.log("Liste des informations de l'utilisateur =>");
        console.log("Nom : "+lastName);
        console.log("Prenom : "+firstName);
        console.log("Email : "+email);
        console.log("Message : "+message);
    }
    return {firstName,lastName,email,message,displayInfosUser};
}
