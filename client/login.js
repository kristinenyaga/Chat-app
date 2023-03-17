var control_elements = document.querySelectorAll(".control");
const sign_in = document.getElementById("sign-in");
const sign_up = document.getElementById("sign-up");
// const forgot_pass_id = document.getElementsById("forgot-pass-id");
for (
  let i = 0;
  i < control_elements.length && control_elements[i] != "password";
  i++
) {
  control_elements[i].addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  });
}
document.getElementById("sign-up").addEventListener("click", open_signup);
function open_signup() {
  document.getElementById("sign-in-els").style.display = "none";
  document.getElementById("sign-up-els").style.display = "block";
  sign_in.style.fontWeight = "normal";
  sign_up.style.fontWeight = "bold";
}
document.getElementById("sign-in").addEventListener("click", open_signin);
function open_signin() {
  sign_in.style.fontWeight = "bold";
  sign_up.style.fontWeight = "normal";
  document.getElementById("sign-in-els").style.display = "block";
  document.getElementById("sign-up-els").style.display = "none";
}
document
  .getElementById("forgot-pass-id")
  .addEventListener("click", open_forgot_pass);
function open_forgot_pass() {
  document.getElementById("head-section").style.display = "none";
  document.getElementById("forgot-pass-div").style.display = "block";
  document.getElementById("sign-in-els").style.display = "none";
  document.getElementById("sign-up-els").style.display = "none";
  // document.getElementsById('forgot-pass-dddk').style.display = "block";
  // document.getElementsByClassName('head-section').style.display = "none";
  // alert("hey");
}
document.getElementById("forget-btn-id").addEventListener("click", (e) => {
  document.getElementById("sign-in-els").style.display = "block";
  alert("Check your email.");
});

// const signUpForm = document.getElementById("myForm");
// signUpForm.addEventListener("submit", () => {
//   const password = document.getElementById("sign-up-password").value;
//   const username = document.getElementById("sign-up-username").value;
//   const email = document.getElementById("sign-up-email").value;
//   console.log(email);
// });
const password = document.getElementById("sign-up-password").value;
const username = document.getElementById("sign-up-username").value;
const email = document.getElementById("sign-up-email").value;
const data = { password, username, email };

document.getElementById("signupButton").addEventListener("click", async () => {
  const res = await fetch("/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
    
      window.location.href = "#sign-in-els";
    });
});

const loginEmail=document.getElementById("loginEmail").value
const loginPassword=document.getElementById("loginPassword").value

// document.getElementById("loginButton").addEventListener("click",(e)=>{
//   e.preventDefault()
// console.log(loginEmail.value)

    // const res = await fetch("/auth/login",{
    //     method:'POST',
    //     body:JSON.stringify({
    //         email:loginEmail,
    //         password:loginPassword
    //     }),
    //     headers: {
    //         "Content-type": "application/json",
    //       }
    // })
    // .then((res) => res.json())
    // .then((data) => {
    //   console.log(data)
    //   window.location.href = "#index.html";
    // });
// })

document.getElementById('signInForm').addEventListener("submit",async (e)=>{
  e.preventDefault()
  var email=document.getElementById("loginEmail").value
 var password=document.getElementById("loginPassword").value

 console.log(email,password)
 const res = await fetch("/auth/login",{
        method:'POST',
        body:JSON.stringify({
            email,
            password
        }),
        headers: {
            "Content-type": "application/json",
          }
    })
    .then((res) => res.json())
    .then((data) => {
  
const{username}=data
      window.location.href = `index.html?user=${username}`;
    });
})