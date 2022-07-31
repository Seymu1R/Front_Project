let basket = JSON.parse(localStorage.getItem("basket"));
let addItem = document.querySelector(".add-item-to-basket");
let getBasketCount = document.getElementById("basket-count");
let uptadeBtn = document.querySelector("#uptade");

//adding content basket

basket.forEach(item => {
  addItem.innerHTML += `
     <div class=" mid-header row d-flex align-items-center ">
                               
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
                <p>$${item.productP}</p>
                 </div>
                <div class="col-xl-2 position-relative ">
                 <i  onClick="cahangeBasketitemcountminus(event)"  class="position-absolute fa-solid fa-minus"></i>
                <input  value=${item.count} type="number">
                 <i onClick="cahangeBasketitemcountplus(event)" class="position-absolute fa-solid fa-plus"></i>
                 </div>
                 <div class="col-xl-2">
                 <p>$<span id="product-total"   >${item.count*item.productP}</span> </p>
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
  showCount();
}
let cahangeBasketitemcountplus = (e) => {
  basketEdit = JSON.parse(localStorage.getItem("basket"));
  uptadeBtn.style.opacity = "1";
  let parent = e.target.parentElement.parentElement;
  e.target.previousElementSibling.value++;
  let input = e.target.previousElementSibling.value;
  let inputIncrease = input++;
  basketEdit.forEach(item => {
    let id = +parent.querySelector("#product-id-span-hidden").innerHTML;
    let a = e.target.parentElement.nextElementSibling.querySelector("#product-total");
    if (item.productId == id) {
      item.count = inputIncrease;
      item.productTotal = item.productP * item.count;
      a.innerText = item.productTotal;
      localStorage.setItem("basket", JSON.stringify(basketEdit))
    }

  });

}
let cahangeBasketitemcountminus = (e) => {
  basketEdit = JSON.parse(localStorage.getItem("basket"));
  uptadeBtn.style.opacity = "1";
  let parent = e.target.parentElement.parentElement;
  e.target.nextElementSibling.value--;
  let input = e.target.nextElementSibling.value;
  let inputdecrease = input--;
  if (inputdecrease <= 0) {
    let parent = e.target.parentElement.parentElement;
    let basketarr = JSON.parse(localStorage.getItem("basket"));
    e.target.nextElementSibling.value = 0;    
    let removedElement = +parent.querySelector("#product-id-span-hidden").innerHTML;
    let result = basketarr.find((item) => item.productId == removedElement);
    index = basketarr.indexOf(result);
    if (index > -1) {
      basketarr.splice(index, 1);
    }
    localStorage.setItem("basket", JSON.stringify(basketarr));
    parent.remove();
    showCount();
  }
  else{
    basketEdit.forEach(item => {
      let id = +parent.querySelector("#product-id-span-hidden").innerHTML;
      let a = e.target.parentElement.nextElementSibling.querySelector("#product-total");
      if (item.productId == id) {
        item.count = inputdecrease;
        item.productTotal = item.productP * item.count;
        a.innerText = item.productTotal;
        if (item.productTotal < 0) {
          item.productTotal = 0;
        }
        localStorage.setItem("basket", JSON.stringify(basketEdit))
      }
  
    });
  }


  



  



}

let editSubtotal = (e) => {
  basketSubtotal = JSON.parse(localStorage.getItem("basket"));
  basketSubtotal.forEach(item => {
    item.productTotal = item.productP * item.count;
    localStorage.setItem("basket", JSON.stringify(basketSubtotal));
  })

}
let showCount = () => {
  let basket = JSON.parse(localStorage.getItem("basket"));
  getBasketCount.innerText = basket.length;
};

showCount();

