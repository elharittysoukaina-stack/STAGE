// نجيب الفورم و الزر
  const form = document.querySelector(".container");
  const confirmBtn = document.querySelector(".btn-confirm");

  confirmBtn.addEventListener("click", function(e) {
    e.preventDefault(); // منع الفورم من الإرسال مباشرة

    // نجيب كل القيم
    const employeeId = document.getElementById("employeeId").value.trim();
    const position = document.getElementById("position").value.trim();
    const employeeShift = document.getElementById("employeeShift").value;
    const leaveType = document.getElementById("leaveType").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const requestDetails = document.getElementById("requestDetails").value.trim();

    // التحقق من القيم
    if (
      employeeId === "" ||
      position === "" ||
      employeeShift === "" ||
      leaveType === "" ||
      startDate === "" ||
      endDate === "" ||
      requestDetails === ""
    ) {
      alert("Veuillez remplir tous les champs obligatoires !");
      return; // إذا أي خانة فارغة، ما يكملش
    }

    // إذا كلشي صحيح، نوجّهو المستخدم لصفحة page4.html
    window.location.href = "page05.html";
  });