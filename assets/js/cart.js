let basket = JSON.parse(localStorage.getItem("basket"));
let addItem = document.querySelector(".add-item-to-basket");
let getBasketCount = document.getElementById("basket-count");
let uptadeBtn=document.querySelector("#uptade");

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
                 <p id="product-total" >$${item.productTotal}</p>
        </div>
    </div>
     
     
     
     
     `
});
//remove basket content

let removeBasketcontent = (e) => {
    let basketarr = JSON.parse(localStorage.getItem("basket"));
    let parent= e.target.parentElement.parentElement;
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
let cahangeBasketitemcountplus=(e)=>{
    basketEdit=JSON.parse(localStorage.getItem("basket"));
    uptadeBtn.style.opacity="1";
    let parent=e.target.parentElement.parentElement;
    e.target.previousElementSibling.value++;
    let input = e.target.previousElementSibling.value;
     let inputIncrease= input++;
     basketEdit.forEach(item => {
        let id =+parent.querySelector("#product-id-span-hidden").innerHTML;
        if (item.productId == id) {            
            item.count=inputIncrease;
            localStorage.setItem("basket",JSON.stringify(basketEdit))
        }
        
    });
    
}
let cahangeBasketitemcountminus=(e)=>{
    basketEdit=JSON.parse(localStorage.getItem("basket"));
    uptadeBtn.style.opacity="1";    
    let parent=e.target.parentElement.parentElement;
    e.target.nextElementSibling.value--;
    let input = e.target.nextElementSibling.value;
     let inputdecrease= input--;
     if (inputdecrease==-1) {
        e.target.nextElementSibling.value=0;        
     }
    
    basketEdit.forEach(item => {
        let id =+parent.querySelector("#product-id-span-hidden").innerHTML;
        if (item.productId == id) {            
            item.count=inputdecrease;
            localStorage.setItem("basket",JSON.stringify(basketEdit))
        }
        
    });
  
    
}

let editSubtotal = (e)=>{
    basketSubtotal=JSON.parse(localStorage.getItem("basket"));
    basketSubtotal.forEach(item=>{
        item.productTotal=item.productP*item.count;          
        localStorage.setItem("basket",JSON.stringify(basketSubtotal));
    })
    
}
let editItem = (e, id) => {
    let basketedit = JSON.parse(localStorage.getItem("basket"));
    let inputEdit = e.target.parentElement.parentElement.querySelector("#input-count");   
  
    if (inputEdit.value < 0) {
      inputEdit.value = 1;
      if ((inputEdit.value = 1)) {
        for (let item of basketedit) {
          if (item.productId == id) {
            item.count = inputEdit.value;
  
            localStorage.setItem("basket", JSON.stringify(basketedit));
            let totalNum =
              e.target.parentElement.parentElement.parentElement.querySelector(
                "#total-num"
              );
            totalNum.innerText = item.count * item.productP;
          }
        }
      }
    } else {
      for (let item of basketedit) {
        if (item.productId == id) {
          item.count = inputEdit.value;
  
          localStorage.setItem("basket", JSON.stringify(basketedit));
          let totalNum =
            e.target.parentElement.parentElement.parentElement.querySelector(
              "#total-num"
            );
          totalNum.innerText = item.count * item.productP;
        }
      }
    }
  };
let showCount = ()=>{
    let basket = JSON.parse(localStorage.getItem("basket"));
    getBasketCount.innerText=basket.length; 
};

showCount();

