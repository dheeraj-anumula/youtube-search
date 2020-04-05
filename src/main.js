"use strict"

let noOfVideos = (() => {
    let rowGap = 3;
    let itemWidth = 320;
    let itemHeight = 260;
    let headerHeight = 75;
    let gridWidth = window.innerWidth / (itemWidth + (window.innerWidth / itemWidth) * rowGap);
    let gridHeight = (window.innerHeight - headerHeight) / itemHeight;
    return Math.floor(gridWidth) * Math.floor(gridHeight);
})();


function addListeners() {

    form.addEventListener('submit', e => e.preventDefault())

    document.querySelector(".search").addEventListener("click", search);

    document.querySelector(".next").addEventListener("click", () => {
        pageToken.then(pages => navigate(pages.nextPage))
    });

    document.querySelector(".prev").addEventListener("click", () => {
        pageToken.then(pages => navigate(pages.prevPage, true));
    });
    return true;
}


function search() {

    errorElement.innerHTML = "";
    prevDiv.style.display = "none";
    searchText = document.querySelector("#input").value;
    myList.innerHTML = "";
    pageToken = getVideoIds(searchText).then(
        response => { 
            populateVideos(myList, response.videoIds);
            return response.pageToken; 
        });
    
    firstPageToken = pageToken;
    if (noOfVideos.length !== 0) {
        nextDiv.style.display = "block";
    }
}


function navigate(token, prevPage) {

    myList.innerHTML = "";
    pageToken = getVideoIds(searchText, token).then(response => { 
            populateVideos(myList, response.videoIds);
            return response.pageToken;
         });
    prevDiv.style.display = "block";
    if (prevPage) {
        firstPageToken.then(pages => {
            if (pages.nextPage === (token.substr(0, 5)) + 'A') { prevDiv.style.display = "none" }
        })
    }
}

