const toggleTheme = document.getElementById("toggle-theme");
toggleTheme.addEventListener("click", (e) => {
  document.body.classList.toggle("dark");
});
const fileInput = document.getElementById("fileInput");
const profilePhoto = document.getElementById("profilePhoto");
console.log(fileInput);
fileInput?.addEventListener("change", (e) => {
  console.log("Files", fileInput.files);
  if (fileInput.files.length) {
    profilePhoto.src = URL.createObjectURL(fileInput.files[0]);
  } else {
    profilePhoto.src = "./images/profile.png";
  }
});
