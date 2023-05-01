fetch('data/photographers.json')
    .then(reponse => reponse.json())
    .then(data => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const idPhotographer = urlParams.get('id');

        async function getPhotographers() {

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
        async function getMediasPhotographer() {

            let listMedias = data["media"];
            let medias = new Array();

            for (let media of listMedias) {
                if (idPhotographer == media["photographerId"]) {
                    medias.push(media);

                }
            }

            return ({//   et bien retourner le tableau du photographe seulement une fois récupéré
                medias: medias
            });
        }

        async function displayData(photographer) {

            //header data
            const photographerProfile = document.getElementById("aside");

            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserProfileDOM();
            photographerProfile.appendChild(userCardDOM);

            

        }
        async function displayMediasData(medias,namePhotographer) {
            const photographerProfile = document.getElementById("section");
            //Media data 
            medias.forEach((media) => {
                const mediaModel = mediaFactory(media,namePhotographer);
                const listDomMedias = mediaModel.getListDOM();
                photographerProfile.appendChild(listDomMedias);
            });
        }

    
        async function init() {
            //   Récupère les datas du photographe
            const { photographer } = await getPhotographers();
            displayData(photographer);
         
            const { medias } = await getMediasPhotographer();
            displayMediasData(medias,photographer["name"]);
        }

        init();
    })
    .catch(error => console.log(error));


