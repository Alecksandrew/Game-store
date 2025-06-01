"use strict";

//!=======================MAIN=======================

const myKey = "dc9051c56aeb476bb3131334856215f4";
const gameParams = new URLSearchParams(window.location.search);
const gameID = gameParams.get("id");
const mainEndpointParams = new URLSearchParams({
  key: myKey,
  ids: gameID,
  page: 1,
  page_size: 1,
});

const mainEndpoint = `https://api.rawg.io/api/games?${mainEndpointParams.toString()}`;
const specificEndpoint =
  "https://api.rawg.io/api/games" + `/${gameID}` + `?key=${myKey}`;

async function fetchGameDetails() {
  //!GENERAL ENDPOINT
  //BUSCANDO INFORMAÇÕES SOBRE O GAME [PART 1]
  const response1 = await fetch(mainEndpoint);
  const gameInfoJSON = await response1.json();
  console.log(gameInfoJSON);

  //COLCANDO NOME DO GAME CLICADO
  let gameNameHTML = document.querySelector("#nameOfTheGame");
  gameNameHTML.textContent = gameInfoJSON.results[0].name;

  //MUDANDO AS ESTRELAS BASEADO NO RATING
  let gameRating = gameInfoJSON.results[0].rating;

  for (let c = 1; gameRating > 0; c++) {
    if (gameRating >= 1) {
      let startGradient = document.querySelector(
        `#linear-gradient-star${c} .color-star`
      );
      startGradient.setAttribute("offset", "100%");
      gameRating--;
    } else {
      let startGradient = document.querySelector(
        `#linear-gradient-star${c} .color-star`
      );
      startGradient.setAttribute("offset", `${gameRating * 100}%`);
      gameRating--;
    }
  }

  //MUDANDO A IMAGEM PRINCIPAL DO GAME CLICADO
  let mainImage = document.querySelector("#mainImage");
  mainImage.setAttribute("src", gameInfoJSON.results[0].background_image);

  //MUDANDO AS IMAGENS SECUNDARIAS DO GAME CLICADO
  let secondaryImages = document.querySelectorAll(".secondary-images img");
  let secondaryImagesContainer = document.querySelectorAll(".secondary-images");
  let allSecondaryImagesContainer = document.querySelector(
    ".container-secondary-images"
  );
  let secondaryImagesFromAPI = [];

  gameInfoJSON.results[0].short_screenshots.forEach((obj) => {
    secondaryImagesFromAPI.push(obj.image);
  });

  secondaryImages.forEach((secondaryImage, index) => {
    secondaryImage.setAttribute("src", secondaryImagesFromAPI[index]);
  });

  let c = 1;

  const changeImageAndColor = function () {
    mainImage.setAttribute("src", secondaryImagesFromAPI[c]);
    secondaryImagesContainer.forEach((container) => {
      container.classList.add("color-for-hiding");
    });
    secondaryImagesContainer[c].classList.remove("color-for-hiding");

    const parent = allSecondaryImagesContainer;
    const children = secondaryImagesContainer;
    let parentRect = parent.getBoundingClientRect();
    let parentScrollLeft = parent.scrollLeft;
    let childRect = children[c].getBoundingClientRect();

    let isFullVisible = () => {
      if (
        parentRect.right >= childRect.right &&
        parentRect.left <= childRect.left
      ) {
        //Scroll para a direita
        return true;
      }
      return false;
    };

    if (!isFullVisible()) {
      if (childRect.left > parentRect.left) {
        // SCROL PARA A DIREITA
        parent.scrollTo({
          left: childRect.left - parentRect.left,
          behavior: "smooth",
        });
      } else if (childRect.left <= parentRect.left) {
        /// SCROLL PARA A ESQUERDA
        parent.scrollTo({
          left: parentScrollLeft - (parentRect.left - childRect.left), // (parentRect.left - childRect.left) ISSO SIGNIFICA O OVERFLOW LEFT QUE O CONTAINER TERÁ
          behavior: "smooth",
        });
      }
    }

    c = (c + 1) % secondaryImagesContainer.length;
  };

  let currentInterval = setInterval(changeImageAndColor, 3500); //INICIA A EXECUÇÃO DO INTERVALO
  let currentTimeout = null;

  //LOGICA -> USUARIO CLICA NO CONTAINER , ELE CLAREIA E SE O USUARIO NAO CLICAR EM OUTRO CONTAINER POR ALGUNS SEGUNDOS, ISSO DEIXAR O LOOP CONTINUAR AUTOMATICAMENTE
  secondaryImagesContainer.forEach((container, index) => {
    container.addEventListener("click", () => {
      if (currentInterval) {
        clearInterval(currentInterval);
      }
      if (currentTimeout) {
        clearTimeout(currentTimeout);
      }

      secondaryImagesContainer.forEach((cont) => {
        cont.classList.add("color-for-hiding");
      });
      container.classList.remove("color-for-hiding");

      mainImage.setAttribute("src", secondaryImagesFromAPI[index]);
      c = index;

      currentTimeout = setTimeout(() => {
        currentInterval = setInterval(changeImageAndColor, 3500);
      }, 2500);
    });
  });

  //LOGICA DE ESCURECER IMAGENS QUE NÃO ESTÃO EM FOCO

  //*MUDANDO INFORMAÇÕES ADICIONAIS

  //PEGANDO A DATA DE LANÇAMENTO DO GAME
  let releaseDate = gameInfoJSON.results[0].released;

  function fixingDate(date) {
    const [year, month, day] = date.split("-");

    return `${day}/${month}/${year}`;
  }

  let releaseDateHTML = document.querySelector("#release-date");
  releaseDateHTML.textContent = fixingDate(releaseDate);

  //PEGANDO CATEGORIA DO GAME
  let gameCategoryHTML = document.querySelector("#game-category");
  let gameCategory = gameInfoJSON.results[0].genres;
  if (gameCategory.length > 1) {
    gameCategoryHTML.textContent =
      gameCategory[0].name + " & " + gameCategory[1].name;
  } else {
    gameCategoryHTML.textContent = gameCategory[0].name;
  }

  //PEGANDO NOTA METACRITIC
  let metacriticHTML = document.querySelector("#nota-metacritic");
  let metacritic = gameInfoJSON.results[0].metacritic;

  metacriticHTML.textContent = metacritic;
  if (metacritic < 50) {
    metacriticHTML.classList.add("bad");
  } else if (metacritic >= 50 && metacritic < 75) {
    metacriticHTML.classList.add("medium");
  } else {
    metacriticHTML.classList.add("good");
  }

  //PEGANDO PLATAFORMAS DISPONÍVEIS
  let platforms = gameInfoJSON.results[0].platforms;
  let computer = document.querySelector(".bi.bi-laptop");
  let xbox = document.querySelector(".bi.bi-xbox");
  let playstation = document.querySelector(".bi.bi-playstation");

  platforms.forEach((each) => {
    if (each.platform.slug === "pc") {
      computer.style.display = "inline";
    }
    if (each.platform.slug.includes("playstation")) {
      playstation.style.display = "inline";
    }
    if (each.platform.slug.includes("xbox")) {
      xbox.style.display = "inline";
    }
  });

  //PEGANDO TAGS CATEGORIAS DO GAME
  let gameTags = gameInfoJSON.results[0].tags;
  let gameTagsHTML = document.querySelector("#game-tags");
  let tagsToShow = [];

  gameTags.forEach((tag) => {
    if (tagsToShow.length >= 4) return;
    if (tag.language === "eng" && tag.name.length <= 12 && tag.id <= 10000) {
      tagsToShow.push(tag.name);
    }
  });

  let firstTwoTags = tagsToShow.slice(0, 2).join(" / ");
  let lastTwoTags = tagsToShow.slice(2).join(" / ");

  gameTagsHTML.innerHTML = `${firstTwoTags}<br>${lastTwoTags}`;

  //! SPECIFIC ENDPOINT
  const response2 = await fetch(specificEndpoint);
  const specificGameInfoJSON = await response2.json();
  console.log(specificGameInfoJSON);

  //MUDANDO A DESCRIÇÃO
  let gameDescriptionHTML = document.querySelector("#DescriptionOfTheGame");
  let fullGameDescription = specificGameInfoJSON.description_raw;
  let shortGameDescription;
  let maxLenght = 350;
  let verMais = document.querySelector(".ver-mais");

  if (fullGameDescription.length > maxLenght) {
    shortGameDescription = fullGameDescription.slice(0, maxLenght) + "...";
    gameDescriptionHTML.textContent = shortGameDescription;
  } else {
    gameDescriptionHTML.textContent = fullGameDescription;
  }

  //LOGICA DO VER MAIS VER MENOS
  verMais.addEventListener("click", () => {
    if (gameDescriptionHTML.textContent === fullGameDescription) {
      gameDescriptionHTML.textContent = shortGameDescription;
      verMais.textContent = "See more";
    } else if (gameDescriptionHTML.textContent === shortGameDescription) {
      gameDescriptionHTML.textContent = fullGameDescription;
      verMais.textContent = "See less";
    }
  });

  //LOGICA DA WISHLIST
  console.log(localStorage);
  const wishlistButton = document.querySelector(".wishlist-button");
  let wishlistedGames = [];
  let isWishlisted = false;

  function setupWishlist() {
    let wishlistedGamesExistent = localStorage.getItem("WishlistedGamesInfos");

    if (wishlistedGamesExistent) {
      wishlistedGames = JSON.parse(wishlistedGamesExistent);

      if (
        wishlistedGames.some(
          (gameInfo) => gameInfo.id === specificGameInfoJSON.id
        )
      ) {
        isWishlisted = true;
      }
    }

    updateWishlistButton();
  };

  function mouseEnterRemoveButtonEffect(item) {
    item.style.backgroundColor = "var(--PaletaCor07)";
    item.style.border = "1px solid var(--PaletaCor07)";
    item.style.color = "white";
  };

  function mouseLeaveRemoveButtonEffect(item) {
    item.style.backgroundColor = "";
    item.style.border = "";
    item.style.color = "";
  };

  function addListenerRemoveButton(item) {
    item.addEventListener("mouseover", () => {mouseEnterRemoveButtonEffect(item) });
    item.addEventListener("mouseout", () => {mouseLeaveRemoveButtonEffect(item)});
  };

  function removeListenerRemoveButton(item) {
      item.removeEventListener("mouseover", () =>{ mouseEnterRemoveButtonEffect(item) });
      item.removeEventListener("mouseout", () =>{ mouseLeaveRemoveButtonEffect(item) });
  };


  function updateWishlistButton() {
    if (isWishlisted) {
      wishlistButton.textContent = "Remove from wishlist";
      if (wishlistButton.matches(":hover")) {
        mouseEnterRemoveButtonEffect(wishlistButton);
      }
      addListenerRemoveButton(wishlistButton);
    } else {
      wishlistButton.textContent = "Add to wishlist";
      mouseLeaveRemoveButtonEffect(wishlistButton);
      removeListenerRemoveButton(wishlistButton);
    }
  };

  function addAndRemoveWishilist() {
    if (isWishlisted) {
      wishlistedGames = wishlistedGames.filter(
        (gameInfo) => gameInfo.id !== specificGameInfoJSON.id
      );

    } else {
      wishlistedGames.push(specificGameInfoJSON);
    }

    localStorage.setItem(
      "WishlistedGamesInfos",
      JSON.stringify(wishlistedGames)
    );
    console.log(localStorage);
    isWishlisted = !isWishlisted;

    updateWishlistButton();
  };

  setupWishlist();
  wishlistButton.addEventListener("click", addAndRemoveWishilist);
}

fetchGameDetails();



