fetch('data/photographers.json')
    .then(reponse => reponse.json())
    .then(data => {
        async function getPhotographers() {
            //   Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
            //   mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const idPhotographer = urlParams.get('id');
            let listPhotographers = data["photographers"];
            let photographer = new Array();

            for (let i in listPhotographers) {
                if (idPhotographer == listPhotographers[i]["id"]) {
                    photographer = listPhotographers[i];

                }
            }

            return ({//   et bien retourner le tableau du photographe seulement une fois récupéré
                photographer: photographer
            });
        }
        async function getMediasPhotographers() {

            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const idPhotographer = urlParams.get('id');
            let listMedias = data["media"];
            let media = new Array();

            for (let i in listMedias) {
                if (idPhotographer == listMedias[i]["photographerId"]) {
                    media.push(listMedias[i]);

                }
            }
console.log(media);
            return ({//   et bien retourner le tableau du photographe seulement une fois récupéré
                media: media
            });
        }
        console.log(getMediasPhotographers());
        async function displayData(photographer) {
            const photographersHeader = document.getElementById("main");

                const photographerModel = photographerFactory(photographer);
                const userCardDOM = photographerModel.getUserProfileDOM();
                photographersHeader.appendChild(userCardDOM);
            
        }

        async function init() {
            //   Récupère les datas du photographe
            const { photographer } = await getPhotographers();
            displayData(photographer);
        }

        init();
    })
    .catch(error => console.log(error));


