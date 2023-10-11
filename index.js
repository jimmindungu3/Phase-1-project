document.addEventListener("DOMContentLoaded", fetchData);

const apiUrl = "https://api.coincap.io/v2/";

// asset = [];
function fetchData() {
  fetch(`${apiUrl}assets`)
    .then((response) => response.json())
    .then((coins) => {
      // console.log(coins);

      // asset = coins.data;
      // console.log(asset)
      const table = document.createElement("table");
      const thead = document.createElement("thead");
      const trHeader = document.createElement("tr");
      const headers = [
        "Rank",
        "Name",
        "Symbol",
        "Price (USD)",
        "Change (24Hr)",
        "Max Supply",
        "",
        "",
      ];

      headers.forEach((headerText) => {
        const th = document.createElement("th");
        th.textContent = headerText;
        trHeader.appendChild(th);
      });

      thead.appendChild(trHeader);
      table.appendChild(thead);

      const tbody = document.createElement("tbody");

      coins.data.forEach((asset) => {
        const tr = document.createElement("tr");
        tr.className = `tr-${asset.name.toLowerCase()}`;
        tr.id = `tr${asset.rank}`;
        const rank = document.createElement("td");
        rank.textContent = asset.rank;
        const name = document.createElement("td");
        name.textContent = asset.name;
        const symbol = document.createElement("td");
        symbol.textContent = asset.symbol;
        const priceInUsd = document.createElement("td");
        priceInUsd.textContent = asset.priceUsd;
        const changeIn24Hr = document.createElement("td");
        changeIn24Hr.textContent = asset.changePercent24Hr;
        const maxSupply = document.createElement("td");
        maxSupply.textContent = asset.maxSupply;

        const button = document.createElement("button");
        // button.id = `id${asset.rank}`;
        button.className = "button";
        button.textContent = "Mark Favorite";
        button.addEventListener("click", handleClick);

        tr.appendChild(rank);
        tr.appendChild(name);
        tr.appendChild(symbol);
        tr.appendChild(priceInUsd);
        tr.appendChild(changeIn24Hr);
        tr.appendChild(maxSupply);
        tr.appendChild(button);

        tbody.appendChild(tr);

        function handleClick() {
          // console.log(`Button ${asset.rank} was clicked`)
          const row = document.querySelector(`#tr${asset.rank}`); //////////////////////
          // console.log(row);
          row.className = "favorite";
        }
      });

      table.appendChild(tbody);
      const mainDiv = document.querySelector(".main-container");
      mainDiv.appendChild(table);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// const favDiv = document.querySelector(".farorite-assets");

const form = document.querySelector("#form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const input = document.querySelector("#input-crypto").value.toLowerCase();
  form.reset();

  const scrollTo = document.querySelector(`.tr-${input}`);
  if (scrollTo) {
    scrollTo.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    scrollTo.classList = "highlight";
    setTimeout(() => {
      scrollTo.classList.remove("highlight");
    }, 5000);
  }
});
