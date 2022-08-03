function getProducts() {
  return fetch('product.json')
    .then(response => response.json())
    .catch(err => console.log(err)); 
}

function getProductContent(item, type, classNames = "") {
  switch (type) {
    case "shopslider":
      return `
      <div class="  text-center ${classNames} ">
          <img src="${item.image}" alt="">
                            <h4>${item.category}</h4>
                       <div class="stock">
                  <span>4</span>
             </div>
      </div>
      `
      break;
    case "featured":
      return `
      <div id="hover-div" class="${classNames}">
          <div class="row">
            <div class="col-xl-6  col-6">
              <img src="${item.image}" alt="">
            </div>
            <div class="col-xl-6  col-6">
              <h6>${item.title}</h6>
              <p>US$${item.price}</p>
              <div class="raiting">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
            </div>
          </div>
        </div>
      `
      break;

    case "mostPopular":
      return `
        <div class="col-xl-3 product-items-papular">
        <span class="span-id" hidden >${item.id}</span>
         <a href="detail.html"><img src="${item.image}" alt=""></a>          
          <a href="">${item.title}</a>
          <p>US$${item.price} <span>|</span><span>{ 4% off }</span></p>
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
          <div class="hurry-up">
            <ul>
              <li>Total Sold:11</li>
              <li>Stock:19</li>
            </ul>
            <p><span>Hurry Up</span> Limited Time Offer</p>
            <div class="coming-time"
              data-countdown="{&quot;date&quot;:&quot;2030/01/01&quot;,&quot;hr&quot;:&quot;Hr&quot;,&quot;min&quot;:&quot;Min&quot;,&quot;sec&quot;:&quot;Sec&quot;}">
              <div class="time-count day"><span>0</span>Day</div>
              <div class="time-count hour"><span>08</span>Hr</div>
              <div class="time-count min"><span>14</span>Min</div>
              <div class="time-count sec"><span>35</span>Sec</div>
            </div>
          </div>
        </div>
      `
      break;

    case "bestSelling":
      return `
      <div class="${classNames} ${item.category}">
      <span class="span-id" hidden >${item.id}</span>
      <div class=" product-items">
      <a href="detail.html"><img src="${item.image}" alt=""></a> 
        <a href="">${item.title}</a>
        <p>US$ ${item.price} <span>|</span><span>{ 4% off }</span></p>
        <div class="hover-detail">
          <div class="top-hover"><svg class="svgEye" height="20" width="20" viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="m29.91 15.59c-.17-.39-4.37-9.59-13.91-9.59s-13.74 9.2-13.91 9.59a1 1 0 0 0 0 .82c.17.39 4.37 9.59 13.91 9.59s13.74-9.2 13.91-9.59a1 1 0 0 0 0-.82zm-13.91 8.41c-7.17 0-11-6.32-11.88-8 .88-1.68 4.71-8 11.88-8s11 6.32 11.88 8c-.88 1.68-4.71 8-11.88 8z">
              </path>
              <path d="m16 10a6 6 0 1 0 6 6 6 6 0 0 0 -6-6zm0 10a4 4 0 1 1 4-4 4 4 0 0 1 -4 4z"></path>
            </svg>
            <svg class="svgLove" width="20" height="20" viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="m29.55 6.509c-1.73-2.302-3.759-3.483-6.031-3.509h-.076c-3.29 0-6.124 2.469-7.443 3.84-1.32-1.371-4.153-3.84-7.444-3.84h-.075c-2.273.026-4.3 1.207-6.059 3.549a8.265 8.265 0 0 0 1.057 10.522l11.821 11.641a1 1 0 0 0 1.4 0l11.82-11.641a8.278 8.278 0 0 0 1.03-10.562zm-2.432 9.137-11.118 10.954-11.118-10.954a6.254 6.254 0 0 1 -.832-7.936c1.335-1.777 2.831-2.689 4.45-2.71h.058c3.48 0 6.627 3.924 6.658 3.964a1.037 1.037 0 0 0 1.57 0c.032-.04 3.2-4.052 6.716-3.964a5.723 5.723 0 0 1 4.421 2.67 6.265 6.265 0 0 1 -.805 7.976z">
              </path>
            </svg>
            <svg class="svgCompare" width="20" height="20" viewBox="0 0 30 30"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="m26 9a1 1 0 0 0 0-2h-4a1 1 0 0 0 -1 1v4a1 1 0 0 0 2 0v-1.66a9 9 0 0 1 -7 14.66c-.3 0-.6 0-.9 0a1 1 0 1 0 -.2 2c.36 0 .73.05 1.1.05a11 11 0 0 0 8.48-18.05z">
              </path>
              <path
                d="m10 19a1 1 0 0 0 -1 1v1.66a9 9 0 0 1 8.8-14.48 1 1 0 0 0 .4-2 10.8 10.8 0 0 0 -2.2-.18 11 11 0 0 0 -8.48 18h-1.52a1 1 0 0 0 0 2h4a1 1 0 0 0 1-1v-4a1 1 0 0 0 -1-1z">
              </path>
            </svg>
          </div>
          <div class="buttom-hover">
            <button>ADD TO CART</button>
          </div>
        </div>
      </div>
    </div>
      `

      break;

    default:
      return `
      <div class="${classNames} product-items">
        <span class="span-id" hidden >${item.id}</span>
        <a href="detail.html"> <img class="img-products" src="${item.image}" alt=""/></a> 
       
            <a href="" id="product-title" >${item.title}</a>
            <p>US$<span id="product-price">${item.price}</span> <span>|</span><span>{4 % off}</span></p>
            <div class="hover-detail">
                <div class="top"><svg class="svgEye" height="20" width="20" viewBox="0 0 32 32"
                    xmlns="http:www.w3.org/2000/svg">
                    <path
                        d="m29.91 15.59c-.17-.39-4.37-9.59-13.91-9.59s-13.74 9.2-13.91 9.59a1 1 0 0 0 0 .82c.17.39 4.37 9.59 13.91 9.59s13.74-9.2 13.91-9.59a1 1 0 0 0 0-.82zm-13.91 8.41c-7.17 0-11-6.32-11.88-8 .88-1.68 4.71-8 11.88-8s11 6.32 11.88 8c-.88 1.68-4.71 8-11.88 8z">
                    </path>
                    <path d="m16 10a6 6 0 1 0 6 6 6 6 0 0 0 -6-6zm0 10a4 4 0 1 1 4-4 4 4 0 0 1 -4 4z"></path>
                </svg>
                    <svg class="svgLove" width="20" height="20" viewBox="0 0 32 32" xmlns="http:www.w3.org/2000/svg">
                        <path
                            d="m29.55 6.509c-1.73-2.302-3.759-3.483-6.031-3.509h-.076c-3.29 0-6.124 2.469-7.443 3.84-1.32-1.371-4.153-3.84-7.444-3.84h-.075c-2.273.026-4.3 1.207-6.059 3.549a8.265 8.265 0 0 0 1.057 10.522l11.821 11.641a1 1 0 0 0 1.4 0l11.82-11.641a8.278 8.278 0 0 0 1.03-10.562zm-2.432 9.137-11.118 10.954-11.118-10.954a6.254 6.254 0 0 1 -.832-7.936c1.335-1.777 2.831-2.689 4.45-2.71h.058c3.48 0 6.627 3.924 6.658 3.964a1.037 1.037 0 0 0 1.57 0c.032-.04 3.2-4.052 6.716-3.964a5.723 5.723 0 0 1 4.421 2.67 6.265 6.265 0 0 1 -.805 7.976z">
                        </path>
                    </svg>
                    <svg class="svgCompare" width="20" height="20" viewBox="0 0 30 30" xmlns="http:www.w3.org/2000/svg">
                        <path
                            d="m26 9a1 1 0 0 0 0-2h-4a1 1 0 0 0 -1 1v4a1 1 0 0 0 2 0v-1.66a9 9 0 0 1 -7 14.66c-.3 0-.6 0-.9 0a1 1 0 1 0 -.2 2c.36 0 .73.05 1.1.05a11 11 0 0 0 8.48-18.05z">
                        </path>
                        <path
                            d="m10 19a1 1 0 0 0 -1 1v1.66a9 9 0 0 1 8.8-14.48 1 1 0 0 0 .4-2 10.8 10.8 0 0 0 -2.2-.18 11 11 0 0 0 -8.48 18h-1.52a1 1 0 0 0 0 2h4a1 1 0 0 0 1-1v-4a1 1 0 0 0 -1-1z">
                        </path>
                    </svg>
                </div>
                <div class="buttom">
                    <button class="btn-add-chart" onClick="addToCart(event)">ADD TO CART</button>
                </div>
            </div>
    </div>
      `
      break;
  }

}

