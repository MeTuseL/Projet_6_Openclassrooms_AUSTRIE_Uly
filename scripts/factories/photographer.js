function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;
    const pagePhotographer = `photographer.html?id=${id}`;

    function getUserCardDOM() {
        // article
        const article = document.createElement('article');
        article.ariaLabel = 'Mini-profil du photographe ' + name;
        // link
        const a = document.createElement('a');
        a.setAttribute("href", pagePhotographer);
        a.ariaLabel = "Lien vers le profil de " + name;
        // image photographer
        const div_img = document.createElement('div');
        div_img.className = "image-photographer";
        div_img.ariaLabel = 'Photo de ' + name;
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", 'Photo de ' + name)
        // title
        const h2 = document.createElement('h2');
        h2.textContent = name;
        // description photographer
        const p_1 = document.createElement('p');
        p_1.className = "description-photographer-1";
        const p_2 = document.createElement('p');
        p_2.className = "description-photographer-2";
        const p_3 = document.createElement('p');
        p_3.className = "description-photographer-3";
        p_1.textContent = city + ', ' + country;
        p_2.textContent = tagline;
        p_3.textContent = price + '€/jour';
        // add node
        article.appendChild(a);
        a.appendChild(div_img)
        div_img.appendChild(img);
        a.appendChild(h2);
        a.appendChild(p_1);
        a.appendChild(p_2);
        a.appendChild(p_3);

        return (article);
    }
    return { name, picture, getUserCardDOM }
}