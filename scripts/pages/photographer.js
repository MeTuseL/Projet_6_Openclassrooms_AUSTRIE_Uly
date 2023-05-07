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
            //Events media video
            const iconsPlayVideo = document.querySelectorAll(".icon-play-media");
            const videos = document.querySelectorAll(".video-media");

            iconsPlayVideo.forEach((icon, index) => icon.addEventListener("click", () => {
                videos[index].play().then(() => {
                    icon.style.display = "none";
                    videos[index].setAttribute("controls", "");
                    videos[index].style.filter = "blur(0)";
                });
            }));

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


            }));

            // Events lightBox Media
            const listMedias = document.querySelectorAll(".image-media");
            const listMediasPicture = document.querySelectorAll(".media-picture");
            const listLightBoxMedias = document.querySelectorAll(".lightBox-media-picture"); const listTitleMedia = document.querySelectorAll(".title-media");
            const bgLightBoxModal = document.getElementById("lightBox-medias");
            const iconsCloseLightBox = document.querySelector(".close-lightBox");
            const prevIconsLightBox = document.querySelector(".prev-media");
            const nextIconsLightBox = document.querySelector(".next-media");
            let indexLightBox;
            const arrayLightBoxMedias = Array.from(listLightBoxMedias);
            const videosMedias = document.querySelectorAll(".media-picture video");
            const videosMediasLightBox = document.querySelectorAll('.lightBox-video-media');
            const iconsPlayVideoLightBox = document.querySelectorAll(".lightBox-media-picture .icon-play-media");


            listMedias.forEach((media) => media.addEventListener("click", displayLightBox));
            listTitleMedia.forEach((title) => title.addEventListener("click", displayLightBox));
            videosMedias.forEach((video) => video.addEventListener("click", () => {
                if (video.hasAttribute("controls") == false) {
                    displayLightBox();
                }
            }));
            iconsCloseLightBox.addEventListener("click", closeLightBox);
            listMediasPicture.forEach((media, index) => media.addEventListener("click", () => {
                currentSlide(index);

            }));
            prevIconsLightBox.addEventListener("click", () => {
                for (let media of arrayLightBoxMedias) {
                    if (media.style.display == "block") {
                        indexLightBox = arrayLightBoxMedias.indexOf(media);
                    }
                }
                prevSlides(indexLightBox);
               pauseVideo();
            });
            nextIconsLightBox.addEventListener("click", () => {
                for (let media of arrayLightBoxMedias) {
                    if (media.style.display == "block") {
                        indexLightBox = arrayLightBoxMedias.indexOf(media);
                    }
                }
                nextSlides(indexLightBox);
                pauseVideo();
            });


            function displayLightBox() {
                bgLightBoxModal.style.display = "block";
                body.style.overflow = "hidden";
                main.style.opacity = "0.4";

            }

            function closeLightBox() {
                bgLightBoxModal.style.display = "none";
                body.style.overflow = "scroll";
                main.style.opacity = "1";
            }
            function pauseVideo(){
                videosMediasLightBox.forEach((video,indexVid) => {
                    if(!video.paused){
                        video.pause();
                        iconsPlayVideoLightBox[indexVid].style.display = "block";
                        video.removeAttribute("controls");
                        video.style.filter = "blur(2px)";
                    }

                });
            }
            function showSlides(n) {

                for (let i = 0; i < listLightBoxMedias.length; i++) {
                    listLightBoxMedias[i].style.display = "none";
                }
                listLightBoxMedias[n].style.display = "block"
            }

            function nextSlides(n) {
                if (n == (listLightBoxMedias.length - 1)) {
                    n = 0;
                    showSlides(n)
                }
                else {
                    showSlides((n + 1));
                }
            }
            function prevSlides(n) {
                if (n == 0) {
                    n = (listLightBoxMedias.length - 1);
                    showSlides(n);
                }
                else {
                    showSlides((n - 1));
                }
            }

            function currentSlide(n) {
                showSlides(n);

            }


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


