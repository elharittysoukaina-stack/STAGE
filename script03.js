
document.addEventListener("DOMContentLoaded", function() {
  const button = document.getElementById("submitBtn");
  button.addEventListener("click", function() {
    window.location.href = "page04.html";
  });
});

// اختيار العناصر
const openBtn = document.getElementById('openBtn');
const closeBtn = document.getElementById('closeBtn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

// فتح Sidebar
openBtn.addEventListener('click', () => {
  sidebar.style.width = '250px';  // الحجم اللي باغي للـ Sidebar
  overlay.classList.add('active'); // تفعيل Overlay
});

// غلق Sidebar بالـ X
closeBtn.addEventListener('click', () => {
  sidebar.style.width = '0';
  overlay.classList.remove('active');
});

// غلق Sidebar بتكليكي على Overlay
overlay.addEventListener('click', () => {
  sidebar.style.width = '0';
  overlay.classList.remove('active');
});
