// EMAIL VALIDATION

const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");

if (emailInput && emailError) {

emailInput.addEventListener("input", function () {

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailPattern.test(emailInput.value)) {
emailError.textContent = "Enter a valid email address";
} else {
emailError.textContent = "";
}

});

}



// PASSWORD VALIDATION

const passwordInput = document.getElementById("password");
const passwordError = document.getElementById("password-error");

if (passwordInput && passwordError) {

passwordInput.addEventListener("input", function () {

const passwordPattern =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

if (!passwordPattern.test(passwordInput.value)) {
passwordError.textContent =
"Password must contain 8+ characters, uppercase, lowercase, number and special character";
} else {
passwordError.textContent = "";
}

});

}



// CONFIRM PASSWORD CHECK

const confirmPassword = document.getElementById("confirmPassword");
const confirmError = document.getElementById("confirm-error");

if (confirmPassword && confirmError && passwordInput) {

confirmPassword.addEventListener("input", function () {

if (confirmPassword.value !== passwordInput.value) {
confirmError.textContent = "Passwords do not match";
} else {
confirmError.textContent = "";
}

});

}



// PASSWORD TOGGLE (SHOW / HIDE)

function togglePassword() {

const passwordField = document.getElementById("password");

if (!passwordField) return;

if (passwordField.type === "password") {
passwordField.type = "text";
} else {
passwordField.type = "password";
}

}