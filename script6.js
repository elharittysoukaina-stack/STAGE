// Fonctionnalité pour les actions manager (Approuver/Rejeter)
document.addEventListener('DOMContentLoaded', function() {
    // Ajouter les icônes d'action dans chaque ligne du tableau
    const actionCells = document.querySelectorAll('.my-table tbody td:nth-child(5)');
    
    actionCells.forEach(cell => {
        // Créer le conteneur pour les icônes
        const actionContainer = document.createElement('div');
        actionContainer.className = 'action-container';
        actionContainer.style.display = 'flex';
        actionContainer.style.justifyContent = 'center';
        actionContainer.style.gap = '10px';
        
        // Créer l'icône de validation (coche verte)
        const approveIcon = document.createElement('span');
        approveIcon.className = 'approve-icon';
        approveIcon.innerHTML = '✓';
        approveIcon.style.color = 'green';
        approveIcon.style.cursor = 'pointer';
        approveIcon.style.fontSize = '18px';
        approveIcon.style.fontWeight = 'bold';
        approveIcon.title = 'Approuver la demande';
        
        // Créer l'icône de rejet (croix rouge)
        const rejectIcon = document.createElement('span');
        rejectIcon.className = 'reject-icon';
        rejectIcon.innerHTML = '✗';
        rejectIcon.style.color = 'red';
        rejectIcon.style.cursor = 'pointer';
        rejectIcon.style.fontSize = '18px';
        rejectIcon.style.fontWeight = 'bold';
        rejectIcon.title = 'Rejeter la demande';
        
        // Ajouter les icônes au conteneur
        actionContainer.appendChild(approveIcon);
        actionContainer.appendChild(rejectIcon);
        
        // Vider la cellule et ajouter le conteneur d'actions
        cell.innerHTML = '';
        cell.appendChild(actionContainer);
        
        // Ajouter les gestionnaires d'événements
        approveIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            const row = this.closest('tr');
            const statusCell = row.cells[5];
            statusCell.textContent = 'Approuvé';
            statusCell.style.color = 'green';
            statusCell.style.fontWeight = 'bold';
            
            // Mettre à jour les statistiques du graphique
            updateChartStats('approved');
        });
        
        rejectIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            const row = this.closest('tr');
            const statusCell = row.cells[5];
            statusCell.textContent = 'Rejeté';
            statusCell.style.color = 'red';
            statusCell.style.fontWeight = 'bold';
            
            // Mettre à jour les statistiques du graphique
            updateChartStats('rejected');
        });
    });
});

// Fonction pour mettre à jour les statistiques du graphique
function updateChartStats(action) {
    // Récupérer le graphique existant
    const chart = Chart.instances[0];
    
    if (chart) {
        // Trouver l'index du mois actuel
        const now = new Date();
        const monthIndex = now.getMonth();
        
        // Mettre à jour les données en fonction de l'action
        if (action === 'approved') {
            chart.data.datasets[0].data[monthIndex] += 1;
        } else if (action === 'rejected') {
            chart.data.datasets[1].data[monthIndex] += 1;
        }
        
        // Mettre à jour le graphique
        chart.update();
    }
}

// Modifier la fonction filterTable pour prendre en compte les nouvelles classes
function filterTable() {
    const searchText = searchInput.value.toLowerCase();
    const filterValue = leaveType.value.toLowerCase();

    rows.forEach(row => {
        const name = row.cells[0].textContent.toLowerCase();   // Colonne Nom
        const status = row.cells[5].textContent.toLowerCase(); // Colonne Statut
        let shouldShow = true;

        // Filtrer par nom
        if (searchText && !name.includes(searchText)) shouldShow = false;

        // Filtrer par statut
        if (filterValue === 'approuve' && status !== 'approuvé') shouldShow = false;
        else if (filterValue === 'rejete' && status !== 'rejeté') shouldShow = false;
        else if (filterValue === 'en attente' && status !== 'en attente') shouldShow = false;

        // Afficher ou masquer la ligne
        row.style.display = shouldShow ? '' : 'none';
    });

    updateStats(); // Mettre à jour les stats
}
 
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct"];

  // les données
  const approved = [3,5,2,4,6,3,7,4,5,2]; // Approuvé
  const rejected = [1,2,1,1,2,1,1,2,1,1]; // Rejeté
  const pending = [2,1,3,2,1,2,0,3,2,1];  // En attente

  //création de graphique
  new Chart("myChart", {
    type: "line", // type est line chart
    data: {
      labels: months,
      datasets: [
        { 
          label: "Approuvé",
          data: approved,
          borderColor: "green",
          fill: false
        },
        { 
          label: "Rejeté",
          data: rejected,
          borderColor: "red",
          fill: false
        },
        { 
          label: "En attente",
          data: pending,
          borderColor: "blue",
          fill: false
        }
      ]
    },
   options: {
  responsive: true,
  legend: {
    display: true,
    position: 'bottom' 
  },
  scales: {
    yAxes: [{ ticks: { beginAtZero: true } }]
  }
  }
  });
  // Sélection des éléments
