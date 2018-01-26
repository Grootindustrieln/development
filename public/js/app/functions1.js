//each list, fetch gravatar
$(document).find('#logo').each(function(){
	
	//vars
	email = $(this).attr('data-avatar');
	
	//find data and add gravatar
	$(this).append($.gravatar(email));
	
	//fetch img src
	a = $(this).find('img').attr('src');
	//a = a.replace("http", "https")
	
	//add stampready default icon
	$(this).find('img').attr('src', a+'d=https%3A%2F%2Fwww.stampready.net%2Fdashboard%2Fimg%2Fframework%2Favatar_default_ready.png');
	
});

function openPopup() {

	$('body').css('overflow','hidden');
	$('#popupOverlay').remove();
	
	$tmp = $('<div></div>');
	
	if (typeof btnTrueFunction === 'undefined') { btnTrueFunction = false; } else {
	    
	    btnTrueFunction = ' onclick="'+btnTrueFunction+'"';
	    
	}
	
	if(typeof headline === 'undefined'){}
	else { $tmp.append('<h3 class="bold">'+headline+'</h3>') }
	
	if(typeof paragraph === 'undefined'){}
	else { $tmp.append('<p>'+paragraph+'</p>') }
	
	if(typeof dropDownItems === 'undefined'){}
	else { 

		//variables
		i = false;

		$tmp.append('<div class="dropdown-items noselect"><span>First Item</span><ul class="dropdown-items-list hidden noselect"></ul></div>');
		
		$.each(dropDownItems, function (index, value) {
			
			//variables
			var item = index.substring(0, index.indexOf('['));
			var func = index.split('[')[1].split(']')[0];
			var switch_boolean = index.split('][')[1].split(']')[0];
			
			$tmp.find('.dropdown-items-list').append('<li data-dropdown-item="'+item+'" onclick="'+func+'" data-switch-boolean="'+switch_boolean+'" class="noselect">'+value+'</li>');
			
			//if it's the first list, make it active
			if(!i){
				
				//add the switch, make hide default
				$tmp.append('<div class="switch-holder semi_bold" style="display: none;"><div class="switch disabled popup_switch" data-switch="popup_switch"><div class="switch_thumb active" data-switch-thumb="popup_switch" style="right: 19px;"></div></div>Effect All Lists</div>');
				
				$tmp.find('.dropdown-items span').text(value); $tmp.find('.dropdown-items span').attr('data-dropdown-item-present', item); $tmp.find('[data-dropdown-item]').addClass('active'); $tmp.find('.dropdown-items span').attr('data-switch-boolean',switch_boolean); i = true;
				
				$tmp.find('.popup_switch').css({
					'position':'relative',
					'margin-left':'-50px'
				})
				
				if(switch_boolean == 'true'){ 
				
					$tmp.find('.switch-holder').show();
				
				}
			
			}
			
			
			
		});
		
	}
	
	if(typeof btnTrue === 'undefined'){}
	else { $tmp.append('<input type="button" value="'+btnTrue+'" id="'+btnTrueId+'" class="btnTrue semi_bold" style="left: 0px;"'+btnTrueFunction+'>') }
	
	if(typeof btnTrue2 === 'undefined'){}
	else { $tmp.append('<input type="button" value="'+btnTrue2+'" id="'+btnTrueId2+'" class="btnTrue2 semi_bold" style="right: 0px;">') }
	
	if(typeof btnFalse === 'undefined'){ }
	else { $tmp.append('<input type="button" value="'+btnFalse+'" class="btnFalse semi_bold" style="right: 0px;" onclick="closePopup();">') }
	
	if(typeof textArea === 'undefined'){}
	else { if(typeof textAreaPlaceholder === 'undefined'){ textAreaPlaceholder = ''; } $tmp.append('<textarea id="'+textAreaId+'" class="regular" placeholder="'+textAreaPlaceholder+'"></textarea>') }
	
	if(typeof inputField === 'undefined'){}
	else { if(typeof maxLength === 'undefined'){ maxLength = '50'; } $tmp.append('<input type="text" placeholder="'+inputField+'" id="'+inputFieldId+'" maxlength="'+maxLength+'" class="regular inputField">'); }
	
	if(typeof customHtml === 'undefined'){}
	else { $tmp.append(customHtml) }
	
	content = $tmp.html();
	
	$('body').prepend('<div id="popupOverlay"><div id="popup">'+content+'<div class="closePopup"></div></div>');
	
	setTimeout(function() {

		$('#popupOverlay').css({
			'opacity': '1',
			'transition': '0.46s all ease',	
		});
		
		$('#popup').css({
			'opacity': '1',
			'transition': '0.46s all ease',
			'transform': 'scale(1) translateY(-50%)'
		});
		

		
    }, 50);
	
	btn_size = $('#popup input[type="button"]').size();
	submit_size = $('#popup input[type="submit"]').size();
	size = btn_size + submit_size;
	
	if(size > 1) {
		
		$('#popup input[type="button"], #popup input[type="submit"]').each(function(){
			
			$(this).css('width','50%');
			
		})
		
	}
	
	if(typeof invert === 'undefined'){ }
	else { $('.btnFalse, .btnTrue, #popup input[type="submit"]').addClass('invert'); }
	
	$('#popup input[type="text"], #popup input[type="password"], #popup textarea').focus();
	
	delete window.headline;
	delete window.paragraph;
	delete window.btnTrue;
	delete window.btnTrue2;
	delete window.btnFalse;
	delete window.textArea;
	delete window.inputField;
	delete window.customHtml;
	delete window.invert;
	delete window.textAreaPlaceholder;
	delete window.dropDownItems;
	
	$(document).keyup(function(e){
		
		if (e.keyCode == 27) { 
		
			closePopup();
		
		}
	
	});
	
	$('.inputField, [data-sub-val]').keyup(function(e){
		
		if (e.keyCode == 13) { 
		
			$('.btnTrue').trigger('click');
		
		}
	
	});
	
	$(document).on('click', '#popup', function(){
		
		if ($('.dropdown-items-list').is(":visible")) { 
		
			hideDropdownItems();
			
		}
		
	});
	
	$(document).on('click', '.dropdown-items span', function(e){
		
		e.stopImmediatePropagation();
		
		if ($('.dropdown-items-list').is(":visible")) { 
		
			hideDropdownItems();
			
		}
		
		else {
			
			showDropdownItems();
			
			//variables
			dropDownItemPresent = $(this).attr('data-dropdown-item-present');
			
			$('[data-dropdown-item="'+dropDownItemPresent+'"]').hide();	
			
		}
		
	});
	
	$(document).on('click', '[data-dropdown-item]', function(e){
		
		e.stopImmediatePropagation();
		
		//variables
		dropDownItemText = $(this).text();
		dropDownItemItem = $(this).attr('data-dropdown-item');
		dropDownItemSwitchBoolean = $(this).attr('data-switch-boolean');
		
		$('.dropdown-items span').text(dropDownItemText);
		$('.dropdown-items span').attr('data-dropdown-item-present',dropDownItemItem);
		
		hideDropdownItems();
		
	});
	
}

