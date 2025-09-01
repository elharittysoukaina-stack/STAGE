
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