"use strict"

const API_KEY = properties.apiKey;

function fetchJson(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error, status = " + response.status);
            }
            return response.json();
        });
}

function displaySearchResult(myList,searchText,pageRoute) {

    return new Promise( resolve => {

        fetchJson('https://www.googleapis.com/youtube/v3/search?key=' + API_KEY + '&type=video&part=snippet&maxResults=' + 
                noOfVideos + '&q=' + searchText + (pageRoute || ""))
            .then(json => {

                let videos = [];

                json.items.map(item => videos.push(item.id.videoId));

                let pageToken = {
                    nextPage: json.nextPageToken,
                    prevPage: json.prevPageToken
                }

                populateVideos(myList,videos, resolve, pageToken);
            })
            .catch(error => handleFetchError(error));

    })
}


function populateVideos(myList,videos, resolve, pageToken) {
    fetchJson('https://www.googleapis.com/youtube/v3/videos?key=' + API_KEY + '&id=' + videos.toString() +
        '&part=snippet,statistics')
        .then(json => {
            json.items.map((item) => {
                let listItem = document.createElement('li');
                listItem.innerHTML = '<a href=https://www.youtube.com/watch?v=' + item.id + '><img src=' +
                    item.snippet.thumbnails.medium.url + ' /> </a>';
                const template = document.querySelector("#video-tag");
                let cont = template.content.cloneNode(true);
                const title = cont.querySelector(".title");
                const desc = cont.querySelector(".desc");
                title.innerHTML = item.snippet.title;
                desc.innerHTML = item.snippet.channelTitle + ' <br> ' + item.statistics.viewCount
                    + ' views | Published On ' + item.snippet.publishedAt.substr(0, 10);
                listItem.appendChild(cont);
                myList.appendChild(listItem);
            });
            resolve(pageToken);
        })
        .catch(error => {
            handleFetchError(error);
        });
}