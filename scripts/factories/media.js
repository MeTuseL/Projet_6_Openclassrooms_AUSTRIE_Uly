function mediaFactory(dataMedia, namePhotographer) {

    const {id, photographerId, title, image, video, likes, date, price } = dataMedia;
    const nameFilePhotographer = namePhotographer.substring(0, namePhotographer.indexOf(' '));
    const picture = `assets/medias/${nameFilePhotographer}/${image || video}`;
    const iconLike = `assets/icons/heart-solid.svg`;
    const iconPlay = `assets/icons/play-solid.svg`;

    function getListDOM() {// list medias
        const ulMedias = document.querySelector('.list-medias');
        ulMedias.ariaLabel = "Liste des medias de "+namePhotographer;
        const contentMedia = document.createElement('li');
        contentMedia.className = "card-media-photographer";
        contentMedia.ariaLabel = 'Titre : ' + title;
        // lightBox media
        const bg_lightBox = document.getElementById("lightBox-medias");
        const listLightBox = document.querySelector(".list-lightBox");
        const div_lightBox_picture = document.createElement("div");
        div_lightBox_picture.className = "lightBox-media-picture";
        div_lightBox_picture.setAttribute("name",title);
        const title_lightBox = document.createElement('h2');
        title_lightBox.textContent = title;

        // image or video media
        const div_media_picture = document.createElement('div');
        div_media_picture.className = "media-picture";
        let mediaElement;
        let mediaLightBox;
        const sourceVideo = document.createElement('source');
        const sourceVideoLightBox = document.createElement('source');
        if(video){
            
             mediaElement = document.createElement('video');
             mediaElement.setAttribute("alt", 'Video :' + title);
             mediaElement.className = "video-media";
             mediaLightBox = document.createElement('video');
             mediaLightBox.setAttribute("alt", 'Video :' + title);
             mediaLightBox.className = "lightBox-video-media video-media";

             sourceVideo.setAttribute("src", picture);
             const typeVideo = video.substring(video.indexOf('.')+1);
             sourceVideo.setAttribute("type","video/"+typeVideo);
             sourceVideoLightBox.setAttribute("src", picture);
             const typeVideoLightBox = video.substring(video.indexOf('.')+1);
             sourceVideoLightBox.setAttribute("type","video/"+typeVideoLightBox);
             
             //icon play video
            const img_play = document.createElement('img');
            img_play.className = "icon-play-media";
            img_play.setAttribute("src", iconPlay);
            img_play.setAttribute("alt", "Cliquer, lance la vidéo");
            const img_playLightBox = document.createElement('img');
            img_playLightBox.className = "icon-play-media";
            img_playLightBox.setAttribute("src", iconPlay);
            img_playLightBox.setAttribute("alt", "Cliquer, lance la vidéo");
            // flex video-media Lightbox 
            const flex_video_media_lbox = document.createElement("div");
            flex_video_media_lbox.className = "flex-video-media";


            div_media_picture.appendChild(img_play);
            div_media_picture.appendChild(mediaElement);
            mediaElement.appendChild(sourceVideo);
            div_lightBox_picture.appendChild(flex_video_media_lbox);
            flex_video_media_lbox.appendChild(img_playLightBox);
            flex_video_media_lbox.appendChild(mediaLightBox);
            mediaLightBox.appendChild(sourceVideoLightBox);
           

        }
        else {
             mediaElement = document.createElement('img');
             mediaElement.className = "image-media";
            mediaElement.setAttribute("src", picture);
            mediaElement.setAttribute("alt", 'Photo :' + title);
            mediaLightBox = document.createElement('img');
             mediaLightBox.className = "lightBox-image-media";
            mediaLightBox.setAttribute("src", picture);
            mediaLightBox.setAttribute("alt", 'Photo :' + title);
            div_media_picture.appendChild(mediaElement);
            div_lightBox_picture.appendChild(mediaLightBox);
    
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

        bg_lightBox.appendChild(listLightBox);
        listLightBox.appendChild(div_lightBox_picture);
        div_lightBox_picture.appendChild(title_lightBox);
    

        return (ulMedias);
    }
    
    return { title, picture, getListDOM };
}
