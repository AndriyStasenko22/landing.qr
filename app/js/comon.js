$(document).ready(function() {
	var header_height = $('header').outerHeight(); // висота шапки
	var menu_height = $('.fixed_menu').outerHeight(); // висота меню
	var basemenu_height = $('.base_menu').outerHeight(); // висота меню
	new WOW().init();

	var phone_slider = $('.phone_slider');
	phone_slider.owlCarousel({
		loop:true,
		center: true,
		smartSpeed:550,
		startPosition: 3,
		onInitialized: function(event){
			phone_slider.find('.owl-item.center').next('.owl-item.active').css('opacity', '0.2');
			phone_slider.find('.owl-item.center').prev('.owl-item.active').css('opacity', '0.2');
			phone_slider.find('.owl-item.center').css('opacity', '1');
		},
		onChanged: function(event){
			$('.phone_slider .owl-item').css('opacity', '0.04');
			$('.phone_slider .owl-item').eq(event.item.index).css('opacity', '1');
			$('.phone_slider .owl-item').eq(event.item.index).next('.owl-item').css('opacity', '0.2');
			$('.phone_slider .owl-item').eq(event.item.index).prev('.owl-item').css('opacity', '0.2');
		},
		responsiveClass:true,
		responsive:{
			0:{
				items: 1,
			},
			768:{
				items: 2,
			},
			1200:{
				items: 3,
			},
			1400:{
				items: 4,
			},
			1700:{
				items: 5,
			}
		}

	});

		// кнопки слайдер "Наша команда"
		$('.phone_slider_button .btn_next').click(function() {
			phone_slider.trigger('next.owl.carousel');
		});
		$('.phone_slider_button .btn_prev').click(function() {
			phone_slider.trigger('prev.owl.carousel');
		}); 

		var admin_slider = $('.admin_slider');
		admin_slider.owlCarousel({
			items:1,
			loop:true,
			center: true,
			// smartSpeed:550,
			// dots: true
		});

	// // кнопки слайдер "Наша команда"
	// $('.phone_slider_button .btn_next').click(function() {
	// 	phone_slider.trigger('next.owl.carousel');
	// });
	// $('.phone_slider_button .btn_prev').click(function() {
	// 	phone_slider.trigger('prev.owl.carousel');
	// });
	
	// шапка сайту
	if($(window).width() > 767){
		var flag = true;
		$(window).scroll(function(event) {
			onScroll();
			if($(window).scrollTop() > basemenu_height && flag){
				flag = false;
				$('.fixed_menu').css('display','block').addClass('animated');
			}
			if($(window).scrollTop() < basemenu_height && !flag){
				$('.fixed_menu').css('display','none').removeClass('animated');
				flag = true;
			}
		});
		// console.log('1');
	}

	$('.base_menu .mob_button').click(function(event) {
		$('.base_menu .menu').slideToggle('slow');
	});
	// навігація по сайту
	$('.menu>li a').click(function(event) {
		event.preventDefault();
		var block = $(this).attr('href');
		if($(window).width() > 767){
			var block_position = $(block).offset().top - menu_height;
		}
		else{
			var block_position = $(block).offset().top;
		}
		$('html, body').animate({scrollTop : block_position}, 800);
		console.log(block);
	});


	$('.fancy').fancybox();
});

function onScroll(){
	var menu_height = $('.fixed_menu').outerHeight();
	var scroll_top = $(window).scrollTop();
	$(".fixed_menu .menu a").each(function(){
		var hash = $(this).attr("href");
		var target = $(hash);
		var position = target.position().top - menu_height;
		if (position  <= scroll_top && position  + target.outerHeight() > scroll_top) {
			$(".fixed_menu .menu a.active").removeClass("active");
			$(this).addClass("active");
		} else {
			$(this).removeClass("active");
		}
	});
}