const header = document.querySelector(".header");
const top10Airhead = document.querySelector(".anime__airing__top-10__heading");
const searchbtn = document.querySelector(".header__search-box__search__button");

const searchResult__head = document.querySelector(
  ".anime__search__result__heading"
);
const sectionSearch = document.querySelector(".anime__search__result");
const form = document.querySelector(".header__search-box__search");
// let youtubecontainer;
const modal = document.getElementById("myModal");

// const jikanjs = require("jikanjs");
// import jikanjs from "jikanjs";

let modal_close;
const videostop = function (youtubecontainer) {
  youtubecontainer.src = " ";
};

// //////////////////GENERATE MARKUP////////////////

const detailmarkup = function (detail) {
  const genresobj = detail.genres;
  // console.log(genresobj);
  const genres = [];
  // let cnt = 0;
  // let title = "";
  for (let j = 0; j < genresobj.length; j++) {
    genres.push(genresobj[j].name);
  }
  // console.log(genres);
  let strgenre = " ";
  for (let i = 0; i < genres.length; i++) {
    strgenre += genres[i];
    if (i < genres.length - 1) {
      strgenre += ", ";
    }
  }
  let youtubeURL = detail.trailer_url;

  const markup = ` <div class="modal-content">
<span class="close">&times;</span>

<div class="details__modal">
  <div class="details__modal__head-1__title">
         

    <h3 class="heading-primary">
      ${detail.title}
    </h3>

  </div>

  <div class="details__modal__head">
    
    <div class="details__modal__head-1">
      <div class="details__modal__head-1__poster">
        <img src=${detail.image_url} alt="" srcset="">

      </div>



     
      <div class="details__modal__head-1__rr">
        <!-- <div class="details__modal__head-1__rr__rating">
         ${detail.rating}
        </div> -->
        <div class="details__modal__head-1__rr__ranking">
         Rank: ${detail.rank}
        </div>


      </div>
      

      <div class="details__modal__head-1__genre">
        <p>
          Genre:${strgenre}
        </p>
       

      </div>




    </div>
    <div class="details__modal__head-2">
      <div  class="iframe-container">
        <iframe
        class="youtube-vid"
          scrolling="no"
          src=${youtubeURL}
        >
        </iframe>
      </div>

    </div>
  </div>



<div class="details__modal__synopsis">
  <h2>Synopsis</h2>
  <p>
   ${detail.synopsis}
  </p>

</div>
</div>


</div>`;

  return markup;
};

const loader = `  <div class="anime__search__result__loader">
<img src="img/Cube.svg" alt="" srcset="" />
</div>`;

const SearchMarkup = `  <section class="anime__search__result">
<div class="anime__search__result__heading">
  <h1 class="heading-primary heading__anime__main">Search Results</h1>
</div>
</section>
`;

const generateMarkup = function (data) {
  let x = data.title.split(" ");
  //   console.log(x);
  let cnt = 0;
  let title = "";
  for (let j = 0; j < x.length; j++) {
    cnt = cnt + x[j].length;
    if (cnt > 30) {
      title += " ....";
      break;
    }
    title = title + " " + x[j];
  }
  const markup = `
    <a href="#${data.mal_id}">
     <div class="anime_card_parent">
  <div class="anime__card card bg-dark text-white">
  <div class="anime__card__box">
    <img src=${data.image_url} class="anime__card-img" alt="...">
    <div class="anime__card__title">
    <div class="anime__card__title__content">${title}</div>
  </div>
  </div>
    <div class="anime__card__overlay">
  <div class="anime__card__overlay_content">
    <div class="anime__card__overlay_content__title"> <h3>${
      data.title
    } </h3></div>
    <div class="anime__card__overlay_content__score">
      <h3>${data.score} </h3>
    </div>
    <div class="anime__card__overlay_content__episodes"><h3> ${
      data.episodes == null ? "Streaming..." : `Episodes:  ${data.episodes}`
    } </h3></div>


  </div>
  </div>

  </div>


</div>
</a>`;

  return markup;
};

// ///////////////////////////////SEARCH RESULT////////////////////

const searchView = async function () {
  //   console.log("CLICKED");
  //   console.log(search__id.value);
  const input = document.getElementById("search__id").value;
  console.log("gll");
  // let input = search__id.value;
  console.log(input);
  if (input.length < 3) {
    alert("Please enter more than 3 characters");
    return;
  }

  sectionSearch.innerHTML = " ";
  sectionSearch.insertAdjacentHTML("afterbegin", loader);
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  await sleep(2000);
  sectionSearch.innerHTML = " ";

  try {
    const res = await fetch(
      ` https://api.jikan.moe/v3/search/anime?q=${input}`
    );
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}`);
    console.log(data);
    let x = data.results.slice(0, 10);

    x.reverse().forEach(function (item, i) {
      let markup = generateMarkup(item);
      // console.log(markup);
      // searchResult__head.insertAdjacentHTML("afterend", markup);
      sectionSearch.insertAdjacentHTML("afterbegin", markup);
    });
  } catch (error) {
    console.log(error);
  }
};

/////////////////////LOADING PAGE WILL LOAD TOP 10 ARING ANIME//////////////////////////////////
const showTop10Airing = async function () {
  try {
    const res = await fetch("https://api.jikan.moe/v3/top/anime/1/airing");
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}`);

    // console.log(res, data);
    let top50Air = data.top;
    let top10Air = top50Air.slice(0, 50);

    for (let i = top10Air.length - 1; i >= 0; i--) {
      const testmark = generateMarkup(top10Air[i]);

      top10Airhead.insertAdjacentHTML("afterend", testmark);
    }

    // console.log(top10Air);
  } catch (err) {
    console.log(err);
  }
};

const openDetails = async function () {
  const id = window.location.hash.slice(1);

  // console.log(id);
  if (!id) {
    return;
  }
  modal.style.display = "block";
  modal.innerHTML = " ";

  //  https://api.jikan.moe/v3/anime/${id}/
  try {
    const results = await axios({
      method: "GET",

      url: `https://api.jikan.moe/v3/anime/${id}`,
      // // url:
      //   "https://private-b5d8a26-jikan.apiary-mock.com/v3/season/2018/winter",
    });
    // console.log(results);
    const detail = results.data;
    // console.log(detail);
    // detailmarkup(detail);
    modal.insertAdjacentHTML("afterbegin", detailmarkup(detail));
  } catch (error) {
    console.log(error);
  }
  // console.log(x);
  // body.innerHTML = " ";
  let youtubecontainer = document.querySelector(".youtube-vid");

  modal_close = document.getElementsByClassName("close")[0];
  modal_close.addEventListener("click", function () {
    closeModalWindow();
    videostop(youtubecontainer);
  });
  var scrollpos = this.scrollY;
  console.log(scrollpos);

  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
    videostop(youtubecontainer);
    localStorage.setItem(string(scrollpos));
    console.log("THIS.......", scrollpos);

    window.location.hash = "#";
    // window.scrollTo(0, scrollpos);
  });
};

const closeModalWindow = function () {
  modal.style.display = "none";
};

/////////EVENT LISTNERs/////////////////////
// console.log(searchbtn);
form.addEventListener("submit", function (event) {
  event.preventDefault();
  searchView();
});
showTop10Airing();
window.addEventListener("hashchange", openDetails);