const searchInput = document.querySelector(".searchInput");
const leaveType = document.querySelector(".leaveType");
const rows = document.querySelectorAll(".my-table tbody tr");

// Fonction de filtrage
function filterTable() {
  const searchText = searchInput.value.toLowerCase();
  const filterValue = leaveType.value.toLowerCase();

  rows.forEach(row => {
    const name = row.cells[0].textContent.toLowerCase();   // Colonne Nom
    const status = row.cells[5].textContent.toLowerCase(); // Colonne Statut
    let shouldShow = true;

    // Filtrer par nom
    if (searchText && !name.includes(searchText)) shouldShow = false;

    // Filtrer par statut
    if (filterValue === 'approuve' && status !== 'approuvé') shouldShow = false;
    else if (filterValue === 'rejete' && status !== 'rejeté') shouldShow = false;
    else if (filterValue === 'en attente' && status !== 'en attente') shouldShow = false;

    // Afficher ou masquer la ligne
    row.style.display = shouldShow ? '' : 'none';
  });

  updateStats(); // Mettre à jour les stats
}

// Mise à jour des stats (exemple simple)
function updateStats() {
  const visibleRows = Array.from(rows).filter(row => row.style.display !== 'none');
  console.log(`Nombre de lignes visibles : ${visibleRows.length}`);
}

// Ajout des événements
searchInput.addEventListener("input", filterTable);
leaveType.addEventListener("change", filterTable);


document.addEventListener("DOMContentLoaded", function() {
    // اختيار العناصر
    const openBtn = document.getElementById('openBtn');
    const closeBtn = document.getElementById('closeBtn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    // ouvrir Sidebar
    openBtn.addEventListener('click', () => {
        sidebar.style.width = '280px';
        overlay.classList.add('active');
    });

    // fermer Sidebar 
    closeBtn.addEventListener('click', () => {
        sidebar.style.width = '0';
        overlay.classList.remove('active');
    });

    // fermer SideBar quand on click sur overlay
    overlay.addEventListener('click', () => {
        sidebar.style.width = '0';
        overlay.classList.remove('active');
    });
});

// Initialisation après le chargement du document
document.addEventListener('DOMContentLoaded', function() {
    const notificationIcon = document.getElementById('notificationIcon');
    const notificationPanel = document.getElementById('notificationPanel');
    const markReadButton = document.querySelector('.mark-read');
    const notificationBadge = document.querySelector('.notification-badge');
    const unreadNotifications = document.querySelectorAll('.notification-item.unread');
    
    // Gérer le clic sur l'icône de notification
    if (notificationIcon) {
        notificationIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            notificationPanel.classList.toggle('active');
        });
    }
    
    // Marquer toutes les notifications comme lues
    if (markReadButton) {
        markReadButton.addEventListener('click', function() {
            unreadNotifications.forEach(notification => {
                notification.classList.remove('unread');
            });
            
            // Mettre à jour le badge
            if (notificationBadge) {
                notificationBadge.textContent = '0';
                notificationBadge.style.backgroundColor = '#95a5a6';
                notificationBadge.style.animation = 'none';
            }
            
            // Masquer le panneau après un court délai
            setTimeout(() => {
                notificationPanel.classList.remove('active');
            }, 800);
        });
    }
    
    // Fermer le panneau de notifications en cliquant à l'extérieur
    document.addEventListener('click', function(e) {
        if (notificationPanel && !notificationPanel.contains(e.target) && 
            (!notificationIcon || !notificationIcon.contains(e.target))) {
            notificationPanel.classList.remove('active');
        }
    });
    
    // Empêcher la fermeture lors du clic à l'intérieur du panneau
    if (notificationPanel) {
        notificationPanel.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
});

// Fonction pour ajouter une nouvelle notification
function addNotification(message, isUnread = true) {
    const notificationPanel = document.getElementById('notificationPanel');
    const notificationsContainer = notificationPanel.querySelector('h3').nextElementSibling;
    
    // Créer un nouvel élément de notification
    const newNotification = document.createElement('div');
    newNotification.className = isUnread ? 'notification-item unread' : 'notification-item';
    
    // Ajouter l'icône et le texte
    newNotification.innerHTML = `
        <img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" alt="info">
        <p>${message}</p>
    `;
    
    // Insérer au début de la liste
    notificationsContainer.parentNode.insertBefore(newNotification, notificationsContainer);
    
    // Mettre à jour le badge
    const badge = document.querySelector('.notification-badge');
    if (badge && isUnread) {
        const currentCount = parseInt(badge.textContent) || 0;
        badge.textContent = currentCount + 1;
        badge.style.backgroundColor = '#e74c3c';
        badge.style.animation = 'pulse 1.5s infinite';
    }
}

// Fonction pour afficher/masquer le panneau
function toggleNotificationPanel() {
    const panel = document.getElementById('notificationPanel');
    if (panel) {
        panel.classList.toggle('active');
    }
}