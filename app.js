"use strict"

var myList = document.querySelector('ul');
var width=window.innerWidth;
var height=window.innerHeight;
var nextPage;
var prevPage;
console.log('width'+width+' height'+height);

console.log(myList);

var videos=[];

var noOfVideos=Math.floor(width/322)*Math.floor(height/265);
console.log(noOfVideos);
myList.style.gridTemplateColumns='1fr '.repeat(Math.floor(width/322));
function displaySearchResult(pageRoute){
    fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyBPGxhc364XMieii42PfhgTPoPB09T4vss&type=video&part=snippet&maxResults='+noOfVideos+'&q=js'+(pageRoute || ""))

    .then(function(response){

        return response.json();

    })

    .then(function(json){

        console.log(json);
        for(var i = 0; i < json.items.length; i++) {
          videos.push(json.items[i].id.videoId);
        
        }
        nextPage=json.nextPageToken;
        console.log('next Page---------'+nextPage);
        prevPage=json.prevPageToken;
        console.log('videos are'+videos.join(','));
        fetch('https://www.googleapis.com/youtube/v3/videos?key=AIzaSyBPGxhc364XMieii42PfhgTPoPB09T4vss&id='+videos.toString()+
        '&part=snippet,statistics')
        
        .then(function(response) { 
        
          if (!response.ok) {
        
            throw new Error("HTTP error, status = " + response.status);
        
          }
        
          return response.json();
        
        })
        
        .then(function(json) {
        
            console.log(json);
        
          for(var i = 0; i < json.items.length; i++) {
        
              
        
            var listItem = document.createElement('li');
        
            
        
            listItem.innerHTML ='<img src=' + json.items[i].snippet.thumbnails.high.url + '  />';
        
            listItem.innerHTML ='<iframe src=https://www.youtube.com/embed/'+json.items[i].id+'></iframe> ';
        
            var content=document.createElement('div');
        
            listItem.appendChild(content);
        
            content.innerHTML += json.items[i].snippet.title;
        
            // listItem.innerHTML += '<strong>' + json.items[i].snippet.description; + '</strong>';
        
            content.innerHTML +='<br> ' + json.items[i].snippet.channelTitle; + '.';
        
            
        
            myList.appendChild(listItem);
        
          }
        
        })
        
        .catch(function(error) {
        
          var p = document.createElement('p');
        
          p.appendChild(
        
            document.createTextNode('Error: ' + error.message)
        
          );
        
          document.body.insertBefore(p, myList);
        
        });
    });
    console.log('dheeraj'+videos);
    

  }

  
  displaySearchResult();
  // alert('second');
  myList.innerHTML="";
  displaySearchResult("&pageToken="+nextPage);
  console.log(nextPage);