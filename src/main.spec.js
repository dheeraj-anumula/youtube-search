
describe("main method", () => {
    beforeAll(() => {
        var sampleDiv = document.createElement("div");
        sampleDiv.innerHTML = `
        <p class="error"></p>
        <div class="next-div"></div>
        <div class="prev-div"></div>
        <ul></ul>
        <section class="pagination"/>
        <template id="video-tag">
            <div>
            <p class="title"></p>
            <p class="desc"></p>
            </div>
        </template>`

        document.body.prepend(sampleDiv);
        var sampleForm = document.createElement("form");
        sampleForm.innerHTML = `<input type="text" id="input" placeholder="Search">`

        document.body.prepend(sampleForm);
        window.nextDiv = document.querySelector(".next-div");
        window.prevDiv = document.querySelector(".prev-div");
        window.errorElement = document.querySelector(".error");
        window.form= document.querySelector('form');
        window.myList = document.querySelector('ul');
        window.pageToken = null;
        window.firstPageToken = null;

        spyOn(window, 'populateVideos').and.callFake(() => { });

    })

    afterAll(() => {
        document.body.innerHTML = "";
    })

    var windowSpy = jasmine.createSpyObj('window', ['getVideoIds']);

    describe("search method", () => {

        it("should pass", () => {
            spyOn(window, 'getVideoIds').and.returnValue(Promise.resolve(
                {
                    videoIds: ["videoId1"],
                    pageToken: {
                        nextPage: "nextPage",
                        prevPage: "prevPage"
                    }
                }));

            search();
            expect(window.getVideoIds).toHaveBeenCalled();
            expect(window.errorElement.innerText).toEqual("");
            expect(window.pageToken).toBeDefined();
            expect(window.firstPageToken).toBeDefined();
            expect(window.searchText).toBeDefined();
        })
    })

    describe('navigate method', () => {

        it("should pass for next page", () => {
            spyOn(window, 'getVideoIds').and.returnValue(Promise.resolve(
                {
                    videoIds: ["videoId1"],
                    pageToken: {
                        nextPage: "nextPage",
                        prevPage: "prevPage"
                    }
                }));

            navigate('nextPage');
            expect(window.getVideoIds).toHaveBeenCalled();
            expect(window.errorElement.innerText).toEqual("");
            expect(window.pageToken).toBeDefined();
        })

        it("should pass for prev page", () => {
            spyOn(window, 'getVideoIds').and.returnValue(Promise.resolve(
                {
                    videoIds: ["videoId1"],
                    pageToken: {
                        nextPage: "nextPage",
                        prevPage: "prevPage"
                    }
                }));
            window.firstPageToken=Promise.resolve({
                nextPage: "nextPage",
                prevPage: "prevPage"
            });
            navigate('prevPage',true);
            expect(window.getVideoIds).toHaveBeenCalled();
            expect(window.errorElement.innerText).toEqual("");
            expect(window.pageToken).toBeDefined();
        })

    })
})
