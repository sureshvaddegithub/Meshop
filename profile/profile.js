// Write your script here


const inputs = document.querySelectorAll(".myprofile input");

const passwordChange = document.querySelectorAll(".editpass input");

const passerror = document.getElementById("pass");

let curr_user = JSON.parse(localStorage.getItem("current_user"));

let curr_index = localStorage.getItem("user_index");
console.log(curr_index);

inputs[0].value = curr_user.firstName;
inputs[1].value = curr_user.lastName;


const saveinfo = document.getElementById("save");





function borderRepresentation(element){
    element.className = "change_border";
    element.addEventListener("keyup",()=>{
        element.classList.add("border");
        error.style.display = "none";
        passerror.style.display = "none";
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




function updateLocalStorge(curr_user,result){
    localStorage.setItem("current_user",JSON.stringify(curr_user));
    let users = JSON.parse(localStorage.getItem("users_list"));
   //  console.log(users[curr_index]);
    users.splice(curr_index,1,curr_user);
    localStorage.setItem("users_list",JSON.stringify(users));
    result.style.display = "block";
    result.innerText = "updated successfully";
    result.style.color ="green";
    setTimeout(()=>{
        result.style.display = "none";
    },1000)
}




saveinfo.addEventListener("click",()=>{
    
    let checkFirstName = checkEmpty(inputs[0]);
    let checkLastName = checkEmpty(inputs[1]);

     if(checkFirstName || checkLastName){
        error.style.display = "block";
        error.innerText = "Fill All Fields"
        return;
     }

     curr_user.firstName = inputs[0].value;
     curr_user.lastName  = inputs[1].value;
     updateLocalStorge(curr_user,error);
    
})




document.getElementById("change_password").addEventListener("click",()=>{
        
    let oldpassword =  checkEmpty(passwordChange[0]);
    let newpassword= checkEmpty(passwordChange[1]);
    let confirmPassword = checkEmpty(passwordChange[2]);
    if(oldpassword || newpassword  || confirmPassword){
      passerror.style.display ="block";
      passerror.innerText ="Fill All fields";
      return;
    }
        
       if(passwordChange[0].value != curr_user.password){
          borderRepresentation(passwordChange[0]);
          passerror.style.display ="block";
          passerror.innerText = "old password didnot match"
          return;
       }

       if(passwordChange[1].value.length<8){
        borderRepresentation(passwordChange[0]);
        passerror.style.display ="block";
        passerror.innerText = "minimum 8 characters required";
        return;
       }

       if(passwordChange[1].value!=passwordChange[2].value){
        borderRepresentation(passwordChange[2]);
        passerror.style.display ="block";
        passerror.innerText = "check confirmPassword";
        return;
       }

       curr_user.password = passwordChange[1].value;
       updateLocalStorge(curr_user,passerror);
})





document.getElementById("logout").addEventListener("click",()=>{
    localStorage.removeItem("current_user");
    localStorage.removeItem("user_index");
    const link = document.createElement("a");
    link.href = "../index.html"
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
})


