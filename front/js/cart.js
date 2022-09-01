function totalProductQuantity() {
  // Prendre ce qu'il ya dans le local storage
  let productRegisterInLocalStorage = JSON.parse(localStorage.getItem("Kanap"));
  let totalQuantityPanier = 0;
  // trouver la quantité de chaque types de produit
  for (let i = 0; i < productRegisterInLocalStorage.length; i++) {
    let quantityProduct = productRegisterInLocalStorage[i].productQuantity;
    // les additionner
    totalQuantityPanier += parseInt(quantityProduct);
  }
  // l'afficher dans le DOM
  document.querySelector("#totalQuantity").innerHTML = totalQuantityPanier;
}

function totalProductPrice() {
  let productRegisterInLocalStorage = JSON.parse(localStorage.getItem("Kanap"));
  console.log(productRegisterInLocalStorage);
  let totalPriceOfOneProduct = 0;
  fetch("http://localhost:3000/api/products")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (data) {
      if (productRegisterInLocalStorage.length === 0) {
        return (document.querySelector("#totalPrice").innerHTML = Number(0));
      } else {
        for (let i = 0; i < productRegisterInLocalStorage.length; i++) {
          let idProductPanier = productRegisterInLocalStorage[i].productId;
          let quantityProduct =
            productRegisterInLocalStorage[i].productQuantity;
          const compositionProduitsPanier = data.find(
            (element) => element._id == idProductPanier
          );
          totalPriceOfOneProduct +=
            quantityProduct * compositionProduitsPanier.price;
          document.querySelector("#totalPrice").innerHTML = parseInt(
            totalPriceOfOneProduct
          );
        }
      }
    })
    .catch(function (err) {
      // Une erreur est survenue
    });
}
// function totalProductQuantity() {
//   totalQuantityPanier += parseInt(quantityProduct);
//   document.querySelector("#totalQuantity").innerHTML =
//     totalQuantityPanier;
// }

// function totalProductPrice() {
//   totalPriceOfOneProduct +=
//     quantityProduct * compositionProduitsPanier.price;
//   document.querySelector("#totalPrice").innerHTML =
//     totalPriceOfOneProduct;
// }

fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (data) {
    let productRegisterInLocalStorage = JSON.parse(
      localStorage.getItem("Kanap")
    );
    console.log(productRegisterInLocalStorage);

    for (let i = 0; i < productRegisterInLocalStorage.length; i++) {
      let colorProductPanier = productRegisterInLocalStorage[i].productColor;
      let idProductPanier = productRegisterInLocalStorage[i].productId;
      let quantityProduct = productRegisterInLocalStorage[i].productQuantity;

      const compositionProduitsPanier = data.find(
        (element) => element._id == idProductPanier
      );
      //Création de la balise "article"
      let newArticle = document.createElement("article");
      newArticle.className = "cart__item";
      newArticle.setAttribute("data-id", `${idProductPanier}`);
      newArticle.setAttribute("data-color", `${colorProductPanier}`);
      document.querySelector("#cart__items").appendChild(newArticle);

      //Création de la div pour mettre une image
      let newDivImage = document.createElement("div");
      newDivImage.className = "cart__item__img";
      newArticle.appendChild(newDivImage);

      //Création de la balise image
      let newImage = document.createElement("img");
      newImage.src = `${compositionProduitsPanier.imageUrl}`;
      newImage.alt = `${compositionProduitsPanier.altTxt}`;
      newDivImage.appendChild(newImage);

      //Création de la div "contenu"
      let newDivContent = document.createElement("div");
      newDivContent.className = "cart__item__content";
      newArticle.appendChild(newDivContent);

      //Création de la div "description"
      let newDivDescription = document.createElement("div");
      newDivDescription.className = "cart__item__content__description";
      newDivContent.appendChild(newDivDescription);
      // Titre h2 => nom du produit
      let newTitre = document.createElement("h2");
      newTitre.innerHTML = `${compositionProduitsPanier.name}`;
      newDivDescription.appendChild(newTitre);
      // Balise "p" => Couleur des produits
      let newCouleur = document.createElement("p");
      newCouleur.innerHTML = `${colorProductPanier}`;
      newDivDescription.appendChild(newCouleur);
      // Balise "p" => Prix des produits
      let newPrix = document.createElement("p");
      newPrix.innerHTML = `${compositionProduitsPanier.price}` + " €";
      newDivDescription.appendChild(newPrix);
      // Nouvelle div pour la partie paramètre des produits
      let newDivSettings = document.createElement("div");
      newDivSettings.className = "cart__item__content__settings";
      newArticle.appendChild(newDivSettings);
      // Nouvelle div pour la quantité de produits
      let newDivQuantity = document.createElement("div");
      newDivQuantity.className = "cart__item__content__settings__quantity";
      newDivSettings.appendChild(newDivQuantity);
      //Nouvelle balise "p" pour indiquer la quantité
      let newQuantity = document.createElement("P");
      newQuantity.innerHTML = "Qté : ";
      newDivQuantity.appendChild(newQuantity);
      //Nouvel input pour modifier la quantité
      let newInputNumber = document.createElement("input");
      newInputNumber.type = "number";
      newInputNumber.className = "itemQuantity";
      newInputNumber.name = "itemQuantity";
      newInputNumber.id = "input_" + i;
      newInputNumber.setAttribute("min", "1");
      newInputNumber.setAttribute("max", "100");
      newInputNumber.setAttribute("value", `${quantityProduct}`);
      newDivQuantity.appendChild(newInputNumber);
      //Nouvelle Div pour Supprimer des produits
      let newDivDelete = document.createElement("div");
      newDivDelete.className = "cart__item__content__settings__delete";
      newDivSettings.appendChild(newDivDelete);
      //Nouvelle balise "p" pour avoir le texte supprimer
      let newDelete = document.createElement("P");
      newDelete.className = "deleteItem";
      newDelete.id = "delete" + i;
      newDelete.innerHTML = "Supprimer";
      newDivDelete.appendChild(newDelete);

      //-----------Modification de la quantité d'articles dans le panier----------------
      let inputQuantity = document.getElementById("input_" + i);
      console.log(inputQuantity);
      //console.log(inputQuantity);
      inputQuantity.addEventListener("change", function () {
        //Récuperation des articles du localstorage

        console.log(productRegisterInLocalStorage);
        //Récupération des informations du bouton cliqué (data_id + data_color)
        let articleOfEachProduct = inputQuantity.closest("article");
        console.log(articleOfEachProduct.dataset.id);
        console.log(articleOfEachProduct.dataset.color);

        let searchIdAndColor = productRegisterInLocalStorage.find(
          (element) =>
            element.productId == articleOfEachProduct.dataset.id &&
            element.productColor == articleOfEachProduct.dataset.color
        );
        //Récupération de la valeur de l'input
        console.log(inputQuantity.value);
        //Assignation à la quantité du produit
        searchIdAndColor.productQuantity = inputQuantity.value;
        //Enregistrement dans le localstorage
        console.log(productRegisterInLocalStorage);
        localStorage.setItem(
          "Kanap",
          JSON.stringify(productRegisterInLocalStorage)
        );
        //Recalcul de la quantité + prix final
        totalProductQuantity();
        console.log(productRegisterInLocalStorage);
        totalProductPrice();
      });
      //-----------------Suppression d'articles dans le panier---------------

      //Sélection de l'input "Supprimer" dans le DOM
      let inputDelete = document.getElementById("delete" + i);
      console.log(inputDelete);
      //Ajout de l'évènement au click
      inputDelete.addEventListener("click", function () {
        //Récuperation des articles du localstorage
        console.log(productRegisterInLocalStorage);
        //Récupération des informations du bouton cliqué (data_id + data_color)
        let articleToDelete = inputDelete.closest("article");
        console.log(articleToDelete);
        //Récupération de l'index du produit qui correspond au bouton "supprimer" grace à l'ID et couleur
        //Récupération du produit qui correspond au bouton "supprimer" grace à l'ID et couleur
        let searchIdAndColor = productRegisterInLocalStorage.find(
          (element) =>
            element.productId == articleToDelete.dataset.id &&
            element.productColor == articleToDelete.dataset.color
        );
        //Récupération de l'index du produit précédement trouvé
        let indexDuProduit =
          productRegisterInLocalStorage.indexOf(searchIdAndColor);
        console.log(indexDuProduit);
        //Suppression dans le LocalStorage grace à l'index (Que dans le JS pour le moment)
        productRegisterInLocalStorage.splice(indexDuProduit, 1);
        //Suppression du produit dans le DOM
        articleToDelete.remove();
        //Enregistrement dans le localstorage (en format JSON)
        console.log(productRegisterInLocalStorage);
        localStorage.setItem(
          "Kanap",
          JSON.stringify(productRegisterInLocalStorage)
        );
        //Recalcul de la quantité + prix final
        totalProductQuantity();
        totalProductPrice();
      });
    }

    totalProductQuantity();
    totalProductPrice();
  })
  .catch(function (err) {
    // Une erreur est survenue
  });

//mail : (.*?@.*[.][a-zA-Z].*)
//numéro : /d{10,10}

const string = "test@gmail.com";
console.log(string.match(/\d{10,10}|(.*?@.*[.][a-zA-Z].*)/gim));

const regex = RegExp(/d{10,10}|(.*?@.*[.][a-zA-Z].*)/gm);
console.log(regex.test(string));
