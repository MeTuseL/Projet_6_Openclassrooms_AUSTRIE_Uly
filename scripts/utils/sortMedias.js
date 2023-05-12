function eventsSortMedias(medias) {//Events sort medias

    //DOM
    const ulMedias = document.querySelector('.list-medias');
    const listCardMedias = document.querySelectorAll(".card-media-photographer");
    const dropdown = document.querySelector(".dropdown-options");
    const optionsDropdown = document.querySelectorAll(".dropdown-options span");
    const arrOptions = Array.from(optionsDropdown);
    const sortLikes = new Array();
    const sortDate = new Array();
    const sortTitle = new Array();
    for (let media of medias) {
        sortLikes.push(media["likes"]);
        sortDate.push(media["date"]);
        sortTitle.push(media["title"]);
    }
    // sort the list of medias 
    const byValue = (a, b) => a - b;
    sortLikes.sort(byValue);
    sortDate.sort();
    sortTitle.sort();

    //Events
    optionsDropdown.forEach((option, index) => option.addEventListener("click", () => {

        if (dropdown.childElementCount > 1) {
            displayMediasOfOptionSelected(index);
            optionSelectedUpToFirst(index);
            dropdown.style.setProperty("--rotateArrowDropdown", "rotate(-135deg)");
            dropdown.style.setProperty("--moveArrowDropdown", "22px");
        }
        else {
            displayOptionsNotSelected(index);
            dropdown.style.setProperty("--rotateArrowDropdown", "rotate(45deg)");
            dropdown.style.setProperty("--moveArrowDropdown", "28px");
        }
    }));//If  the list of options is not unfolded, display it. Otherwise, 
    //displays the list of media of the selected option.
    
    document.addEventListener("click", (e) => {

        if (dropdown.childElementCount > 1) {
            if (e.target !== dropdown.children[0]) {

                for (let option of optionsDropdown) {
                    if (dropdown.children[0] !== option) {
                        dropdown.removeChild(option);
                    }
                    else {
                        dropdown.style.setProperty("--rotateArrowDropdown", "rotate(-135deg)");
                        dropdown.style.setProperty("--moveArrowDropdown", "22px");
                        option.style.borderBottom = "1px solid transparent";
                    }
                }
            
            }

        }   
    });//if the user clicks anywhere outside the select box, then close all select boxes

    hideOptionsNotSelectedByDefault();//hide by default all options not selected and 
    //display the list of medias of option selected

    //Functions
    function hideOptionsNotSelectedByDefault(){
        for (let option of optionsDropdown) {
            if (dropdown.children[0].id !== option.id) {
                dropdown.removeChild(option);
            }
        }
        displayMediasOfOptionSelectedByDefault();
    }
    function displayMediasOfOptionSelectedByDefault() {
        if (dropdown.children[0].id == "likes") {
            for (let i = 0; i < sortLikes.length; i++) {
                for (let index = 0; index < medias.length; index++) {
                    if (medias[index]["likes"] == sortLikes[i]) {
                        ulMedias.appendChild(listCardMedias[index]);
                    }
                }
            }
        }
        if (dropdown.children[0].id == "date") {
            for (let i = 0; i < sortDate.length; i++) {
                for (let index = 0; index < medias.length; index++) {
                    if (medias[index]["date"] == sortDate[i]) {
                        ulMedias.appendChild(listCardMedias[index]);
                    }
                }
            }
        }
        if (dropdown.children[0].id == "title") {
            for (let i = 0; i < sortTitle.length; i++) {
                for (let index = 0; index < medias.length; index++) {
                    if (medias[index]["title"] == sortTitle[i]) {
                        ulMedias.appendChild(listCardMedias[index]);
                    }
                }
            }
        }
    }
    function hideOptionsNotSelected(n) {

        for (let option of optionsDropdown) {
            if (optionsDropdown[n].id !== option.id) {
                dropdown.removeChild(option);
            }
            else {
                option.style.borderBottom = "1px solid transparent";
            }
        }

    }
    function displayMediasOfOptionSelected(n) {
        if (optionsDropdown[n].id == "likes") {
            for (let i = 0; i < sortLikes.length; i++) {
                for (let index = 0; index < medias.length; index++) {
                    if (medias[index]["likes"] == sortLikes[i]) {
                        ulMedias.appendChild(listCardMedias[index]);
                    }
                }
            }
        }
        if (optionsDropdown[n].id == "date") {
            for (let i = 0; i < sortDate.length; i++) {
                for (let index = 0; index < medias.length; index++) {
                    if (medias[index]["date"] == sortDate[i]) {
                        ulMedias.appendChild(listCardMedias[index]);
                    }
                }
            }
        }
        if (optionsDropdown[n].id == "title") {
            for (let i = 0; i < sortTitle.length; i++) {
                for (let index = 0; index < medias.length; index++) {
                    if (medias[index]["title"] == sortTitle[i]) {
                        ulMedias.appendChild(listCardMedias[index]);
                    }
                }
            }
        }
    }
    function optionSelectedUpToFirst(n) {// the option selected go as first child of dropdown

        if (optionsDropdown[n].id == "likes") {
            dropdown.prepend(optionsDropdown[n]);
            hideOptionsNotSelected(n);
        }
        if (optionsDropdown[n].id == "date") {
            dropdown.prepend(optionsDropdown[n]);
            hideOptionsNotSelected(n);
        }
        if (optionsDropdown[n].id == "title") {
            dropdown.prepend(optionsDropdown[n]);
            hideOptionsNotSelected(n);
        }
    }
    function displayOptionsNotSelected(n) {
        for (let option of arrOptions) {
            if (optionsDropdown[n].id !== option.id) {
                dropdown.appendChild(option);
            }
        }

        for (let option of optionsDropdown) {

            if (dropdown.lastChild.id == option.id) {
                option.style.borderBottom = "1px solid transparent";
            }
            else {
                option.style.borderBottom = "1px solid white";
            }

        }

    }
    // /!\ Archive Events sort with select (lf: select element on html)

    // const dropdown = document.getElementById("dropdownList");
    // const ulMedias = document.querySelector('.list-medias');
    // const listCardMedias = document.querySelectorAll(".card-media-photographer");
    // const indexDropdown = dropdown.selectedIndex;
    // const valueOption = dropdown.options[indexDropdown].value;
    // const selectedOption = dropdown.options[indexDropdown].selected;
    // let indexOption;
    // window.addEventListener("load", sortMediasDefault); // sort medias on option selected by default
    // dropdown.addEventListener("change", () => {
    //     indexOption = dropdown.selectedIndex;
    //     sortMedias(indexOption);
    // });//event change on dropdown
    // dropdown.addEventListener("change", hideOptionSelected);// event hide option 
    // window.addEventListener("load", hideOptionSelected);// hide option by default

    // function hideOptionSelected() {
    //     for (let option of dropdown.options) {
    //         if (option.selected === true) {
    //             option.style.display = "none";
    //         }
    //         else {
    //             option.style.display = "block";
    //         }
    //     }
    // }
    // function sortMedias(n) {// sort medias by label option
    //     const labelOption = dropdown.options[n].label;
    //     if (labelOption == "Popularité") {
    //         for (let i = 0; i < sortLikes.length; i++) {
    //             for (let i2 = 0; i2 < medias.length; i2++) {
    //                 if (medias[i2]["likes"] == sortLikes[i]) {
    //                     ulMedias.appendChild(listCardMedias[i2]);
    //                 }
    //             }
    //         }
    //     }
    //     if (labelOption == "Date") {
    //         for (let i = 0; i < sortDate.length; i++) {
    //             for (let i2 = 0; i2 < medias.length; i2++) {
    //                 if (medias[i2]["date"] == sortDate[i]) {
    //                     ulMedias.appendChild(listCardMedias[i2]);
    //                 }
    //             }
    //         }
    //     }
    //     if (labelOption == "Titre") {
    //         for (let i = 0; i < sortTitle.length; i++) {
    //             for (let i2 = 0; i2 < medias.length; i2++) {
    //                 if (medias[i2]["title"] == sortTitle[i]) {
    //                     ulMedias.appendChild(listCardMedias[i2]);
    //                 }
    //             }
    //         }
    //     }
    // }
    // function sortMediasDefault() {
    //     if (selectedOption === true) {
    //         if (valueOption == "likes") {
    //             for (let i = 0; i < sortLikes.length; i++) {
    //                 for (let i2 = 0; i2 < medias.length; i2++) {
    //                     if (medias[i2][valueOption] == sortLikes[i]) {
    //                         ulMedias.appendChild(listCardMedias[i2]);
    //                     }
    //                 }
    //             }
    //         }
    //         if (valueOption == "date") {
    //             for (let i = 0; i < sortDate.length; i++) {
    //                 for (let i2 = 0; i2 < medias.length; i2++) {
    //                     if (medias[i2][valueOption] == sortDate[i]) {
    //                         ulMedias.appendChild(listCardMedias[i2]);
    //                     }
    //                 }
    //             }
    //         }
    //         if (valueOption == "title") {
    //             for (let i = 0; i < sortTitle.length; i++) {
    //                 for (let i2 = 0; i2 < medias.length; i2++) {
    //                     if (medias[i2][valueOption] == sortTitle[i]) {
    //                         ulMedias.appendChild(listCardMedias[i2]);
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }
}
