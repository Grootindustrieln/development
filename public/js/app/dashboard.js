$(document).ready(function() {

	//variables
	var timer;
	author_templates = 0;
	disableFlag = 0;
	nameHasChanged = false;
	subscriptionPopupFlag = false;
	subscriptionParameter = getQueryVariable('subscription');
	compare = false;
	date = new Date();
	month = date.getMonth()+1;
	day = date.getDate();
	date = date.getFullYear() + '/' + ((''+month).length<2 ? '0' : '') + month + '/' + ((''+day).length<2 ? '0' : '') + day;
	var timerNav;

	if(subscriptionParameter == 'success'){ checkoutPopup('subscribed', '500'); }

	$('#subscribers_link').on('click', 'li:not(.create_new_list)', function() {

		name = $(this).attr('name');
		name = encodeURIComponent(name);
		$(location).attr('href','https://www.stampready.net/dashboard/subscribers/all/index.php?list='+name);

	});

	//promotion bundle mouseenter hack
	$(document).on('mouseenter', '.credits_or_plan', function(){

		$('#promotionDeal').addClass('promotionDealActive');
		$('.subscription-credit-meter').css('opacity','0')

	}).on('mouseleave', '.credits_or_plan', function(){

		$('#promotionDeal').removeClass('promotionDealActive');
		$('.subscription-credit-meter').css('opacity','1')

	});

	//install form notification on send page
	$(document).on('click', '#embed_form_notification', function(){

		//open window on new page
		window.open('../../developer/index.php');

	})

	//clickabke logo
	$('#logo').click(function(){

		$(location).attr('href','https://www.stampready.net/dashboard/index.php');

	})

	//meter redirect
	$('.credits_or_plan').click(function(){

		if ($('#promotionDeal').length > 0) {

			window.open('https://www.stampready.net/promotions/starter-kit/');

		}

		else {

			$(location).attr('href','https://www.stampready.net/dashboard/plans/');

		}

	});

	$(document).on('mouseenter', '.crown', function(){

		//variables
		opens = $(this).closest('li').attr('data-opens');

		$(this).text(opens+' opens');

	}).on('mouseleave', '.crown', function(){

		//variables
		opens = $(this).closest('li').attr('data-opens');

		$(this).text(opens);

	});

	//nav indicator
	$('#nav > li h2').click(function(){

		$('#nav > li').attr('class','');
		$(this).parent('li:not(.create_new_list)').addClass('active');

	});

	//onblur campaign name
	$(document).on('blur', '.campaign_name', function(){

		id = $(this).closest('li').attr('data-id');
		name = $(this).val();

		changeCampaignName(id, name);

	}).on('focus', '.campaign_name', function(){

		nameHasChanged = false;

	}).on('keyup', '.campaign_name', function(e){

		id = $(this).closest('li').attr('data-id');
		name = $(this).val();
		nameHasChanged = true;

		var code = e.which; //recommended to use e.which, it's normalized across browsers
		if(code==13)e.preventDefault();
		if(code==13){

			//blur to run the function
			$(this).blur();

		}

	});

	//show add subscriber list button
	$(document).on('mouseenter', '#subscribers_link', function(){

		$(this).find('.create_new_list').addClass('act')

	}).on('mouseleave', '#subscribers_link', function(){

		$('.create_new_list').removeClass('act')

	});

	//data switch function
	$(document).on('mousedown', '[data-switch]', function(){

		data_switch = $(this);
		data_switch_thumb = $(this).find('[data-switch-thumb]');
		data_switch_value = $(this).attr('data-switch');

		if($(data_switch_thumb).hasClass('active')){

			$(data_switch_thumb).animate({

					'right': '2px',

			}, { duration: 100, easing: 'linear' });

			$(data_switch).removeClass('disabled')

			$(data_switch_thumb).removeClass('active');

		}

		else {

			$(data_switch_thumb).animate({

					'right': '19px'

			}, { duration: 100, easing: 'linear' });

			$(data_switch).addClass('disabled')

			$(data_switch_thumb).addClass('active');

		}

	});

	$('#subscriber_lists_ul').on('mouseenter', 'li', function(){

		$(this).find('.viewList').show();

	}).on('mouseleave', 'li', function(){

		$(this).find('.viewList').hide();

	});

	$(document).on('click', '.viewList', function(){

		list = $(this).closest('li').attr('data-l-name');

		window.open('../subscribers/all/index.php?list='+list);

		$('#select_lists li').removeClass('active').removeClass('semi_bold');


	});

	//giftcard function
	$(document).on('click', '.giftcardPop', function(){

		headline = 'Redeem giftcard';
		paragraph = 'Enter your code below and receive your gift!';

		btnTrue = 'Redeem Giftcard';
		btnTrueId = 'redeemGiftcardCode';

		btnFalse = 'Cancel';

		inputField = 'XXXX XXXX XXXX XXXX';
		inputFieldId = 'giftCardCode';

		openPopup();

	});

	//redeem giftcard
	$(document).on('click', '#redeemGiftcardCode[value="Redeem Giftcard"]', function(){

		//variables
		giftcard_code = $('#giftCardCode').val();

		//change button text
		$(this).val('Checking code..');

		//ajax connection
		$.ajax({
		    type: "POST",
		    dataType: "html",
		    url: "",
		    data: { giftcard_code:giftcard_code }
		}).done(function(data) {

			//if error, show error message
			if (data == 'error') {

        	    notificationContent = 'This code seems invalid or has been redeemed already';
				notificationColor = "#ea5a5b";

				$('#redeemGiftcardCode').val('Redeem Giftcard')

			}

			//else if bundle coupon, show options
			else if(data == 'ultimate_bundle' || data == 'ultimate_bundle_2'){

				closePopup();

				setTimeout(function(){

					headline = 'Pick your gift!';
					paragraph = 'Would you like to have credits or a first month free subscription (up to 5,000 subscribers)?';

					btnTrue = 'Free subscription!';
					btnTrueId = 'freeSubscriptionButton';

					btnTrue2 = '2,500 credits!';
					btnTrueId2 = 'freeCreditsButton';

					openPopup();

				}, 1000);


			}

			else if(data == 'paddle'){

				closePopup();
				setTimeout(function(){

					headline = 'One month free of charge!';
					paragraph = 'Thank you for getting the deal on paddle.com! Pick a plan to start sending one month free of charge.';

					btnTrue = 'Pick a plan';
					btnTrueId = 'pickAPlanButton';

					btnFalse = 'Got it! I\'ll look later';

					openPopup();

				}, 1000)

			}

			else if(data == 'free_subscription'){

				notificationContent = 'Your next plan is completely free for a month!';
				notificationColor = "#69c0af";

				closePopup();
				setTimeout(function(){

					$(location).attr('href','index.php');

				}, 2000)

			}

			//if success, show successfully added credits message
			else {

				notificationContent = 'Added '+data+' credits to your account!';
				notificationColor = "#69c0af";

				closePopup();
				setTimeout(function(){

					$(location).attr('href','index.php');

				}, 2000)

			}

			notification();

		});


	});

	//free subscription option
	$(document).on('click', '#freeSubscriptionButton', function(){

		$.ajax({
		    type: "POST",
		    dataType: "html",
		    url: "https://www.stampready.net/dashboard/webhooks/paddle/ultimate_bundle/redeemBundleGift.php",
		    data: {giftcard_code: giftcard_code, gift_option: 2 }
		}).done(function(data) {

			if(data == 'gift_option_2'){

				closePopup();
				setTimeout(function(){

					headline = 'One month free of charge!';
					paragraph = 'Whenever you subscribe for a plan, up to 5,000 subscribers, the first month is completely on us!';

					btnTrue = 'Pick a plan';
					btnTrueId = 'pickAPlanButton';

					btnFalse = 'Got it! I\'ll look later';

					openPopup();

				}, 1000)

			}

			else if(data == 'error'){

				 notificationContent = 'This code seems invalid or has been redeemed already';
				 notificationColor = "#ea5a5b";

				 closePopup();

			}

			notification();

		});

	});


	//add credits gift click
	$(document).on('click', '#freeCreditsButton', function(){

		$.ajax({
		    type: "POST",
		    dataType: "html",
		    url: "https://www.stampready.net/dashboard/webhooks/paddle/ultimate_bundle/redeemBundleGift.php",
		    data: {giftcard_code: giftcard_code, gift_option:1 }
		}).done(function(data) {

			if(data == 'gift_option_1'){

				notificationContent = 'We\'ve added 2,500 credits to your account!';
				notificationColor = "#69c0af";

				closePopup();
				setTimeout(function(){

					$(location).attr('href','index.php');

				}, 2000)

			}

			else if(data == 'error'){

				 notificationContent = 'This code seems invalid or has been redeemed already';
				 notificationColor = "#ea5a5b";

				 closePopup();

			}

			notification();

		});

	});

	//add free subscription click
	$(document).on('click', '#pickAPlanButton', function(){

		$(location).attr('href','https://www.stampready.net/dashboard/plans/index.php');

	});

	//Allow only numbers in input fields
	$('.numericOnly').keypress(function (event) {

		if (String.fromCharCode(event.which).match(/[^,.0-9]/g)) return false;

	});

	//subscribers tabs
	$(document).on('click', '[data-tab-url]', function(){

		if($(this).hasClass('activedTab')){

			return false;

		}

		else {

			url = $(this).attr('data-tab-url');
			list = $('#list_name_bar > h2 > b').text();

			$(location).attr('href','https://www.stampready.net/dashboard/subscribers/'+url+'/index.php?list='+list);

		}

	})

	//Slidedown Nav
	$('#nav h2').click(function(){

		if($(this).next('ul').is(":visible") ){ }

		else {

			$('#nav ul').slideUp(200);
			$(this).next('ul').slideDown(200);

		}

	});

	$(document).on('click', '#subscribers_link', function(e){

		count = $('#subscribers_link ul li').size();

		if(count < 1){

			openCreateNewList();

		}

	})

	//Overlay hide
	$(document).on('click', '#popupOverlay, #closePopup', function() {

		closePopup();

	});

	//Notification Desktop
	$(document).on('click', '#popup', function(ev) {

		ev.stopPropagation();

	});


	//action dropdown
	$('#action h3').click(function(){

		if($(this).hasClass('disable')){

		}

		else {

			if($(this).closest('div').hasClass('active')){

				closeNav();

			}

			else {

				$('#action').addClass('active');
				$('#menu_drop_down').slideDown(200);

			}

		}

	});

	//checkboxes
	$(document).on('change', '#double_opt_label [type="checkbox"]', function(){

		if($(this).is(':checked')) {

			$(this).next('a').addClass('checked');

		}

		else {

			$(this).next('a').removeClass('checked');

		}

	});

	//on checkbox state change
	$(document).on('change', '[type="checkbox"]', function(){

		if ($(this).is(':checked')) {

			$(this).next('a').addClass('checked');

		}

		else {

			$(this).next('a').removeClass('checked');

		}

		if($('input:checked').length > 0){

			$('.campaigns_action, .campaigns_action h3').removeClass('disable');

		}

		else {

			$('.campaigns_action, .campaigns_action h3').addClass('disable');

		}

	})

	//actions on mouse enter and leave
	$(document).on('mouseenter', '#action', function(){

	   openNav();

	}).on('mouseleave', '#action', function(){

	   closeNav();

	});


	/*
	$(document).on('click', '#send_test_email', function(){

		campaign_name = $('.send_campaign_name').text();

		headline = 'Send <span class="brandColor">'+campaign_name+'</span> as a test email';
		paragraph = 'Enter the email address of the recipiant that should receive the email. ';

		btnTrue = 'Send';
		btnTrueId = 'send_test_mail_send';

		btnFalse = 'Cancel';

		inputField = 'john@do.com';
		inputFieldId = 'send_test_mail_value';

		openPopup();


	});

	$(document).on('click', '#send_test_mail_send[value="Send"]', function(){

		campaign_id = $('[data-campaign]').attr('data-campaign');
		receiver = $('#send_test_mail_value').val();
		signature = $('[name="signature"]').val();
		l = $('#send_test_mail_value').val().length;

		if(l > 4){

			$(this).val('Sending..');

			$.ajax({
			    type: "POST",
			    dataType: "html",
			    url: "https://www.stampready.net/send/test_mail.php",
			    data: {campaign_id: campaign_id, receiver: receiver, signature: signature }
			}).done(function(data) {

				notificationContent = 'Test email has been sent to '+receiver;
				notificationColor = "#69c0af";

				closePopup();
				setTimeout(function(){
					notification();

					$('#send_test_mail_send').val('Send');

				}, 500);

			});

		}

		else {

			notificationContent = 'Invalid email address';
			notificationColor = "#ea5a5b";

			notification();


		}

	});
*/

	$('#templates li[data-price="STARTER_KIT"], #templates li[data-price="XMAS16"]').each(function(){

		//variables
		subscription = $('#main').attr('data-subscription');

		if(subscription !== 'SUBSCRIPTION') {

			$(this).find('.template').append('<div class="template-ribbon semi_bold"><span class="fa fa-lock"></span></div>');

		}

	})

	//remove imported template
	$(document).on('click', '.remove-imported-template', function(){

		//variables
		template_name = $(this).closest('.template_overlay').find('.name').text();
		campaign_id = $(this).closest('li').attr('data-campaign-id');

		headline = 'You are about to delete <span>'+template_name+'</span>';
		paragraph = 'Deleting one of your imported templates won\'t remove any of your created campaigns. This action can\'t be undone.';

		btnTrue = 'Delete Template';
		btnTrueId = 'remove_template_btn_confirm';

		btnFalse = 'Cancel';

		openPopup();

	});

	//remove imported template confirm button
	$(document).on('click', '#remove_template_btn_confirm', function(){

		$.ajax({
		    type: "POST",
		    dataType: "html",
		    url: "",
		    data: {
		        campaign_id: campaign_id
		    }
		}).done(function(data) {

			if(data == 'success'){

				closePopup();

				//wait a little for the popup to close and then remove the template
				setTimeout(function(){

					$('[data-campaign-id="'+campaign_id+'"]').fadeOut(250, function() {

						$('[data-campaign-id="'+campaign_id+'"]').remove();

						count = $('[data-price="IMPORTED"]').size();

						if(count == 0){ $('.empty_campaigns').remove(); $('#mainWrapper ul').before('<div class="empty_campaigns" style="font-size: 34px; color: #4a4a4a; z-index: 9999; display: none;"><a class="semi_bold import_by_zip" style="padding: 18px 38px; font-size: 13px; margin: auto; cursor: pointer;">Import ZIP file</a></div>'); $('.empty_campaigns').fadeIn(300); }

					});

				}, 500)

			}

		});

	})

	//Mouse enter template
	$('#templates').on('mouseenter', '.template', function() {

		//variables
		name = $(this).parent().attr('data-name');
		price = $(this).parent().attr('data-price');
		available = $(this).parent().attr('data-available');
		demo = $(this).parent().attr('data-demo');
		checkout = $(this).parent().attr('data-checkout');
		subscription = $('#main').attr('data-subscription');
		trial = $('#credits').attr('data-trial');

		//Prepend overlay on template image */
		$(this).prepend('<div class="template_overlay"><div class="name">'+name+'</div><div class="buy">Upgrade to <span class="price">'+price+'</span></div><div class="availability semi_bold">Available with <span>'+available+' plan</span></div></div>');
		$('.template_overlay').slideDown(200);
		$(this).find('.price').css('-webkit-transform','scale(1)');
		$(this).find('.price').each(function(){

			if( $(this).text().indexOf('Bronze') >= 0 ) {

				if(subscription == 'Bronze' || subscription == 'Silver' || subscription == 'Gold' || subscription == 'Platinum'){

					$(this).closest('li').find('.demo').remove();
					$(this).closest('li').find('.buy').text('Preview Template').addClass('ready');

				}
				
				



				else {

					$(this).closest('li').find('.buy').addClass('target');

				}

			}
			
			else if( $(this).text().indexOf('Silver') >= 0 ) {

				if(subscription == 'Silver' || subscription == 'Gold' || subscription == 'Platinum'){

					$(this).closest('li').find('.demo').remove();
					$(this).closest('li').find('.buy').text('Preview Template').addClass('ready');

				}
				
				else {

					$(this).closest('li').find('.buy').addClass('target');

				}

			}
			
			else if( $(this).text().indexOf('Gold') >= 0 ) {

				if(subscription == 'Gold' || subscription == 'Platinum'){

					$(this).closest('li').find('.demo').remove();
					$(this).closest('li').find('.buy').text('Preview Template').addClass('ready');

				}
				
				else {

					$(this).closest('li').find('.buy').addClass('target');

				}

			}
			
			else if( $(this).text().indexOf('Platinum') >= 0 ) {

				if(subscription == 'Platinum'){

					$(this).closest('li').find('.demo').remove();
					$(this).closest('li').find('.buy').text('Preview Template').addClass('ready');

				}
				
				else {

					$(this).closest('li').find('.buy').addClass('target');

				}

			}


			else {

				$(this).closest('li').find('.buy').addClass('target');

			}

		});

	}).on('mouseleave', 'li', function() {

		//Hide overlay first
		$(this).find('.price .demo').css('-webkit-transform','scale(1.1)');
	   	$('.template_overlay').remove();

	});
	
	$('#templates li[data-price="Silver"]').each(function(){
		subscription = $('#main').attr('data-subscription');
		if(subscription == 'Bronze') {
			$(this).find('.template').append('<div class="template-ribbon"><span class="fa fa-lock"></span></div>');

		}

	})
	
	$('#templates li[data-price="Gold"]').each(function(){
		subscription = $('#main').attr('data-subscription');
		if(subscription == 'Bronze' || subscription == 'Silver') {
			$(this).find('.template').append('<div class="template-ribbon"><span class="fa fa-lock"></span></div>');

		}

	})
	
	$('#templates li[data-price="Platinum"]').each(function(){
		subscription = $('#main').attr('data-subscription');
		if(subscription == 'Bronze' || subscription == 'Silver' || subscription == 'Gold') {
			$(this).find('.template').append('<div class="template-ribbon"><span class="fa fa-lock"></span></div>');

		}

	})

	//Buy template on click
	$('#templates').on('click', '.buy', function() {

		if($(this).hasClass('target')){

			
			//Change location of address bar
			$(location).attr('href','/app/account/billing-plan');

		}

		else {

			//Get link
			link = $(this).parent().parent().parent().attr('data-checkout');

			//Change location of address bar
			$(location).attr('href',link);

		}

	});

	//import file
	$(document).on('click', '.import_by_file', function(e) {

		$('#images').prop('accept','text/html');
		$('#images').trigger('click');
		e.stopPropogation();

	});





	//on text area change for code method
	$(document).on('change', '#by_code_popup_textarea', function(){

		code = $(this).val();

		$('#by_code_textarea').val(code);

	});

	//redirect to preview page
	$(document).on('click', '#import_by_code_popup_button', function(){

		$('#import_by_code_button').trigger('click');

	})

	//redirect to preview page
	$(document).on('click', '#import_by_url_popup_button', function(){

		url = $('#by_url_popup_field').val();

		$(location).attr('href','http://www.stampready.net/dashboard/preview/index.php?byurl=true&url='+encodeURIComponent(url));

	})

	//Demo template on click
	$('#templates').on('click', '.demo', function(e) {

		//Get link
		link = $(this).parent().parent().parent().attr('data-demo');
		name = $(this).parent().parent().parent().attr('data-name');

		if($(this).hasClass('target')){

			//Change location of address bar
			window.open(link);

		}

		else {

			//Change location of address bar
			$(location).attr('href',link);

		}

		//Prevent standard functions
		e.stopPropagation();

	});

	//side actions
	$(document).on('mouseenter', '.actions div:not(.send, .analytics, .view_invoice)', function(){

		attr = $(this).attr('class');
		str = attr.replace("active", "").replace("_sub", "");
		str = str.replace('_', ' ');
		$(this).text(str);

		$(this).addClass('active');
		$('.actions .send, .actions .analytics, .actions .view_invoice').addClass('active');

	}).on('mouseleave', '.actions div', function(){

		$('.actions div:not(.send, .analytics, .view_invoice)').removeClass('active').text('');
		$('.actions .send, .actions .analytics, .actions .view_invoice').removeClass('active');

	});

	//closePopup
	$(document).on('click', '.cancelPop', function(){

		closePopup();

	});

	//delete campaign
	$(document).on('click', '.delete', function() {

		$(this).parent().parent().addClass('active');

		campaign_name = $(this).parent().parent().find('input[type="text"]').val();

		headline = 'You are about to delete <span>'+campaign_name+'</span>';
		paragraph = 'Your template will be deleted. Once deleted, you can\'t recover it.';

		btnTrue = 'Yes, delete campaign';
		btnTrueId = 'delete_campaign';

		btnFalse = 'No, keep campaign';

		openPopup();


	});

	$(document).on('click', '.scheduled', function(){

		$('#mainWrapper ul li').removeClass('active');
		$(this).closest('li').addClass('active');

		headline = 'This campaign has been scheduled';
		paragraph = 'Although it is scheduled, would you like to send your campaign now?';

		btnTrue = 'Send campaign now';
		btnTrueId = 'send_campaign_now';

		btnFalse = 'Keep it scheduled';

		openPopup();

	});

	//Send Campaign Now
	$(document).on('click', '#send_campaign_now', function(){

		campaign_id = $('#mainWrapper ul li.active').attr('data-id');

		$.ajax({
		    type: "POST",
		    dataType: "html",
		    url: "",
		    data: {
		        campaign_id: campaign_id
		    }
		}).done(function(data) {

			closePopup();

			if(data == 'success'){

				setTimeout(function(){

					notificationContent = 'Campaign is not scheduled anymore';
					notificationColor = "#69c0af";

					notification();

				}, 500)

			}

			setTimeout(function(){

				$(location).attr('href','index.php');

			}, 3750)

		});

	});

	//cancel campaign
	$(document).on('click', '.cancel', function() {

		$(this).parent().parent().addClass('active');

		campaign_name = $(this).parent().parent().find('input[type="text"]').val();

		headline = 'Are you sure you want to cancel <span>'+campaign_name+'</span>';
		paragraph = 'Your campaign will be moved to your drafts.';

		btnTrue = 'Cancel Scheduled Campaign';
		btnTrueId = 'cancel_scheduled_campaign';

		btnFalse = 'Nevermind';

		openPopup();

	});

	$(document).on('click', '.duplicate', function() {

		$(this).parent().parent().addClass('active');

		previous_name = $(this).parent().parent().find('input[type="text"]').val();

		headline = 'You are about to duplicate <span>'+previous_name+'</span>';
		paragraph = 'The duplicated campaign will be added to the top of your Drafts.';

		btnTrue = 'Duplicate campaign';
		btnTrueId = 'create_duplicate_campaign';

		btnFalse = 'Cancel';

		inputField = 'Campaign Name';
		inputFieldId = 'duplicate_campaign_name';

		openPopup();

	});

	//cancel campaign script
	$(document).on('click', '#cancel_scheduled_campaign', function(){

		campaign = $('#mainWrapper ul li.active');
		campaign_id = $('#mainWrapper ul li.active').attr('data-id');

		$.ajax({
		    type: "POST",
		    dataType: "html",
		    url: "",
		    data: {
		        campaign_id: campaign_id
		    }
		}).done(function(data) {

			closePopup();

			if(data == 'success'){

				//hide list
				$('[data-id="'+campaign_id+'"]').slideUp();

				setTimeout(function(){

					notificationContent = 'Campaign has been cancelled';
					notificationColor = "#69c0af";

					notification();

				}, 750)

			}

			else {

				closePopup();

				setTimeout(function(){

					notificationContent = 'Sorry, your campaign has just been sent';
					notificationColor = "#ea5a5b";

					notification();

				}, 750)

			}

			setTimeout(function(){

				$(location).attr('href','index.php');

			}, 3750)

		});

	});

	//duplicate campaign script
	$(document).on('click', '#create_duplicate_campaign', function(){

		$('#drafts, #drafts_result').show();
		$('#empty_list').remove();

		campaign = $('#mainWrapper ul li.active');
		campaign_id = $('#mainWrapper ul li.active').attr('data-id');
		campaign_name = $('#duplicate_campaign_name').val();
		campaign_nc = $('#mainWrapper ul li.active').attr('data-nc');

		$.ajax({
		    type: "POST",
		    dataType: "html",
		    url: "",
		    data: {
		        campaign_id: campaign_id, campaign_name: campaign_name
		    }
		}).done(function(data) {

			if($("#list_name_bar > h2 > b:contains('Sent')").length) {

				closePopup();

				setTimeout(function(){

					$(location).attr('href','https://www.stampready.net/dashboard/drafts/index.php');

				}, 500);

			}

			else {

				var d = new Date();

				var month = d.getMonth()+1;
				var day = d.getDate();

				var output = d.getFullYear() + '/' +
				    ((''+month).length<2 ? '0' : '') + month + '/' +
				    ((''+day).length<2 ? '0' : '') + day;

				if(campaign_name == ''){

					campaign_name = previous_name;

				}

				$('#drafts').prepend('<li data-id="'+data+'" data-nc="'+campaign_nc+'"><label><input type="checkbox"><a></a></label><input type="text" value="'+campaign_name+'" class="campaign_name regular"><h4 class="regular">'+output+'</h4><div class="actions semi_bold"><a href="https://www.stampready.net/dashboard/send/index.php?campaign_id='+data+'"><div class="send" name="'+data+'">Send</div></a><div class="delete" name="'+data+'"></div><div class="export" name="'+data+'"></div><div class="duplicate" name="'+data+'"></div><div class="edit" name="'+data+'"></div></div></li>');

				$('[data-nc="1"]').find('.edit').css('background-image','url(../img/icons/view-icon.png)').attr('class','view');
				closePopup();

				setTimeout(function(){

			    	if ($('.cat:contains("Drafts")').length > 0) {

			    		//Initialise drafts and sent number
						data_count  = $('#drafts li').size();

			    	}

			    	else {

				    	//Initialise drafts and sent number
						data_count  = $('#sent li').size();

			    	}

					$('#list_name_bar h2 span b').text(data_count);

				}, 500);

			}

		});

	});


	$(document).on('click', '#delete_campaign', function(){

	 	campaign = $('#mainWrapper ul li.active');
		campaign_id = $('#mainWrapper ul li.active').attr('data-id');

		if(author_templates == 1){

			link = '';

		}

		else {

			link = 'h';

		}

		$.ajax({
		    type: "POST",
		    dataType: "html",
		    url: link,
		    data: {
		        campaign_id: campaign_id
		    }
		}).done(function(data) {

			closePopup();
			setTimeout(function(){

				$(campaign).slideUp('200', function() {

					$(this).remove();
					emptyCampaignCheck();

					if ($('.cat:contains("Drafts")').length > 0) {

			    		//Initialise drafts and sent number
						data_count  = $('#drafts li').size();

			    	}

			    	else if ($('.cat:contains("Author Demos")').length > 0) {

			    		//Initialise drafts and sent number
						data_count  = $('#live_previews li').size();

			    	}

			    	else {

				    	//Initialise drafts and sent number
						data_count  = $('#sent li').size();

			    	}

					$('#list_name_bar h2 span b').text(data_count);


				});

			}, 300)

		});

	});


	$(document).on('click', '.delete_multi_campaigns', function(){

		$('#campaigns input:checked').each(function(){

		 	campaign = $(this).parent().parent();
		 	campaign_id = $(this).parent().parent().attr('data-id');

		 	if ($('.cat:contains("Author Demos")').length > 0) {

			 	link = '';

		 	}

		 	else {

			 	link = '';

		 	}

			 $.ajax({
			    type: "POST",
			    dataType: "html",
			    url: link,
			    data: {
			        campaign_id: campaign_id
				}
			 })

			 closeNav();

			 $(campaign).slideUp('200', function() {

				$(this).remove();
				emptyCampaignCheck();

				if ($('.cat:contains("Drafts")').length > 0) {

		    		//Initialise drafts and sent number
					data_count  = $('#drafts li').size();

		    	}

		    	else if ($('.cat:contains("Sent")').length > 0) {

			    	//Initialise drafts and sent number
					data_count  = $('#sent li').size();

		    	}

		    	else if ($('.cat:contains("Author Demos")').length > 0) {

			    	//Initialise drafts and sent number
					data_count  = $('#live_previews li').size();

		    	}

				$('#list_name_bar h2 span b').text(data_count);
				$('.campaigns_action, .campaigns_action h3').addClass('disable');

			});

		});

	});

	$(document).on('click', '.select_all_checkboxes span', function(){

		if($(this).hasClass('active')){

			$('.select_all_checkboxes span').text('Select All');
			$('.select_all_checkboxes span').removeClass('active')

			$('#drafts, #sent, #edit-urls-images, #live_previews').find('li').each(function(){

				$(this).find('input[type="checkbox"]').attr('checked', false);
				$(this).find('a').removeClass('checked');
				$('.campaigns_action, .campaigns_action h3').addClass('disable');

			})

		}

		else {

			$('.select_all_checkboxes span').text('Deselect All')
			$('.select_all_checkboxes span').addClass('active');

			$('#drafts, #sent, #edit-urls-images, #live_previews').find('li').each(function(){

				$(this).find('input[type="checkbox"]').attr('checked', true);
				$(this).find('a').addClass('checked');
				$('.campaigns_action, .campaigns_action h3').removeClass('disable');

			})

		}

	});


	$(document).on('click', '.duplicate, .delete', function(){

		$('#actions div').removeClass('active');
		$(this).addClass('active');

	});


	$(document).on('click', '.edit', function() {

		if($(this).is('#edit_author_demo')){ return false; }

		id = $(this).parent().parent().attr('data-id');

		$(location).attr('href','http://www.stampready.net/dashboard/editor/index.php?campaign_id='+id);

	});

	$('#sent, #drafts').on('click', '.view', function(e) {

		e.stopPropagation();

		id = $(this).closest('li').attr('data-id');

		window.open('http://www.stampready.net/dashboard/online/index.php?id='+id, '_blank');

	});

	$('#sent, #drafts').on('click', '.urls', function(e) {

		e.stopPropagation();

		id = $(this).attr('name');

		$(location).attr('href','https://www.stampready.net/dashboard/sent/edit/index.php?campaign_id='+id);

	});

	$(document).on('keypress', '.campaign_name', function(e) {

		if(e.which == 13) {

			$(this).blur();

		}

	});

	$(document).on('click', '.export', function(){

		$(this).parent().parent().addClass('active');

		campaign_name = $(this).parent().parent().find('input[type="text"]').val();
		campaign_id = $(this).parent().parent().attr('data-id');

		headline = 'You are about to export <span>'+campaign_name+'</span>';
		paragraph = 'Keep the images of your template online or include them in a folder.';

		btnTrue = 'Keep images online';
		btnTrueId = 'online_export';

		btnTrue2 = 'Include in folder';
		btnTrueId2 = 'offline_export';

		inputField = 'Template Name';
		inputFieldId = 'template_name'

		openPopup();

		$('#campaign_id_form').val(campaign_id);

	});

	$(document).on('click', '#online_export', function(){

   		template_name = $('#template_name').val();

   		$('#template_name_form').val(template_name);

   		$('#hiddenform').attr('action','');

   		$('#downloadTemplate').trigger('click');

   		closePopup();

   	});

	$(document).on('click', '#offline_export', function(){

		template_name = $('#template_name').val();

		$('#template_name_form').val(template_name);

		$('#hiddenform').attr('action','');

		$('#downloadTemplate').trigger('click');

		closePopup();

	});

   	$(document).on('click', '#update_details', function(){

		if($(this).hasClass('button_active')){

			headline = 'We need your current password';
			paragraph = 'To verify you are the owner of the account.';

			btnTrue = 'Update Details';
			btnTrueId = 'update_info';

			customHtml  = '<input type="password" placeholder="Current Password" name="cur_pass" id="password_current" class="inputField">';

			btnFalse = 'Cancel';

			openPopup();

		}

	});

	//Report bug
  	$(document).on('click', '#reportIssue', function(){

  		headline = 'Have we made a mistake?';
	  	paragraph = 'Please, let us know what happened and how we can replicate the error.';

	  	btnTrue = 'Send Issue report';
	  	btnTrueId = 'sendIssueReport';

	  	btnFalse = 'No, nevermind';

	  	customHtml = '<textarea id="report"></textarea>';

	  	openPopup();

  	});

  	$(document).on('click', '#sendIssueReport', function(){

	  	report = $('#report').val();

	  	closePopup();

	  	$.ajax({
	            type: "POST",
	            dataType: "html",
	            url: "",
	            data: {report: report}
        }).done(function(data) {

			setTimeout(function(){

				notificationContent = 'Thank\'s for contacting. We\'ll reply as soon as possible.';
				notificationColor = "#69c0af";

				notification();

			}, 500)

        });

  	})

	$(document).on('click', '#update_info', function(){

		username_change = $('#username_change').val();
		email_change = $('#email_change').val();
		password_change = $('#password_change').val();
		password_current = $('#password_current').val();

		$.ajax({
			    type: "POST",
			    dataType: "html",
			    url: "",
			    data: { username_change: username_change, email_change: email_change, password_change: password_change, password_current: password_current }
			}).done(function(data) {

	            if (data == '1') {
	                closePopup();
	                notificationContent = "Your info has been updated";
	                notificationColor = "#69c0af";
	                setTimeout(function(){
	                	notification();

	                	setTimeout(function(){

		                	$(location).attr('href','index.php')

	                	}, 2000)

	                }, 500);
	            }

	            else if (data == '2') {

	                notificationContent = "Wrong current password";
	                notificationColor = "#ea5a5b";
	                notification();
	            }

	             else if (data == '3') {

	                notificationContent = "This email address is already in use";
	                notificationColor = "#ea5a5b";
	                notification();
	                closePopup();
	                $('#email_change').val('').focus();

	            }

	            else if (data == '4') {

	            	 notificationContent = "Invalid email address";
		             notificationColor = "#ea5a5b";
					 notification();
					 closePopup();
					 $('#email_change').val('').focus();

	            }

	            else if (data == '5') {

		            notificationContent = "This username seems invalid;";
	                notificationColor = "#ea5a5b";
	                notification();
	                closePopup();
	                $('#username_change').val('').focus();

		        }


			});

	})

	$('#account_view input[type="text"], #account_view input[type="password"]').keypress(function(){

		$('#update_details').removeClass('button').addClass('button_active');

	});

	$('.delete_account a').click(function(){

		if ($('.cancel_paypal_plan').length > 0) {

			$('#info_layer h2, #info_layer p').hide();
			$('#info_layer [data-type="delete_paypal"]').show();
			$('#info_layer').fadeIn(200);
			$('.login_paypal').closest('p').hide();
			return false;

		}

		headline = 'Did we screw up?';
		paragraph = 'To delete your account, you need to verify your password.';

		btnFalse = 'No, keep my account';
		invert = true;

		customHtml = '<form action="" method="post"><input type="password" name="password" placeholder="Current Password"><input type="submit" name="delete_account" class="btnTrue semi_bold" value="Remove My Account" style="left: 0px;"></form>'

		openPopup();


	});

	//Enter amount of credits
	$('#define_amount').keyup(function(){

		//vars
		val = $(this).val();
		val = val.toString().replace(/\./g, '');
		original = val * 0.02;

		//If under 5000
		if(val < 5000){

			price = (val * 0.02).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
			bare = val * 0.02;
			save = (original - bare).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

		}

		//Else above 4999 and below 49999
		else if(val > 4999 && val <50000){

			price = (val * 0.015).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
			bare = val * 0.015;
			save = (original - bare).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

		}

		//Else above 49999 and below 199999
		else if(val > 49999 && val <200000){

			price = (val * 0.01).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
			bare = val * 0.01;
			save = (original - bare).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

		}

		//Else above 199999 and below 1999999
		else if(val > 199999 && val <2000000){

			price = (val * 0.005).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
			bare = val * 0.005;
			save = (original - bare).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

		}

		//Else
		else {

			//vars
			price = (val * 0.002).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
			bare = val * 0.002;
			save = (original - bare).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

		}

		$('#define_amount_price').text('$'+price);
		$('#define_amount_savings').text('$'+save);

	});


	$('.credits_list').on('mouseenter', '.clear-fix', function(e) {

		$('.cell_buy_active').attr('class','cell_buy semi_bold');
		$(this).find('.cell_buy').attr('class','cell_buy_active semi_bold');

	}).on('mouseleave', 'li', function(e) {

		$('.cell_buy_active').attr('class','cell_buy semi_bold');

	});

	$('#credits_bar .actions').on('click', '.purchase_plan', function(e) {

		amount = $('#define_plan3 span').text().toString().replace(/\,/g, '');

		$(location).attr('href','https://www.stampready.net/dashboard/checkout/index.php?plan=sr_plan'+amount);

	});

	$(document).on('click', '.purchase_plan_plan', function() {

		el = $(this);

		if($(this).hasClass('upgrade')){

			plan_name = $(el).closest('[data-plan]').find('#define_plan2 span').text();

			headline = 'You are about to upgrade to Plan '+plan_name;
			paragraph = 'We\'ll prorate your current plan to your new plan and the difference will be charged.';

			btnTrue = 'Confirm Upgrade';
			btnTrueId = 'confirm_plan_switch';

			btnFalse  = 'Cancel';

			openPopup();

			return false;

		}

		else if($(this).hasClass('downgrade')){

			plan_name = $(el).closest('[data-plan]').find('#define_plan2 span').text();

			headline = 'You are about to downgrade to Plan '+plan_name;
			paragraph = 'Your new plan will change immediately.';

			btnTrue = 'Confirm downgrade';
			btnTrueId = 'confirm_plan_switch';

			btnFalse  = 'Cancel';

			openPopup();

			return false;

		}

		amount = parseInt($(this).closest('[data-plan]').find('#define_plan2 span').text().toString().replace(/\,/g, ''));
		subs = parseInt($('#list_name_bar b').attr('data-unique-subscribers').replace(/,/g, ''));

		if(subs > amount){

			notificationContent = 'You have too many subscribers for this plan';
			notificationColor = "#ea5a5b";

			notification();

			return false;

		}

		$(location).attr('href','https://www.stampready.net/dashboard/checkout/index.php?plan=sr_plan'+amount);

	});

	$(document).on('click', '#confirm_plan_switch', function(){

		if(disableFlag == 1){

			return false;

		}

		disableFLag = 1;
		$('#confirm_plan_switch').val('Switching..')

		$.ajax({
		    type: "POST",
		    dataType: "html",
		    url: "",
		    data: { plan_name: plan_name }
		}).done(function(data) {

			notificationContent = 'We have '+data+' your plan.';
			notificationColor = "#69c0af";

			closePopup();

			setTimeout(function(){

				notification();
				disableFLag = 0;

				setTimeout(function(){

					$(location).attr('href','index.php');

				}, 2000);

			}, 500)

		});

	});

	$('#credits_bar .actions').on('click', '.purchase_credits', function(e) {

		amount = $('#define_plan span').text().toString().replace(/\,/g, '');

		$(location).attr('href','https://www.stampready.net/dashboard/checkout/index.php?credits='+amount);

	});

	$('#row_list li').on('click', '.cell_buy_active', function(e) {

		amount = $(this).parent().find('.cell_email .semi_bold').text();
		reg = amount.toString().replace(/\,/g, '');

		$(location).attr('href','https://www.stampready.net/dashboard/checkout/index.php?credits='+reg);

	});

	//Add subscriber bar
	$(document).on('click', '.create_new_list, .add_list', function(e){

		e.stopPropagation();

		openCreateNewList();

	});

	//unblock
	$(document).on('click', '.unblock_sub', function(){

		sub_id = $(this).closest('li').attr('data-id');
		sub_row = $(this).closest('li');
		sub_email = $(this).closest('li').find('.subscriber_email_address .subscriber_email_original').text();
		el = $(this).closest('li');

		headline = 'You are about to unblock <span>'+sub_email+'</span>';
		paragraph = 'Choose one of the options below in order to continue.';

		dropDownItems = {
			'unblock_subscriber[][false]': 'Unblock subscriber from this list',
			'unblock_subscriber_all[][false]': 'Unblock subscriber from all my lists'
		};

		btnTrue = 'Unblock Subscriber';
		btnTrueId = 'unblock_subscriber';

		btnFalse = 'Nevermind';

		openPopup();

	});

	$(document).on('click', '#block-subscriber', function(){

		option = $('[data-dropdown-item-present]').attr('data-dropdown-item-present');
		all_lists = '';
		list = $('#list_name_bar > h2 > b').text();

		if(option == 'block_subscriber_all'){ all_lists = 'active'; }

		$.ajax({
            type: "POST",
            dataType: "html",
            url: "",
            data: {
	            email: sub_email, list: list, all_lists: all_lists
            }
        }).done(function(data) {

	        closePopup();

	        setTimeout(function(){

				//animate the avatar to the corresponding tab
	        	animateAvatar('[data-tab-url="blocked"]');

	        	setTimeout(function(){

		        	$(el).slideUp(250, function() {

				        $(this).remove();

				        list_count = parseInt($('#row_list li').size());

			        	if(list_count < 1) {

				        	$('#row_list').html('<div id="empty_list"><a class="semi_bold brandBgColor embed_form">Form Editor</a><a class="semi_bold brandBgColor import_csv">Import CSV/XLS</a><a class="semi_bold brandBgColor add_subscriber_open">Add Subscriber</a></div>');

			        	}

			        	//increase tab number
						modifyTabNumber('[data-tab-url="all"]', 'dec');

				    });

	        	}, 1500);

	        }, 500)

	    });

	});

	//make subscriber vip
	$(document).on('click', '.make_vip_sub', function() {

		sub_id = $(this).closest('li').attr('data-id');
		el = $(this).closest('li');
		sub_email = $(this).closest('li').find('.subscriber_email_address .subscriber_email_original').text();

		headline = 'Make <span>'+sub_email+'</span> a VIP';
		paragraph = 'Choose one of the options below to continue.';

		dropDownItems = {
			'make_vip[][false]': 'Make subscriber VIP in current list',
			'make_vip_all_lists[][false]': 'Make subcriber VIP in all my lists'
		};

		btnTrue = 'Make VIP';
		btnTrueId = 'confirm_action_button';

		btnFalse = 'Nevermind';

		openPopup();

	});

	$(document).on('click', '#confirm_action_button', function(){

		option = $('[data-dropdown-item-present]').attr('data-dropdown-item-present');

		//action to subscriber
		actionToSubscriber(option);

	})

	//undo subscriber vip
	$(document).on('click', '.undo_vip_sub', function() {

		sub_id = $(this).closest('li').attr('data-id');
		el = $(this).closest('li');
		sub_email = $(this).closest('li').find('.subscriber_email_address .subscriber_email_original').text();

		headline = 'Undo <span>'+sub_email+'</span> as VIP';
		paragraph = 'Choose one of the options below to continue.';

		dropDownItems = {
			'undo_vip[][false]': 'Undo subscriber as VIP in current list',
			'undo_vip_all_lists[][false]': 'Undo subcriber as VIP in all my lists'
		};

		btnTrue = 'Undo as VIP';
		btnTrueId = 'confirm_action_button';

		btnFalse = 'Nevermind';

		openPopup();

	});

	//Delete sub notification
	$('#row_list').on('click', '.delete_sub', function() {

		sub_id = $(this).closest('li').attr('data-id');
		sub_row = $(this).closest('li');
		sub_email = $(this).closest('li').find('.subscriber_email_address .subscriber_email_original').text();
		el = $(this).closest('li');

		headline = 'You are about to delete <span>'+sub_email+'</span>';
		paragraph = 'Choose one of the items below for more options.';

		dropDownItems = {
			'delete_subscriber[][false]': 'Remove subscriber from current list',
			'delete_subscriber_all[][false]': 'Remove subscriber from all your lists'
		};

		btnTrue = 'Delete Subscriber';
		btnTrueId = 'confirm_action_button';

		btnFalse = 'Nevermind';

		openPopup();

	});

	//delete searched query button
	$(document).on('mousedown', '.search_delete', function(){

		//remove close button
		$('.search_delete').remove();

		//clear value
		$('#search_bar').val('');
		$('#search_bar').trigger('keyup');

	});

	//blur gravatar
	$(document).on('blur', '.add_email_gravatar', function(){

		val = $(this).val();

		if(!val == ''){

			$('#sub_data_info').find('img').remove();
			$('#sub_data_info').append($.gravatar(val));

			a = $('#sub_data_info').find('img').attr('src');
			$('#sub_data_info').find('img').attr('src', a+'d=https%3A%2F%2Fwww.stampready.net%2Fdashboard%2Fimg%2Fframework%2Fdefault.png');

		}

	});

	//block subscriber
	$(document).on('click', '.block_sub', function(){

		el = $(this).closest('li');
		sub_id = $(this).closest('li').attr('data-id');
		sub_row = $(this).closest('li');
		sub_email = $(this).closest('li').find('.subscriber_email_address .subscriber_email_original').text();

		//create popup
		headline = 'Would you like to block <span>'+sub_email+'</span>';
		paragraph = 'Blocked subscribers not receive any of your campaigns and are not allowed to sign up to your form anymore. Blocked subscribers will not be re-added on importation.';

		btnTrue = 'Block Subscriber';
		btnTrueId = 'block-subscriber';

		btnFalse = 'Nevermind';

		dropDownItems = {
			'block_subscriber[][false]': 'Block subscriber',
			'block_subscriber_all[][false]': 'Block subscriber to all my lists',
		};

		openPopup();

	});

	//delete subscriber script
	$(document).on('click', '#delete_subscriber', function(){

		//variables
		option = $('[data-dropdown-item-present]').attr('data-dropdown-item-present');

        $.ajax({
            type: "POST",
            dataType: "html",
            url: "",
            data: {
	            subscriber_id: sub_id, option, option, sub_email: sub_email
            }
        }).done(function(data) {

        	closePopup();

        	$('[data-id="'+sub_id+'"]').each(function(){

	        	el = $(this);

	        	$(el).slideUp(500, function(){

		        	$(this).remove();

	        	});

        	});

        	setTimeout(function(){

	        	$('#search_bar').val('');
				$('#search_bar').trigger('keyup');

	        	list_c = $('.tabs_all_active').text().replace(new RegExp(',', 'g'), '');
	        	list_c = parseInt(list_c);
	        	list_count = list_c - 1;

	        	list_c_2 = $('#list_name_bar h2 span b').text().replace(new RegExp(',', 'g'), '');
	        	list_c_2 = parseInt(list_c_2);
	        	list_count_2 = list_c_2 - 1;

	        	if(list_count < 1) {

		        	$('#row_list').html('<div id="empty_list"><a class="semi_bold brandBgColor embed_form">Embed Form</a><a class="semi_bold brandBgColor import_csv">Import CSV/XLS</a><a class="semi_bold brandBgColor add_subscriber_open">Add Subscriber</a></div>');

	        	}

	        	$('#list_name_bar h2 span b').text(list_count_2.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,").slice(0,-3));
	        	$('.tabs_all_active').text(list_count.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,").slice(0,-3));

        	}, 550)

		});

	});


});
0
