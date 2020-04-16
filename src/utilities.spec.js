describe('utility method', () => {

    window.API_KEY = properties.apiKey;
    window.searchText = "java";

    const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&type=video&part=snippet&maxResults=${noOfVideos}&q=js`;

    beforeAll(() => {
        var sampleDiv = document.createElement("div");
        sampleDiv.innerHTML = `
        <p class="error"></p>
        <div class="next-div"></div>
        <div class="prev-div"></div>
        <ul></ul>
        <template id="video-tag">
            <div>
            <p class="title"></p>
            <p class="desc"></p>
            </div>
        </template>`

        document.body.prepend(sampleDiv);
        window.nextDiv = document.querySelector(".next-div");
        window.prevDiv = document.querySelector(".prev-div");
        window.errorElement = document.querySelector(".error");
        window.myList = document.querySelector('ul');

    })

    afterAll(() => {
        document.body.innerHTML = "";
    })

    describe('handleFetchError', () => {
        it('should pass', () => {
            let errorMessage = "Error message";
            handleFetchError({ message: errorMessage });
            expect(window.errorElement.innerText).toEqual(errorMessage);
            expect(window.prevDiv.style.display).toEqual("none");
            expect(window.nextDiv.style.display).toEqual("none");
        })

    })

    describe("fetchJson", () => {
        let response = Object.create({ json: function () { } });
        response.ok = true;
        it("should pass", () => {
            spyOn(window, 'fetch').and.returnValue(Promise.resolve(response));
            let json = fetchJson(url);
            expect(window.fetch).toHaveBeenCalled();
            expect(json).toBeDefined();
        })

    })

    var windowSpy = jasmine.createSpyObj('window', ['fetchJson', 'handleFetchError']);

    describe("getVideoIds", () => {

        it("should pass", () => {
            spyOn(window, 'fetchJson').and.returnValue(Promise.resolve(
                {
                    items: [{
                        id: {
                            videoId: "videoId1"
                        }
                    }],
                    nextPageToken: "nextPage",
                    prevPageToken: "prevPage"
                }));
            let response = window.getVideoIds(window.searchText);
            expect(window.fetchJson).toHaveBeenCalled();
            response.then(result => {
                expect(result.videoIds).toEqual(["videoId1"]);
                expect(result.pageToken).toEqual({ nextPage: "nextPage", prevPage: "prevPage" });
            })
        });

    })

    describe("Test populateVideos", () => {

        it("should pass", () => {
            spyOn(window, 'fetchJson').and.returnValue(Promise.resolve({
                "items": [{ "kind": "youtube#video", "etag": "\"ksCrgYQhtFrXgbHAhi9Fo5t0C2I/l_I0AQbot1mZvoWA6vg9alQDZQ8\"", "id": "V_jHc_n0p9c", "snippet": { "publishedAt": "2020-03-26T17:30:11.000Z", "channelId": "UCtylTUUVIGY_i5afsQYeBZA", "title": "Lil Mosey - Blueberry Faygo (Dir. by @_ColeBennett_)", "description": "Lyrical Lemonade Presents:\n\nLil Mosey - Blueberry Faygo (Official Music Video)\n\nDirected + Edited by Cole Bennett\nSong Produced by Callan\nVFX by Scissor Films\nDirector of Photography - Logan Meis\nSteadicam by Renard Cheren\nEx. Produced by Sal Tarantino + Jay Tauzin + Mogul Vision\n\nStream Blueberry Faygo: \nhttps://smarturl.it/BlueberryFaygo\n\n\nMake a video on Tik Tok:\nhttps://www.tiktok.com/music/original-sound-6751113703686556421\n\n\nLil Mosey's Socials:\nhttp://instagram.com/lilmosey\nhttp://twitter.com/lilmosey\n\n--\n\nOfficial Channel of Lyrical Lemonade \n\nSubscribe for updates on music videos, interviews, performance videos, etc.\n\nLyrical Lemonade's Hot 25 Spotify Playlist:\nhttps://open.spotify.com/user/gh3vdz775oy18ah1wp9ucxsj5/playlist/5UuPeWDR2I8a8pORvW9vmr\n\nLyrical Lemonade Socials:\n\nhttp://www.twitter.com/lyricalemonade\nhttp://www.instagram.com/lyricalemonade\nhttp://www.facebook.com/lyricalemonade\nhttp://www.lyricallemonade.com\n\n\nCole Bennett Socials:\n\nhttp://www.twitter.com/_colebennett_\nhttp://www.instagram.com/_colebennett_\n\nLENNY ~ our hidden character representing happiness & good energy\nhttp://instagram.com/lenny", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/V_jHc_n0p9c/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/V_jHc_n0p9c/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/V_jHc_n0p9c/hqdefault.jpg", "width": 480, "height": 360 }, "standard": { "url": "https://i.ytimg.com/vi/V_jHc_n0p9c/sddefault.jpg", "width": 640, "height": 480 } }, "channelTitle": "Lyrical Lemonade", "tags": ["lil mosey", "blueberry faygo", "music video", "noticed", "2020", "lyrical lemonade", "cole bennett", "hype house", "addison rae", "lil huddy", "the kid laroi", "hip hop", "rap", "pool", "water gun", "balloon", "balloons", "blue", "red", "synchronized swimming", "underwater", "lemon man", "lenny"], "categoryId": "24", "liveBroadcastContent": "none", "localized": { "title": "Lil Mosey - Blueberry Faygo (Dir. by @_ColeBennett_)", "description": "Lyrical Lemonade Presents:\n\nLil Mosey - Blueberry Faygo (Official Music Video)\n\nDirected + Edited by Cole Bennett\nSong Produced by Callan\nVFX by Scissor Films\nDirector of Photography - Logan Meis\nSteadicam by Renard Cheren\nEx. Produced by Sal Tarantino + Jay Tauzin + Mogul Vision\n\nStream Blueberry Faygo: \nhttps://smarturl.it/BlueberryFaygo\n\n\nMake a video on Tik Tok:\nhttps://www.tiktok.com/music/original-sound-6751113703686556421\n\n\nLil Mosey's Socials:\nhttp://instagram.com/lilmosey\nhttp://twitter.com/lilmosey\n\n--\n\nOfficial Channel of Lyrical Lemonade \n\nSubscribe for updates on music videos, interviews, performance videos, etc.\n\nLyrical Lemonade's Hot 25 Spotify Playlist:\nhttps://open.spotify.com/user/gh3vdz775oy18ah1wp9ucxsj5/playlist/5UuPeWDR2I8a8pORvW9vmr\n\nLyrical Lemonade Socials:\n\nhttp://www.twitter.com/lyricalemonade\nhttp://www.instagram.com/lyricalemonade\nhttp://www.facebook.com/lyricalemonade\nhttp://www.lyricallemonade.com\n\n\nCole Bennett Socials:\n\nhttp://www.twitter.com/_colebennett_\nhttp://www.instagram.com/_colebennett_\n\nLENNY ~ our hidden character representing happiness & good energy\nhttp://instagram.com/lenny" } }, "statistics": { "viewCount": "15090190", "likeCount": "742037", "dislikeCount": "21458", "favoriteCount": "0", "commentCount": "57961" } }, { "kind": "youtube#video", "etag": "\"ksCrgYQhtFrXgbHAhi9Fo5t0C2I/iNXPZNa8z4G6r37fBoHYE9ZhFr8\"", "id": "owWSqYk7KN4", "snippet": { "publishedAt": "2020-03-26T18:04:58.000Z", "channelId": "UCaXkIU1QidjPwiAYu6GcHjg", "title": "Will Unemployment In The U.S. Continue To Spread? | Morning Joe | MSNBC", "description": "More than 3 million Americans filed for unemployment last week, according to new data released Thursday. Fmr. Acting Labor Secretary Seth Harris and Morning Joe economic analyst Steve Rattner discuss. Aired on 3/26/2020.\n» Subscribe to MSNBC: http://on.msnbc.com/SubscribeTomsnbc\n\nMSNBC delivers breaking news, in-depth analysis of politics headlines, as well as commentary and informed perspectives. Find video clips and segments from The Rachel Maddow Show, Morning Joe, Meet the Press Daily, The Beat with Ari Melber, Deadline: White House with Nicolle Wallace, Hardball, All In, Last Word, 11th Hour, and more.\n\nConnect with MSNBC Online\nVisit msnbc.com: http://on.msnbc.com/Readmsnbc\nSubscribe to MSNBC Newsletter: http://MSNBC.com/NewslettersYouTube\nFind MSNBC on Facebook: http://on.msnbc.com/Likemsnbc\nFollow MSNBC on Twitter: http://on.msnbc.com/Followmsnbc\nFollow MSNBC on Instagram: http://on.msnbc.com/Instamsnbc\n\nWill Unemployment In The U.S. Continue To Spread? | Morning Joe | MSNBC", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/owWSqYk7KN4/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/owWSqYk7KN4/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/owWSqYk7KN4/hqdefault.jpg", "width": 480, "height": 360 }, "standard": { "url": "https://i.ytimg.com/vi/owWSqYk7KN4/sddefault.jpg", "width": 640, "height": 480 }, "maxres": { "url": "https://i.ytimg.com/vi/owWSqYk7KN4/maxresdefault.jpg", "width": 1280, "height": 720 } }, "channelTitle": "MSNBC", "tags": ["News", "Health", "Donald Trump", "Best of last night", "Coronavirus", "Morning Joe", "Joe Scarborough", "Mika Brzezinski", "Willie Geist", "MSNBC", "MSNBC news", "MSNBC live", "MSNBC TV", "breaking news", "current events", "US news", "politics", "politics news", "political news", "elections", "morning joe full", "morning joe live", "morning joe today", "Unemployment", "Continue To Spread", "million Americans", "filed for unemployment", "new data released", "Fmr. Acting Labor Secretary", "Seth Harris", "economic analyst", "Steve Rattner"], "categoryId": "25", "liveBroadcastContent": "none", "localized": { "title": "Will Unemployment In The U.S. Continue To Spread? | Morning Joe | MSNBC", "description": "More than 3 million Americans filed for unemployment last week, according to new data released Thursday. Fmr. Acting Labor Secretary Seth Harris and Morning Joe economic analyst Steve Rattner discuss. Aired on 3/26/2020.\n» Subscribe to MSNBC: http://on.msnbc.com/SubscribeTomsnbc\n\nMSNBC delivers breaking news, in-depth analysis of politics headlines, as well as commentary and informed perspectives. Find video clips and segments from The Rachel Maddow Show, Morning Joe, Meet the Press Daily, The Beat with Ari Melber, Deadline: White House with Nicolle Wallace, Hardball, All In, Last Word, 11th Hour, and more.\n\nConnect with MSNBC Online\nVisit msnbc.com: http://on.msnbc.com/Readmsnbc\nSubscribe to MSNBC Newsletter: http://MSNBC.com/NewslettersYouTube\nFind MSNBC on Facebook: http://on.msnbc.com/Likemsnbc\nFollow MSNBC on Twitter: http://on.msnbc.com/Followmsnbc\nFollow MSNBC on Instagram: http://on.msnbc.com/Instamsnbc\n\nWill Unemployment In The U.S. Continue To Spread? | Morning Joe | MSNBC" }, "defaultAudioLanguage": "en" }, "statistics": { "viewCount": "261540", "likeCount": "1606", "dislikeCount": "82", "favoriteCount": "0", "commentCount": "1198" } }]
            }));
            populateVideos(window.myList, ["Uz3XpzxRVXs", "INRZ4zZR7j4"]);
            expect(window.fetchJson).toHaveBeenCalled();
        })
    })


})




