/* =====================================================
EMAIL VALIDATION
===================================================== */

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


/* =====================================================
PASSWORD VALIDATION
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
} else {
passwordError.textContent = "";
}
});
}


/* =====================================================
CONFIRM PASSWORD VALIDATION
===================================================== */

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


/* =====================================================
PASSWORD SHOW / HIDE
===================================================== */

function togglePassword(){
const passwordField = document.getElementById("password");
if(!passwordField) return;

passwordField.type =
passwordField.type === "password" ? "text" : "password";
}


/* =====================================================
PROFILE SIDEBAR
===================================================== */

const profileBtn = document.getElementById("profileBtn");
const sidebar = document.getElementById("profileSidebar");

if(profileBtn && sidebar){

profileBtn.addEventListener("click", function(event){
event.stopPropagation();
sidebar.classList.toggle("active");
});

document.addEventListener("click", function(event){

const coursePanel = document.getElementById("coursePanel");

const isPanelOpen = coursePanel && coursePanel.classList.contains("active");

if(isPanelOpen){
return; // 🚀 DO NOT close sidebar if panel is open
}

if(
sidebar.classList.contains("active") &&
!sidebar.contains(event.target) &&
!profileBtn.contains(event.target)
){
sidebar.classList.remove("active");
}

});
}


/* =====================================================
COURSE STATE (MAIN FIX)
===================================================== */

let userCourses = [];


/* =====================================================
LOAD USER DATA + COURSES
===================================================== */

document.addEventListener("DOMContentLoaded", function(){

const name = localStorage.getItem("userName");
const role = localStorage.getItem("role");
const userEmail = localStorage.getItem("userEmail");

const nameElement = document.getElementById("profileName");
const roleElement = document.getElementById("profileRole");

if(nameElement && name){
nameElement.textContent = name;
}

if(roleElement && role){
roleElement.textContent = role;
}

/* LOAD PROFILE IMAGE */

const savedImage = localStorage.getItem("profileImage_" + userEmail);

const profileImage = document.getElementById("profileImage");
const headerImage = document.getElementById("profileBtn");

if(profileImage && savedImage){
profileImage.src = savedImage;
}

if(headerImage && savedImage){
headerImage.src = savedImage;
}

/* LOAD COURSES */

const savedCourses = localStorage.getItem("courses_" + userEmail);

if(savedCourses){
userCourses = JSON.parse(savedCourses);
}

renderCourses();

});


/* =====================================================
PROFILE PAGE REDIRECT
===================================================== */

function goToProfile(){
window.location.href = "profile.html";
}


/* =====================================================
LOGOUT
===================================================== */

function logoutUser(){
localStorage.removeItem("userName");
localStorage.removeItem("role");
window.location.href = "login.html";
}


/* =====================================================
PROFILE IMAGE UPLOAD
===================================================== */

function openProfileUpload(){
const uploadInput = document.getElementById("profileUpload");
if(uploadInput){
uploadInput.click();
}
}

const profileUpload = document.getElementById("profileUpload");

if(profileUpload){
profileUpload.addEventListener("change", function(){

const file = this.files[0];
if(!file) return;

const reader = new FileReader();

reader.onload = function(e){

const profileImage = document.getElementById("profileImage");
const headerImage = document.getElementById("profileBtn");

if(profileImage){
profileImage.src = e.target.result;
}

if(headerImage){
headerImage.src = e.target.result;
}

const userEmail = localStorage.getItem("userEmail");
localStorage.setItem("profileImage_" + userEmail, e.target.result);
};

reader.readAsDataURL(file);

});
}


/* =====================================================
COURSE PANEL OPEN / CLOSE
===================================================== */

function openCoursePanel(){

const panel = document.getElementById("coursePanel");
const sidebar = document.getElementById("profileSidebar");

if(panel){
panel.classList.add("active");
}

if(sidebar){
sidebar.classList.add("active"); // keep sidebar open
}

renderCourseResults(allCourses);

}

function closeCoursePanel(){
const panel = document.getElementById("coursePanel");
if(panel){
panel.classList.remove("active");
}
}


/* =====================================================
AVAILABLE COURSES
===================================================== */

const allCourses = [
"Java",
"Python",
"UX/UI",
"Graphic Design",
"Machine Learning",
"Data Science",
"Web Development",
"Cyber Security",
"Cloud Computing",
"Artificial Intelligence",
"Blockchain",
"DevOps"
];


/* =====================================================
SEARCH COURSES
===================================================== */

const searchInput = document.getElementById("courseSearch");

if(searchInput){
searchInput.addEventListener("input", function(){

const query = this.value.toLowerCase();

const results = allCourses.filter(course =>
course.toLowerCase().includes(query)
);

renderCourseResults(results);

});
}


/* =====================================================
RENDER COURSE OPTIONS
===================================================== */

function renderCourseResults(courses){

const container = document.getElementById("courseResults");
if(!container) return;

container.innerHTML = "";

courses.forEach(course => {

const row = document.createElement("div");
row.className = "course-option";

row.innerHTML = `
<span>${course}</span>
<span class="add-course-icon" onclick="addCourse('${course}')">+</span>
`;

container.appendChild(row);

});
}


/* =====================================================
RENDER USER COURSES (CORE FIX)
===================================================== */

function renderCourses(){

const list = document.getElementById("courseList");
const emptyMsg = document.getElementById("emptyMessage");

if(!list || !emptyMsg) return;

list.innerHTML = "";

if(userCourses.length === 0){
emptyMsg.textContent = "No courses selected";
} else {
emptyMsg.textContent = "";
};

userCourses.forEach(course => {

const div = document.createElement("div");
div.className = "course-item";

div.innerHTML = `
<span>${course}</span>
<span class="remove-course" onclick="removeCourse(event, '${course}')">−</span>
`;

list.appendChild(div);

});
}


/* =====================================================
ADD COURSE
===================================================== */

function addCourse(course){

if(userCourses.includes(course)) return;

userCourses.push(course);

saveCourses();
renderCourses();

}


/* =====================================================
REMOVE COURSE
===================================================== */

function removeCourse(event, course){

event.stopPropagation();

userCourses = userCourses.filter(c => c !== course);

saveCourses();
renderCourses();

}


/* =====================================================
SAVE COURSES (LOCAL STORAGE)
===================================================== */

function saveCourses(){

const userEmail = localStorage.getItem("userEmail");
localStorage.setItem("courses_" + userEmail, JSON.stringify(userCourses));

}