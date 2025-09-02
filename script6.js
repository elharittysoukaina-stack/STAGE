
  // التسميات على محور X (الشهور)
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct"];

  // البيانات لكل حالة
  const approved = [3,5,2,4,6,3,7,4,5,2]; // Approuvé
  const rejected = [1,2,1,1,2,1,1,2,1,1]; // Rejeté
  const pending = [2,1,3,2,1,2,0,3,2,1];  // En attente

  // إنشاء الرسم البياني
  new Chart("myChart", {
    type: "line", // نوع الرسم Line Chart
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
    position: 'bottom'  // هاد السطر كينقل legend تحت الرسم
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

    // فتح Sidebar
    openBtn.addEventListener('click', () => {
        sidebar.style.width = '280px';
        overlay.classList.add('active');
    });

    // غلق Sidebar بالـ X
    closeBtn.addEventListener('click', () => {
        sidebar.style.width = '0';
        overlay.classList.remove('active');
    });

    // غلق Sidebar بالضغط على Overlay
    overlay.addEventListener('click', () => {
        sidebar.style.width = '0';
        overlay.classList.remove('active');
    });
});