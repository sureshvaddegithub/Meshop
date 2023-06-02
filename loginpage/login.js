

const email = document.getElementById("email");
const password = document.getElementById("password");
const error = document.getElementById("error");
const login = document.getElementById("login");

const users = JSON.parse(localStorage.getItem("users_list"));

function borderRepresentation(element){
    element.className = "change_border";
    element.addEventListener("keyup",()=>{
        element.classList.add("border");
        error.style.display = "none";
      
    })
}

function checkEmpty(element){
    let isEmpty = false; 
     if(!element.value){
            isEmpty = true;
           borderRepresentation(element); 
        }
    return isEmpty;
}

let user_index =-1;

function checkEmailExists(mail){
    let current_user = null;
    if(users.length!=0){
        users.forEach((element,index) => {
            if(element.Email === mail)
             {
                current_user = element;
                 user_index=index;
                return;
             }
        });
    }
    return current_user;
}


login.addEventListener("click",()=>{
     
    let checkEmail =  checkEmpty(email);
    let checkPassword = checkEmpty(password);
    if(checkEmail && checkPassword){
      error.style.display ="block";
      error.innerText ="Enter Both email and password";
    }
    else if(checkEmail){
        error.style.display ="block";
      error.innerText ="Enter  email"; 
    }
    else if(checkPassword){
        error.style.display ="block";
      error.innerText ="Enter password"; 
    }
    

    if(!email.value.includes("@gmail.com")){
        borderRepresentation(email);
        error.style.display = "block";
        error.innerText = "Enter correct email";
        return
      }


    let current_user = checkEmailExists(email.value);
    
    if(current_user == null){
        error.style.display ="block";
        error.innerText ="Email is not register"; 
    }
    else{
        if(current_user.password !== password.value){
            error.style.display ="block";
            error.innerText ="incorrect Email and Password"; 
        }
        else{
            localStorage.setItem("current_user",JSON.stringify(current_user));
            localStorage.setItem("user_index",user_index);
            email.value ="";
            password.value = "";
            const link = document.createElement("a");
            link.href = "../shop/shop.html";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            
        }
    }
})


let curruser = localStorage.getItem("current_user");

let mycart = document.getElementById("mycart");
console.log(curruser);
mycart.addEventListener("click",()=>{
    if(curruser!=null){
        const link = document.createElement("a");
        link.href = "../cart/cart.html";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
})
