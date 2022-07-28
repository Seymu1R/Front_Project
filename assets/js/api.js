function getProducts() {
    fetch('product.json')
    .then(response=>response.json())
    .then(data=>{
        let x = '';     
        
        data.forEach(item=>{         
        
        x+=`
        <div class="col-xl-2-5 product-items">
        <img  src="${item.image}" alt="">
        <a href="">${item.title}</a>
        <p>US $${item.price} <span>|</span><span>{ 4% off }</span></p>
        <div class="hover-detail">
          <div class="top"><svg class="svgEye" height="20" width="20" viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="m29.91 15.59c-.17-.39-4.37-9.59-13.91-9.59s-13.74 9.2-13.91 9.59a1 1 0 0 0 0 .82c.17.39 4.37 9.59 13.91 9.59s13.74-9.2 13.91-9.59a1 1 0 0 0 0-.82zm-13.91 8.41c-7.17 0-11-6.32-11.88-8 .88-1.68 4.71-8 11.88-8s11 6.32 11.88 8c-.88 1.68-4.71 8-11.88 8z">
              </path>
              <path d="m16 10a6 6 0 1 0 6 6 6 6 0 0 0 -6-6zm0 10a4 4 0 1 1 4-4 4 4 0 0 1 -4 4z"></path>
            </svg>
            <svg class="svgLove" width="20" height="20" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path
                d="m29.55 6.509c-1.73-2.302-3.759-3.483-6.031-3.509h-.076c-3.29 0-6.124 2.469-7.443 3.84-1.32-1.371-4.153-3.84-7.444-3.84h-.075c-2.273.026-4.3 1.207-6.059 3.549a8.265 8.265 0 0 0 1.057 10.522l11.821 11.641a1 1 0 0 0 1.4 0l11.82-11.641a8.278 8.278 0 0 0 1.03-10.562zm-2.432 9.137-11.118 10.954-11.118-10.954a6.254 6.254 0 0 1 -.832-7.936c1.335-1.777 2.831-2.689 4.45-2.71h.058c3.48 0 6.627 3.924 6.658 3.964a1.037 1.037 0 0 0 1.57 0c.032-.04 3.2-4.052 6.716-3.964a5.723 5.723 0 0 1 4.421 2.67 6.265 6.265 0 0 1 -.805 7.976z">
              </path>
            </svg>
            <svg class="svgCompare" width="20" height="20" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
              <path
                d="m26 9a1 1 0 0 0 0-2h-4a1 1 0 0 0 -1 1v4a1 1 0 0 0 2 0v-1.66a9 9 0 0 1 -7 14.66c-.3 0-.6 0-.9 0a1 1 0 1 0 -.2 2c.36 0 .73.05 1.1.05a11 11 0 0 0 8.48-18.05z">
              </path>
              <path
                d="m10 19a1 1 0 0 0 -1 1v1.66a9 9 0 0 1 8.8-14.48 1 1 0 0 0 .4-2 10.8 10.8 0 0 0 -2.2-.18 11 11 0 0 0 -8.48 18h-1.52a1 1 0 0 0 0 2h4a1 1 0 0 0 1-1v-4a1 1 0 0 0 -1-1z">
              </path>
            </svg>
          </div>
          <div class="buttom">
            <button>ADD TO CART</button>
          </div>
        </div>
      </div>
        
        `
        document.querySelector("#seymur-yek").innerHTML=x;
        
    }
    )})
    .catch(err=>console.log(err))   
 }
 getProducts();