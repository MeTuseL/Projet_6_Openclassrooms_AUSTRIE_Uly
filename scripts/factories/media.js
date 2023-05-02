function mediaFactory(dataMedia, namePhotographer) {

    const {id, photographerId, title, image, video, likes, date, price } = dataMedia;
    
    // const {name} = photographers.find(photographer => photographer.id == photographerId);
    const nameFilePhotographer = namePhotographer.substring(0, namePhotographer.indexOf(' '));
    const picture = `assets/medias/${nameFilePhotographer}/${image || video}`;
    const iconLike = `assets/icons/heart-solid.svg`;
    const iconPlay = `assets/icons/play-solid.svg`;

    function getListDOM() {
        
        //list medias
        const ulMedias = document.querySelector('.list-medias');
        ulMedias.ariaLabel = "Liste des medias de "+namePhotographer;
        const contentMedia = document.createElement('li');
        contentMedia.className = "card-media-photographer";
        contentMedia.ariaLabel = 'Titre : ' + title;
        // image and video
        const div_media_picture = document.createElement('div');
        div_media_picture.className = "media-picture";
        let mediaElement;
        const sourceVideo = document.createElement('source');
        if(video){
           
             mediaElement = document.createElement('video');
             mediaElement.setAttribute("alt", 'Video :' + title);
             mediaElement.className = "video-media";
             sourceVideo.setAttribute("src", picture);
             const typeVideo = video.substring(video.indexOf('.')+1);
             sourceVideo.setAttribute("type","video/"+typeVideo);
             
             //icon play video
            const img_play = document.createElement('img');
            img_play.className = "icon-play-media";
            img_play.setAttribute("src", iconPlay);
            img_play.setAttribute("alt", "Cliquer, lance la vidéo");

            div_media_picture.appendChild(img_play);
            div_media_picture.appendChild(mediaElement)
            mediaElement.appendChild(sourceVideo);
        }
        else {
            
             mediaElement = document.createElement('img');
             mediaElement.className = "image-media";
            mediaElement.setAttribute("src", picture);
            mediaElement.setAttribute("alt", 'Photo :' + title);
            div_media_picture.appendChild(mediaElement);
        }
       
        const img_icon = document.createElement('img');
        img_icon.setAttribute("src",iconLike);
        img_icon.setAttribute("alt","J'aime");

        // description
        const div_description = document.createElement('div');
        div_description.className = "title-media";
        const h2 = document.createElement('h2');
        h2.textContent = title;
        const div_count_like = document.createElement('div');
        div_count_like.className = "count-like-media";
        const spanLike = document.createElement('span');
        spanLike.textContent = likes ;

       //add node 
        ulMedias.appendChild(contentMedia);
        contentMedia.appendChild(div_media_picture);
        contentMedia.appendChild(div_description);
        div_description.appendChild(h2);
        div_description.appendChild(div_count_like);
        div_count_like.appendChild(spanLike);
        div_count_like.appendChild(img_icon);


        return (ulMedias);
    }
    
    return { title, picture, getListDOM };
}
