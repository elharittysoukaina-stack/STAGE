// Sélectionne l'élément du formulaire avec la classe .container
const form = document.querySelector(".container");

// Sélectionne le bouton avec la classe .btn-confirm
const confirmBtn = document.querySelector(".btn-confirm");

// Ajoute un écouteur d'événement sur le clic du bouton
confirmBtn.addEventListener("click", function(e) {
    e.preventDefault(); // Empêche le rechargement automatique de la page lors de la soumission du formulaire

    // Récupère et nettoie les valeurs des champs du formulaire
    const employeeId = document.getElementById("employeeId").value.trim(); // Identifiant de l'employé
    const position = document.getElementById("position").value.trim(); // Poste de l'employé
    const employeeShift = document.getElementById("employeeShift").value; // Quart de travail
    const leaveType = document.getElementById("leaveType").value; // Type de congé
    const startDate = document.getElementById("startDate").value; // Date de début
    const endDate = document.getElementById("endDate").value; // Date de fin
    const requestDetails = document.getElementById("requestDetails").value.trim(); // Détails de la demande

    // Vérifie si un des champs obligatoires est vide
    if (
      employeeId === "" ||
      position === "" ||
      employeeShift === "" ||
      leaveType === "" ||
      startDate === "" ||
      endDate === "" ||
      requestDetails === ""
    ) {
      alert("Veuillez remplir tous les champs obligatoires !"); // Alerte si un champ est vide
      return; // Arrête l'exécution si les champs ne sont pas tous remplis
    }

    // Redirige vers la page page05.html si tous les champs sont remplis
    window.location.href = "page05.html";
});
