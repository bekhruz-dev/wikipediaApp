// https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&origin=*&srlimit=25&utf8&format=json&srsearch

const searchButton = document.querySelector(".searchButton");
const searchForm = document.querySelector(".searchForm");
function submitFunction(e) {
  e.preventDefault();

  let inputSearch = document.querySelector(".searchInput").value;
  query = inputSearch.trim();
  console.log(inputSearch);
  getResults();
}

searchForm.addEventListener("submit", submitFunction);

function getResults(query) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&origin=*&srlimit=25&utf8=&format=json&srsearch=${query}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.query.search);
      addResults(data.query.search);
    })
    .catch((e) => console.error(`Error: ${e}`));
}

function addResults(sResults) {
  const searchResults = document.querySelector(".results");
  searchResults.innerHTML = "";

  sResults.forEach((result) => {
    const url = `https://en.wikipedia.org/?curid=${result.pageid}`;
    searchResults.insertAdjacentHTML(
      "afterbegin",
      `<div class="card">
        <h3 class="cardTitle">
            <a href="${url}" target="_blank">${result.title}</a>
        </h3>
          <a href="${url}" class="cardLink" target="_blank">${url}</a><br>
          <span class="cardSnippet">${result.snippet}</span>
      </div>`
    );
  });
}
