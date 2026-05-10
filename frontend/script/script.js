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

const isPanelOpen =
coursePanel && coursePanel.classList.contains("active");

if(isPanelOpen){
return;
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
COURSE STATE
===================================================== */

let userCourses = [];


/* =====================================================
LOAD USER DATA + COURSES
===================================================== */

document.addEventListener("DOMContentLoaded", function(){

const name = localStorage.getItem("userName");
const role = localStorage.getItem("role");
const userEmail = localStorage.getItem("userEmail");

/* PROFILE INFO */

const nameElement = document.getElementById("profileName");
const roleElement = document.getElementById("profileRole");

if(nameElement && name){
nameElement.textContent = name;
}

if(roleElement && role){
roleElement.textContent = role;
}


/* =====================================================
WELCOME TEXT
===================================================== */

const welcomeText = document.getElementById("welcomeText");

if(welcomeText && name){
welcomeText.textContent = `Welcome, ${name} 👋`;
}


/* =====================================================
LOAD PROFILE IMAGE
===================================================== */

const savedImage =
localStorage.getItem("profileImage_" + userEmail);

const profileImage =
document.getElementById("profileImage");

const headerImage =
document.getElementById("profileBtn");

if(profileImage && savedImage){
profileImage.src = savedImage;
}

if(headerImage && savedImage){
headerImage.src = savedImage;
}


/* =====================================================
LOAD COURSES FROM BACKEND
===================================================== */

fetch(`http://localhost:8080/api/courses/get?email=${userEmail}`)

.then(res => res.json())

.then(data => {

userCourses = data.map(item =>
typeof item === "string"
? item
: item.courseName
);

renderCourses();

/* =====================================================
RESTORE SELECTED COURSE
===================================================== */

const savedSelectedCourse =
localStorage.getItem(
`selectedCourse_${userEmail}`
);

if(savedSelectedCourse){

const allCourseItems =
document.querySelectorAll(".course-item");

allCourseItems.forEach(item => {

if(
item.innerText.includes(savedSelectedCourse)
){

item.classList.add("active");

loadMentors(savedSelectedCourse);

}

});

}

})

.catch(err => {

console.error("Error loading courses:", err);

});

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

const uploadInput =
document.getElementById("profileUpload");

if(uploadInput){
uploadInput.click();
}

}

const profileUpload =
document.getElementById("profileUpload");

if(profileUpload){

profileUpload.addEventListener("change", function(){

const file = this.files[0];

if(!file) return;

const reader = new FileReader();

reader.onload = function(e){

const profileImage =
document.getElementById("profileImage");

const headerImage =
document.getElementById("profileBtn");

if(profileImage){
profileImage.src = e.target.result;
}

if(headerImage){
headerImage.src = e.target.result;
}

const userEmail =
localStorage.getItem("userEmail");

localStorage.setItem(
"profileImage_" + userEmail,
e.target.result
);

};

reader.readAsDataURL(file);

});

}


/* =====================================================
COURSE PANEL OPEN / CLOSE
===================================================== */

function openCoursePanel(){

const panel = document.getElementById("coursePanel");

const sidebar =
document.getElementById("profileSidebar");

if(panel){
panel.classList.add("active");
}

if(sidebar){
sidebar.classList.add("active");
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

const searchInput =
document.getElementById("courseSearch");

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

const container =
document.getElementById("courseResults");

if(!container) return;

container.innerHTML = "";

courses.forEach(course => {

const row = document.createElement("div");

row.className = "course-option";

row.innerHTML = `

<span>${course}</span>

<span
class="add-course-icon"
onclick="addCourse('${course}')"
>
+
</span>

`;

container.appendChild(row);

});

}


/* =====================================================
RENDER USER COURSES
===================================================== */

function renderCourses(){

const list = document.getElementById("courseList");

const emptyMsg =
document.getElementById("emptyMessage");

if(!list || !emptyMsg) return;

list.innerHTML = "";


/* EMPTY STATE */

if(userCourses.length === 0){

emptyMsg.textContent = "No courses selected";

} else {

emptyMsg.textContent = "";

}


/* RENDER COURSES */

userCourses.forEach(course => {

const div = document.createElement("div");

div.className = "course-item";


/* COURSE HTML */

div.innerHTML = `

<span class="course-name">
${course}
</span>

<span
class="remove-course"
onclick="removeCourse(event, '${course}')"
>
−
</span>

`;


/* ENTIRE ROW CLICKABLE */

div.addEventListener("click", function(){

selectCourse(course, div);

});


list.appendChild(div);

});

}


/* =====================================================
ADD COURSE
===================================================== */

function addCourse(course){

if(userCourses.includes(course)) return;

const userEmail =
localStorage.getItem("userEmail");

/* UI UPDATE */

userCourses.push(course);

renderCourses();


/* BACKEND SAVE */

fetch("http://localhost:8080/api/courses/add", {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({

userEmail: userEmail,
courseName: course

})

})

.catch(err => {

console.error("Add failed:", err);

});

}


/* =====================================================
REMOVE COURSE
===================================================== */

function removeCourse(event, course){

event.stopPropagation();

const userEmail =
localStorage.getItem("userEmail");

/* =====================================================
CLEAR SELECTED COURSE IF REMOVED
===================================================== */

const selectedCourse =
localStorage.getItem(
`selectedCourse_${userEmail}`
);

if(selectedCourse === course){

localStorage.removeItem(
`selectedCourse_${userEmail}`
);

clearMentors();

}

/* UI UPDATE */

userCourses =
userCourses.filter(c => c !== course);

renderCourses();


/* BACKEND DELETE */

fetch(
`http://localhost:8080/api/courses/remove?email=${userEmail}&courseName=${course}`,
{
method: "DELETE"
}
)

.catch(err => {

console.error("Delete failed:", err);

});

}


/* =====================================================
CLEAR MENTORS
===================================================== */

function clearMentors(){

const container =
document.getElementById("mentorContainer");

if(!container) return;

container.innerHTML = `

<div class="empty-mentor-state">
Select a course to view mentors
</div>

`;

}

/* =====================================================
SELECT / DESELECT COURSE
===================================================== */

function selectCourse(courseName, element){

const userEmail =
localStorage.getItem("userEmail");

const savedSelectedCourse =
localStorage.getItem(
`selectedCourse_${userEmail}`
);


/* =====================================================
DESELECT IF CLICKING SAME COURSE
===================================================== */

if(savedSelectedCourse === courseName){

localStorage.removeItem(
`selectedCourse_${userEmail}`
);


/* REMOVE ACTIVE CLASS */

document.querySelectorAll(".course-item")
.forEach(item => {
item.classList.remove("active");
});


/* CLEAR MENTORS */

clearMentors();

return;

}


/* =====================================================
REMOVE OLD ACTIVE
===================================================== */

document.querySelectorAll(".course-item")
.forEach(item => {
item.classList.remove("active");
});


/* =====================================================
ADD ACTIVE
===================================================== */

element.classList.add("active");


/* =====================================================
SAVE SELECTED COURSE
===================================================== */

localStorage.setItem(
`selectedCourse_${userEmail}`,
courseName
);


/* =====================================================
LOAD MENTORS
===================================================== */

loadMentors(courseName);

}


/* =====================================================
LOAD MENTORS FROM BACKEND
===================================================== */

function loadMentors(course){

const container =
document.getElementById("mentorContainer");

if(!container) return;

container.innerHTML = `

<div class="empty-mentor-state">
Loading mentors...
</div>

`;


fetch(
`http://localhost:8080/api/mentors/get?course=${course}`
)

.then(response => response.json())

.then(data => {

container.innerHTML = "";


/* EMPTY */

if(data.length === 0){

container.innerHTML = `

<div class="empty-mentor-state">
No mentors found
</div>

`;

return;

}


/* MENTOR CARDS */

data.forEach(mentor => {

const card = document.createElement("div");

card.className = "mentor-card";

card.innerHTML = `

<img
src="${mentor.profileImage}"
class="mentor-image"
alt="mentor"
>

<h2 class="mentor-name">
${mentor.name}
</h2>

<p class="mentor-rating">
⭐ ${mentor.rating}
(${mentor.totalReviews} reviews)
</p>

<p class="mentor-exp">
${mentor.experience} years experience
</p>

<p class="mentor-skills">
${mentor.skills}
</p>

<button class="view-profile-btn">
View Profile
</button>

`;
container.appendChild(card);

});

})

.catch(error => {

console.error(error);

container.innerHTML = `

<div class="empty-mentor-state">
Failed to load mentors
</div>

`;

});

}


/* =====================================================
MENTOR TAB SWITCHING
===================================================== */

function switchMentorTab(tab, element){

/* REMOVE OLD ACTIVE TAB */

document.querySelectorAll(".mentor-tab")

.forEach(tabItem => {

tabItem.classList.remove("active-tab");

});


/* ADD NEW ACTIVE TAB */

element.classList.add("active-tab");


/* WORKSPACE */

const workspace =
document.getElementById("mentorWorkspace");

if(!workspace) return;


/* =====================================================
VIDEOS
===================================================== */

if(tab === "videos"){

workspace.innerHTML = `

<h2>
Video Lessons
</h2>

<p>
Upload and manage your course videos here.
</p>

`;

}


/* =====================================================
MATERIALS
===================================================== */

else if(tab === "materials"){

workspace.innerHTML = `

<h2>
Materials
</h2>

<p>
Upload PDFs, notes, assignments and study resources.
</p>

`;

}


/* =====================================================
DISCUSSIONS
===================================================== */

else if(tab === "discussions"){

workspace.innerHTML = `

<h2>
Discussions
</h2>

<p>
Answer student doubts and manage course discussions.
</p>

`;

}


/* =====================================================
LIVE CLASSES
===================================================== */

else if(tab === "live"){

workspace.innerHTML = `

<h2>
Live Classes
</h2>

<p>
Start and manage live mentoring sessions here.
</p>

`;

}

}

/* =====================================================
AVAILABLE SUBJECTS
===================================================== */

const availableSubjects = [

"Java",
"Python",
"Machine Learning",
"UI/UX",
"Graphic Design",
"Data Science",
"Cyber Security",
"Web Development",
"Cloud Computing",
"Artificial Intelligence",
"Blockchain",
"DevOps"

];


/* =====================================================
OPEN ADD COURSE MODAL
===================================================== */

function openCreateCoursePanel(){

/* CLOSE SIDEBAR */

const sidebar =
document.getElementById("profileSidebar");

if(sidebar){
sidebar.classList.remove("active");
}


/* OPEN MODAL */

const overlay =
document.getElementById("courseModalOverlay");

if(overlay){
overlay.classList.add("active");
}


/* RESET STATE */

backToSubjectSelection();

document.getElementById(
"subjectSearch"
).value = "";


/* RESET FORM */

document.getElementById(
"selectedSubject"
).value = "";

document.getElementById(
"courseTitle"
).value = "";

document.getElementById(
"courseDescription"
).value = "";


/* READONLY RESET */

document.getElementById(
"selectedSubject"
).readOnly = true;


/* RENDER SUBJECTS */

renderSubjectResults(availableSubjects);

}


/* =====================================================
CLOSE ADD COURSE MODAL
===================================================== */

function closeCreateCoursePanel(){

const overlay =
document.getElementById("courseModalOverlay");

if(overlay){
overlay.classList.remove("active");
}


/* RESET TO STEP 1 */

backToSubjectSelection();


/* CLEAR SEARCH */

document.getElementById(
"subjectSearch"
).value = "";


/* CLEAR FORM */

document.getElementById(
"selectedSubject"
).value = "";

document.getElementById(
"courseTitle"
).value = "";

document.getElementById(
"courseDescription"
).value = "";


/* RESET READONLY */

document.getElementById(
"selectedSubject"
).readOnly = true;

}


/* =====================================================
RENDER SUBJECT CHIPS
===================================================== */

function renderSubjectResults(subjects){

const container =
document.getElementById("subjectResults");

if(!container) return;

container.innerHTML = "";


/* LOOP */

subjects.forEach(subject => {

const chip =
document.createElement("div");

chip.className = "subject-chip";

chip.textContent = subject;


/* CLICK */

chip.addEventListener("click", function(){

openCourseForm(subject);

});


container.appendChild(chip);

});

}


/* =====================================================
FILTER SUBJECTS
===================================================== */

function filterSubjects(){

const query =
document.getElementById("subjectSearch")
.value
.toLowerCase();


const filteredSubjects =
availableSubjects.filter(subject =>

subject.toLowerCase().includes(query)

);


/* RENDER FILTERED */

renderSubjectResults(filteredSubjects);

}


/* =====================================================
OPEN COURSE FORM
===================================================== */

function openCourseForm(subject){

/* HIDE STEP 1 */

document.getElementById(
"subjectSelectionStep"
).style.display = "none";


/* SHOW STEP 2 */

document.getElementById(
"courseFormStep"
).style.display = "block";


/* SET SUBJECT */

const subjectInput =
document.getElementById("selectedSubject");

subjectInput.value = subject;


/* LOCK SUBJECT */

subjectInput.readOnly = true;

}


/* =====================================================
BACK TO SUBJECTS
===================================================== */

function backToSubjectSelection(){

/* SHOW SUBJECTS */

document.getElementById(
"subjectSelectionStep"
).style.display = "block";


/* HIDE FORM */

document.getElementById(
"courseFormStep"
).style.display = "none";

}


/* =====================================================
CREATE NEW SUBJECT FLOW
===================================================== */

function openCustomCourseForm(){

/* OPEN FORM */

openCourseForm("");


/* ALLOW SUBJECT EDIT */

const subjectInput =
document.getElementById("selectedSubject");

subjectInput.readOnly = false;

subjectInput.placeholder =
"Enter Subject Name";

}