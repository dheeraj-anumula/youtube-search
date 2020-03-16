"use strict"

const myList = document.querySelector('ul');
let width = window.innerWidth;
let height = window.innerHeight-75;
let searchText = 'js';
let noOfVideos = Math.floor(width / (320+(width/320)*3)) * Math.floor(height / 260);

const form = document.querySelector('form');
form.addEventListener('submit', e => e.preventDefault())
const errorPara=document.querySelector(".body-content");

function displaySearchResult(pageRoute) {
    return new Promise(function elements(resolve) {

        fetchJson('https://www.googleapis.com/youtube/v3/search?key=AIzaSyCTmn2VL1-pni8B6M03bQHVvPV4zp0zUD4&type=video&part=snippet&maxResults=' + noOfVideos + '&q=' + searchText + (pageRoute || ""))
            .then((json) => {

                console.log(json);
                let videos = [];

                json.items.map(item => videos.push(item.id.videoId));

                let pageToken={
                    nextPage : json.nextPageToken,
                    prevPage : json.prevPageToken
                }
                
                console.log('videos are' + videos.join(','));
                fetchJson('https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCTmn2VL1-pni8B6M03bQHVvPV4zp0zUD4&id=' + videos.toString() +
                    '&part=snippet,statistics')


                    .then( (json)=> {

                        console.log(json);

                        json.items.map((item)=>{

                            let listItem = document.createElement('li');
                        
                            listItem.innerHTML = '<a href=https://www.youtube.com/watch?v='+item.id+'><img src='+item.snippet.thumbnails.medium.url+' /> </a>';
                            
                            const template =  document.querySelector("#video-tag");
                            let cont = template.content.cloneNode(true);
                        
                            const title = cont.querySelector(".title");
                            const desc=cont.querySelector(".desc");
                        
                            title.innerHTML = item.snippet.title;
                            desc.innerHTML=item.snippet.channelTitle+' <br> '+item.statistics.viewCount+' views | Published On '+item.snippet.publishedAt.substr(0,10);

                            listItem.appendChild(cont);
                            myList.appendChild(listItem);
                        
                        });

                        resolve(pageToken);

                    })

                    .catch( (error) =>  handleFetchError(error) );
            })
            .catch( (error) =>  handleFetchError(error) );

    })
}

document.querySelector(".search").addEventListener("click", search);
const nextButton= document.querySelector(".next-div");
const prevButton= document.querySelector(".prev-div");

var pageToken;
var firstPageToken;
function handleFetchError(error) {
    console.log(error);
    errorPara.innerHTML = '<p>' + error.message + '</p>';
}

function fetchJson(url) {
    return fetch(url)
        .then((response)=> {
            console.log(response);
            if (!response.ok) {
                throw new Error("HTTP error, status = " + response.status);
            }
            return response.json();
        });
}

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
    console.log('first page');
    console.log(firstPageToken);
    prevButton.style.display="block";
    console.log(token);
    // if(prevPage && firstPageToken.then((pages)=>{ console.log(pages.nextPage);console.log(token);return pages.nextPage.substr(0,5)+'Q'===token})){
    if(token==='CAQQAQ'){
        
        prevButton.style.display="none";
    }
}

document.querySelector(".prev").addEventListener("click", ()=>{pageToken.then(function (pages){ next(pages.prevPage,true);})});