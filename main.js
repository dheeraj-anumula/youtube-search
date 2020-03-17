"use strict"

const nextButton = document.querySelector(".next-div");
const prevButton = document.querySelector(".prev-div");
const myList = document.querySelector('ul');
const form = document.querySelector('form');
const errorElement = document.querySelector(".error");

let pageToken;
let firstPageToken;
let searchText;

let noOfVideos = (() => {
    let rowGap=3;
    let itemWidth=320;
    let itemHeight=260;
    let headerHeight=75;
    let gridWidth = window.innerWidth / (itemWidth + (window.innerWidth / itemWidth) * rowGap);
    let gridHeight = (window.innerHeight - headerHeight)/itemHeight;
    return Math.floor(gridWidth) * Math.floor(gridHeight);
})();


let listenersState = (function addListeners() {

    form.addEventListener('submit', e => e.preventDefault())

    document.querySelector(".search").addEventListener("click", search);

    document.querySelector(".next").addEventListener("click", () => {
        pageToken.then(pages => navigate(pages.nextPage))
    });

    document.querySelector(".prev").addEventListener("click", () => {
        pageToken.then(pages => navigate(pages.prevPage, true));
    });
    return true;
})();


function search() {

    errorElement.innerHTML = "";
    prevButton.style.display = "none";
    searchText = document.querySelector("#input").value;
    myList.innerHTML = "";
    pageToken = displaySearchResult(myList, searchText).then(pages => { return pages; });
    firstPageToken = pageToken;
    if (noOfVideos.length !== 0) {
        nextButton.style.display = "block";
    }
}


function navigate(token, prevPage) {

    myList.innerHTML = "";
    pageToken = displaySearchResult(myList, searchText, "&pageToken=" + token)
        .then(pages => {return pages;});

    prevButton.style.display = "block";
    if (prevPage) {
        firstPageToken.then(pages => {
            if (pages.nextPage === (token.substr(0, 5)) + 'A') { prevButton.style.display = "none" }
        })
    }
}


function handleFetchError(error) {

    console.log(error);
    errorElement.style.display = "block";
    errorElement.innerHTML = error.message;
    prevButton.style.display = "none";
    nextButton.style.display = "none";
}

