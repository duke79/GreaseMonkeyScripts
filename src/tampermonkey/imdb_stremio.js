// ==UserScript==
// @name         IMDB to Stremio
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  try to take over the world!
// @author       You
// @match        https://www.imdb.com/*
// @icon         https://www.google.com/s2/favicons?domain=imdb.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  const style = `
  <style>
  /* Tooltip container */
  .tooltip {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
  }

  /* Tooltip text */
  .tooltip .tooltiptext {
    cursor: pointer;
    text-decoration: none;
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;

    /* Position the tooltip text - see examples below! */
    position: absolute;
    z-index: 1;
  }

  /* Show the tooltip text when you mouse over the tooltip container */
  .tooltip:hover .tooltiptext {
    visibility: visible;
  }
  </style>`;
  const tooltip = (stremioLink, youtubeLink) => `<div class="tooltiptext">
    <a href="${stremioLink}">Watch in Stremio</a>
    <a href="${youtubeLink}" target="_blank ">Trailer in Youtube</a>
  </div>`;
  document.querySelector('body').innerHTML = style + document.querySelector('body').innerHTML;
  document.querySelectorAll('a[href*="/title/"]').forEach((a) => {
    const imdbId = /.*\/title\/([a-zA-Z0-9]*).*/.exec(a.href)[1];
    if (imdbId) {
      const stremioLink = `stremio://detail/movie/` + imdbId + "/" + imdbId;
      if (a.parentElement && a.parentElement.localName === 'h3') {
          a.parentElement.classList.add('tooltip');
          const youtubeLink = `https://www.youtube.com/results?search_query=${a.parentElement.innerText}+trailer`;
          a.parentElement.innerHTML = a.parentElement.innerHTML + tooltip(stremioLink, youtubeLink);
          // console.log(a.parentElement.localName, a.parentElement.nodeName);
      }
    }
  });
})();
