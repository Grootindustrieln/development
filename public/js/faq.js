
jQuery(document).ready(function($){
	// Load the home page chart.
	var chart = $('#hero-chart');
	if ( chart.length > 0 ) {
		var data = [],
			barsCount = 50,
			labels = new Array(barsCount),
			updateDelayMax = 5000,
			$id = function(id){
				return document.getElementById(id);
			},
			random = function(max){ return Math.round(Math.random()*100)},
			helpers = Chart.helpers;

		Chart.defaults.global.responsive = true;

		for (var i = barsCount - 1; i >= 0; i--) {
			data.push(Math.round(Math.random() * 100));
		};
		new Chart(chart.get(0).getContext('2d')).Bar({
			labels : labels,
			datasets : [{
				fillColor : '#1889e3',
				data : data
			}]
		},{
			showScale : false,
			barShowStroke : false,
			barValueSpacing: 1,
			showTooltips : false,
			onAnimationComplete : function(){
				// Get scope of the hero chart during updates.
				var heroChart = this,
					timeout;
				// Stop this running every time the update is fired.
				this.options.onAnimationComplete = randomUpdate;

				this.options.animationEasing = 'easeOutQuint';

				randomUpdate();

				function randomUpdate(){
					heroChart.stop();
					clearTimeout(timeout);
					// Get a random bar
					timeout = setTimeout(function(){
						var randomNumberOfBars = Math.floor(Math.random() * barsCount),
							i;
						for (i = randomNumberOfBars - 1; i >= 0; i--) {
							heroChart.datasets[0].bars[Math.floor(Math.random() * barsCount)].value = Math.round(Math.random() * 100);
						};
						heroChart.update();
					},Math.random() * updateDelayMax);
				};
			}
		});
	}

	// Adjust the checkout button.
	$(document).on('ajaxComplete', function(e, r, s) {
		if ( typeof s.data != 'string' ) {
			return;
		}

		if ( typeof s.data != 'undefined' && s.data.indexOf('edd_load_gateway') > -1 ) {
			$('#edd-purchase-button').removeClass('blue').addClass('button-green button-block text-center');
		}
	});

	$(document).on('click', '.om-button-show', function(e){
		e.preventDefault();
		var logo_box = $('.om-hidden-logos');
		if ( logo_box.is(':visible') ) {
			logo_box.hide();
		} else {
			logo_box.show();
		}
	});

	omPanels();

	// Function to initialize the accordion.
    function omPanels(){
        var panels          = $('.panels > dd'),
            active_panel    = $('.panels .panel-active');

        $(active_panel).next().slideDown(300);

        // Change panels on click.
        $(document).on('click', '.panels > dt > a', function(e){
            e.preventDefault();
            var $this  = $(this),
                parent = $this.parent();

            if ( parent.hasClass('panel-active') ) {
                active_panel.removeClass('panel-active').find('.plus').text('+');
                panels.slideUp(300);
            } else {
                active_panel.removeClass('panel-active').find('.plus').text('+');
                active_panel = parent;
                active_panel.find('.plus').text('-');
                panels.slideUp(300);
                parent.addClass('panel-active').next().slideDown(300);
            }
        });
    }

    omTabber();

    // Function to initialize the accordion.
    function omTabber(){
        // Change panels on click.
        $(document).on('click', '.home-tabber li a', function(e){
            e.preventDefault();
            var $this  = $(this),
                tab    = $this.data('tab'),
                old_tab = $('.home-tabber ul li.active a').data('tab');

            // Set the nav class.
            $('.home-tabber ul').find('.active').removeClass('active');
            $this.parent().addClass('active');

            // Set the active tab.
            $('#' + old_tab).addClass('om-hidden');
            $('#' + tab).removeClass('om-hidden');

        });
    }

	omBlink();

	function omBlink(){
    	// Change 'you' to other words
    	// Start config
    	var words = ['Leads','Revenue','Customer Base','Email List'];
    	var colors = ['#0d82df'];
    	// End config

    	// Set vars
    	var wordIndex = 0;
    	var wordsLength = words.length;

    	var colorIndex = 0;
    	var colorsLength = colors.length;

    	// Change <span> word and color on interval
    	var interval = setInterval(function() {
    		if (wordIndex+1 == wordsLength) {
    			// Reached end of array - restart
    			wordIndex = 0;
    		} else {
    			wordIndex++;
    		}

    		if (colorIndex+1 == colorsLength) {
    			// Reached end of array - restart
    			colorIndex = 0;
    		} else {
    			colorIndex++;
    		}

    		$('.home-why h2:first span').fadeOut(200, function() {
    			$(this).text(words[wordIndex]).css('color', colors[colorIndex]);
    			$(this).fadeIn(200);
    		});
    	}, 3000);
	}

	$(document).on('click', '.search-submit.grey', function(e){
		e.preventDefault();
		if ( ! $('.contact-form').is(':visible') ) {
			$('.contact-form').slideDown(300);
		}
	});

});
(function(e){var t=!1,i=!1,n={isUrl:function(e){var t=RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$","i");return t.test(e)?!0:!1},loadContent:function(e,t){e.html(t)},addPrefix:function(e){var t=e.attr("id"),i=e.attr("class");"string"==typeof t&&""!==t&&e.attr("id",t.replace(/([A-Za-z0-9_.\-]+)/g,"sidr-id-$1")),"string"==typeof i&&""!==i&&"sidr-inner"!==i&&e.attr("class",i.replace(/([A-Za-z0-9_.\-]+)/g,"sidr-class-$1")),e.removeAttr("style")},execute:function(n,s,a){"function"==typeof s?(a=s,s="sidr"):s||(s="sidr");var r,d,l,c=e("#"+s),u=e(c.data("body")),f=e("html"),p=c.outerWidth(!0),g=c.data("speed"),h=c.data("side"),m=c.data("displace"),v=c.data("onOpen"),y=c.data("onClose"),x="sidr"===s?"sidr-open":"sidr-open "+s+"-open";if("open"===n||"toggle"===n&&!c.is(":visible")){if(c.is(":visible")||t)return;if(i!==!1)return o.close(i,function(){o.open(s)}),void 0;t=!0,"left"===h?(r={left:p+"px"},d={left:"0px"}):(r={right:p+"px"},d={right:"0px"}),u.is("body")&&(l=f.scrollTop(),f.css("overflow-x","hidden").scrollTop(l)),m?u.addClass("sidr-animating").css({width:u.width(),position:"absolute"}).animate(r,g,function(){e(this).addClass(x)}):setTimeout(function(){e(this).addClass(x)},g),c.css("display","block").animate(d,g,function(){t=!1,i=s,"function"==typeof a&&a(s),u.removeClass("sidr-animating")}),v()}else{if(!c.is(":visible")||t)return;t=!0,"left"===h?(r={left:0},d={left:"-"+p+"px"}):(r={right:0},d={right:"-"+p+"px"}),u.is("body")&&(l=f.scrollTop(),f.removeAttr("style").scrollTop(l)),u.addClass("sidr-animating").animate(r,g).removeClass(x),c.animate(d,g,function(){c.removeAttr("style").hide(),u.removeAttr("style"),e("html").removeAttr("style"),t=!1,i=!1,"function"==typeof a&&a(s),u.removeClass("sidr-animating")}),y()}}},o={open:function(e,t){n.execute("open",e,t)},close:function(e,t){n.execute("close",e,t)},toggle:function(e,t){n.execute("toggle",e,t)},toogle:function(e,t){n.execute("toggle",e,t)}};e.sidr=function(t){return o[t]?o[t].apply(this,Array.prototype.slice.call(arguments,1)):"function"!=typeof t&&"string"!=typeof t&&t?(e.error("Method "+t+" does not exist on jQuery.sidr"),void 0):o.toggle.apply(this,arguments)},e.fn.sidr=function(t){var i=e.extend({name:"sidr",speed:200,side:"left",source:null,renaming:!0,body:"body",displace:!0,onOpen:function(){},onClose:function(){}},t),s=i.name,a=e("#"+s);if(0===a.length&&(a=e("<div />").attr("id",s).appendTo(e("body"))),a.addClass("sidr").addClass(i.side).data({speed:i.speed,side:i.side,body:i.body,displace:i.displace,onOpen:i.onOpen,onClose:i.onClose}),"function"==typeof i.source){var r=i.source(s);n.loadContent(a,r)}else if("string"==typeof i.source&&n.isUrl(i.source))e.get(i.source,function(e){n.loadContent(a,e)});else if("string"==typeof i.source){var d="",l=i.source.split(",");if(e.each(l,function(t,i){d+='<div class="sidr-inner">'+e(i).html()+"</div>"}),i.renaming){var c=e("<div />").html(d);c.find("*").each(function(t,i){var o=e(i);n.addPrefix(o)}),d=c.html()}n.loadContent(a,d)}else null!==i.source&&e.error("Invalid Sidr Source");return this.each(function(){var t=e(this),i=t.data("sidr");i||(t.data("sidr",s),"ontouchstart"in document.documentElement?(t.bind("touchstart",function(e){e.originalEvent.touches[0],this.touched=e.timeStamp}),t.bind("touchend",function(e){var t=Math.abs(e.timeStamp-this.touched);200>t&&(e.preventDefault(),o.toggle(s))})):t.click(function(e){e.preventDefault(),o.toggle(s)}))})}})(jQuery);