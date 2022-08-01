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
      productTotal: 0
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

let showCount = () => {
  try {
    let basket = JSON.parse(localStorage.getItem("basket"));
    getBasketCount.innerText = basket.length;
  } catch (error) {

  }
};
// Set the date we're counting down to


// Update the count down every 1 second

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
// setIsotope();  
window.onscroll = () => {
  if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {   
    document.querySelector(".all-catogories-catalog").style.top="75px";
    document.querySelector("#header-buttom-part").style.position = "fixed";
    document.querySelector("#header-buttom-part").style.width = "100%";
    document.querySelector("#header-buttom-part").style.top = "0";
    document.querySelector("#header-buttom-part").style.zIndex = "111111";
    document.querySelector("#header-buttom-part").style.backgroundColor = "#ffffff";
    document.querySelector("#header-buttom-part").classList.add("active");
    document.querySelector(".home-cataloge-2").style.top = "75px";
    document.querySelector(".home-cataloge-2").style.left = "600px";
    document.querySelector(".categories-catalog-2").style.top = "75px";
    document.querySelector(".categories-catalog-2").style.zIndex = "11111";
    document.querySelector(".categories-catalog-2").style.height = "600px";    
    document.querySelector(".shop-categories-2").style.top = "75px";
    document.querySelector(".pages-categories-2").style.top = "75px";
    document.querySelector(".specila-categories-2").style.top = "75px";
    document.querySelector(".specila-categories-2").style.height = "600px";
    document.querySelector(".store-list-categories-2").style.top = "75px";
    document.querySelector("#go-to-up").style.display="block";

  }
  else {
    document.querySelector("#go-to-up").style.display="none";
    document.querySelector(".all-catogories-catalog").style.top="210px";
    document.querySelector(".store-list-categories-2").style.top = "210px";
    document.querySelector(".specila-categories-2").style.top = "210px";
    document.querySelector(".pages-categories-2").style.top = "210px";
    document.querySelector(".shop-categories-2").style.top = "210px";
    document.querySelector(".categories-catalog-2").style.top = "210px";
    document.querySelector(".home-cataloge-2").style.top = "210px";
    document.querySelector(".home-cataloge-2").style.left = "600px";
    document.querySelector("#header-buttom-part").style.position = "static";
    document.querySelector("#header-buttom-part").style.backgroundColor = "#0465d2";
    document.querySelector("#header-buttom-part").classList.remove("active");
  }
}







