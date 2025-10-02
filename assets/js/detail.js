let getButtons =document.querySelectorAll(".tab-menu-btn");

for (const button of getButtons) {
    
    button.addEventListener("click",(e)=>{
        for (const btn of getButtons) {
            btn.classList.remove("active");            
        }      
       e.target.classList.add("active");
      
       let activeMenus= document.querySelectorAll(".menu-info-tr");
       for (const item of activeMenus) {
        item.classList.add("d-none")
        if (item.id===e.target.id) {
            item.classList.remove("d-none");
        }
        
        
       }
       
    })  
}