

const searchElement = document.querySelector('.search');
searchElement.addEventListener('click', searchHandler);

function searchHandler() {
    const searchText = document.querySelector('#input').value;
    displayElements();
}


function displayElements() {
    hitAPI().then(function (json) {
        let videos = [];
        for (var i = 0; i < json.items.length; i++) {
            videos.push(json.items[i].id.videoId);
        }
        console.log(videos);
    });
}

function hitAPI() {

    fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyCzlKZbY-xCtL2OjkROwkdXsWthSLU6-OQ&type=video&part=snippet&maxResults=15&q=js')
        .then(function (response) {

            if (!response.ok) {
                throw new Error("HTTP error, status = " + response.status);
            }
            return response.json();
        })
}


