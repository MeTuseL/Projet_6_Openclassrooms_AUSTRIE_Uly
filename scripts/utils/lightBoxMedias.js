function eventsLightBox(){
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
     main.style.filter = "blur(2px)";

 }
 function closeLightBox() {// close lightBox
     bgLightBoxModal.style.display = "none";
     body.style.overflow = "auto";
     main.style.filter = "blur(0)";
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