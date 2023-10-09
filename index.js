document.addEventListener("DOMContentLoaded", fetchData);

function fetchData() {
  const apiUrl = "https://api.coincap.io/v2/assets";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((coins) => {
      const crypto = coins.data;

     crypto.forEach((asset) => {
        console.log(asset.id)
        
     })

    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
