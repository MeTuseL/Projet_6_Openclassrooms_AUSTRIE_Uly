fetch('data/photographers.json')
    .then(reponse => reponse.json())
    .then(data => {
        async function getPhotographers() {//return photographers list
            let listPhotographers = data["photographers"];
            return ({ photographers: listPhotographers });
        }
        async function displayData(photographers) {// display data photographer
            const photographersSection = document.querySelector(".photographer_section");

            photographers.forEach((photographer) => {
                const photographerModel = photographerFactory(photographer);
                const userCardDOM = photographerModel.getUserCardDOM();
                photographersSection.appendChild(userCardDOM);
            });
        }
        async function init() { //get data from photographers
            const { photographers } = await getPhotographers();
            displayData(photographers);

        //mettre displat content sur les Ul medias

    }
        
        init();
    })
    .catch (error => console.log(error));


