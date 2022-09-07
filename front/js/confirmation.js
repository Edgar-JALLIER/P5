let urlActuel = window.location.href;
let url = new URL(urlActuel);
let id = url.searchParams.get("orderId");

if (id === "") {
  alert("Désolé, une erreur est survenue lors de la commande, veuillez réessayer plus tard");
  window.location.href = "index.html";
} else {
  let emplacementOrderId = document.getElementById("orderId");
  emplacementOrderId.innerHTML = `${id}`;
}
