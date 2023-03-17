
const token = localStorage.getItem('accessToken');
const id = localStorage.getItem('id');

if(!token){
    window.location.href='login.html'
}
const name=document.getElementById('name').value
const email=document.getElementById('email').value
const password=document.getElementById('password').value
const update= document.getElementById('update-profile')
update.addEventListener('click',async(e)=>{
    e.preventDefault()
const data= await fetch(`/users/${id}`,
{
    method:'POST',
    body:JSON.stringify({
        username:name,
        email,
        password
    }),
    headers: {
        "Content-type": "application/json",
        "authorization":token
      }
}
)

localStorage.setItem('username', name);
})