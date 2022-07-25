"use strict";
let getMoneystate = document.getElementById("money");
let getSellwithus = document.getElementById("sell-with-us");
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

$(document).ready(function(){
    $(".button-all-categories").click(function(){
        
        $(".all-catogories-catalog").slideToggle();
      });  

});