getProducts().then(products => {
  let featureProducts = products.sort(() => 0.5 - Math.random()).slice(0, 8);
  let indexProducts = products.sort(() => 0.5 - Math.random());
  let dealsOfTheDay = products.sort(() => 0.5 - Math.random()).slice(4, 7);
  let bestSellingProducts = products.sort(() => 0.5 - Math.random()).slice(0, 6);;
  let mostPopularViewed = products.sort(() => 0.5 - Math.random());
  let sliderShopCategories=products.sort(()=>0.5-Math.random());
  let bestSellingCategories = $("#bestSellingCategories");

  let categories = products
    .map(product => product.category)
    .filter((cat, i, a) => a.indexOf(cat) === i);

  categories.forEach(category => {
    bestSellingCategories.append(`
        <button data-filter=".${category}">${category}</button>
    `)
  })

  featureProducts.forEach(featureProduct => {
    document.querySelector("#futured-products-2").innerHTML += getProductContent(featureProduct, "featured", "col-xl-3");
  });

  indexProducts.forEach(indexProduct => {
    document.querySelector("#index-product-1").innerHTML += getProductContent(indexProduct, "index", "col-xl-2-5  col-6");
  });

  dealsOfTheDay.forEach(indexProduct => {
    document.querySelector("#DEALS-OF-THE-DAY").innerHTML += getProductContent(indexProduct, "deals", "col-xl-4");
  });

  mostPopularViewed.forEach(mostPopular => {
    document.querySelector("#mostPopularViewed").innerHTML += getProductContent(mostPopular, "mostPopular", "col-xl-3");
  });
  

  bestSellingProducts.forEach(product => {
    let response = getProductContent(product, "bestSelling", "col-xl-4 item");
    let $content = $("#bestSellingProducts");

    $content.append(response);
    $content.isotope();
    $content.isotope( 'appended', response );
    $content.isotope( 'reloadItems' )
    $content.isotope('layout');

    bestSellingCategories.find('button').first().click();
  });

  mostPopularSlick();
  
})

