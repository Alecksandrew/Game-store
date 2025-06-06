"use strict";

const gamesURL = "https://api.rawg.io/api/games";
const genreParamsFromMainPage = new URLSearchParams(window.location.search);
const genreName = genreParamsFromMainPage.get("genre");
const fixedGenreName = genreName.toLowerCase();

const key = "dc9051c56aeb476bb3131334856215f4";
const newParams = new URLSearchParams({
    key: key,
    genres:`${fixedGenreName}`,
    ordering:`-added`,
    page: 1,
    page_size:12,
});

async function fetchGamesByGenre() {
    const response = await fetch(`${gamesURL}?${newParams.toString()}`);
    const genreFetchedData = await response.json();
    console.log(genreFetchedData);

    function updateGenreTitle(GenreName) {
        const genreTitle = document.querySelector("#genre-title");
        genreTitle.textContent = GenreName;
    }

    function displayGameCards() {
        let listEachGame = document.getElementById("list-each-game");
        let originalEachGame = document.querySelector(".eachgame");
        
        genreFetchedData.results.forEach((genreData, index) => {

            function createClonedGameCards() {
                let clonedEachGame = originalEachGame.cloneNode(true);
                let clonedGameNameHTML = clonedEachGame.querySelector(".nameOfTheGame");
                let clonedGameImageHTML = clonedEachGame.querySelector("img");

                listEachGame.append(clonedEachGame);

                clonedGameNameHTML.textContent = fetchedGameName;
                clonedGameImageHTML.setAttribute("src", fetchedGameImage);
            };

            function displayOriginalGameCard() {
                let originalGameNameHTML = originalEachGame.querySelector(".nameOfTheGame");
                let originalGameImageHTML = originalEachGame.querySelector("img");

                
                originalEachGame.style.display = "flex";
                originalGameNameHTML.textContent = fetchedGameName;
                originalGameImageHTML.setAttribute("src", fetchedGameImage);
            };
        
            //==========================================================================================================//

            let fetchedGameName = genreData.name;
            let fetchedGameImage =  genreData.background_image;


            if (index === 0) {
               displayOriginalGameCard();
            }
            else {
                createClonedGameCards();
            };
        });
    };

    function setListenerToSendToDetailsPage() {
        const allGameCards = document.querySelectorAll(".eachgame");
        
        allGameCards.forEach((gameCard, index) => {
            const gameID = genreFetchedData.results[index].id;
            
            gameCard.addEventListener("click", () => {
                window.open(`detailsofthegame.html?id=${gameID}`, "_blank");
            });
        });
    };

    updateGenreTitle(genreName);
    displayGameCards();
    setListenerToSendToDetailsPage();
};

fetchGamesByGenre();
