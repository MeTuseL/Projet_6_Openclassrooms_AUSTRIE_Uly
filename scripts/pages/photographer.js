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
        async function displayMediasData(medias, namePhotographer) {
            const photographerProfile = document.getElementById("section");
            //Media data 
            medias.forEach((media) => {
                const mediaModel = mediaFactory(media, namePhotographer);
                const listDomMedias = mediaModel.getListDOM();
                photographerProfile.appendChild(listDomMedias);
            });
            //events media video
            const iconVideo = document.querySelectorAll(".icon-play-media");
            const video = document.querySelectorAll(".video-media");

            iconVideo.forEach((icon, index) => icon.addEventListener("click", () => {
                video[index].play().then(() => {
                    icon.style.display = "none";
                    video[index].setAttribute("controls", "");
                    video[index].style.filter = "blur(0)";
                });
            }));

            video.forEach((vid, index) => vid.addEventListener("pause", () => {

                //The video returns to its display by default, 
                // after 5 seconds it is finished (without the user wanting to read it again)
                    if (vid.currentTime == vid.duration
                        && vid.ended) {
                        setTimeout(() => {
                            breakme: if (vid.currentTime !== vid.duration
                                && !vid.ended) {

                                break breakme;
                            }
                            else {
                                if(document.fullscreenElement){
                                    document.exitFullscreen();
                                }
                                iconVideo[index].style.display = "block";
                                vid.removeAttribute("controls");
                                vid.style.filter = "blur(2px)";
                            }
                        }, 5000);
                    }
                    //The video returns to its display by default, 
                    // after 15 seconds it is paused (without the user wanting to read it again)
                    if(vid.paused){
                            setTimeout(() => {
                                breakme: if (!vid.paused) {
    
                                    break breakme;
                                }
                                else {
                                    if(document.fullscreenElement){
                                        document.exitFullscreen();
                                    }
                                    iconVideo[index].style.display = "block";
                                    vid.removeAttribute("controls");
                                    vid.style.filter = "blur(2px)";
                                }
                        },15000);
                    }
                

            }));

        }


        async function init() {
            //   Récupère les datas du photographe
            const { photographer } = await getPhotographers();
            displayData(photographer);

            const { medias } = await getMediasPhotographer();
            displayMediasData(medias, photographer["name"]);
        }

        init();
    })
    .catch(error => console.log(error));


