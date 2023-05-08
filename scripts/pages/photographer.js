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

            return ({photographer: photographer});
        }
        async function getMediasPhotographer() {// return media list of photographer 

            let listMedias = data["media"];
            let medias = new Array();

            listMedias.find(picture => {
                if (idPhotographer == picture["photographerId"]) {
                    medias.push(picture);

                }
            });

            return ({medias: medias});
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

            // Events lightBox Media
            const listMedias = document.querySelectorAll(".image-media");
            const listMediasPicture = document.querySelectorAll(".media-picture");
            const listLightBoxMedias = document.querySelectorAll(".lightBox-media-picture");
            const listTitleMedia = document.querySelectorAll(".title-media h2");
            const bgLightBoxModal = document.getElementById("lightBox-medias");
            const iconsCloseLightBox = document.querySelector(".close-lightBox");
            const prevIconsLightBox = document.querySelector(".prev-media");
            const nextIconsLightBox = document.querySelector(".next-media");
            let indexLightBox;
            const arrayLightBoxMedias = Array.from(listLightBoxMedias);
            const videosMedias = document.querySelectorAll(".media-picture video");
            const videosMediasLightBox = document.querySelectorAll('.lightBox-video-media');
            const iconsPlayVideoLightBox = document.querySelectorAll(".lightBox-media-picture .icon-play-media");


            listMedias.forEach((media) => media.addEventListener("click", displayLightBox));//open lightbox
            listTitleMedia.forEach((title) => title.addEventListener("click", displayLightBox));//open lightbox
            videosMedias.forEach((video) => video.addEventListener("click", () => {
                if (video.hasAttribute("controls") == false) {
                    displayLightBox();
                }
            }));//open lightbox
            iconsCloseLightBox.addEventListener("click", closeLightBox);// close lightBox
            listMediasPicture.forEach((media, index) => media.addEventListener("click", () => {
                currentSlide(index);

            }));//open currant lightBox
            listTitleMedia.forEach((title, index) => title.addEventListener("click", () => {
                currentSlide(index);

            }));//open current lightBox
            prevIconsLightBox.addEventListener("click", prevSlidesLightBox);// switch media event
            window.addEventListener("keydown", (event) => {
                if (event.code === "ArrowLeft" &&
                    bgLightBoxModal.style.display == "block") {
                    prevSlidesLightBox();
                }
                else if (event.code === "ArrowRight" &&
                    bgLightBoxModal.style.display == "block") {
                    nextSlidesLightBox();
                }
                else if (event.code === "Escape" &&
                    bgLightBoxModal.style.display == "block") {
                    closeLightBox();

                }

            });// switch or close lightBox on press keyboard
            nextIconsLightBox.addEventListener("click", nextSlidesLightBox);// switch media event

            function displayLightBox() {// display lightBox
                bgLightBoxModal.style.display = "block";
                body.style.overflow = "hidden";
                main.style.opacity = "0.4";

            }
            function closeLightBox() {// close lightBox
                bgLightBoxModal.style.display = "none";
                body.style.overflow = "scroll";
                main.style.opacity = "1";
            }
            function pauseVideo() {// check video playing
                videosMediasLightBox.forEach((video, indexVid) => {
                    if (!video.paused) {
                        video.pause();
                        iconsPlayVideoLightBox[indexVid].style.display = "block";
                        video.removeAttribute("controls");
                        video.style.filter = "blur(2px)";
                    }

                });
            }
            function showSlides(n) {// show 'index' slide

                for (let i = 0; i < listLightBoxMedias.length; i++) {
                    listLightBoxMedias[i].style.display = "none";
                }
                listLightBoxMedias[n].style.display = "block"
            }
            function nextSlides(n) {// next 'index' slide
                if (n == (listLightBoxMedias.length - 1)) {
                    n = 0;
                    showSlides(n)
                }
                else {
                    showSlides((n + 1));
                }
            }
            function prevSlides(n) {// prev 'index' slide
                if (n == 0) {
                    n = (listLightBoxMedias.length - 1);
                    showSlides(n);
                }
                else {
                    showSlides((n - 1));
                }
            }
            function prevSlidesLightBox() {// get index current slide then switch slide
                for (let media of arrayLightBoxMedias) {
                    if (media.style.display == "block") {
                        indexLightBox = arrayLightBoxMedias.indexOf(media);
                    }
                }
                prevSlides(indexLightBox);
                pauseVideo();
            }
            function nextSlidesLightBox() {// get index current slide then switch slide
                for (let media of arrayLightBoxMedias) {
                    if (media.style.display == "block") {
                        indexLightBox = arrayLightBoxMedias.indexOf(media);
                    }
                }
                nextSlides(indexLightBox);
                pauseVideo();
            }
            function currentSlide(n) {//current 'index' slide
                showSlides(n);

            }
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


