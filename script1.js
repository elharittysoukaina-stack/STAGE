// اختيار الزر حسب الـ class
const btn = document.querySelector('.buttoncommencer');

// إضافة حدث عند الضغط
btn.addEventListener('click', () => {
  // الانتقال لصفحة أخرى
  window.location.href = 'page2.html'; // بدل 'page.html' باسم الصفحة اللي بغيت
});




