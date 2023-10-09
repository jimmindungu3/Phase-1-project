document.addEventListener("DOMContentLoaded", fetchData);
const apiUrl = "https://api.coincap.io/v2/";

function fetchData() {

  fetch(`${apiUrl}assets`)
    .then((response) => response.json())
    .then((coins) => {

      coins.data.forEach((asset) => {
        const li = document.createElement("li");
        li.textContent = asset.name;
        const ul = document.querySelector(".ul");
        ul.appendChild(li);

      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
