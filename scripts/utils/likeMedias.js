function eventsLikeMedias(medias){//events like medias
    
    const totLikes = document.querySelector(".total-like-photographer");
    const likeMedias = document.querySelectorAll(".count-like-media span");
    let totLikesContent = new Number();
    const iconslikeMedias = document.querySelectorAll(".count-like-media img");
    const countLikeMedias = document.querySelectorAll(".count-like-media");
   
     for (let like of likeMedias) {// calculate total like medias
        let likeContent = like.textContent;
        totLikesContent += ++likeContent;
     }
     totLikes.textContent = totLikesContent;//add total likes medias
      
       iconslikeMedias.forEach((icon,index) => icon.addEventListener("click", () => {
        incrementLike(index);
    
       })); // event like or unlike media 

       function incrementLike(n){//increment or decrement like media
             if(likeMedias[n].textContent == medias[n]["likes"]) {
                countLikeMedias[n].style.setProperty("--iconAfterOpacity","1");
                 ++likeMedias[n].textContent;
                 ++totLikes.textContent;
             }
              else {
                 countLikeMedias[n].style.setProperty("--iconAfterOpacity","0");
                  --likeMedias[n].textContent;
                  --totLikes.textContent;
              }
       }

}