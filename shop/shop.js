// const produtc = {
//   id: 1,
//   title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//   price: 109.95,
//   description:
//     "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//   category: "men's clothing",
//   image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//   rating: { rate: 3.9, count: 120 },
// };

async function fetchproducts(){
  const url = "https://fakestoreapi.com/products";
  
  const response = await fetch(url);
   
  const data = await response.json();

  if(localStorage.getItem("productsList") == null){
      localStorage.setItem("productsList",JSON.stringify(data));
  }
 
}

fetchproducts();



const category_container = document.getElementById("filters");

const items = document.getElementById("items");

const search = document.getElementById("search");


const title = document.getElementById("title");

let data = JSON.parse(localStorage.getItem("productsList"));
const colorArray =["red",'black','blue','green','pink','lightblue','orange'];
renderProductItems(data);

let curruser = JSON.parse(localStorage.getItem("current_user"));
console.log(curruser.tokenId);
if(localStorage.getItem(curruser.tokenId) == null){
  localStorage.setItem(curruser.tokenId,JSON.stringify([]));
}

let myCart = JSON.parse(localStorage.getItem(curruser.tokenId));
async function fetchProductCategories(data){

 let categories = [];
 for(let i = 0;i<data.length;i++){
     if(!categories.includes(data[i].category))
     categories.push(data[i].category);
     
 }


  rendercategories(categories);

}

fetchProductCategories(data);



function rendercategories(categoryList){

  let category_items = categoryList.map(element => {
      const div = document.createElement("div");
      div.className = "filter";
      div.innerText = element;
      category_container.appendChild(div);
      return div;
  });

 
  let cate_list =[category_container.children[0],...category_items];
   cate_list.forEach((div,index)=>{
      div.addEventListener("click",()=>{
           changeBg(cate_list,div);
          // console.log(div.innerText);
      })
   })

}



async function changeBg(cate_list,element){
  cate_list.forEach((ele)=>{
      ele.classList.remove("active")
  })

  element.classList.add("active");
   title.innerText = element.innerText;
  if(element.innerText == "All"){
      renderProductItems(data);
  }  
  else{
    renderBasedOnCategoryList(element);
 }
}

function renderBasedOnCategoryList(element){
  let itemslist =[];
  for(let i = 0;i<data.length;i++){
      if(data[i].category === element.innerText)
      itemslist.push(data[i]);
  }
  renderProductItems(itemslist);
}


function renderProductItems(data){
  items.innerHTML ="";

  data.map(element =>{
    let randomcolors = generateRandomColors();
     items.innerHTML +=
     `<div class="item" id= "item">
     <img src=${element.image} alt="Item" />
     <div class="info">
       <div class="row">
         <div class="price">$${element.price}</div>
         <div class="sized">S,M,L</div>
       </div>
       <div class="colors">
         Colors:
         <div class="row">
           <div class="circle" style="background-color: ${randomcolors[0]}"></div>
           <div class="circle" style="background-color: ${randomcolors[1]}"></div>
           <div class="circle" style="background-color: ${randomcolors[2]}"></div>
         </div>
       </div>
       <div class="row">Rating:${element.rating.rate}</div>
     </div>
     <div id="added" style = "display:none;"></div>
     <button id="addBtn">Add to Cart</button>
   </div>`
  })

  const item = document.querySelectorAll(" .items .item");
  item.forEach((item)=>{
      item.addEventListener("click",(e)=>{
          if(e.target.id == "addBtn"){
          const img = item.querySelector(".item img");
          const price = item.querySelector(".item .price");
          let obj ={
              src :img.src,
              price: price.innerText.slice(1)
          }
          myCart.push(obj);

          localStorage.setItem(curruser.tokenId,JSON.stringify(myCart));
          const added = item.querySelector("#added");
          added.style.display = "flex";
          added.innerText = "item added to card successfully";
          setTimeout(()=>{
                added.style.display = "none";
          },500);
          // console.log(JSON.parse(localStorage.getItem(curruser.tokenId)));
          }
      })
  })
  
}



function generateRandomColors(){
  let colors =[];
  for(let i = 0;i<3;i++){
    colors.push(colorArray[parseInt(Math.random()*7)]);
  }
 return colors;
}

function findBySearch(value){
  let items = [];
  data.forEach((element)=>{
    if(element.title.includes(value)){
      items.push( element);
    }
  })
  if(items.length == 0){
    title.innerText = "Couldnot find anything relavent to you";
  }else{
    title.innerText="";
  }
  renderProductItems(items);
}

function debounce(callback,delay){
      let timer;
      return function(...args){
          clearTimeout(timer);
        timer =  setTimeout(()=>{
              callback(...args)
          },delay);
      }
  }

let invokeDebounce = debounce(findBySearch,500);  

search.addEventListener("keyup",()=>{
  invokeDebounce(search.value);
})


const checkboxes = document.querySelectorAll("aside section:nth-child(4) input");


const filter = document.getElementById("filterBtn");

filter.addEventListener("click",()=>{
  const checkedboxes = Array.from(checkboxes).filter((check)=>{
        return check.checked;
  })
  let productItems =[];
  checkedboxes.map(element=>{
    let arr = element.id.split("-");
    if(arr.length == 2){
      let low = parseInt(arr[0]);
      let high = parseInt(arr[1]);
      data.forEach((element)=>{
       let p = element.price;
       if(p>=low && p<=high){
        productItems.push(element);
       }
      })
    }
    else{
      let min = parseInt(arr[0].slice(0,3));
      data.forEach((element)=>{
        let p = element.price;
        if(p>=min ){
         productItems.push(element);
        }
       })
    }
  })

  renderProductItems(productItems);
})




