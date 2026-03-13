/* =====================================================
EMAIL VALIDATION
Checks if user entered a valid email format
===================================================== */

const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");

if (emailInput && emailError) {

emailInput.addEventListener("input", function () {

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailPattern.test(emailInput.value)) {
emailError.textContent = "Enter a valid email address";
} 
else {
emailError.textContent = "";
}

});

}



/* =====================================================
PASSWORD VALIDATION
Checks strong password requirements
===================================================== */

const passwordInput = document.getElementById("password");
const passwordError = document.getElementById("password-error");

if (passwordInput && passwordError) {

passwordInput.addEventListener("input", function () {

const passwordPattern =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

if (!passwordPattern.test(passwordInput.value)) {

passwordError.textContent =
"Password must contain 8+ characters, uppercase, lowercase, number and special character";

} 
else {

passwordError.textContent = "";

}

});

}



/* =====================================================
CONFIRM PASSWORD VALIDATION
Ensures both passwords match
===================================================== */

const confirmPassword = document.getElementById("confirmPassword");
const confirmError = document.getElementById("confirm-error");

if (confirmPassword && confirmError && passwordInput) {

confirmPassword.addEventListener("input", function () {

if (confirmPassword.value !== passwordInput.value) {

confirmError.textContent = "Passwords do not match";

} 
else {

confirmError.textContent = "";

}

});

}



/* =====================================================
PASSWORD SHOW / HIDE TOGGLE
Used for login password visibility
===================================================== */

function togglePassword() {

const passwordField = document.getElementById("password");

if (!passwordField) return;

if (passwordField.type === "password") {
passwordField.type = "text";
} 
else {
passwordField.type = "password";
}

}



/* =====================================================
PROFILE SIDEBAR CONTROLLER
Handles opening and closing sidebar
===================================================== */

const profileBtn = document.getElementById("profileBtn");
const sidebar = document.getElementById("profileSidebar");

if (profileBtn && sidebar) {

/* Toggle sidebar when clicking profile icon */

profileBtn.addEventListener("click", function () {

sidebar.classList.toggle("active");

});

/* Close sidebar when clicking outside */

document.addEventListener("click", function (event) {

if (
sidebar.classList.contains("active") &&
!sidebar.contains(event.target) &&
!profileBtn.contains(event.target)
) {

sidebar.classList.remove("active");

}

});

}



/* =====================================================
LOAD USER INFORMATION
Loads user data stored in localStorage
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

const name = localStorage.getItem("userName");
const role = localStorage.getItem("role");

const nameElement = document.getElementById("profileName");
const roleElement = document.getElementById("profileRole");

/* Display user name */

if (nameElement && name) {
nameElement.textContent = name;
}

/* Display user role */

if (roleElement && role) {
roleElement.textContent = role;
}



/* =====================================================
LOAD SAVED PROFILE IMAGE
This loads the stored profile photo after refresh
===================================================== */

const userEmail = localStorage.getItem("userEmail");
const savedImage = localStorage.getItem("profileImage_" + userEmail);

const profileImage = document.getElementById("profileImage");
const headerImage = document.getElementById("profileBtn");

/* Sidebar image */

if (profileImage && savedImage) {
profileImage.src = savedImage;
}

/* Header icon image */

if (headerImage && savedImage) {
headerImage.src = savedImage;
}

});



/* =====================================================
PROFILE PAGE REDIRECT
Navigates to profile page
===================================================== */

function goToProfile(){

window.location.href = "profile.html";

}



/* =====================================================
LOGOUT FUNCTION
Clears stored session data and redirects to login
===================================================== */

function logoutUser(){

// remove only login session info
localStorage.removeItem("userName");
localStorage.removeItem("role");

// redirect to login page
window.location.href = "login.html";

}



/* =====================================================
PROFILE IMAGE UPLOAD
Handles selecting and saving profile picture
===================================================== */

/* Open file picker when profile image is clicked */

function openProfileUpload(){

const uploadInput = document.getElementById("profileUpload");

if(uploadInput){
uploadInput.click();
}

}



/* Detect image selection */

const profileUpload = document.getElementById("profileUpload");

if(profileUpload){

profileUpload.addEventListener("change", function(){

const file = this.files[0];

if(!file) return;

const reader = new FileReader();

reader.onload = function(e){

const profileImage = document.getElementById("profileImage");
const headerImage = document.getElementById("profileBtn");

/* Set image inside sidebar */

if(profileImage){
profileImage.src = e.target.result;
}

/* Update header profile icon */

if(headerImage){
headerImage.src = e.target.result;
}

/* Save image in local storage */

const userEmail = localStorage.getItem("userEmail");
localStorage.setItem("profileImage_" + userEmail, e.target.result);

};

reader.readAsDataURL(file);

});

}