function run() {
  fetch("/api/movie")
    .then((response) => response.json())
    .then((data) => {
      const detailsElement = document.getElementById("movie");
      //const detailsElement = document.getElementById("restaurants");
      detailsElement.getElementsByTagName("img")[0].src = data.poster;
      detailsElement.getElementsByTagName("h1")[0].innerText = data.title;
      detailsElement.getElementsByTagName("p")[0].innerText = data.fullplot;
      //detailsElement.getElementsByTagName("img")[0].src = data.poster;
      //detailsElement.getElementsByTagName("h1")[0].innerText = data.cuisine;
      //detailsElement.getElementsByTagName("p")[0].innerText = data.name;

      detailsElement.style.visibility = "visible";
    });
}