function closePopup() {

	$('#mainWrapper ul li.active').removeClass('active');
	
	$('#popupOverlay').css({
		'opacity': '0',
	});
	
	$('#popup').css({
		'opacity': '0',
		'transform': 'translateY(-50%) scale(0.8)'
	});
	
	$('.stack').css({
		'transform': 'scale(1)'
	});
	
	setTimeout(function(){
		
		$('body').css('overflow','');
		$('#popupOverlay').remove();
		
	}, 500);
	
}

function notification() {

	$('.notification').remove();
	$('html').prepend('<div class="notification semi_bold" style="background-color: '+notificationColor+'">'+notificationContent+'</div>');
		
	$('.notification').animate({
			
		"height": "show",
		"marginTop": "show",
		"marginBottom": "show",
		"paddingTop": "show",
		"paddingBottom": "show",
		"lineHeight" : '46px'
				
	}, { duration: 500, easing: 'easeOutBack' });
	
	setTimeout(function(){
		
			
		$('.notification').animate({
				
			"height": "hide",
			"marginTop": "hide",
			"marginBottom": "hide",
			"paddingTop": "hide",
			"paddingBottom": "hide",
			"lineHeight" : '0px'
					
		}, { duration: 500, easing: 'easeInBack' });		
	
	}, 2500);
}

