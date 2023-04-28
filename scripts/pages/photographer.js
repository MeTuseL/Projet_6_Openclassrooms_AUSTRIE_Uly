//Mettre le code JavaScript lié à la page photographer.html

 fetch('data/photographers.json')
     .then(reponse => reponse.json())
     .then(data => {
         async function getPhotographers() {
            //   Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
            //   mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const idPhotographers = urlParams.get('id');

             let photographers = data.photographers;
             for(let i in photographers){
                 photographers[i];
              }
             
            //   et bien retourner le tableau photographers seulement une fois récupéré
             return ({
                 photographers: [...photographers]
             });
         }

         async function displayData(photographers) {
             const photographersSection = document.querySelector(".photographer_section");

             photographers.forEach((photographer) => {
                 const photographerModel = photographerFactory(photographer);
                 const userCardDOM = photographerModel.getUserCardDOM();
                 photographersSection.appendChild(userCardDOM);
             });
         }

         async function init() {
            //   Récupère les datas des photographes
             const { photographers } = await getPhotographers();
             displayData(photographers);
         }
        
         init();
     })
     .catch(error => console.log(error));


