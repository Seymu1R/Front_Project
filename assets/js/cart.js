let basket = JSON.parse(localStorage.getItem("basket"));
let addItem = document.querySelector(".add-item-to-basket");
let getBasketCount1 = document.getElementById("basket-count-1");
let uptadeBtn = document.querySelector("#uptade");

//adding content basket

basket.forEach(item => {
  addItem.innerHTML += `
     <div class=" mid-header row d-flex align-items-center cart-item" data-id="${item.productId}">
                               
       <div class="col-xl-1">
       <span hidden id="product-id-span-hidden" >${item.productId} </span>
       <i id="remove-item" onClick="removeBasketcontent(event)" class="fa-solid fa-trash-can"></i></div>
         <div class="col-xl-1">
          
           <img src="${item.productI}" alt="">
         </div>
              <div class="col-xl-3">
                 <p>${item.productT}</p>
               </div>
              <div class="col-xl-2">
                <p class="product-price">$${item.productP}</p>
                 </div>
                <div class="col-xl-2 position-relative ">
                 <i  onClick="cahangeBasketitemcountminus(event)"  class="position-absolute fa-solid fa-minus"></i>
                <input  value=${item.count} type="number" class="product-quantity">
                 <i onClick="cahangeBasketitemcountplus(event)" class="position-absolute fa-solid fa-plus"></i>
                 </div>
                 <div class="col-xl-2">
                 <p>$<span class="productTotal" id="product-total"   >${item.count*item.productP}</span> </p>
        </div>
    </div>
     
     
     
     
     `
});
//remove basket content

let removeBasketcontent = (e) => {
  let basketarr = JSON.parse(localStorage.getItem("basket"));
  let parent = e.target.parentElement.parentElement;
  let removedElement = +parent.querySelector("#product-id-span-hidden").innerHTML;
  let result = basketarr.find((item) => item.productId == removedElement);

  index = basketarr.indexOf(result);
  if (index > -1) {
    basketarr.splice(index, 1);
  }

  localStorage.setItem("basket", JSON.stringify(basketarr));
  parent.remove();
  emptyBasket();
  showCount();
}
let cahangeBasketitemcountplus = (e) => {
  basketEdit = JSON.parse(localStorage.getItem("basket"));
  e.target.previousElementSibling.value++;
  let inputValue = e.target.previousElementSibling.value;
  productid=e.target.parentElement.parentElement.getAttribute("data-id");
  basketEdit.forEach(item=>{
    if (item.productId==productid) {
      item.count=inputValue;
    }
  })
  localStorage.setItem("basket", JSON.stringify(basketEdit));

  
  uptadeBtn.style.opacity = "1";  
}

let cahangeBasketitemcountminus = (e) => {
  basketEdit = JSON.parse(localStorage.getItem("basket"));
  productid=e.target.parentElement.parentElement.getAttribute("data-id");
  e.target.nextElementSibling.value--;
  let inputValue = e.target.nextElementSibling.value;
  console.log(inputValue);
  if (inputValue<=0) {
    e.target.parentElement.parentElement.remove(); 
    let result = basketEdit.find((item) => item.productId == productid);
  console.log(result);
  index = basketEdit.indexOf(result);
  if (index > -1) {
    basketEdit.splice(index, 1);
  }    
  }
  basketEdit.forEach(item=>{
    if (item.productId==productid) {
      item.count=inputValue;
    }
  })
  
  uptadeBtn.style.opacity = "1";
  localStorage.setItem("basket", JSON.stringify(basketEdit))
}

let editSubtotal = (e) => {
  let cartItems = document.querySelectorAll(".cart-item");
  basketEdit = JSON.parse(localStorage.getItem("basket"));
  let a = 0;
  cartItems.forEach(cartItem => {
    let productId = cartItem.getAttribute("data-id");
    let productPrice = +cartItem.querySelector(".product-price").innerText.replace("$", "")
    let productQauntity = cartItem.querySelector(".product-quantity").value;
    let productTotal = cartItem.querySelector(".productTotal");

    let basketItem = basketEdit.find(basket => basket.productId == productId);

    basketItem.count = productQauntity;
    basketItem.productTotal = basketItem.productP * basketItem.count;

    productTotal.innerText = basketItem.productTotal;
    a+=basketItem.productTotal
    totalValues(a);

    localStorage.setItem("basket", JSON.stringify(basketEdit))

  })

 

}
let totalValues=(value)=>{
  let generals=document.querySelectorAll(".totals-values-general");
  for (const iterator of  generals) {
    iterator.innerHTML=value;    
  }
}
let showCount1 = () => {
  let basket = JSON.parse(localStorage.getItem("basket"));
  getBasketCount1.innerText = basket.length;
};
let emptyBasket=()=>{
  let basket = JSON.parse(localStorage.getItem("basket"));
  if (basket.length==0) {
    document.querySelector(".basket-items").style.display="none";    
  }
}
emptyBasket();
showCount1();



