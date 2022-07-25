$(document).ready(function() {
    
    $('.sliders').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow:`
        <button type="button" class="slider-prev">Previous</button>
        `,
        nextArrow:`
        <button type="button" class="slider-next">Next</button>
        `,
      });
});