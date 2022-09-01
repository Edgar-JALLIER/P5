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
    const kanapImage = data.imageUrl;
    const kanapName = data.name;
    const kanapPrice = data.price;
    const kanapDescription = data.description;
    const kanapColors = data.colors;
    const kanapAlt = data.altTxt;
    const img = document.createElement("img");
    img.src = kanapImage;
    img.alt = kanapAlt;
    document.querySelector(".item__img").appendChild(img);

    const sectionName = document.querySelector("#title");
    sectionName.innerHTML = `${kanapName}`;

    const sectionPrice = document.querySelector("#price");
    sectionPrice.innerHTML = `${kanapPrice}`;

    const sectionDescription = document.querySelector("#description");
    sectionDescription.innerHTML = `${kanapDescription}`;

    const kanapOption = document.querySelector("#colors");
    for (let colors of kanapColors) {
      kanapOption.innerHTML +=
        "<option value=" + `${colors}` + ">" + `${colors}` + "</option>";
      console.log(kanapOption.value);
    }

    const boutonEnvoyerPanier = document.querySelector("#addToCart");

    // Appel d'un évnènement au click sur le bouton "ajouter au panier"
    boutonEnvoyerPanier.addEventListener("click", (e) => {
      const titre = document.querySelector("#title");
      console.log(titre.innerText);
      const couleurChoisie = kanapOption.value;
      const quantity = document.querySelector("#quantity");
      const kanapQuantity = quantity.value;
      // Insertion des conditions de couleur et de nombre d'article min et max
      if (kanapQuantity > 0 && kanapQuantity <= 100 && couleurChoisie != "") {
        // Récupération des données utilisateurs
        let optionsProduct = {
          productId: data._id,
          productColor: couleurChoisie,
          productQuantity: Number(kanapQuantity),
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
          if (infoDesKanapDuLocalStorage == null) {
            return [];
          } else {
            return JSON.parse(infoDesKanapDuLocalStorage);
          }
        }

        //Fonction d'ajout des produit séléctionnés dans le local Storage
        function ajoutProduitLocalStorage(optionsProduct) {
          let panier = infoDuLocalStorage();
          let quantity = optionsProduct.productQuantity;
          let foundProduct = panier.find(
            (P) =>
              P.productId == optionsProduct.productId &&
              P.productColor == optionsProduct.productColor
          );
          // Si il y a deja le meme produit avec meme couleur dans le local Storage alors
          if (foundProduct != undefined) {
            foundProduct.productQuantity += quantity;
          } else {
            productQuantity = quantity;
            //On veut push seulement quand c'est un nouveau produit
            panier.push(optionsProduct);
          }
          transfertStorage(panier);
        }
        ajoutProduitLocalStorage(optionsProduct);
      }
    });
  })
  .catch(function (err) {
    // Une erreur est survenue
  });
