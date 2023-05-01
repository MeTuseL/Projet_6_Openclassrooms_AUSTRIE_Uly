function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;
    const pagePhotographer = `photographer.html?id=${id}`;
    
    function getUserCardDOM() {// user card info
        // article
        const article = document.createElement('article');
        article.ariaLabel = 'Mini-profil du photographe ' + name;
        // link
        const a = document.createElement('a');
        a.setAttribute("href", pagePhotographer);
        a.ariaLabel = "Lien vers le profil de " + name;
        // picture photographer
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
        p_1.textContent = city + ', ' + country;
        const p_2 = document.createElement('p');
        p_2.className = "description-photographer-2";
        p_2.textContent = tagline;
        const p_3 = document.createElement('p');
        p_3.className = "description-photographer-3";
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
    function getUserProfileDOM() {// user profile info
        //main
        const main = document.getElementById("main");
        //photograph  profile 
        const paragraphHeader = document.querySelector(".photograph-header");
        //description photographer
        const div_description = document.createElement("div");
        div_description.className = "container-description";
        const h2 = document.createElement('h2');
        h2.textContent = name;
        const p_1 = document.createElement('p');
        p_1.className = "description-photographer-1";
        p_1.textContent = city + ', ' + country;
        const p_2 = document.createElement('p');
        p_2.className = "description-photographer-2";
        p_2.textContent = tagline;
        //picture photographer 
        const div_img = document.createElement('div');
        div_img.className = "image-photographer";
        div_img.ariaLabel = 'Photo de ' + name;
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", 'Photo de ' + name)

        // //button
        // const button = document.createElement('button');
        // button.className = "contact_button1";
        // button.textContent = "Contacter "+name;
        // div_section.appendChild(button);

        //price and like photograph*
        const div_price_like = document.createElement("div");
        div_price_like.className = "container-price-allLike";
        const span_price = document.createElement('span');
        span_price.textContent = price + '€/jour';
        // add node 
        div_description.appendChild(h2);
        div_description.appendChild(p_1);
        div_description.appendChild(p_2);
        paragraphHeader.prepend(div_description);
        div_img.appendChild(img);
        paragraphHeader.append(div_img);

        div_price_like.appendChild(span_price);
        main.appendChild(div_price_like);

        return (paragraphHeader);
    }
    return { name, picture, getUserCardDOM, getUserProfileDOM };
}
