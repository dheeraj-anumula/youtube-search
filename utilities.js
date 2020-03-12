"use strict"

var myList = document.querySelector('ul');
var width = window.innerWidth;
var height = window.innerHeight;
var nextPage;
var prevPage;
// console.log('width' + width + ' height' + height);

var videos = [];
var searchText = 'js';

var noOfVideos = Math.floor(width / 322) * Math.floor(height / 265);
// console.log(noOfVideos);
myList.style.gridTemplateColumns = '1fr '.repeat(Math.floor(width / 322));

const form = document.querySelector('form');
form.addEventListener('submit', e => e.preventDefault())


function displaySearchResult(pageRoute) {
    return new Promise(function elements(resolve) {

        fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyDGjRE14ZoCG76UxyzP2j_FntkRiLbP90w&type=video&part=snippet&maxResults=' + noOfVideos + '&q=' + searchText + (pageRoute || ""))

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
                fetch('https://www.googleapis.com/youtube/v3/videos?key=AIzaSyDGjRE14ZoCG76UxyzP2j_FntkRiLbP90w&id=' + videos.toString() +
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



                            listItem.innerHTML = '<img src=' + json.items[i].snippet.thumbnails.high.url + '  />';

                            listItem.innerHTML = '<iframe src=https://www.youtube.com/embed/' + json.items[i].id + '></iframe> ';

                            var content = document.createElement('div');

                            listItem.appendChild(content);

                            content.innerHTML += json.items[i].snippet.title;

                            // listItem.innerHTML += '<strong>' + json.items[i].snippet.description; + '</strong>';

                            content.innerHTML += '<br> ' + json.items[i].snippet.channelTitle; + '.';



                            myList.appendChild(listItem);

                        }
                        console.log(nextPage);
                        // return nextPage;
                        resolve(pageToken);

                    })

                    .catch(function (error) {

                        var p = document.createElement('p');

                        p.appendChild(

                            document.createTextNode('Error: ' + error.message)

                        );

                        document.body.insertBefore(p, myList);

                    });
            })
            .catch(function (error) {

                var p = document.createElement('p');

                p.appendChild(

                    document.createTextNode('Error: ' + error.message)

                );
                console.log(error);

                document.body.insertBefore(p, myList);

            });


    })
}

document.querySelector(".search").addEventListener("click", search);

var pageToken;
function search() {
    console.log(pageToken);
    searchText = document.querySelector("#input").value;
    myList.innerHTML="";
    var _pageToken = displaySearchResult().then(function (pages) { return pages; });
    pageToken = _pageToken;
    return _pageToken;
}
document.querySelector(".next").addEventListener("click", next);




function next() {
    console.log(pageToken);
    pageToken=pageToken.then(function (pages) {

        myList.innerHTML = "";

        return displaySearchResult("&pageToken=" + pages.nextPage);
    })
        .then(function (pages) {
            return pages;
        });
    console.log(pageToken);
}