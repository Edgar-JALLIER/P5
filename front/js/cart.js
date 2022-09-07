//--------------Fonction pour calculer la quantité totale dans le panier
function totalProductQuantity() {
  // Prendre ce qu'il y a dans le local storage (JSON => JS)
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

//--------------Fonction pour calculer le prix total dans le panier
function totalProductPrice() {
  // Prendre ce qu'il y a dans le local storage (JSON => JS)
  let productRegisterInLocalStorage = JSON.parse(localStorage.getItem("Kanap"));
  let totalPriceOfOneProduct = 0;
  //Appel de l'API pour avoir accès aux prix des produits
  fetch("http://localhost:3000/api/products")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (data) {
      //Si le tableau est vide alors le prix sera de 0€
      if (productRegisterInLocalStorage.length === 0) {
        return (document.querySelector("#totalPrice").innerHTML = Number(0));
      } else {
        //Sinon je parcours le tableau pour récupérer l'ID et la Quantité des produits
        for (let i = 0; i < productRegisterInLocalStorage.length; i++) {
          let idProductPanier = productRegisterInLocalStorage[i].productId;
          let quantityProduct = productRegisterInLocalStorage[i].productQuantity;
          //Je parcours l'API pour trouver les éléments qui ont le même ID que dans mon panier
          const compositionProduitsPanier = data.find((element) => element._id == idProductPanier);
          //Je calcul el resultat final
          totalPriceOfOneProduct += quantityProduct * compositionProduitsPanier.price;
          //J'ajoute le resultat final au DOM
          document.querySelector("#totalPrice").innerHTML = parseInt(totalPriceOfOneProduct);
        }
      }
    })
    .catch(function (err) {
      // Une erreur est survenue
    });
}

