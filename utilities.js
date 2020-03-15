"use strict"

var myList = document.querySelector('ul');
var width = window.innerWidth;
var height = window.innerHeight;
var nextPage;
var prevPage;
console.log('width' + width + ' height' + height);

var videos = [];
var searchText = 'js';

var noOfVideos = Math.floor(width / 320) * Math.floor(height / 260);
// console.log(noOfVideos);

const form = document.querySelector('form');
form.addEventListener('submit', e => e.preventDefault())
const errorPara=document.querySelector(".body-content");

function displaySearchResult(pageRoute) {
    return new Promise(function elements(resolve) {

        fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyDEo_WcwLiuGrJsnenmtYVfqfdWh8yFDac&type=video&part=snippet&maxResults=' + noOfVideos + '&q=' + searchText + (pageRoute || ""))

            .then(function (response) {
              console.log(response);
                if (!response.ok) {

                    throw new Error("HTTP error, status = " + response.status);

                }

                return response.json();

            })

            .then(function (json) {

                console.log(json);
                videos = [];
                for (var i = 0; i < json.items.length; i++) {
                    videos.push(json.items[i].id.videoId);
                }

                var pageToken={
                    nextPage : json.nextPageToken,
                    prevPage : json.prevPageToken
                }
                
                console.log('next Page---------' + nextPage);
                
                console.log('videos are' + videos.join(','));
                fetch('https://www.googleapis.com/youtube/v3/videos?key=AIzaSyDEo_WcwLiuGrJsnenmtYVfqfdWh8yFDac&id=' + videos.toString() +
                    '&part=snippet,statistics')

                    .then(function (response) {

                        if (!response.ok) {

                            throw new Error("HTTP error, status = " + response.status);

                        }

                        return response.json();

                    })

                    .then(function (json) {

                        console.log(json);

                        for (var i = 0; i < json.items.length; i++) {

                            var listItem = document.createElement('li');

                            // listItem.innerHTML = '<img src=' + json.items[i].snippet.thumbnails.high.url + '  />';

                            // listItem.innerHTML = '<iframe src=https://www.youtube.com/embed/' + json.items[i].id + '></iframe> ';
                            listItem.innerHTML = '<a href=https://www.youtube.com/watch?v='+json.items[i].id+'><img src='+json.items[i].snippet.thumbnails.medium.url+' /> </a>';
                            
                            var template =  document.querySelector("#video-tag");
                            var cont = template.content.cloneNode(true);

                            var title = cont.querySelector(".title");
                            var desc=cont.querySelector(".desc");

                            title.innerHTML = json.items[i].snippet.title;
                            // title.classList.add("overflow");

                            desc.innerHTML=json.items[i].snippet.channelTitle+' <br> '+json.items[i].statistics.viewCount+' views | Published On '+json.items[i].snippet.publishedAt.substr(0,10);
                            listItem.appendChild(cont);

                            // listItem.innerHTML += '<strong>' + json.items[i].snippet.description; + '</strong>';

                            // content.innerHTML += '<br> ' + json.items[i].snippet.channelTitle + '.';



                            myList.appendChild(listItem);

                        }
                        // return nextPage;
                        resolve(pageToken);

                    })

                    .catch(function (error) {

                        console.log(error);
                        errorPara.innerHTML='<p>'+error.message+'</p>';

                    });
            })
            .catch(function (error) {

                console.log(error);

                errorPara.innerHTML='<p>'+error.message+'</p>';

            });


    })
}

document.querySelector(".search").addEventListener("click", search);
const nextButton= document.querySelector(".next-div");
const prevButton= document.querySelector(".prev-div");

var pageToken;
var firstPageToken;
function search() {
    prevButton.style.display="none";
    console.log(pageToken);
    searchText = document.querySelector("#input").value;
    myList.innerHTML="";
    var _pageToken = displaySearchResult().then(function (pages) { return pages; });
    pageToken = _pageToken;
    firstPageToken=_pageToken;
    if(noOfVideos.length!==0){
        nextButton.style.display="block";
    }
}

document.querySelector(".next").addEventListener("click", ()=>{pageToken.then(function (pages){ next(pages.nextPage);})});

function next(token,prevPage) {

    myList.innerHTML = "";
    
    pageToken= displaySearchResult("&pageToken=" + token)
        .then(function (pages) {
            return pages;
        });
    console.log(pageToken);
    prevButton.style.display="block";
    if(prevPage && firstPageToken.then((pages)=>{return pages.prevPage===token})){
        prevButton.style.display="none";
    }
}

document.querySelector(".prev").addEventListener("click", ()=>{pageToken.then(function (pages){ next(pages.prevPage,true);})});