//subscription popup
function checkoutPopup(type, amount){
	
	//1. detect if popup sources already installed (stripe and popup css)
	//2. install resources (if necessary)
	//3. detect if user has already a subscription
	//4. detect if user has trial days
	//5. Present correct popup
	
	//initialise, execute & show
	
	//variables
	resourceJsStripe = 'https://js.stripe.com/v1/';
	subscriptionName = $('[data-subscription]').attr('data-subscription');
	trialDays = $('[data-trial-days]').attr('data-trial-days');
	trial = $('[data-trial]').attr('data-trial');

	//if subscription flag is on, cancel 
	if(subscriptionPopupFlag){ return false; }
	
	//detect if resources already installed
	if($('[data-resource]').size() < 1){ 
		
		$.getScript(resourceJsStripe).done(function() {
			
			/* yay, all good, do something */
			$('body').append('<script type="text/javascript" src="https://www.stampready.net/dashboard/js/subscriptionPopup/subscriptionPopup.js" data-resource="stripe"></script>');
		
			//insert dump div
			$('body').prepend('<div id="popup-overlay"></div>');
			
			$('#popup-overlay').load('https://www.stampready.net/dashboard/js/subscriptionPopup/resources/popup.html', function() {
		  
				//initialise type and amount
				initialiseCheckoutPopup(type, amount);
		  
				//show checkout
				showCheckoutPopup(type, amount);
			  
			});
			
		})
		
	}
	
	else {

		//initialise type and amount
		initialiseCheckoutPopup(type, amount);
		
		//show checkout
		showCheckoutPopup(type, amount);
		
	}
	
}

function showDropdownItems(){
	
	dropDownListCount = parseInt($('.dropdown-items-list li').size()) - 1;
	dropDownListHeight = $('.dropdown-items span').height();
	dropDownExtraPadding = (dropDownListCount * dropDownListHeight) + 130;
	
	$('#popup').css('padding-bottom',dropDownExtraPadding+'px');
	$('.switch-holder').fadeOut(100);
	
	$('.dropdown-items-list, [data-dropdown-item]').show();
	
	setTimeout(function(){
		
		$('.dropdown-items-list').css({
			'-webkit-transform': 'scale(1)',
			'opacity': '1'
		});
		
	}, 100);
	
}

function hideDropdownItems(){
	
	$('.dropdown-items-list').css({
		'-webkit-transform': 'scale(0.9)',
		'opacity': '0'
	});
	
	setTimeout(function(){
		
		$('#popup').css('padding-bottom', '130px');
		
	}, 200);
	
	setTimeout(function(){
		
		$('.dropdown-items-list').hide();
		
		if(dropDownItemSwitchBoolean == 'true'){
		
			setTimeout(function(){
			
				$('.switch-holder').css('height','0').css('opacity','0').show();
				$('.switch-holder').animate({
					'height':'22px'
				}, 100);
				
				setTimeout(function(){
					
					$('.switch-holder').animate({
						'opacity':'1'	
					}, 100)
					
				}, 200)
				
			}, 500)	
			
		}
		
	}, 300)
	
}

