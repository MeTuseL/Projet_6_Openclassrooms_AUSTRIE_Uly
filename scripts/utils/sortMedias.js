function eventsSortMedias(medias) {//Events sort medias

    const sortLikes = new Array();
    const sortDate = new Array();
    const sortTitle = new Array();
    const byValue = (a, b) => a - b;

    for (let media of medias) {
        sortLikes.push(media["likes"]);
        sortDate.push(media["date"]);
        sortTitle.push(media["title"]);
    }
    sortLikes.sort(byValue);
    sortDate.sort();
    sortTitle.sort();
    const ulMedias = document.querySelector('.list-medias');
    const listCardMedias = document.querySelectorAll(".card-media-photographer");
    const t = document.querySelector(".dropdown-options");
    const r = document.querySelectorAll(".dropdown-options span");
    const arr = Array.from(r);

    r.forEach((option, index) => option.addEventListener("click", () => {

        if (t.childElementCount > 1) {
            test2(index);
            test(index);
            t.style.setProperty("--rotateArrowDropdown", "rotate(-135deg)");
            t.style.setProperty("--moveArrowDropdown", "22px");
        }
        else {
            test4(index);
            t.style.setProperty("--rotateArrowDropdown", "rotate(45deg)");
            t.style.setProperty("--moveArrowDropdown", "28px");
        }


    }));
    window.addEventListener("load", () => {

        for (let p of r) {
            if (t.firstChild.nextSibling.id !== p.id) {
                t.removeChild(p);
            }
        }

    });
    window.addEventListener("load",test1);
    document.addEventListener("click", (e) => {

        if (t.childElementCount > 1) {
            if (e.target !== t.children[0]) {

                for (let x of r) {
                    if (t.children[0] !== x) {
                        t.removeChild(x);
                    }
                    else {
                        t.style.setProperty("--rotateArrowDropdown", "rotate(-135deg)");
                        t.style.setProperty("--moveArrowDropdown", "22px");
                        x.style.borderBottom = "1px solid transparent";
                    }
                }
            
            }
            


        }


    });/*if the user clicks anywhere outside the select box,
    then close all select boxes:*/
    function test2(n) {
        if (r[n].id == "likes") {
            for (let i = 0; i < sortLikes.length; i++) {
                for (let i2 = 0; i2 < medias.length; i2++) {
                    if (medias[i2]["likes"] == sortLikes[i]) {
                        ulMedias.appendChild(listCardMedias[i2]);
                    }
                }
            }
        }
        if (r[n].id == "date") {
            for (let i = 0; i < sortDate.length; i++) {
                for (let i2 = 0; i2 < medias.length; i2++) {
                    if (medias[i2]["date"] == sortDate[i]) {
                        ulMedias.appendChild(listCardMedias[i2]);
                    }
                }
            }
        }
        if (r[n].id == "title") {
            for (let i = 0; i < sortTitle.length; i++) {
                for (let i2 = 0; i2 < medias.length; i2++) {
                    if (medias[i2]["title"] == sortTitle[i]) {
                        ulMedias.appendChild(listCardMedias[i2]);
                    }
                }
            }
        }
    }
    function test1() {
        if (t.children[0].id == "likes") {
            for (let i = 0; i < sortLikes.length; i++) {
                for (let i2 = 0; i2 < medias.length; i2++) {
                    if (medias[i2]["likes"] == sortLikes[i]) {
                        ulMedias.appendChild(listCardMedias[i2]);
                    }
                }
            }
        }
        if (t.children[0].id == "date") {
            for (let i = 0; i < sortDate.length; i++) {
                for (let i2 = 0; i2 < medias.length; i2++) {
                    if (medias[i2]["date"] == sortDate[i]) {
                        ulMedias.appendChild(listCardMedias[i2]);
                    }
                }
            }
        }
        if (t.children[0].id == "title") {
            for (let i = 0; i < sortTitle.length; i++) {
                for (let i2 = 0; i2 < medias.length; i2++) {
                    if (medias[i2]["title"] == sortTitle[i]) {
                        ulMedias.appendChild(listCardMedias[i2]);
                    }
                }
            }
        }
    }
    function test(n) {

        if (r[n].id == "likes") {
            t.prepend(r[n]);
            test3(n);
        }
        if (r[n].id == "date") {
            t.prepend(r[n]);
            test3(n);
        }
        if (r[n].id == "title") {
            t.prepend(r[n]);
            test3(n);
        }
    }
    function test3(n) {

        for (let sOptions of r) {
            if (r[n].id !== sOptions.id) {
                t.removeChild(sOptions);
            }
            else {
                sOptions.style.borderBottom = "1px solid transparent";
            }
        }

    }
    function test4(n) {
        for (let s of arr) {
            if (r[n].id !== s.id) {
                t.appendChild(s);
            }
        }

        for (let sOptions of r) {

            if (t.lastChild.id == sOptions.id) {
                sOptions.style.borderBottom = "1px solid transparent";
            }
            else {
                sOptions.style.borderBottom = "1px solid white";
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
