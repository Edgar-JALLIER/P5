/**  Appel de l'API pour la page d'accueil  **/
fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (data) {
    //Boucle for pour parcourir l'array de l'API
    for (let product of data) {
      //Création d'une div avec de l'HTML
      let newLink = document.createElement("a");
      newLink.setAttribute("href", `./product.html?id=${product._id}`);
      newLink.innerHTML =
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
      //Placement de la div qui est créé (1er enfant de l'ID "items")
      document.getElementById("items").appendChild(newLink);
    }
  })
  .catch(function (err) {
    alert("Une erreur est survenue, veuillez revenir plus tard");
  });