//animateAvatar
function animateAvatar(element){
	        	
	img = $(el).find('img').attr('src');
	img_w = $(el).find('img').css('width');
	
	x = $(el).find('img').offset().left;
	y = $(el).find('img').offset().top;
	
	vip_w = parseInt($('.vip_tab').css('width'));
	vip_w = (vip_w / 2) - 16;
	
	x_vip = $(element).offset().left + vip_w;
	y_vip = $(element).offset().top;
	
	$('#mainWrapper').css('overflow','hidden');
	
	$('body').prepend('<img src="'+img+'" class="vip_animation" style="left: '+x+'px; top: '+y+'px; width: '+img_w+'; border-radius: '+img_w+'">');
	
	$('.vip_animation').animate({
		
		top: y_vip - 40
		
	}, { duration: 650, queue: false, easing: 'easeInQuad' });
	
	setTimeout(function(){
	
		$('.vip_animation').animate({
		
			top: y_vip
			
		}, { duration: 500, queue: false, easing: 'easeOutQuad' });
	
	}, 740)
	
	$('.vip_animation').animate({
		
		left: x_vip
		
	}, 1300, 'easeInOutQuint', function () {
	
		$('#mainWrapper').css('overflow','auto');
				
		$('.vip_animation').animate({
			
			opacity: 0
			
		}, 200, function () {
				
			$('.vip_animation').remove();
			
			list_c = $(element).find('span').text().replace(new RegExp(',', 'g'), '');
        	list_c = parseInt(list_c);
        	list_count = list_c + 1;
        	
        	$(element).find('span').text(list_count.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,").slice(0,-3));
        	
        	$('#mainWrapper').css('overflow','');
			
		});		
		
	});
	
}

function modifyTabNumber(element, type){
	
	if(type == 'inc'){
		
		list_c = $(element).find('span').text().replace(new RegExp(',', 'g'), '');
    	list_c = parseInt(list_c);
    	list_count = list_c + 1;
    	
    	$(element).find('span').text(list_count.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,").slice(0,-3));
		
	}
	
	if(type == 'dec'){
		
		list_c = $(element).find('span').text().replace(new RegExp(',', 'g'), '');
    	list_c = parseInt(list_c);
    	list_count = list_c - 1;
    	
    	$(element).find('span').text(list_count.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,").slice(0,-3));
		
	}
	
}

//empty list
function emptyList(type){
	
	//variables
	list = $('#list_name_bar > h2 > b').text();
	
	//remove subscribers today
	$(location).attr('href',''+type+'&list='+list)
	
}

function checkEmptySubscribers(type){
	
	//variables
	list_count = parseInt($('#row_list li').size());
	activatedTab = $('.activedTab').attr('data-tab-url');
			        	
	if(list_count < 1) {
		
		//fetch empty state
		empty_state = $('#empty_list').clone();

		//append to canvas
		$('#row_list').html(empty_state);
		
	}
	
}

function getQueryVariable(variable)
{
   var query = window.location.search.substring(1);
   var vars = query.split("&");
   for (var i=0;i<vars.length;i++) {
           var pair = vars[i].split("=");
           if(pair[0] == variable){return pair[1];}
   }
   return(false);
}


function openNav() {
	
	clearTimeout(timerNav);
	
}

function closeNav() {
	
	timerNav = setTimeout(function(){
		$('#action').removeClass('active');
		$('#menu_drop_down').slideUp(200);
	}, 500);
	
}

function isEmail(emailV){
    if(emailV != null && emailV != undefined){
        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        return pattern.test(emailV);    
    }
    else{
        return false;
    }

}

$.preloadImages = function() {
  for (var i = 0; i < arguments.length; i++) {
    $("<img />").attr("src", arguments[i]);
  }
}

function openCreateNewList() {
	
	headline = 'Create A New Subscribers List';
	paragraph = 'A list contains your subscribers. This name will be displayed to<br/>visitors who (un)subscribe.';
	
	btnFalse  = 'Cancel';
	
	customHtml = '<form action="" method="post" id="create_list_submit"><input type="text" name="list_name" placeholder="List Name" class="regular"><input type="submit" id="create_list_button" name="add_list" class="semi_bold" value="Create List" style="left: 0px"></form>';
	
	openPopup();
	
}

//change campaign name
function changeCampaignName(id, name) {
	
	if(!nameHasChanged){
		
		return false;
		
	}
	
	nameHasChanged = false;
	
	if(name == ''){
		
		notificationContent = 'The campaign name can\'t be empty';
		notificationColor = "#ea5a5b";
		
		notification();
		
		return false;
		
	}
	
	//ajax connection
	$.ajax({
	    type: "POST",
	    dataType: "html",
	    url: "",
	    data: { id: id, name: name }
	}).done(function(data) {
		
		//if success
		if(data == 'success'){
			
			notificationContent = 'The name of your campaign has been updated';
			notificationColor = "#69c0af";
			
		}
		
		else {
		
			 notificationContent = 'Oops, something went wrong. Please try again.';
			 notificationColor = "#ea5a5b";
			
		}
		
		notification()
		
	});
	
}


function awardCrownToVIPMembers(){
	
	$('#row_list .subscriber_email_address').each(function(){
		
		//variables
		list = $(this).closest('li');
		vip_quota_opens = parseInt($('[data-vip-quota]').attr('data-vip-quota'));
		opens = parseInt($(list).attr('data-opens'));
		
		if ($(list).find('.crown').length > 0) { 
			
		}
		
		else if(opens >= vip_quota_opens){
			
			//award crown
			$(list).find('.subscriber_email_address').prepend('<div class="crown semi_bold" title="'+opens+' opens">'+opens+'</div>');
			
		}
		
	})
	
}

function actionToSubscriber(type) {
	
	//if disable flag is true, return fa;se
	if(disableFlag == 1){ return false; }
	
	//variables
	disableFlag = 1;
	list = $('#list_name_bar > h2 > b').text();
	vip_quota_opens = parseInt($('[data-vip-quota]').attr('data-vip-quota'));
	option = $('[data-dropdown-item-present]').attr('data-dropdown-item-present');
	list_count = parseInt($('#row_list li').size());
	opens = $(el).attr('data-opens');
	
	//assign action to subscriber
	$.ajax({
	    type: "POST",
	    dataType: "html",
	    url: "",
	    data: { sub_id: sub_id, sub_email: sub_email, type: type, list: list }
	}).done(function(data) {

		//set disable flag to false
		disableFlag = 0;
		
		//if result is success
		if(data == 'success'){
			
			//variables
			activatedTab = $('.activedTab').attr('data-tab-url');
			
			//close the popup
			closePopup();
			
			//wait a little
			setTimeout(function(){
				
				//if type is delete
				if(type == 'delete_subscriber' || type == 'delete_subscriber_all'){
			        	
			        //if list count is one, remove the list item and present the empty state
			        if(list_count == 1) {
				        
				       //remove list
						 $(el).remove();

						 //check empty state
						 checkEmptySubscribers();
				        
				    }
				    
				    //if the list contains more, just animate and delete the list item
				    else {
					 
					 	//animate uo
						$(el).slideUp(250, function() {
						
							//remove list
							$(el).remove();
								
						});
					    
				    }
				    
				    //if the activated tab is not all, decrease it by one
					if(activatedTab !== 'all'){
						
						modifyTabNumber('[data-tab-url="'+activatedTab+'"]', 'dec');
						
					}
					
					if(activatedTab !== 'vip'){
					
						if(opens >= vip_quota_opens){ 
					
							//decrease 1 in the VIP tab
							modifyTabNumber('[data-tab-url="vip"]', 'dec');
							
						}
							
					}
					
					//always decrease 1 in the ALL tab
					modifyTabNumber('[data-tab-url="all"]', 'dec');
					
				}
				
				//if type is vip
				if(type == 'make_vip' || type == 'make_vip_all_lists'){
				
					//assign vip status to subscriber list
					$(el).attr('data-opens',vip_quota_opens);
				
					//animate the avatar to the corresponding tab
					animateAvatar('[data-tab-url="vip"]');
					
					//wait a little
					setTimeout(function(){
						
						//award a crown to the vip member
						awardCrownToVIPMembers();
						
					}, 1200)
					
				}
				
				//if type is undo vip
				if(type == 'undo_vip'|| type == 'undo_vip_all_lists'){
				
					//undo vip status to subscriber list
					$(el).attr('data-opens','0');
					
					if(activatedTab == 'vip'){
					
						modifyTabNumber('[data-tab-url="vip"]','dec');
						
						//notification parameteres
						notificationContent = sub_email+' is not VIP anymore';
						notificationColor = "#69c0af";
						
						//assign nofitication
						notification();
							
						
						//if list count is one, remove the list item and present the empty state
				        if(list_count == 1) {
					        
					       //remove list
							 $(el).remove();
	
							 //check empty state
							 checkEmptySubscribers();
					        
					    }
					    
					    //if the list contains more, just animate and delete the list item
					    else {
						 
						 	//animate uo
							$(el).slideUp(250, function() {
							
								//remove list
								$(el).remove();
									
							});
						    
					    }
						
					}
					
					else {
						
						//fade out the crown
						$(el).find('.crown').fadeOut(150, function() {
							
							//remove the crown
							$(el).find('.crown').remove();
							
							//modify the vip tab
							modifyTabNumber('[data-tab-url="vip"]','dec');
							
							//notification parameteres
							notificationContent = sub_email+' is not VIP anymore';
							notificationColor = "#69c0af";
							
							//assign nofitication
							notification();
							
						});
						
					}
					
				}
		        
	        }, 500);
			
		}
		
	});
	
}

function initialiseSubscriberGravatars(){
	
	//vars
	$('.subscriber_email_address .subscriber_email_original:not(.done)').each(function(){
		
		email = $(this).text();
	
		//find data and add gravatar
		$(this).closest('li').find('img').remove();
		$(this).append($.gravatar(email));
		
		//fetch img src
		a = $(this).find('img').attr('src');
		
		//add stampready default icon
		$(this).find('img').attr('src', a+'d=https%3A%2F%2Fwww.stampready.net%2Fdashboard%2Fimg%2Fframework%2Fdefault.png');
		$(this).addClass('done');
		
	});
	
}
0
