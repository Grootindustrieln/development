jQuery(document).ready(function($){
	var pricing = {
		monthly: {
			term: '/month',
			text: '',
			basic: {
				price: '80',
				price_id: 's11r14'
			},
			plus: {
				price: '120',
				price_id: 'g12d13'
			},
			pro: {
				price: '160',
				price_id: 'p13m12'
			}
		},
		annual: {
			term: '/month <span class="annual-text">(billed annually)</span>',
			text: '',
			basic: {
				price: '60',
				price_id: 's14r17'
			},
			plus: {
				price: '90',
				price_id: 'g15d16'
			},
			pro: {
				price: '120',
				price_id: 'p16m15'
			}
		}
	};
	$('input[name="term"], input[name="term2"]').on('change', function(){
		var val  = $(this).val(),
			name = $(this).attr('name');

		if ( 'term' == name ) {
			$('#' + val + '2').prop('checked', true);
		} else {
			$('#' + val).prop('checked', true);
		}

		$.each(pricing, function(i){
			if ( val !== i ) {
				return;
			}

			$.each(pricing[i], function(k, v){
				switch(k){
					case 'term' : $('.term').html(v); break;
					case 'text' : $('.heading span').html(v); break;
					default 	:
						var href 	 = $('.om-price-' + k).attr('href'),
							split	 = href.split('[price_id]');
							href_new = split[0] + '[price_id]=' + v['price_id'];
						$('.pricing-' + k + ' .price').html(v['price']);
						$('.om-price-' + k).attr('href', href_new);
					break;
				}
			});
		});
	});
	$(document).on('click', '.om-show-pricing', function(e){
		e.preventDefault();
		var pricing = $('.pricing-hidden');
		if ( pricing.hasClass('om-hidden') ) {
			pricing.removeClass('om-hidden');
			$('html, body').scrollTop(pricing.offset().top - 50);
		} else {
			pricing.addClass('om-hidden');
		}
	});
	$('.tooltip').on({
		mouseenter: function(){
			$(this).find('.tooltip-content').show();
		},
		mouseleave: function(){
			$(this).find('.tooltip-content').hide();
		}
	});

	var slickCarousel = $('.slick-carousel');
	if(slickCarousel.length) {
		slickCarousel.slick({
			dots: true,
			speed: 600,
			infinite: true,
			responsive: true,
			autoplay: true,
			autoplaySpeed: 6000,
			arrows: false
		});
	}
});
0
