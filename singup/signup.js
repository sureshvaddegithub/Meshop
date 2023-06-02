
const error = document.getElementById("error");
const singup = document.getElementById("signup");

const inputs = document.querySelectorAll(".login-details input");
//localStorage.removeItem("users_list")

 if(localStorage.getItem("users_list")==null){
    localStorage.setItem("users_list",JSON.stringify([]));
 }

// console.log(localStorage.getItem("users_list"));


function borderRepresentation(element){
    element.className = "change_border";
    element.addEventListener("keyup",()=>{
        element.classList.add("border");
        error.style.display = "none";
      
    })
}

function checkEmpty(inputs){
    let isEmpty = false; 
    inputs.forEach((element)=>{
        if(!element.value){
            isEmpty = true;
           borderRepresentation(element); 
        }
    })
    return isEmpty;
}


function checkEmailExists(users){
    var emailpresent = false;
    if(users.length!=0){
       users.forEach((element)=>{
          if(inputs[2].value===element.Email){
              emailpresent = true;
              borderRepresentation(inputs[2]);
              return;
          }
       })
    }
    return emailpresent; 
}


function generateRandomToken(){

    let token ="";
    let alphanumaric = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    for(let i = 0;i<16;i++){
        token+=alphanumaric.charAt(Math.floor(Math.random()*63));
    }
    return token;
}


singup.addEventListener("click",(event)=>{

    event.preventDefault();

    //if any field is empty
   
    document.getElementById("success").style.display = "none";


    if(checkEmpty(inputs)){
        error.style.display = "flex";
        error.innerText = "Fill All The Manditory Feilds";
        return;
    }


    let users=JSON.parse(localStorage.getItem("users_list"));
   
      if(checkEmailExists(users)){
        error.style.display = "block";
        error.innerText = "email is already exists";
        return;
      }
      
      if(password.value.length<8){
        error.style.display ="block";
        error.innerText = "minimum 8 characters required";
        borderRepresentation(inputs[3]);
        return
      }

      
     if(password.value != confirmPassword.value){
        checkpassword = true;
        error.style.display = "block";
        error.innerText = "check confirm passward";
        borderRepresentation(inputs[4]);
        return;
     }
      if(!inputs[2].value.includes("@gmail.com")){
        borderRepresentation(inputs[2]);
        error.style.display = "block";
        error.innerText = "Enter correct email";
        return
      }




      let obj ={
        firstName : inputs[0].value,
        lastName : inputs[1].value,
        Email : inputs[2].value,
        password : inputs[3].value,
        tokenId : generateRandomToken(),
      }



     users.push(obj);
     localStorage.setItem('users_list',JSON.stringify(users));
     document.getElementById("success").style.display = "block";
     console.log(localStorage.getItem("users_list"));


     inputs.forEach(element=>{
        element.value ="";
     })





     setTimeout(()=>{
        const link = document.createElement("a");
        link.href = "../loginpage/login.html";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
     },2000);
     
})