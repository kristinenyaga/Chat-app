// Get the query string from the URL
//window.addEventListener('load',()=>{
 // if (!globalState.accessToken) {
   // window.location.href = "login.html";
  //}
//})
const username = localStorage.getItem('username');
const token = localStorage.getItem('accessToken');

if(!token){
    window.location.href='login.html'
}

document.getElementById('user-name').textContent=username
// Log the value of the "user" parameter to the console
console.log(username);

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
window.onload = (event) => {
  console.log("page is fully loaded");const likePost = document.getElementById("like-post");
const likes = document.getElementById("likes");

console.log("Main.js");
likePost.addEventListener("click", (e) => {
  console.log("Like clicked");
  likePost.classList.toggle("active");
  if (likePost.classList.contains("active")) {
    likes.innerHTML = parseInt(likes.innerHTML) + 1;
  } else {
    likes.innerHTML = parseInt(likes.innerHTML) - 1;
  }
});
if(!token){


  setTimeout(function () {
    console.log("hey");
    alert("you are being redirected to login page")
    window.location.href = "login.html";
  }, 3000);
};
}
const text=document.getElementById('post-comment').value
document.getElementById('send-comment').addEventListener("click",async(e)=>{
e.preventDefault()
const post= await fetch("/posts/id/comments",
{
  method:'POST',
  body:JSON.stringify({
   text
  }),
  headers: {
      "Content-type": "application/json",
    }
}
)
alert(`posted succesfully`)

})