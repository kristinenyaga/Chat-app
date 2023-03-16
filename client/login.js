var control_elements = document.querySelectorAll(".control");
    const sign_in = document.getElementById("sign-in");
    const sign_up = document.getElementById("sign-up");
    // const forgot_pass_id = document.getElementsById("forgot-pass-id");
    for(let i =0;i<control_elements.length && control_elements[i] != "password";i++){
        control_elements[i].addEventListener("keydown" , (e)=>{
        if(e.key==='Enter'){
            e.preventDefault()
        }

        });

    }
    document.getElementById("sign-up").addEventListener("click",open_signup);
    function open_signup(){
        document.getElementById("sign-in-els").style.display='none';
        document.getElementById("sign-up-els").style.display='block';
        sign_in.style.fontWeight="normal";
        sign_up.style.fontWeight="bold";

    }
    document.getElementById("sign-in").addEventListener("click",open_signin);
    function open_signin(){
        sign_in.style.fontWeight="bold";
        sign_up.style.fontWeight="normal";
        document.getElementById("sign-in-els").style.display='block';
        document.getElementById("sign-up-els").style.display='none';
    }
    document.getElementById('forgot-pass-id').addEventListener('click',open_forgot_pass );
    function open_forgot_pass(){
        document.getElementById("head-section").style.display='none';
        document.getElementById("forgot-pass-div").style.display='block';
        document.getElementById("sign-in-els").style.display='none';
        document.getElementById("sign-up-els").style.display='none';
        // document.getElementsById('forgot-pass-dddk').style.display = "block";
        // document.getElementsByClassName('head-section').style.display = "none";
        // alert("hey");
    };
    document.getElementById("forget-btn-id").addEventListener("click",(e)=>{
        document.getElementById("sign-in-els").style.display='block';
        alert("Check your email.");
      

    });
    
