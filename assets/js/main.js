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
// Set the date we're counting down to
var countDownDate = new Date("Sep 5, 2022 15:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("day").innerHTML = days ;
  document.getElementById("hour").innerHTML=hours;
  document.getElementById("min").innerHTML=minutes;
  document.getElementById("sec").innerHTML=seconds;

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);
showCount();


function setIsotope() {
  // init Isotope
  var $grid = $('.items-details-isotope').isotope({
    // options
  });
  // filter items on button click
  $('.filter-button-group').on('click', 'button', function () {
    var filterValue = $(this).attr('data-filter');
    $grid.isotope({ filter: filterValue });
  });
}







