document.addEventListener("DOMContentLoaded", fetchData);

const apiUrl = "https://api.coincap.io/v2/";

function fetchData() {
  fetch(`${apiUrl}assets`)
    .then((response) => response.json())
    .then((coins) => {
      const table = document.createElement("table");
      table.id = "table";
      const thead = document.createElement("thead");
      const trHeader = document.createElement("tr");
      const headers = [
        "",
        "Rank",
        "Name",
        "Symbol",
        "Price (USD)",
        "Change (24Hr)",
        "Max Supply",
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
        const span = document.createElement("span");
        

        span.className = "span";
        const thumbsUp = String.fromCodePoint(0x1F44D);
        // const thumbsDown = String.fromCodePoint(0x1F44E)
        span.textContent = thumbsUp
        span.addEventListener("click", handleClick);

        tr.appendChild(span);
        tr.appendChild(rank);
        tr.appendChild(name);
        tr.appendChild(symbol);
        tr.appendChild(priceInUsd);
        tr.appendChild(changeIn24Hr);
        tr.appendChild(maxSupply);
        
        tbody.appendChild(tr);

        function handleClick() {
          const row = document.querySelector(`#tr${asset.rank}`);

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
    }, 2000);
  }
});
