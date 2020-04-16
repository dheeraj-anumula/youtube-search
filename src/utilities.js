"use strict"

function fetchJson(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error, status = " + response.status);
            }
            return response.json();
        });
}

function handleFetchError(error) {

    console.log(error);
    errorElement.style.display = "block";
    errorElement.innerHTML = error.message;
    prevDiv.style.display = "none";
    nextDiv.style.display = "none";
}

function getVideoIds(searchText, pageRoute) {

    return new Promise(resolve => {

        fetchJson('https://www.googleapis.com/youtube/v3/search?key=' + API_KEY + '&type=video&part=snippet&maxResults=' +
            noOfVideos + '&q=' + searchText + "&pageToken=" + (pageRoute || ""))
            .then(json => {

                let videoIds = [];

                json.items.map(item => videoIds.push(item.id.videoId));

                let pageToken = {
                    nextPage: json.nextPageToken,
                    prevPage: json.prevPageToken
                }

                resolve({videoIds, pageToken});
            })
            .catch(error => handleFetchError(error));

    })
}


function populateVideos(myList, videoIds) {
    fetchJson('https://www.googleapis.com/youtube/v3/videos?key=' + API_KEY + '&id=' + videoIds.toString() +
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
                return true;
            });
        })
        .catch(error => {
            handleFetchError(error);
        });
}