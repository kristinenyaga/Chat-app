const toggleTheme = document.getElementById("toggle-theme");
toggleTheme.addEventListener("click", (e) => {
  document.body.classList.toggle("dark");
});
const fileInput = document.getElementById("fileInput");
const profilePhoto = document.getElementById("profilePhoto");
fileInput?.addEventListener("change", (e) => {
  console.log("Files", fileInput.files);
  if (fileInput.files.length) {
    profilePhoto.src = URL.createObjectURL(fileInput.files[0]);
  } else {
    profilePhoto.src = "./images/profile.png";
  }
});

// const myForm=document.getElementById('myForm')
// myForm.addEventListener("submit",(e)=>{
//   e.preventDefault()
//   console.log("submitted")
// })

function submitForm(event) {
  event.preventDefault();
  const titleInput = event.target.elements.input_title.value;
  const description = document.querySelector("#description_input");

  console.log(description.value.trim());
}
const postButton = document.getElementById("post_btn");
postButton.addEventListener("click", () => {
  const togglePostBtn = document.getElementById("post-btn-background");
  togglePostBtn.style.display = "block";
  setTimeout(() => {
    togglePostBtn.style.display = "none";
  }, 2000);
  // const togglePostBtn=document.getElementById("post-btn-background")
  // if(togglePostBtn.style.display === "none"){
  //   togglePostBtn.style.display = "block";
  // }
  // else{
  //   togglePostBtn.style.display = "none";

  // }
});


setTimeout(function() {
  console.log("hey")
  window.location.href = "login.html";
}, 1000);
