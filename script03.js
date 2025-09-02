
document.addEventListener("DOMContentLoaded", function() {
  const button = document.getElementById("submitBtn");
  button.addEventListener("click", function() {
    window.location.href = "page04.html";
  });
});


const openBtn = document.getElementById('openBtn');
const closeBtn = document.getElementById('closeBtn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

// open sidebar
openBtn.addEventListener('click', () => {
  sidebar.style.width = '250px';  
  overlay.classList.add('active'); 
});

// fermer sidebar
closeBtn.addEventListener('click', () => {
  sidebar.style.width = '0';
  overlay.classList.remove('active');
});

// fermer sidebar par overlay
overlay.addEventListener('click', () => {
  sidebar.style.width = '0';
  overlay.classList.remove('active');
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














