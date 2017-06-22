$(document).ready(function() {
	var header_height = $('header').outerHeight(); // висота шапки
	var menu_height = $('.navbar').outerHeight(); // висота меню
	new WOW().init();

	var phone_slider = $('.phone_slider');
	phone_slider.owlCarousel({
		items:1,
		loop:true,
		smartSpeed:550,
	});

	// кнопки слайдер "Наша команда"
	$('.phone_slider_button .btn_next').click(function() {
		phone_slider.trigger('next.owl.carousel');
	});
	$('.phone_slider_button .btn_prev').click(function() {
		phone_slider.trigger('prev.owl.carousel');
	});
	
	// шапка сайту
	$(window).scroll(function(event) {
		onScroll();
		if($(window).scrollTop() > header_height - menu_height){
			$('.navbar').css('background-color', 'rgba(39,50,61, 1)');
		}
		else{
			$('.navbar').removeAttr('style');
		}
	});

	// навігація по сайту
	$('.menu>li a').click(function(event) {
		event.preventDefault();
		var block = $(this).attr('href');
		var block_position = $(block).offset().top - menu_height;
		$('html, body').animate({scrollTop : block_position}, 800);
	});


 	$('.fancy').fancybox();
});

function onScroll(){
	var menu_height = $('.navbar').outerHeight();
	var scroll_top = $(window).scrollTop();
	$(".menu a").each(function(){
		var hash = $(this).attr("href");
		var target = $(hash);
		var position = target.position().top - menu_height;
		if (position  <= scroll_top && position  + target.outerHeight() > scroll_top) {
			$(".menu a.active").removeClass("active");
			$(this).addClass("active");
		} else {
			$(this).removeClass("active");
		}
	});
}