$(function() {
    $("a").click(function() {
       // remove classes from all
       $("a").removeClass("active");
       // add class to the one we clicked
       $(this).addClass("active");
    });
 });



 $(function() {
   $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
       if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
           var target = $(this.hash);
           target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
           if (target.length) {
               $('html, body').animate({
                   scrollTop: (target.offset().top - 85)
               }, 1000);
               return false;
           }
       }
   });
});