function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;
    const pagePhotographer = `photographer.html?id=${id}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const a = document.createElement( 'a' );
        a.setAttribute("href", pagePhotographer)
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        const p_1 = document.createElement('p');
        p_1.className = "description-photographer-1";
        const p_2 = document.createElement('p');
        p_2.className = "description-photographer-2";
        const p_3 = document.createElement('p');
        p_3.className = "description-photographer-3";

        p_1.textContent = city+', '+country;
        p_2.textContent = tagline;
        p_3.textContent = price+'€/jour';
        h2.textContent = name;
        
        article.appendChild(a);
        a.appendChild(img);
        a.appendChild(h2);
        article.appendChild(p_1);
        article.appendChild(p_2);
        article.appendChild(p_3);

        return (article);
    }
    return { name, picture, getUserCardDOM }
}