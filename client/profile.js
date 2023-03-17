const username = localStorage.getItem('username');
const token = localStorage.getItem('accessToken');

if(!token){
    window.location.href='login.html'
}