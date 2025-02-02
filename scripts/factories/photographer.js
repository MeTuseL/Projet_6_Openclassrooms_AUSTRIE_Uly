function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;
    const picture = `./assets/photographers/${portrait}`;
    const pagePhotographer = `./photographer.html?id=${id}`;

    function getUserCardDOM() {// user card info Homepage
        // article
        const article = document.createElement('article');
        // link
        const a = document.createElement('a');
        a.setAttribute("href", pagePhotographer);
        a.ariaLabel = 'Accéder au profil de '+name;
        // picture photographer
        const div_img = document.createElement('div');
        div_img.className = "image-photographer";
        // div_img.ariaLabel = 'Photo de ' + name;
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
    function getUserProfileDOM() {// user page profile info
    
        //photograph  profile 
        const paragraphHeader = document.querySelector(".photograph-header");
        //description photographer
        const div_description = document.createElement("div");
        div_description.className = "container-description";
        div_description.role = "dialog";
        div_description.ariaLabel = "La description du photographe";
        div_description.tabIndex = "0";
        const h2 = document.createElement('h2');
        h2.role = "dialg";
        h2.ariaLabel = "Le nom et prénom, "+name;
        h2.textContent = name;
        const p_1 = document.createElement('p');
        p_1.className = "description-photographer-1";
        p_1.role = "dialog";
        p_1.ariaLabel = "La ville et Pays, "+city+ ', ' + country;
        p_1.textContent = city + ', ' + country;
        const p_2 = document.createElement('p');
        p_2.className = "description-photographer-2";
        p_2.role = "dialog";
        p_2.ariaLabel = "Le slogan, "+tagline;
        p_2.textContent = tagline;
        //picture photographer 
        const div_img = document.createElement('div');
        div_img.className = "image-photographer";
        div_img.ariaLabel = 'Photo de ' + name;
        div_img.tabIndex = "0";
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", 'Photo de ' + name)

        //price photographer
        const likesAndPricePhotographer = document.querySelector(".container-price-popularity");
        const span_price = document.createElement('span');
        span_price.textContent = price + '€/jour';
        likesAndPricePhotographer.appendChild(span_price);
        //contact photographer
        const headerContact = document.querySelector('#header-contact');
        const titlehHeaderContact = document.querySelector('#header-contact h2');
        const div_contact_header = document.createElement('div');
        div_contact_header.className = "container-title-contact";
        const nameContact = document.createElement('h2');
        nameContact.textContent = name;
       
        // add node 
        div_description.appendChild(h2);
        div_description.appendChild(p_1);
        div_description.appendChild(p_2);
        paragraphHeader.prepend(div_description);
        div_img.appendChild(img);
        paragraphHeader.append(div_img);
    
        headerContact.prepend(div_contact_header);
        div_contact_header.appendChild(titlehHeaderContact);
        div_contact_header.appendChild(nameContact);

        return (paragraphHeader);
    }
    return { name, picture, getUserCardDOM, getUserProfileDOM };
}

