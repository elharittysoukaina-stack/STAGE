document.addEventListener('DOMContentLoaded', function() {
    
    console.log("Script chargé!");
    
    
    const table = document.querySelector('.my-table');
    const statCards = {
        totalEmployees: document.getElementById('totalEmployees'),
        avgDays: document.getElementById('avgDays'),
        acceptanceRate: document.getElementById('acceptanceRate'),
        requestsThisMonth: document.getElementById('requestsThisMonth')
    };

    
    function extractTableData() {
        const rows = table.querySelectorAll('tr:not(:first-child)');
        const employees = [];
        const days = [];
        const types = [];
        const statuses = [];

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            employees.push(cells[0].textContent); 
            
            const daysText = cells[4].textContent;
            const daysValue = parseInt(daysText);
            days.push(daysValue);
            
            types.push(cells[2].textContent); 
            statuses.push(cells[3].textContent.trim().toLowerCase()); 
        });

        return { employees, days, types, statuses };
    }

    
    function updateStats() {
        const { employees, days, statuses } = extractTableData();
        const totalEmployees = employees.length;

        let totalDays = 0;
        let acceptedCount = 0;

        days.forEach(day => { totalDays += day; }); 

        statuses.forEach(status => {
            if(status === 'accepté') acceptedCount++; 
        });

        const avgDays = totalEmployees ? Math.round(totalDays / totalEmployees) : 0;
        const acceptanceRate = totalEmployees ? Math.round((acceptedCount / totalEmployees) * 100) : 0;
        const requestsThisMonth = totalEmployees;

        
        statCards.totalEmployees.textContent = totalEmployees;
        statCards.avgDays.textContent = avgDays;
        statCards.acceptanceRate.textContent = acceptanceRate + '%';
        statCards.requestsThisMonth.textContent = requestsThisMonth;
    }


    function createChart() {
        const { employees, days } = extractTableData();
        const ctx = document.getElementById('leaveChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: employees, // المحور X: أسماء الموظفين
                datasets: [{
                    label: 'Jours de congés restants',
                    data: days, // المحور Y: الأيام المتبقية
                    backgroundColor: [
                        'rgba(75, 108, 183, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(75, 192, 192, 0.7)'
                    ],
                    borderColor: [
                        'rgba(75, 108, 183, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: { beginAtZero: true },
                        scaleLabel: { display: true, labelString: 'Jours restants' }
                    }],
                    xAxes: [{
                        scaleLabel: { display: true, labelString: 'Employés' }
                    }]
                },
                title: {
                    display: true,
                    text: 'Jours de congés restants par employé',
                    fontSize: 16
                },
                legend: { display: false },
                animation: { duration: 2000, easing: 'easeOutBounce' }
            }
        });
    }

   
    updateStats();
    createChart();

    
    const searchInput = document.getElementById('searchInput');
    const leaveTypeFilter = document.getElementById('leaveType');
    
    searchInput.addEventListener('keyup', filterTable);
    leaveTypeFilter.addEventListener('change', filterTable);

    function filterTable() {
        const searchText = searchInput.value.toLowerCase();
        const filterValue = leaveTypeFilter.value;
        const rows = table.querySelectorAll('tr:not(:first-child)');
        
        rows.forEach(row => {
            const name = row.querySelector('td:first-child').textContent.toLowerCase();
            const status = row.querySelector('td:nth-child(4)').textContent.trim().toLowerCase();
            let shouldShow = true;
            
           
            if (searchText && name.indexOf(searchText) === -1) shouldShow = false;
            
          
            if (filterValue === 'accepté' && status !== 'accepté') shouldShow = false;
            else if (filterValue === 'rejete' && status !== 'rejeté') shouldShow = false;
            else if (filterValue === 'en attente' && status !== 'en attente') shouldShow = false;
            
            row.style.display = shouldShow ? '' : 'none';
        });
        
        updateStats();
    }
  
    // اختيار العناصر
    const openBtn = document.getElementById('openBtn');
    const closeBtn = document.getElementById('closeBtn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    // فتح Sidebar
    openBtn.addEventListener('click', () => {
        sidebar.style.width = '280px';
        overlay.classList.add('active');
    });

    
    closeBtn.addEventListener('click', () => {
        sidebar.style.width = '0';
        overlay.classList.remove('active');
    });

    
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