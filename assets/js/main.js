"use strict";
let getMoneystate = document.getElementById("money");
let getSellwithus = document.getElementById("sell-with-us");
let getBtns = document.querySelectorAll(".btn-add-chart");
let getBasketCount = document.getElementById("basket-count");


if (localStorage.getItem("basket") === null) {
  localStorage.setItem("basket", JSON.stringify([]));
}
function addToCart(ev) {
  let a = ev.target.parentElement.parentElement.parentElement;
  let productimgSrc = a.querySelector(".img-products").src;
  let productPrice = a.querySelector("#product-price").innerText;
  let productTitle = a.querySelector("#product-title").innerText;
  let productid = a.querySelector(".span-id").innerText;
  let basket = JSON.parse(localStorage.getItem("basket"));
  let result = basket.find(object => object.productId === productid);
  console.log(basket);
  if (result === undefined) {
    console.log("seymur");
    basket.push({
      productId: productid,
      productT: productTitle,
      productI: productimgSrc,
      productP: productPrice,
      count: 1,
      productTotal:0
    });



  } else {

    result.count++;
  }
  localStorage.setItem("basket", JSON.stringify(basket));
  showCount();




}
getMoneystate.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".sell-with-us").classList.remove("d-block");
  document.querySelector(".money-change").classList.toggle("d-block");
});
getSellwithus.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".money-change").classList.remove("d-block");
  document.querySelector(".sell-with-us").classList.toggle("d-block");
});

$(document).ready(function () {
  $(".button-all-categories").click(function (e) {
    e.preventDefault();
    $(".all-catogories-catalog").slideToggle();
  });

});

let showCount = ()=>{
  let basket = JSON.parse(localStorage.getItem("basket"));
  getBasketCount.innerText=basket.length; 
};
showCount();









