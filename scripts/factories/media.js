function mediaFactory(data) {
    const { name, id, photographerId, title, image, likes, date, price} = data;

const nameFilePhotographer = name.substring(0, name.indexOf(' '));
    const picture = `assets/Sample Photos/${nameFilePhotographer}/${image}`;

    function getListDOM() {
        
    }
    return { title, picture, getListDOM };
}