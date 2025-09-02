document.addEventListener('DOMContentLoaded', function() {
    // ✅ يطبع رسالة في console لتأكيد أن السكريبت محمل
    console.log("Script chargé!");
    
    // ✅ اختيار الجدول وDIVs اللي فيها الإحصائيات
    const table = document.querySelector('.my-table');
    const statCards = {
        totalEmployees: document.getElementById('totalEmployees'),
        avgDays: document.getElementById('avgDays'),
        acceptanceRate: document.getElementById('acceptanceRate'),
        requestsThisMonth: document.getElementById('requestsThisMonth')
    };

    // ✅ دالة لاستخراج البيانات من الجدول
    function extractTableData() {
        const rows = table.querySelectorAll('tr:not(:first-child)');
        const employees = [];
        const days = [];
        const types = [];
        const statuses = [];

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            employees.push(cells[0].textContent); // اسم الموظف
            
            // تحويل النص "14jours" إلى رقم 14
            const daysText = cells[4].textContent;
            const daysValue = parseInt(daysText);
            days.push(daysValue);
            
            types.push(cells[2].textContent); // نوع الإجازة
            statuses.push(cells[3].textContent.trim().toLowerCase()); // حالة المدير
        });

        return { employees, days, types, statuses };
    }

    // ✅ دالة لتحديث الإحصائيات في الواجهة
    function updateStats() {
        const { employees, days, statuses } = extractTableData();
        const totalEmployees = employees.length;

        let totalDays = 0;
        let acceptedCount = 0;

        days.forEach(day => { totalDays += day; }); // مجموع الأيام

        statuses.forEach(status => {
            if(status === 'accepté') acceptedCount++; // عدد الطلبات المقبولة
        });

        const avgDays = totalEmployees ? Math.round(totalDays / totalEmployees) : 0;
        const acceptanceRate = totalEmployees ? Math.round((acceptedCount / totalEmployees) * 100) : 0;
        const requestsThisMonth = totalEmployees;

        // ✅ تحديث العناصر في الصفحة
        statCards.totalEmployees.textContent = totalEmployees;
        statCards.avgDays.textContent = avgDays;
        statCards.acceptanceRate.textContent = acceptanceRate + '%';
        statCards.requestsThisMonth.textContent = requestsThisMonth;
    }

    // ✅ دالة لإنشاء الرسم البياني باستخدام Chart.js
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

    // ✅ تشغيل التحديث والرسوم البيانية لأول مرة
    updateStats();
    createChart();

    // ✅ إعداد الفلاتر للبحث والفلترة حسب نوع الإجازة
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
            
            // 🔹 فلترة حسب الاسم
            if (searchText && name.indexOf(searchText) === -1) shouldShow = false;
            
            // 🔹 فلترة حسب حالة المدير
            if (filterValue === 'approuve' && status !== 'accepté') shouldShow = false;
            else if (filterValue === 'rejete' && status !== 'rejeté') shouldShow = false;
            else if (filterValue === 'en attente' && status !== 'en attente') shouldShow = false;
            
            row.style.display = shouldShow ? '' : 'none';
        });
        
        // ✅ تحديث الإحصائيات بعد الفلترة
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