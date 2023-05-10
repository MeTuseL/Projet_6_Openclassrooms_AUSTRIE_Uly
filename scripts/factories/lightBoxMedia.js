function lightBoxFactory(dataMedia,namePhotographer){
    const {id, photographerId, title, image, video, likes, date, price } = dataMedia;
    const nameFilePhotographer = namePhotographer.substring(0, namePhotographer.indexOf(' '));
    const picture = `assets/medias/${nameFilePhotographer}/${image || video}`;
    const iconPlay = `assets/icons/play-solid.svg`;

    function getListDomLightBox(){

        // lightBox media
        const bg_lightBox = document.getElementById("lightBox-medias");
        const listLightBox = document.querySelector(".list-lightBox");
        const div_lightBox_picture = document.createElement("div");
        div_lightBox_picture.className = "lightBox-media-picture";
        div_lightBox_picture.setAttribute("name",title);
        const title_lightBox = document.createElement('h2');
        title_lightBox.textContent = title;

        bg_lightBox.appendChild(listLightBox);
        listLightBox.appendChild(div_lightBox_picture);
        div_lightBox_picture.appendChild(title_lightBox);
        // image or video media
        let mediaLightBox;
        const sourceVideoLightBox = document.createElement('source');
        const img_playLightBox = document.createElement('img');
        if(video){
            
             mediaLightBox = document.createElement('video');
             mediaLightBox.setAttribute("alt", 'Video :' + title);
             mediaLightBox.className = "lightBox-video-media video-media";

             sourceVideoLightBox.setAttribute("src", picture);
             const typeVideoLightBox = video.substring(video.indexOf('.')+1);
             sourceVideoLightBox.setAttribute("type","video/"+typeVideoLightBox);
             
             //icon play video
            img_playLightBox.className = "icon-play-media";
            img_playLightBox.setAttribute("src", iconPlay);
            img_playLightBox.setAttribute("alt", "Cliquer, lance la vidéo");
            // flex video-media Lightbox 
            const flex_video_media_lbox = document.createElement("div");
            flex_video_media_lbox.className = "flex-video-media";


            div_lightBox_picture.appendChild(flex_video_media_lbox);
            flex_video_media_lbox.appendChild(img_playLightBox);
            flex_video_media_lbox.appendChild(mediaLightBox);
            mediaLightBox.appendChild(sourceVideoLightBox);
           

        }
        else {
            mediaLightBox = document.createElement('img');
             mediaLightBox.className = "lightBox-image-media";
            mediaLightBox.setAttribute("src", picture);
            mediaLightBox.setAttribute("alt", 'Photo :' + title);
           
            div_lightBox_picture.appendChild(mediaLightBox);
    
        }
        
        return (div_lightBox_picture);
    }
   
    
    return {title,picture,getListDomLightBox};
}
