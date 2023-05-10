fetch('data/photographers.json')
    .then(reponse => reponse.json())
    .then(data => {
        // get url id of photographer
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const idPhotographer = urlParams.get('id');

        async function getPhotographers() {// return photographer 

            let listPhotographers = data["photographers"];
            let photographer = new Array();

            listPhotographers.find(phgrapher => {
                if (idPhotographer == phgrapher["id"]) {
                    photographer = phgrapher;

                }
            });

            return ({ photographer: photographer });
        }
        async function getMediasPhotographer() {// return media list of photographer 

            let listMedias = data["media"];
            let medias = new Array();

            listMedias.find(picture => {
                if (idPhotographer == picture["photographerId"]) {
                    medias.push(picture);

                }
            });

            return ({ medias: medias });
        }
        async function displayData(photographer) {//display data photographer

            //header data
            const photographerProfile = document.getElementById("aside");

            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserProfileDOM();
            photographerProfile.appendChild(userCardDOM);



        }
        async function displayMediasData(medias, namePhotographer) {// display data medias photographer
            const photographerProfile = document.getElementById("section");
            //Media data 
            medias.forEach((media) => {
                const mediaModel = mediaFactory(media, namePhotographer);
                const listDomMedias = mediaModel.getListDOM();
                photographerProfile.appendChild(listDomMedias);
            
            });
            const listLightBox = document.querySelector(".list-lightBox");
            //lightbox data 
            medias.forEach((media) => {
                const lightBoxModel = lightBoxFactory(media,namePhotographer);
                const listDomLightBox = lightBoxModel.getListDomLightBox();
                listLightBox.appendChild(listDomLightBox);
            });
            //Events lightBox media
            eventsLightBox();
            //Events like medias
            eventsLikeMedias(medias);
            //Events media video
            const iconsPlayVideo = document.querySelectorAll(".icon-play-media");
            const videos = document.querySelectorAll(".video-media");

            iconsPlayVideo.forEach((icon, index) => icon.addEventListener("click", () => {
                videos[index].play().then(() => {
                    icon.style.display = "none";
                    videos[index].setAttribute("controls", "");
                    videos[index].style.filter = "blur(0)";
                });
            }));// run video event

            videos.forEach((video, index) => video.addEventListener("pause", () => {

                //The video returns to its display by default, 
                // after 5 seconds it is finished (without the user wanting to read it again)
                if (video.currentTime == video.duration
                    && video.ended) {
                    setTimeout(() => {
                        breakme: if (video.currentTime !== video.duration
                            && !video.ended) {

                            break breakme;
                        }
                        else {
                            if (document.fullscreenElement) {
                                document.exitFullscreen();
                            }
                            iconsPlayVideo[index].style.display = "block";
                            video.removeAttribute("controls");
                            video.style.filter = "blur(2px)";
                        }
                    }, 5000);
                }
                //The video returns to its display by default, 
                // after 15 seconds it is paused (without the user wanting to read it again)
                if (video.paused) {
                    setTimeout(() => {
                        breakme: if (!video.paused) {

                            break breakme;
                        }
                        else {
                            if (document.fullscreenElement) {
                                document.exitFullscreen();
                            }
                            iconsPlayVideo[index].style.display = "block";
                            video.removeAttribute("controls");
                            video.style.filter = "blur(2px)";
                        }
                    }, 15000);
                }


            }));// pause video event
            
        }
        async function init() { //get data form photographer and medias photographer

            const { photographer } = await getPhotographers();
            displayData(photographer);

            const { medias } = await getMediasPhotographer();
            displayMediasData(medias, photographer["name"]);
        }

        init();
    })
    .catch(error => console.log(error));


