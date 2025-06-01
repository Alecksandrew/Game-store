"use strict";

//MAX-WIDTH 768 -> TODOS OS FAVORITADOS DENTRO DE APENAS UM WISHLISTER-GAME
//AFTER THIS, SEPARAR EM DOIS CONTAINER DIFERENTES E ENCAIXAR
//CADA UM EM UMA COLUNA DIFERENTE
const urlGenre = "https://api.rawg.io/api/genres";
const key = "dc9051c56aeb476bb3131334856215f4";

let allWishlistedGames = JSON.parse(
  localStorage.getItem("WishlistedGamesInfos")
);
console.log(allWishlistedGames);
const wishlistedGamesHTML = document.querySelector(".wishlisted-games");
const eachGameCard = document.querySelector(".eachgame");

function createWishlistCards(gameDataObj, index) {
  //*LOGICA PREENCHER CARDS COM IMAGEM E NOME DO GAME
  if (index === 0) {
    const gameImage = eachGameCard.querySelector("img");
    const gameName = eachGameCard.querySelector(".nameOfTheGame");

    eachGameCard.style.display = "flex";
    gameImage.setAttribute("src", gameDataObj.background_image);
    gameName.textContent = gameDataObj.name;
  } else {
    let clonedEachGameCard = eachGameCard.cloneNode(true);
    wishlistedGamesHTML.append(clonedEachGameCard);
    const cloneGameImage = clonedEachGameCard.querySelector("img");
    const cloneGameName = clonedEachGameCard.querySelector(".nameOfTheGame");
    console.log(cloneGameImage);
    console.log(cloneGameName);
    cloneGameImage.setAttribute("src", gameDataObj.background_image);
    cloneGameName.textContent = gameDataObj.name;
  }
}

allWishlistedGames.forEach((wishlistedGame, index) => {
  createWishlistCards(wishlistedGame, index);
});

//*LOGICA DE REMOVER DA WISHLIST

function mouseEnterRemoveButtonEffect(item) {
  item.style.backgroundColor = "var(--PaletaCor07)";
  item.style.color = "white";
}

function mouseLeaveRemoveButtonEffect(item) {
  item.style.backgroundColor = "";
  item.style.color = "";
}

function addListenerRemoveButton(item) {
  item.addEventListener("mouseover", () => {
    mouseEnterRemoveButtonEffect(item);
  });
  item.addEventListener("mouseout", () => {
    mouseLeaveRemoveButtonEffect(item);
  });
}

const removeButtonHTML = document.getElementsByClassName("remove-button");

Array.from(removeButtonHTML).forEach((removeButton, index) => {
  addListenerRemoveButton(removeButton);

  removeButton.addEventListener("click", () => {
    removeButton.closest(".eachgame").remove(); // REMOVE CARD

    //REMOVE GAME DO LOCAL STORAGE WISHLIST
    allWishlistedGames.splice(index, 1);
    localStorage.setItem(
      "WishlistedGamesInfos",
      JSON.stringify(allWishlistedGames)
    );
  });
});
