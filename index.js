// This code will execute when the DOM is fully loaded.
document.addEventListener("DOMContentLoaded", fetchData);

// Define the API URL for fetching data.
const apiUrl = "https://api.coincap.io/v2/";

// This function is responsible for fetching and displaying data.
function fetchData() {
  // Asynchronously fetch data from the API.
  fetch(`${apiUrl}assets`)  // Asynchronous network request
    .then((response) => response.json())  // Handling the Promise and parsing the JSON response
    .then((coins) => {
      // Create an HTML table to display the data.
      const table = document.createElement("table");
      table.id = "table";

      // Create the table header.
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

      // Create table header cells.
      headers.forEach((headerText) => {
        const th = document.createElement("th");
        th.textContent = headerText;
        trHeader.appendChild(th);
      });

      thead.appendChild(trHeader);
      table.appendChild(thead);

      // Create the table body.
      const tbody = document.createElement("tbody");

      // Iterate through the data and create table rows.
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
        span.textContent = thumbsUp;

        // Attach a click event listener to the span.
        span.addEventListener("click", handleClick);

        // Append table cells to the table row.
        tr.appendChild(span);
        tr.appendChild(rank);
        tr.appendChild(name);
        tr.appendChild(symbol);
        tr.appendChild(priceInUsd);
        tr.appendChild(changeIn24Hr);
        tr.appendChild(maxSupply);

        // Append the table row to the table body.
        tbody.appendChild(tr);

        // Function to handle the click event on the span.
        function handleClick() {
          const row = document.querySelector(`#tr${asset.rank}`);

          // Change the class of the clicked row to "favorite".
          row.className = "favorite";
        }
      });

      // Append the table body to the table.
      table.appendChild(tbody);

      // Get the main container div and append the table to it.
      const mainDiv = document.querySelector(".main-container");
      mainDiv.appendChild(table);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Add a submit event listener to the form for searching.
const form = document.querySelector("#form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get the input value and make it lowercase.
  const input = document.querySelector("#input-crypto").value.toLowerCase();
  form.reset();

  // Find the table row with the specified class.
  const scrollTo = document.querySelector(`.tr-${input}`);

  if (scrollTo) {
    // Scroll to the found row with a smooth effect.
    scrollTo.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    // Add a "highlight" class to the found row temporarily.
    scrollTo.classList = "highlight";
    setTimeout(() => {
      scrollTo.classList.remove("highlight");
    }, 2000);
  }
});
