
let curruser =JSON.parse(localStorage.getItem("current_user"));
let mycart = JSON.parse(localStorage.getItem(curruser.tokenId));

console.log(mycart);

const itemsList = document.getElementById("itemsList");
const  main = document.getElementsByTagName("main")
const purchaseitems = document.getElementById("purchaseitems");
const price = document.getElementById("price");



function emptyCard(){
  main[0].style.display = "none";
  const empty = document.getElementById("empty");
  empty.style.display = "block";
  empty.innerText = "Your Card Is Empty";
}


if(mycart.length==0){
  emptyCard();
}
else{
   renderCardItems();
}

function renderCardItems(){
 
  itemsList.innerHTML ="";

  mycart.forEach(element => {
    itemsList.innerHTML+=
    `<div class="itemcontainer" id="item">
    <img src=${element.src} alt="">
    <div class="info">
        <p>Title : shirt</p>
        <p id="price">price : $${element.price}</p>
    </div>
    
    <button id= "remove">Remove from cart</button>
</div>`
   addChildFromPurchaseItems(element);
   addtotal(element);
  });

  let cardItems = document.querySelectorAll("#item");
  addEventsToCardItems(cardItems);


}



function addEventsToCardItems(cardItems){

  cardItems.forEach((item)=>{
    item.addEventListener("click",(e)=>{
      if(e.target.id == "remove"){
      removeItem(item);
      }
    })
  })
}



function removeItem(item){
  const img = item.getElementsByTagName("img")[0];
  const price = item.querySelector("#price");
  console.log(img.src);
  console.log(price.innerText.slice(9));
  itemsList.removeChild(item);
  let removeItem = [];

  for(let i = mycart.length-1;i>=0;i--){
    reductPrice(mycart[i]);
    removeLastChildFromPurchaseItems();
    if(mycart[i].src==img.src && mycart[i].price == price.innerText.slice(9)){
    mycart.pop();
    console.log("if",mycart);
   
    
    break;
    }
      
       removeItem.push(mycart.pop());
      
       
  } 

  for(let i = removeItem.length-1;i>=0;i--){
    mycart.push(removeItem[i]);
    addChildFromPurchaseItems(removeItem[i]);
    addtotal(removeItem[i]);
  } 
  localStorage.setItem(curruser.tokenId,JSON.stringify(mycart));
  if(mycart.length==0){
    emptyCard();
  }
}




function removeLastChildFromPurchaseItems(){
  const child = purchaseitems.lastChild;
  purchaseitems.removeChild(child);
}



function addChildFromPurchaseItems(element){
  purchaseitems.innerHTML+=
  `<div>
  <span>Title</span>
   <span>$${element.price}</span>
</div>`
}



function  addtotal(element){
  let num = parseFloat(price.innerText.slice(1));
  price.innerText =`$${(num+parseFloat(element.price)).toFixed(2)}`;
}

function reductPrice(element){
  let num = parseFloat(price.innerText.slice(1));
  price.innerText =`$${(num-parseFloat(element.price)).toFixed(2)}`;
}



let checkout = document.getElementById("checkOut");

checkout.addEventListener("click",()=>{
  checkout.style.display="none";
  alert("your items is purchased");
  localStorage.setItem(curruser.tokenId,JSON.stringify([]));
  emptyCard();
})