function eventsSortMedias(medias) {//Events sort medias

    //DOM
    const body = document.querySelector("body");
    const sectionHeader = document.getElementById('section-header');
    const header = document.getElementById("header");
    const listMediasPicture = document.querySelectorAll(".media-picture");
    const ulMedias = document.querySelector('.list-medias');
    const listCardMedias = document.querySelectorAll(".card-media-photographer");
    const dropdown = document.getElementById("dropdown-options");
    const optionsDropdown = document.querySelectorAll("#dropdown-options span");
    const arrOptions = Array.from(optionsDropdown);
    const firstChildDropdown = dropdown.children[0];
    let indexOption;
    let dropdownIsFocus;
    const listLightBoxMedias = document.querySelectorAll(".lightBox-media-picture");
    const listLightBox = document.querySelector(".list-lightBox");
    const nextIconsLightBox = document.querySelector(".next-media");

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

        if (dropdown.childElementCount > 1 && e.target !== dropdown && e.target.id !== "likes"
            && e.target.id !== "date" && e.target.id !== "title") {

            for (let option of optionsDropdown) {

                if (option == dropdown.firstChild || option == dropdown.firstChild.nextSibling) {
                    indexOption = arrOptions.indexOf(option);
                    hideOptionsNotSelected(indexOption);
                    option.style.backgroundColor = "";
                    dropdown.style.setProperty("--rotateArrowDropdown", "rotate(-135deg)");
                    dropdown.style.setProperty("--moveArrowDropdown", "22px");
                }
            }

        }

    });//if the user clicks anywhere outside the select box, then close all select boxes

    hideOptionsNotSelectedByDefault();//hide by default all options not selected and 
    //display the list of medias of option selected

    window.addEventListener("keydown", (event) => {//keydown event for select box
        //check dropdown is focused
        if (document.activeElement == dropdown || document.activeElement == firstChildDropdown) {
            dropdownIsFocus = "true";
        }
        else {
            dropdownIsFocus = "false";
        }

        //keydown events 
        if (event.code === "Enter" && dropdown.childElementCount > 1) {
            hideSelectBox();

        }
        else if (event.code === "Enter" && dropdown.childElementCount == 1 && dropdownIsFocus == "true") {//display option list
            body.style.overflow = "hidden";
            sectionHeader.setAttribute("inert", "");
            header.setAttribute("inert", "");
            ulMedias.setAttribute("inert", "");
            main.ariaHidden = "true";
            header.ariaHidden = "true";

            for (let i in optionsDropdown) {

                displayOptionsNotSelected(i);
                firstChildDropdown.focus();
                firstChildDropdown.style.backgroundColor = "orange";
                dropdown.style.setProperty("--rotateArrowDropdown", "rotate(45deg)");
                dropdown.style.setProperty("--moveArrowDropdown", "28px");
            }

        }
        else if (event.code === "ArrowDown" && dropdown.childElementCount > 1) {//scroll option

            nextOptionDropdown();
        }
        else if (event.code === "ArrowUp" && dropdown.childElementCount > 1) {//scroll option

            prevOptionDropdown();
        }
        else if (event.code === "Escape" && dropdown.childElementCount > 1) {//exit dropdown
            indexOption = arrOptions.indexOf(firstChildDropdown);
            showOption(indexOption);
            hideOptionsNotSelected(indexOption);
            firstChildDropdown.blur();
            dropdown.focus();
            dropdown.style.setProperty("--rotateArrowDropdown", "rotate(-135deg)");
            dropdown.style.setProperty("--moveArrowDropdown", "22px");
            body.style.overflow = "auto";
            sectionHeader.removeAttribute("inert");
            header.removeAttribute("inert");
            ulMedias.removeAttribute("inert");
            main.ariaHidden = "false";
            header.ariaHidden = "false";

        }
    });
    
    //Functions
    function hideSelectBox() {//hide options not selected or-and display medias list of option selected

        if (document.activeElement.id == firstChildDropdown.id) {
            indexOption = arrOptions.indexOf(firstChildDropdown);
            // showOption(indexOption);
            displayMediasOfOptionSelected(indexOption);
            hideOptionsNotSelected(indexOption);
            dropdown.style.setProperty("--rotateArrowDropdown", "rotate(-135deg)");
            dropdown.style.setProperty("--moveArrowDropdown", "22px");
            body.style.overflow = "auto";
            sectionHeader.removeAttribute("inert");
            header.removeAttribute("inert");
            ulMedias.removeAttribute("inert");
            main.ariaHidden = "false";
            header.ariaHidden = "false";
            firstChildDropdown.blur();
            focusFirstMediaPicture(firstChildDropdown.id);
        }
        else {
            for (let option of optionsDropdown) {

                if (document.activeElement.id == option.id) {
                    indexOption = arrOptions.indexOf(option);
                    displayMediasOfOptionSelected(indexOption);
                    optionSelectedUpToFirst(indexOption);
                    option.style.backgroundColor = "";
                    listMediasPicture[0].focus();//focus the first media picture
                    dropdown.style.setProperty("--rotateArrowDropdown", "rotate(-135deg)");
                    dropdown.style.setProperty("--moveArrowDropdown", "22px");
                    body.style.overflow = "auto";
                    sectionHeader.removeAttribute("inert");
                    header.removeAttribute("inert");
                    ulMedias.removeAttribute("inert");
                    main.ariaHidden = "false";
                    header.ariaHidden = "false";
                    focusFirstMediaPicture(option.id);
                }
            }
        }
    }
    function focusFirstMediaPicture(n){//focus the first media picture 
        for(let cardMedia of listCardMedias){
            if(n == "likes" && cardMedia == ulMedias.children[0]){
                for(let mediaPicture of listMediasPicture){
                    if(mediaPicture == cardMedia.children[0]){
                        mediaPicture.focus();
                    }
                }
                
                
            }
            if(n == "date" && cardMedia == ulMedias.children[0]){
                for(let mediaPicture of listMediasPicture){
                    if(mediaPicture == cardMedia.children[0]){
                        mediaPicture.focus();
                    }
                }
                
                
            }
            if(n == "title" && cardMedia == ulMedias.children[0]){
                for(let mediaPicture of listMediasPicture){
                    if(mediaPicture == cardMedia.children[0]){
                        mediaPicture.focus();
                    }
                }
                
                
            }
        }
    }
    function nextOptionDropdown() {//show next option of dropdown
        for (let option of optionsDropdown) {
            if (option.style.backgroundColor == "orange") {
                indexOption = arrOptions.indexOf(option);
            }
        }
        if (indexOption == (optionsDropdown.length - 1)) {
            indexOption = 0;
            showOption(indexOption);
        }
        else {
            showOption((indexOption + 1));
        }
    }
    function prevOptionDropdown() {//show previous option of dropdown
        for (let option of optionsDropdown) {
            if (option.style.backgroundColor == "orange") {
                indexOption = arrOptions.indexOf(option);
            }
        }
        if (indexOption == 0) {
            indexOption = (optionsDropdown.length - 1);
            showOption(indexOption);
        }
        else {
            showOption((indexOption - 1));
        }
    }
    function showOption(n) {// focus option by index

        for (let i = 0; i < optionsDropdown.length; i++) {
            optionsDropdown[i].style.backgroundColor = "";
            optionsDropdown[i].blur();
        }
        optionsDropdown[n].style.backgroundColor = "orange";
        optionsDropdown[n].focus();
    }
    function hideOptionsNotSelectedByDefault() {
        for (let option of optionsDropdown) {
            if (firstChildDropdown.id !== option.id) {
                dropdown.removeChild(option);
            }
        }
        displayMediasOfOptionSelectedByDefault();
    }
    function displayMediasOfOptionSelectedByDefault() {
        if (firstChildDropdown.id == "likes") {
            for (let i = 0; i < sortLikes.length; i++) {
                for (let index = 0; index < medias.length; index++) {
                    if (medias[index]["likes"] == sortLikes[i]) {
                        ulMedias.appendChild(listCardMedias[index]);
                        listLightBox.insertBefore(listLightBoxMedias[index],nextIconsLightBox);//sort lightbox list
                    }
                }
            }
        }
        if (dropdown.children[0].id == "date") {
            for (let i = 0; i < sortDate.length; i++) {
                for (let index = 0; index < medias.length; index++) {
                    if (medias[index]["date"] == sortDate[i]) {
                        ulMedias.appendChild(listCardMedias[index]);
                        listLightBox.insertBefore(listLightBoxMedias[index],nextIconsLightBox);//sort lightbox list

                    }
                }
            }
        }
        if (dropdown.children[0].id == "title") {
            for (let i = 0; i < sortTitle.length; i++) {
                for (let index = 0; index < medias.length; index++) {
                    if (medias[index]["title"] == sortTitle[i]) {
                        ulMedias.appendChild(listCardMedias[index]);
                        listLightBox.insertBefore(listLightBoxMedias[index],nextIconsLightBox);//sort lightbox list

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
                        listLightBox.insertBefore(listLightBoxMedias[index],nextIconsLightBox);//sort lightbox list

                    }
                }
            }
        }
        if (optionsDropdown[n].id == "date") {
            for (let i = 0; i < sortDate.length; i++) {
                for (let index = 0; index < medias.length; index++) {
                    if (medias[index]["date"] == sortDate[i]) {
                        ulMedias.appendChild(listCardMedias[index]);
                        listLightBox.insertBefore(listLightBoxMedias[index],nextIconsLightBox);//sort lightbox list

                    }
                }
            }
        }
        if (optionsDropdown[n].id == "title") {
            for (let i = 0; i < sortTitle.length; i++) {
                for (let index = 0; index < medias.length; index++) {
                    if (medias[index]["title"] == sortTitle[i]) {
                        ulMedias.appendChild(listCardMedias[index]);
                        listLightBox.insertBefore(listLightBoxMedias[index],nextIconsLightBox);//sort lightbox list

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
        for (let option of optionsDropdown) {
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
}
