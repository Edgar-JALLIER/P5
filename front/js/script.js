/**  API pour la page d'accueil  **/
fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (data) {
    for (let product of data) {
      console.log(product);
      //let elt = document.getElementById("items");
      let newTitle = document.createElement("div");
      newTitle.innerHTML =
        "<a href='./product.html?id=" +
        `${product._id}` +
        "'/>" +
        "<article>" +
        "  <img src=" +
        `${product.imageUrl}` +
        " alt= " +
        `${product.altTxt}` +
        ">" +
        "  <h3 class='productName'>" +
        `${product.name}` +
        "</h3>" +
        "  <p class='productDescription'>" +
        `${product.description}` +
        "</p>" +
        "</article>" +
        "</a>";
      document.getElementById("items").appendChild(newTitle);
      //elt.appendChild(newTitle);
      /**let elt = document.getElementById("items");
      let lien = document.createElement("p");
      lien.appendChild(elt);
      lien.innerHTML = "${product.name}";**/
    }
    console.table(data);
  })
  .catch(function (err) {
    // Une erreur est survenue
  });
