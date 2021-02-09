const header = document.querySelector(".header");
const top10Airhead = document.querySelector(".anime__airing__top-10__heading");
const searchbtn = document.querySelector(".header__search-box__search__button");
const search__id = document.getElementById("search__id");
const searchResult__head = document.querySelector(
  ".anime__search__result__heading"
);
const sectionSearch = document.querySelector(".anime__search__result");

const modal = document.getElementById("myModal");
// const jikanjs = require("jikanjs");
// import jikanjs from "jikanjs";

let modal_close;

// //////////////////GENERATE MARKUP////////////////

const detailmarkup = ` <div class="modal-content">
<span class="close">&times;</span>

<div class="details__modal">
  <div class="details__modal__head-1__title">
         

    <h3 class="heading-primary">
      Re:Zero kara Hajimeru Isekai Seikatsu 2nd Season Part 2
    </h3>

  </div>

  <div class="details__modal__head">
    
    <div class="details__modal__head-1">
      <div class="details__modal__head-1__poster">
        <img src="https://cdn.myanimelist.net/images/anime/1499/109126.jpg?s=3ec42e73c322253066dc78b01d70a" alt="" srcset="">

      </div>



     
      <div class="details__modal__head-1__rr">
        <!-- <div class="details__modal__head-1__rr__rating">
          R - 17+ (violence & profanity)
        </div> -->
        <div class="details__modal__head-1__rr__ranking">
         Rank:  46
        </div>


      </div>
      

      <div class="details__modal__head-1__genre">
        <p>
          Genre:Psychological,Drama,Thriller,<br>Fantasy
        </p>
       

      </div>




    </div>
    <div class="details__modal__head-2">
      <div class="iframe-container">
        <iframe
          scrolling="no"
          src=https://www.youtube.com/embed/6vMuWuWlW4I?enablejsapi=1&wmode=opaque&autoplay=1"
        >
        </iframe>
      </div>

    </div>
  </div>



<div class="details__modal__synopsis">
  <h2>Synopsis</h2>
  <p>
    Ever since the death of his father, the burden of supporting the family 
  </p>

</div>
</div>


</div>`;

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

  let input = search__id.value;
  if (input.length < 3) {
    alert("Please enter more than 3 characters");
    return;
  }

  //   await header.insertAdjacentHTML("afterend", SearchMarkup);

  // const firstElementChild = yearRangeToSelector.firstElementChild;
  //   sectionSearch.innerHTML = " adeadesfcsefcdsfsfesfe";
  //   while (sectionSearch.firstChild) {
  //     sectionSearch.removeChild(sectionSearch.firstChild);
  //     console.log("dewa");
  //   }
  sectionSearch.innerHTML = " ";
  sectionSearch.insertAdjacentHTML("afterbegin", loader);

  //   searchResult__head.innerHTML = " ";

  // selectElement.append(firstElementChild);
  //   sectionSearch.insertAdjacentHTML("afterbegin", SearchMarkup);
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  await sleep(2000);
  sectionSearch.innerHTML = " ";

  const res = await fetch(` https://api.jikan.moe/v3/search/anime?q=${input}`);
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
      //       let x = top10Air[i].title.split(" ");
      //       //   console.log(x);
      //       let cnt = 0;
      //       let title = "";
      //       for (let j = 0; j < x.length; j++) {
      //         cnt = cnt + x[j].length;
      //         if (cnt > 30) {
      //           title += " ....";
      //           break;
      //         }
      //         title = title + " " + x[j];
      //       }
      //       //   console.log(title);
      //       const markup = `
      //       <a href="${top10Air[i].mal_id}">
      //        <div class="anime_card_parent">
      //     <div class="anime__card card bg-dark text-white">
      //     <div class="anime__card__box">
      //       <img src=${top10Air[i].image_url} class="anime__card-img" alt="...">
      //       <div class="anime__card__title">
      //       <div class="anime__card__title__content">${title}</div>
      //     </div>
      //     </div>
      //       <div class="anime__card__overlay">
      //     <div class="anime__card__overlay_content">
      //       <div class="anime__card__overlay_content__title"> <h3>${
      //         top10Air[i].title
      //       } </h3></div>
      //       <div class="anime__card__overlay_content__score">
      //         <h3>${top10Air[i].score} </h3>
      //       </div>
      //       <div class="anime__card__overlay_content__episodes"><h3> ${
      //         top10Air[i].episodes == null
      //           ? "Streaming..."
      //           : `Episodes:  ${top10Air[i].episodes}`
      //       } </h3></div>

      //     </div>
      //     </div>

      //     </div>

      //   </div>
      //   </a>`;
      //   console.log(markup);
      const testmark = generateMarkup(top10Air[i]);

      top10Airhead.insertAdjacentHTML("afterend", testmark);
    }

    console.log(top10Air);
  } catch (err) {
    console.log(err);
  }
};

const openDetails = async function () {
  const id = window.location.hash.slice(1);
  modal.style.display = "block";
  modal.innerHTML = " ";
  modal.insertAdjacentHTML("afterbegin", detailmarkup);
  modal_close = document.getElementsByClassName("close")[0];
  modal_close.addEventListener("click", closeModalWindow);

  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
  //  https://api.jikan.moe/v3/anime/${id}/
  try {
    const results = await axios({
      method: "GET",
      url: `https://api.jikan.moe/v3/anime/${id}/`,
    });
    console.log(results);
  } catch (error) {
    console.log(error);
  }
  // console.log(x);
  // body.innerHTML = " ";
};

const closeModalWindow = function () {
  modal.style.display = "none";
};

/////////EVENT LISTNERs/////////////////////

searchbtn.addEventListener("click", searchView);
showTop10Airing();
window.addEventListener("hashchange", openDetails);
