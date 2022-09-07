//Récupération de l'URL de la page
let urlActuel = window.location.href;
let url = new URL(urlActuel);
//Récupération de l'ID de l'URL qui correspond à l'ID du produit
let id = url.searchParams.get("id");

//Ca va nous permettre de faire une recherche plus spécifique dans l'API
fetch("http://localhost:3000/api/products/" + `${id}`)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (data) {
    //Déclarartion des variables du produit
    const kanapImage = data.imageUrl;
    const kanapName = data.name;
    const kanapPrice = data.price;
    const kanapDescription = data.description;
    const kanapColors = data.colors;
    const kanapAlt = data.altTxt;
    //---Ajout des détails du produit dans le DOM grace à l'API
    //Image
    const img = document.createElement("img");
    img.src = kanapImage;
    img.alt = kanapAlt;
    //Placement de l'image dans le DOM
    document.querySelector(".item__img").appendChild(img);
    //Titre
    const sectionName = document.querySelector("#title");
    sectionName.innerHTML = `${kanapName}`;
    //Prix
    const sectionPrice = document.querySelector("#price");
    sectionPrice.innerHTML = `${kanapPrice}`;
    //Description
    const sectionDescription = document.querySelector("#description");
    sectionDescription.innerHTML = `${kanapDescription}`;
    //Options de couleur
    const kanapOption = document.querySelector("#colors");
    for (let colors of kanapColors) {
      kanapOption.innerHTML += "<option value=" + `${colors}` + ">" + `${colors}` + "</option>";
    }

    // Appel d'un évnènement au click sur le bouton "ajouter au panier"
    const boutonEnvoyerPanier = document.querySelector("#addToCart");
    boutonEnvoyerPanier.addEventListener("click", (e) => {
      //Récupération de la couleur choisie par l'utilisateur
      const couleurChoisie = kanapOption.value;
      //Récupération de la quantité choisie par l'utilisateur
      const quantity = document.querySelector("#quantity");
      const kanapQuantity = Number(quantity.value);
      // Insertion des conditions de couleur et de nombre d'article min et max
      if (kanapQuantity > 0 && kanapQuantity <= 100 && Number.isInteger(kanapQuantity) && couleurChoisie != "") {
        // Récupération des données utilisateurs
        let optionsProduct = {
          productId: data._id,
          productColor: couleurChoisie,
          productQuantity: kanapQuantity,
        };

        //--------Transfert dans le localStorage---------------

        // Convertion du format JS en JSON => utilisation stringify pour sérialiser l'objet Kanap
        function transfertStorage(optionsProduct) {
          localStorage.setItem("Kanap", JSON.stringify(optionsProduct));
        }

        // Prise d'infos sur le localStorage
        function infoDuLocalStorage() {
          let infoDesKanapDuLocalStorage = localStorage.getItem("Kanap");
          //Si le panier est vide alors il faut créer un tableau vide (Pas possible de "push" dans rien)
          if (infoDesKanapDuLocalStorage === null) {
            return [];
          } else {
            //Renvoi une réponse au format JS (JSON => JS)
            return JSON.parse(infoDesKanapDuLocalStorage);
          }
        }

        //Fonction d'ajout des produit séléctionnés dans le local Storage
        function ajoutProduitLocalStorage(optionsProduct) {
          let panier = infoDuLocalStorage();
          let quantity = optionsProduct.productQuantity;
          //On recherche dans le LocalStorage si il y a un produit qui a le même ID et la même couleur que ce que l'utilisateur a choisi
          let foundProduct = panier.find((P) => P.productId === optionsProduct.productId && P.productColor === optionsProduct.productColor);
          // Si il y a deja le meme produit avec meme couleur dans le local Storage alors
          if (foundProduct != undefined) {
            foundProduct.productQuantity += quantity;
          } else {
            productQuantity = quantity;
            //On veut "push" (ajout d'un élément dans un tableau) seulement quand c'est un nouveau produit
            panier.push(optionsProduct);
          }
          transfertStorage(panier);
        }
        ajoutProduitLocalStorage(optionsProduct);
        //Message d'alerte si tout est validé
        alert("Félicitation, vous avez ajouté " + `${kanapQuantity} ` + `${kanapName}` + " de couleur " + `${couleurChoisie}` + " dans votre panier !");
      } else {
        //Message d'alerte si l'utilisateur a mal rempli les champs
        alert("Merci de choisir une couleur et d'indiquer la quantité voulue");
      }
    });
  })
  .catch(function (err) {
    alert("Une erreur est survenue, veuillez revenir plus tard");
  });
