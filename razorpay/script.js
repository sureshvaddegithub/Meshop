// Link for the documentation:
// https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration

// Add button code documentation:
// https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration#code-to-add-pay-button

let keyid = localStorage.getItem("rzp_checkout_anon_id");
// let  rate = document.querySelector(".total #price");
// console.log(price);
let rate =  parseFloat(localStorage.getItem("price"));
let pricevalue = (rate*82.40).toFixed(2);
document.getElementById("rzp-button1").onclick = function (e) {
  var options = {
    key: "rzp_test_PV1oQ0oMtgXOsq", // Enter the Key ID generated from the Dashboard
    amount:pricevalue* 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "MyShop Checkout",
    description: "This is your order id" + keyid, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    theme: {
      color: "#000",
    },
    image:
      "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
  };

  var rzpy1 = new Razorpay(options);
  rzpy1.open();
  // clear mycart - localStorage
  setTimeout(()=>{
    alert("your items is purchased");
    localStorage.setItem(curruser.tokenId,JSON.stringify([]));
    emptyCard();
    
  },100)

  e.preventDefault();
  localStorage.removeItem("price")
};
