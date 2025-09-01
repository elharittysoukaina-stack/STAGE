document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.querySelector('.login-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');
  

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function showError(input, errorElement, message) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    input.classList.add('error');
  }
 
  function hideError(input, errorElement) {
    errorElement.textContent = '';
    errorElement.style.display = 'none';
    input.classList.remove('error');
  }
  
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    
    if (!emailValue) {
      showError(emailInput, emailError, 'L\'email est requis');
      isValid = false;
    } else if (!validateEmail(emailValue)) {
      showError(emailInput, emailError, 'Format d\'email invalide');
      isValid = false;
    } else {
      hideError(emailInput, emailError);
    }
    
    if (!passwordValue) {
      showError(passwordInput, passwordError, 'Le mot de passe est requis');
      isValid = false;
    } else {
      hideError(passwordInput, passwordError);
    }
    
    if (isValid) {
      
      if (passwordValue.toLowerCase().includes('manager')) {
        window.location.href = 'page6.html';
        return;
      }
      
      if (passwordValue.toLowerCase().includes('rh')) {
        window.location.href = 'page7.html';
        return; 
      }
      
      if (emailValue === 'soukainaelharitty@gmail.com' && passwordValue === 'soukaina') {
        window.location.href = 'page03.html';
      } else {
        
        if (emailValue !== 'soukainaelharitty@gmail.com') {
          showError(emailInput, emailError, 'Email incorrect');
        }
        if (passwordValue !== 'soukaina') {
          showError(passwordInput, passwordError, 'Mot de passe incorrect');
        }
      }
    }
  });
  
  emailInput.addEventListener('input', function() {
    if (emailInput.value.trim()) {
      hideError(emailInput, emailError);
    }
  });
  
  passwordInput.addEventListener('input', function() {
    if (passwordInput.value.trim()) {
      hideError(passwordInput, passwordError);
    }
  });
});
