let urlActuel = window.location.href;
let url = new URL(urlActuel);
let id = url.searchParams.get("id");
console.log(id);

fetch("http://localhost:3000/api/products/" + `${id}`)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (data) {
    let kanapImage = data.imageUrl;
    let kanapName = data.name;
    let kanapPrice = data.price;
    let kanapDescription = data.description;
    let kanapColors = data.colors;
    let kanapAlt = data.altTxt;
    let sectionImage = document.querySelector(".item__img");
    sectionImage.innerHTML =
      "<img src=" + `${kanapImage}` + " alt=" + `${kanapAlt}` + ">";

    let sectionName = document.querySelector("#title");
    sectionName.innerHTML = `${kanapName}`;

    let sectionPrice = document.querySelector("#price");
    sectionPrice.innerHTML = `${kanapPrice}`;

    let sectionDescription = document.querySelector("#description");
    sectionDescription.innerHTML = `${kanapDescription}`;

    let kanapOption = document.querySelector("#colors");
    for (let colors of kanapColors) {
      kanapOption.innerHTML +=
        "<option value=" + `${colors}` + ">" + `${colors}` + "</option>";
    }
  })
  .catch(function (err) {
    // Une erreur est survenue
  });
