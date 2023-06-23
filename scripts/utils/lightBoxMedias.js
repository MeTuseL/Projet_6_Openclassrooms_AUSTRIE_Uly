function eventsLightBox() {// Events lightBox Media

    //DOM
    const listMedias = document.querySelectorAll(".image-media");
    const listMediasPicture = document.querySelectorAll(".media-picture");
    let sortedListMediasPicture;
    const listLightBoxMedias = document.querySelectorAll(".lightBox-media-picture");
    let sortedListLightBoxMedias;
    let sortedListLightBoxMediasPicture;
    const listTitleMedia = document.querySelectorAll(".title-media h2");
    const bgLightBoxModal = document.getElementById("lightBox-medias");
    const iconsCloseLightBox = document.querySelector(".close-lightBox");
    const prevIconsLightBox = document.querySelector(".prev-media");
    const nextIconsLightBox = document.querySelector(".next-media");
    let indexLightBox;
    let indexMediaPicture;
    const arrayLightBoxMedias = Array.from(listLightBoxMedias);
    let arraySortedLightBoxMedias;
    const arrListMediasPicture = Array.from(listMediasPicture);
    const videosMedias = document.querySelectorAll(".media-picture video");
    const videosMediasLightBox = document.querySelectorAll('.lightBox-video-media');
    const iconsPlayVideoMedias = document.querySelectorAll(".media-picture .icon-play-media");
    const arrayIconsPlayMedias = Array.from(iconsPlayVideoMedias);
    const iconsPlayVideoLightBox = document.querySelectorAll(".lightBox-media-picture .icon-play-media");
    const arrayIconsPlayLightBox = Array.from(iconsPlayVideoLightBox);
    let indexIconPlay;

    //Events
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
        sortedListLightBoxMedias = document.querySelectorAll(".lightBox-media-picture");//get current sorted lightBox list
        arraySortedLightBoxMedias = Array.from(sortedListLightBoxMedias);
        sortedListLightBoxMediasPicture = document.querySelectorAll(".lightBox-image-media");
        sortedListMediasPicture = document.querySelectorAll(".media-picture");


    }));//open currant lightBox
    listTitleMedia.forEach((title, index) => title.addEventListener("click", () => {
        currentSlide(index);
        sortedListLightBoxMedias = document.querySelectorAll(".lightBox-media-picture");//get current sorted lightBox list
        arraySortedLightBoxMedias = Array.from(sortedListLightBoxMedias);
        sortedListLightBoxMediasPicture = document.querySelectorAll(".lightBox-image-media");
        sortedListMediasPicture = document.querySelectorAll(".media-picture");

    }));//open current lightBox
    prevIconsLightBox.addEventListener("click", prevSlidesLightBox);// switch media event
    window.addEventListener("keydown", (event) => {//accessibility keydown lightbox
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
            for (let lightBox of listLightBoxMedias) {
                if (lightBox.style.display == "block") {
                    indexLightBox = arrayLightBoxMedias.indexOf(lightBox);
                    listMediasPicture[indexLightBox].focus();
                }
            }

        }
        else if (event.code === "Enter" && bgLightBoxModal.style.display !== "block") {
            for (let mediaPicture of listMediasPicture) {
                if (document.activeElement == mediaPicture) {
                    indexMediaPicture = arrListMediasPicture.indexOf(mediaPicture);
                    currentSlide(indexMediaPicture);
                    sortedListLightBoxMedias = document.querySelectorAll(".lightBox-media-picture");//get current sorted lightBox list
                    arraySortedLightBoxMedias = Array.from(sortedListLightBoxMedias);
                    sortedListLightBoxMediasPicture = document.querySelectorAll(".lightBox-image-media");
                    sortedListMediasPicture = document.querySelectorAll(".media-picture");
                    displayLightBox();
                    prevIconsLightBox.focus();
                }
            }
            for (let iconPlay of iconsPlayVideoMedias) {
                if (document.activeElement == iconPlay) {

                    indexIconPlay = arrayIconsPlayMedias.indexOf(iconPlay);
                    videosMedias[indexIconPlay].play().then(() => {
                        iconPlay.style.display = "none";
                        videosMedias[indexIconPlay].setAttribute("controls", "");
                        videosMedias[indexIconPlay].style.filter = "blur(0)";
                    });
                }
            }
        }
        else if (event.code === "Enter" && bgLightBoxModal.style.display == "block") {
            if (document.activeElement == prevIconsLightBox) {
                prevSlidesLightBox();
                prevMediaFocus();
            }
            else if (document.activeElement == nextIconsLightBox) {
                nextSlidesLightBox();
                nextMediaFocus();
            }
            else if (document.activeElement == iconsCloseLightBox) {
                closeLightBox();
                for (let lightBox of listLightBoxMedias) {
                    if (lightBox.style.display == "block") {
                        indexLightBox = arrayLightBoxMedias.indexOf(lightBox);
                        listMediasPicture[indexLightBox].focus();
                    }
                }
            }
            for (let iconPlay of iconsPlayVideoLightBox) {
                if (document.activeElement == iconPlay) {

                    indexIconPlay = arrayIconsPlayLightBox.indexOf(iconPlay);
                    videosMediasLightBox[indexIconPlay].play().then(() => {
                        iconPlay.style.display = "none";
                        videosMediasLightBox[indexIconPlay].setAttribute("controls", "");
                        videosMediasLightBox[indexIconPlay].style.filter = "blur(0)";
                    });
                }
            }
        }

    });// switch or close lightBox on press keyboard
    nextIconsLightBox.addEventListener("click", nextSlidesLightBox);// switch media event

    //Functions
    function displayLightBox() {// display lightBox
        bgLightBoxModal.style.display = "block";
        body.style.overflow = "hidden";
        main.style.filter = "blur(2px)";
        main.ariaHidden = "true";
        main.setAttribute("inert", "");
        header.setAttribute("inert", "");
        modal.ariaHidden = "false";

    }
    function closeLightBox() {// close lightBox
        bgLightBoxModal.style.display = "none";
        body.style.overflow = "auto";
        main.style.filter = "blur(0)";
        main.ariaHidden = "false";
        modal.ariaHidden = "true";
        main.removeAttribute("inert");
        header.removeAttribute("inert");
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
        for (let i = 0; i < sortedListLightBoxMedias.length; i++) {
            sortedListLightBoxMedias[i].style.display = "none";
        }
        sortedListLightBoxMedias[n].style.display = "block"
    }
    function nextSlides(n) {// next 'index' slide
        if (n == (sortedListLightBoxMedias.length - 1)) {
            n = 0;
            showSlides(n)
        }
        else {
            showSlides((n + 1));
        }
    }
    function prevSlides(n) {// prev 'index' slide
        if (n == 0) {
            n = (sortedListLightBoxMedias.length - 1);
            showSlides(n);
        }
        else {
            showSlides((n - 1));
        }
    }
    function prevSlidesLightBox() {// get index current slide then switch slide
        for (let lightBox of sortedListLightBoxMedias) {
            if (lightBox.style.display == "block") {
                indexLightBox = arraySortedLightBoxMedias.indexOf(lightBox);
            }
        }
        prevSlides(indexLightBox);
        pauseVideo();
    }
    function nextSlidesLightBox() {// get index current slide then switch slide
        for (let lightBox of sortedListLightBoxMedias) {
            if (lightBox.style.display == "block") {
                indexLightBox = arraySortedLightBoxMedias.indexOf(lightBox);
            }
        }
        nextSlides(indexLightBox);
        pauseVideo();
    }
    function currentSlide(n) {//current 'index' slide
        for (let i = 0; i < listLightBoxMedias.length; i++) {
            listLightBoxMedias[i].style.display = "none";
        }
        listLightBoxMedias[n].style.display = "block";

    }
    function nextMediaFocus() {
        for (let lightBox of arraySortedLightBoxMedias) {
            if (lightBox.style.display == "block") {
                if (indexLightBox == (sortedListLightBoxMediasPicture.length - 1)) {
                    indexLightBox = 0;
                    if (lightBox.children[0].className == "lightBox-image-media") {
                        sortedListLightBoxMediasPicture[indexLightBox].focus();

                    }
                    else {
                        lightBox.children[0].children[0].focus(); //video focus

                    }
                }
                else {
                    if (lightBox.children[0].className == "lightBox-image-media") {
                        sortedListLightBoxMediasPicture[indexLightBox + 1].focus();

                    }
                    else {
                        lightBox.children[0].children[0].focus(); //video focus

                    }
                }
            }

        }
    }
    function prevMediaFocus() {
        for (let lightBox of arraySortedLightBoxMedias) {
            if (lightBox.style.display == "block") {
                if (indexLightBox == 0) {
                    indexLightBox = (sortedListLightBoxMediasPicture.length - 1);
                    
                    if (lightBox.children[0].className == "lightBox-image-media") {
                        sortedListLightBoxMediasPicture[indexLightBox].focus();

                    }
                    else {
                        lightBox.children[0].children[0].focus(); //video focus

                    }
                }
                else {
                    if (lightBox.children[0].className == "lightBox-image-media") {
                        sortedListLightBoxMediasPicture[indexLightBox - 1].focus();

                    }
                    else {
                        lightBox.children[0].children[0].focus(); //video focus

                    }
                }
            }

        }
    }

}