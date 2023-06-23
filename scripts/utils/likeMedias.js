function eventsLikeMedias(medias) {//events like medias

   //DOM
   const totLikes = document.querySelector(".total-like-photographer");
   const likeMedias = document.querySelectorAll(".count-like-media span");
   let totLikesContent = new Number();
   const iconslikeMedias = document.querySelectorAll(".count-like-media img");
   const countLikeMedias = document.querySelectorAll(".count-like-media");
   const listMediasPicture = document.querySelectorAll(".media-picture");
   let indexIconLike;
   const arrIconsLikeMedias = Array.from(iconslikeMedias);

   for (let like of likeMedias) {// calculate total like medias
      let likeContent = like.textContent;
      totLikesContent += ++likeContent;
   }
   totLikes.textContent = totLikesContent;//add total likes medias

   //Events
   iconslikeMedias.forEach((icon, index) => icon.addEventListener("click", () => {
      incrementLike(index);

   })); // event like or unlike media 

   window.addEventListener("keydown", (event) => {

      if (event.code === "Enter") {
         for(let iconLike of iconslikeMedias){
             if(document.activeElement == iconLike){
                indexIconLike = arrIconsLikeMedias.indexOf(iconLike);
                incrementLike(indexIconLike);
             }
         }
     }
   });//event keydown like media

   //Functions
   function incrementLike(n) {//increment or decrement like media
      if (likeMedias[n].textContent == medias[n]["likes"]) {
         countLikeMedias[n].style.setProperty("--iconAfterOpacity", "1");
         ++likeMedias[n].textContent;
         ++totLikes.textContent;
         listMediasPicture[n].ariaLabel = 'Titre : ' + medias[n]["title"]+"."+likeMedias[n].textContent+" j'aime";

      }
      else {
         countLikeMedias[n].style.setProperty("--iconAfterOpacity", "0");
         --likeMedias[n].textContent;
         --totLikes.textContent;
         listMediasPicture[n].ariaLabel = 'Titre : ' + medias[n]["title"]+"."+likeMedias[n].textContent+" j'aime";
      }
   }

}