//---------Appel de l'API
fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (data) {
    //JSON => JS
    let productRegisterInLocalStorage = JSON.parse(localStorage.getItem("Kanap"));
    //Parcours du tableau pour trouver la couleur, l'ID et la quantité de chaque modèle de Kanap
    for (let i = 0; i < productRegisterInLocalStorage.length; i++) {
      const colorProductPanier = productRegisterInLocalStorage[i].productColor;
      const idProductPanier = productRegisterInLocalStorage[i].productId;
      const quantityProduct = productRegisterInLocalStorage[i].productQuantity;
      //Recherche si il y a un produit du panier qui a le même ID que dans l'API
      const compositionProduitsPanier = data.find((element) => element._id == idProductPanier);

      //Création de la balise "article"
      const newArticle = document.createElement("article");
      newArticle.className = "cart__item";
      newArticle.setAttribute("data-id", `${idProductPanier}`);
      newArticle.setAttribute("data-color", `${colorProductPanier}`);
      document.querySelector("#cart__items").appendChild(newArticle);

      //Création de la div pour mettre une image
      const newDivImage = document.createElement("div");
      newDivImage.className = "cart__item__img";
      newArticle.appendChild(newDivImage);

      //Création de la balise image
      const newImage = document.createElement("img");
      newImage.src = `${compositionProduitsPanier.imageUrl}`;
      newImage.alt = `${compositionProduitsPanier.altTxt}`;
      newDivImage.appendChild(newImage);

      //Création de la div "contenu"
      const newDivContent = document.createElement("div");
      newDivContent.className = "cart__item__content";
      newArticle.appendChild(newDivContent);

      //Création de la div "description"
      const newDivDescription = document.createElement("div");
      newDivDescription.className = "cart__item__content__description";
      newDivContent.appendChild(newDivDescription);

      // Titre h2 => nom du produit
      const newTitre = document.createElement("h2");
      newTitre.innerHTML = `${compositionProduitsPanier.name}`;
      newDivDescription.appendChild(newTitre);

      // Balise "p" => Couleur des produits
      const newCouleur = document.createElement("p");
      newCouleur.innerHTML = `${colorProductPanier}`;
      newDivDescription.appendChild(newCouleur);

      // Balise "p" => Prix des produits
      const newPrix = document.createElement("p");
      newPrix.innerHTML = `${compositionProduitsPanier.price}` + " €";
      newDivDescription.appendChild(newPrix);

      // Nouvelle div pour la partie paramètre des produits
      const newDivSettings = document.createElement("div");
      newDivSettings.className = "cart__item__content__settings";
      newArticle.appendChild(newDivSettings);

      // Nouvelle div pour la quantité de produits
      const newDivQuantity = document.createElement("div");
      newDivQuantity.className = "cart__item__content__settings__quantity";
      newDivSettings.appendChild(newDivQuantity);

      //Nouvelle balise "p" pour indiquer la quantité
      const newQuantity = document.createElement("P");
      newQuantity.innerHTML = "Qté : ";
      newDivQuantity.appendChild(newQuantity);

      //Nouvel input pour modifier la quantité
      const newInputNumber = document.createElement("input");
      newInputNumber.type = "number";
      newInputNumber.className = "itemQuantity";
      newInputNumber.name = "itemQuantity";
      newInputNumber.id = "input_" + i;
      newInputNumber.setAttribute("min", "1");
      newInputNumber.setAttribute("max", "100");
      newInputNumber.setAttribute("value", `${quantityProduct}`);
      newDivQuantity.appendChild(newInputNumber);

      //Nouvelle Div pour Supprimer des produits
      const newDivDelete = document.createElement("div");
      newDivDelete.className = "cart__item__content__settings__delete";
      newDivSettings.appendChild(newDivDelete);

      //Nouvelle balise "p" pour avoir le texte supprimer
      const newDelete = document.createElement("P");
      newDelete.className = "deleteItem";
      newDelete.id = "delete" + i;
      newDelete.innerHTML = "Supprimer";
      newDivDelete.appendChild(newDelete);

      //-----------Modification de la quantité d'articles dans le panier----------------

      //Variable pour trouver l'input sur lequel on clic
      let inputQuantity = document.getElementById("input_" + i);
      //Appel de l'évènement au clic
      inputQuantity.addEventListener("change", function () {
        //Récupération de la valeur de l'input
        let inputQuantityValue = Number(inputQuantity.value);
        //Récupération des informations du bouton cliqué (data_id + data_color)
        let articleOfEachProduct = inputQuantity.closest("article");
        let searchIdAndColor = productRegisterInLocalStorage.find((element) => element.productId == articleOfEachProduct.dataset.id && element.productColor == articleOfEachProduct.dataset.color);
        //-------Si la valeur de l'input est supérieur à 0 et inférieur ou égal à 100 et que c'est un nombre entier
        if (inputQuantityValue > 0 && inputQuantityValue <= 100 && Number.isInteger(inputQuantityValue)) {
          //Assignation à la quantité du produit
          searchIdAndColor.productQuantity = inputQuantityValue;
          //Enregistrement dans le localstorage
          localStorage.setItem("Kanap", JSON.stringify(productRegisterInLocalStorage));
          //Recalcul de la quantité + prix final
          totalProductQuantity();
          totalProductPrice();
          //-----Sinon
        } else {
          alert("Veuillez choisir une quantité entre 1 et 100 produits. Sinon supprimer le produit");
        }
      });

      //-----------------Suppression d'articles dans le panier---------------

      //Sélection de l'input "Supprimer" dans le DOM
      let inputDelete = document.getElementById("delete" + i);
      //Ajout de l'évènement au click
      inputDelete.addEventListener("click", function () {
        //Récupération des informations du bouton cliqué (data_id + data_color)
        let articleToDelete = inputDelete.closest("article");
        //Récupération du produit qui correspond au bouton "supprimer" grace à l'ID et couleur
        let searchIdAndColor = productRegisterInLocalStorage.find((element) => element.productId == articleToDelete.dataset.id && element.productColor == articleToDelete.dataset.color);
        //Récupération de l'index du produit précédement trouvé
        let indexDuProduit = productRegisterInLocalStorage.indexOf(searchIdAndColor);
        //Suppression dans le LocalStorage grace à l'index (Que dans le JS pour le moment)
        productRegisterInLocalStorage.splice(indexDuProduit, 1);
        //Suppression du produit dans le DOM
        articleToDelete.remove();
        //Enregistrement dans le localstorage (en format JSON)
        localStorage.setItem("Kanap", JSON.stringify(productRegisterInLocalStorage));
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

//---------------------Regex formulaire-----------------------

//Déclaration des Regex
const regexNomPrenom = new RegExp("^[a-zA-Z-éêèë]{2,20}$");
const regexAdresseEtVille = new RegExp("^[A-Za-z0-9 _-]*[A-Za-z0-9][A-Za-z0-9 _-]+$");
const regexEmail = new RegExp("^[\\w-\\.]+@([\\w-\\.]+\\.)+[\\w-]{2,4}$");

//Vérification pour le Prénom
const formulairePrenom = document.getElementById("firstName");

formulairePrenom.addEventListener("change", function () {
  if (regexNomPrenom.test(formulairePrenom.value) === true) {
    document.getElementById("firstNameErrorMsg").innerHTML = "";
    formulairePrenom.style.color = "black";
    formulairePrenom.style.background = "#4fc14f";
  } else {
    document.getElementById("firstNameErrorMsg").innerHTML = "Veuillez indiquer un Prénom correct";
    formulairePrenom.style.color = "red";
    formulairePrenom.style.background = "#fff";
  }
});

//Vérification pour le Nom

const formulaireNom = document.getElementById("lastName");

formulaireNom.addEventListener("change", function () {
  if (regexNomPrenom.test(formulaireNom.value) === true) {
    document.getElementById("lastNameErrorMsg").innerHTML = "";
    formulaireNom.style.color = "black";
    formulaireNom.style.background = "#4fc14f";
  } else {
    document.getElementById("lastNameErrorMsg").innerHTML = "Veuillez indiquer un Nom correct";
    formulaireNom.style.color = "red";
    formulaireNom.style.background = "#fff";
  }
});

//Vérification de l'adresse

const formulaireAdresse = document.getElementById("address");

formulaireAdresse.addEventListener("change", function () {
  if (regexAdresseEtVille.test(formulaireAdresse.value) === true) {
    document.getElementById("addressErrorMsg").innerHTML = "";
    formulaireAdresse.style.color = "black";
    formulaireAdresse.style.background = "#4fc14f";
  } else {
    document.getElementById("addressErrorMsg").innerHTML = "Veuillez indiquer une Adresse correcte";
    formulaireAdresse.style.color = "red";
    formulaireAdresse.style.background = "#fff";
  }
});
// Vérification de la ville
const formulaireVille = document.getElementById("city");

formulaireVille.addEventListener("change", function () {
  if (regexAdresseEtVille.test(formulaireVille.value) === true) {
    document.getElementById("cityErrorMsg").innerHTML = "";
    formulaireVille.style.color = "black";
    formulaireVille.style.background = "#4fc14f";
  } else {
    document.getElementById("cityErrorMsg").innerHTML = "Veuillez indiquer une Ville correcte";
    formulaireVille.style.color = "red";
    formulaireVille.style.background = "#fff";
  }
});

//Vérification de l'adresse mail
const formulaireEmail = document.getElementById("email");

formulaireEmail.addEventListener("change", function () {
  if (regexEmail.test(formulaireEmail.value) === true) {
    document.getElementById("emailErrorMsg").innerHTML = "";
    formulaireEmail.style.color = "black";
    formulaireEmail.style.background = "#4fc14f";
  } else {
    document.getElementById("emailErrorMsg").innerHTML = "Veuillez indiquer une adresse Email correcte";
    formulaireEmail.style.color = "red";
    formulaireEmail.style.background = "#fff";
  }
});

//-----Appel du bouton pour passer la commande

const boutonCommander = document.getElementById("order");

//Ajout de l'évènement au clic
boutonCommander.addEventListener("click", function (e) {
  let productRegisterInLocalStorage = JSON.parse(localStorage.getItem("Kanap"));
  e.preventDefault();
  //Vérifier si le panier est vide ou non
  if (productRegisterInLocalStorage.length === 0) {
    alert("Attention votre panier est vide !");
  } else {
    //Si le tous les champs respects les regex alors c'est validé
    if (
      regexNomPrenom.test(formulairePrenom.value) === true &&
      regexNomPrenom.test(formulaireNom.value) === true &&
      regexAdresseEtVille.test(formulaireAdresse.value) === true &&
      regexAdresseEtVille.test(formulaireVille.value) === true &&
      regexEmail.test(formulaireEmail.value) === true
    ) {
      let tableauPanierFinal = [];
      for (let i = 0; i < productRegisterInLocalStorage.length; i++) {
        tableauPanierFinal.push(productRegisterInLocalStorage[i].productId);
      }
      // Création de l'objet pour y mettre les informations du client
      const order = {
        contact: {
          firstName: formulairePrenom.value,
          lastName: formulaireNom.value,
          address: formulaireAdresse.value,
          city: formulaireVille.value,
          email: formulaireEmail.value,
        },
        products: tableauPanierFinal,
      };

      const optionDeLaRequete = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      };

      fetch("http://localhost:3000/api/products/order", optionDeLaRequete)
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }
        })
        .then(function (data) {
          document.location.href = `confirmation.html?orderId=${data.orderId}`;
        })
        .catch((err) => {
          alert("Un problème a été rencontré lors de l'envoi du formulaire.");
        });
    } else {
      alert("Veuillez remplir tous les champs du formulaire correctement");
    }
    //Si tout est bien validé on vide le localstorage
    localStorage.clear();
  }
});
