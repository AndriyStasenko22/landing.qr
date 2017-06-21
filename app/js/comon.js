$(document).ready(function() {
	var header_height = $('header').outerHeight(); // висота шапки
	var menu_height = $('.navbar').outerHeight(); // висота меню
	new WOW().init();

	// шапка сайту
	$(window).scroll(function(event) {
		if($(window).scrollTop() > header_height){
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
});