// myProducts.filter((item)=>item.title.includes(search.value))

// myCartProductArray = myProducts.filter((item)=> myCartIDs.includes(item.id))


const login = document.getElementById("login");

const signup = document.getElementById('signup');


login.addEventListener('click',()=>{

    const link = document.createElement("a");
    link.href = "./loginpage/login.html"
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
})

signup.addEventListener('click',()=>{

    const link = document.createElement("a");
    link.href = "./singup/signup.html"
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
})


let curruser = localStorage.getItem("current_user");

let profile = document.getElementById("myprofile");

let mycart = document.getElementById("mycart");
console.log(curruser);
mycart.addEventListener("click",()=>{
    if(curruser!=null){
        const link = document.createElement("a");
        link.href = "./cart/cart.html";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    else{
        const link = document.createElement("a");
        link.href = "./loginpage/login.html";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
})

myprofile.addEventListener("click",()=>{
    if(curruser!=null){
        const link = document.createElement("a");
        link.href = "./profile/profile.html";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    else{
        const link = document.createElement("a");
        link.href = "./loginpage/login.html";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
})



let meshop = document.getElementById("meshop");

meshop.addEventListener("click",()=>{
    if(curruser!=null){
        const link = document.createElement("a");
        link.href = "./shop/shop.html";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    else{
        const link = document.createElement("a");
        link.href = "./loginpage/login.html";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
})