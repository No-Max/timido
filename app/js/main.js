//page config
var cfg = {
	window:{
		width: $(window).width(),
		height: $(window).height(),
		breakpoints: {
			xs: 768,
			ms: 992,
			md: 1200
		},
		lang: $('html').attr('lang')
	},
	validationMessages:{
		required: {
			ru:'Это поле обязательно для заполнения!',
			en:'This field is required!'			
		},
		email: {
			ru:'Введите корректный E-mail!',
			en:'Please enter a valid E-mail!'
		},
		phone: {
			ru:'Введите корректный номер телефона!',
			en:'Please enter a valid phone number!'
		},
		passwordShort: {
			ru:'Слишком короткий пароль!',
			en:'The password is too short!'
		},
		passwordLong: {
			ru:'Слишком длинный пароль!',
			en:'The password is too long!'
		},
		passwordRepeat: {
			ru:'Не верно указан пароль!',
			en:'The password is incorrect!'
		}	
	},
	basket: {
		mapConfig: {
			map: {
				center: {lat: 53.8442257, lng: 27.502831},
				zoom: 11,
				zoomControl: false,
				mapTypeControl: false,
				scaleControl: false,
				streetViewControl: false,
				rotateControl: false,
				fullscreenControl: false
			},
			marker: 'img/icons/mark.png',
			infoWindowWidth: 200,
		}
	},
	sliders: {
		categories:{
			infinite: true,
			slidesToShow: 6,
			slidesToScroll: 1,
			arrows: false,
			dots: false,
			autoplay: true,
			swipeToSlide: true,
			responsive: [{
				breakpoint: 992,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1
				}
			},{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},{
				breakpoint: 500,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			}]			
		},
		homeBanner: {
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			dots: true,
			autoplay: true
		},
		brands: {
			infinite: true,
			slidesToShow: 3,
			slidesToScroll: 1,
			arrows: false,
			dots: false,
			autoplay: true,
			swipeToSlide: true
		}
	},
	search:{
		fadeDelay: 300,
		placeholder: {
			ru: 'поиск',
			en: 'search',
			be: 'пошук'
		}
	}
};

//custom validation/*
$('input').on('focusin', function(){
	$(this).addClass("focus");
	$('[data-field="#'+$ (this).attr("id") +'"]').show();
});
$('.addfocus').on('focusin', function(){
	$("#dateContainer").addClass("focus");
});
$('.addfocus').on('focusout', function(){
	$("#dateContainer").removeClass("focus");
	$("#dateContainer").removeClass("valid");
});
var isSubmited = false;
$("form").on("submit",function(event){
	$thisForm = $(this);
	var isValid = true;
	$thisForm.find(".validate").each(function(){
		$this = $(this),
		$errorContainer = $($this.attr("data-error"));
		if($this.hasClass("required")){
			if(!$this.hasClass("valid") || $this.hasClass("invalid")){
				$this.addClass("invalid");	
				$errorContainer.show().text(cfg.validationMessages.required[cfg.window.lang]);
				isValid = false;
			}	
		}
	});
	if(isValid){
		isSubmited = true;
		if(!isSubmited){
			$thisForm.submit();
			if($thisForm.attr("action")){
				window.location = $thisForm.attr("action");
			}	
		}
	}else{
		event.preventDefault();
	}
});
/*
$(".validate").on("change", function(event){
	var $this = $(this),
	type = $this.attr("data-type"),
	value = $this.val(),
	$errorContainer = $($this.attr("data-error"));
	$this.addClass("was-change");
	if(value.length > 0){
		switch(type){
			case 'email':{
				if(value.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i)){
					$this.addClass("valid");
					$this.removeClass("invalid");
					$errorContainer.hide().text('');
				}else{
					$this.addClass("invalid");
					$this.removeClass("valid");	
					$errorContainer.show().text(cfg.validationMessages.email[cfg.window.lang]);
				}
				break;
			}
			case 'phone':{
				if(value.match(/^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$/)){
					$this.addClass("valid");
					$this.removeClass("invalid");
					$errorContainer.hide().text('');	
				}else{
					$this.addClass("invalid");
					$this.removeClass("valid");	
					$errorContainer.show().text(cfg.validationMessages.phone[cfg.window.lang]);
				}
				break;
			}
			case 'password':{
				if(value.length < 5){
					$this.addClass("invalid");
					$this.removeClass("valid");	
					$errorContainer.show().text(cfg.validationMessages.passwordShort[cfg.window.lang]);	
				}else if(value.length > 16){
					$this.addClass("invalid");
					$this.removeClass("valid");	
					$errorContainer.show().text(cfg.validationMessages.passwordLong[cfg.window.lang]);
				}else{
					$this.addClass("valid");
					$this.removeClass("invalid");
					$errorContainer.hide().text('');		
				}
				break;
			}
			case 'repeatpassword':{
				var password = $this.closest('form').find('[data-type="password"]').val();
				console.log(password);
				if(value == password){
					$this.addClass("valid");
					$this.removeClass("invalid");
					$errorContainer.hide().text('');	
				}else{
					$this.removeClass("valid");
					$this.addClass("invalid");
					$errorContainer.show().text(cfg.validationMessages.passwordRepeat[cfg.window.lang]);
				}
				break;
			}
		}
	}else if($this.hasClass("required") && value.length < 1){
		$this.removeClass("invalid");
		$this.removeClass("valid");	
		$errorContainer.hide().text('');
	}else if(!$this.hasClass("required") && value.length < 1){
		$this.removeClass("invalid");
		$this.removeClass("valid");	
		$errorContainer.hide().text('');	
	}
});
*/
$(".password").on("click", function(){
	var $field = $($(this).attr('data-field'));
	if($field.attr('type') == 'text'){
		$field.attr("type","password");
	}else{
		$field.attr("type","text");	
	}
	$field.addClass("focus");
});

$(".validate").on("input", function(event){
	var $this = $(this),
	type = $this.attr("data-type"),
	value = $this.val(),
	$errorContainer = $($this.attr("data-error"));
	//if($this.hasClass("was-change")){
		if(value.length > 0){
			switch(type){
				case 'email':{
					if(value.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i)){
						$this.addClass("valid");
						$this.removeClass("invalid");
						$errorContainer.hide().text('');
					}else{
						$this.addClass("invalid");
						$this.removeClass("valid");	
						$errorContainer.show().text(cfg.validationMessages.email[cfg.window.lang]);
					}
					break;
				}
				case 'phone':{
					if(value.match(/^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$/)){
						$this.addClass("valid");
						$this.removeClass("invalid");
						$errorContainer.hide().text('');	
					}else{
						$this.addClass("invalid");
						$this.removeClass("valid");	
						$errorContainer.show().text(cfg.validationMessages.phone[cfg.window.lang]);
					}
				}
				case 'password':{
					var $repeatpassword = $this.closest('form').find('[data-type="repeatpassword"]');
					if(value.length < 5){
						$this.addClass("invalid");
						$this.removeClass("valid");	
						$errorContainer.show().text(cfg.validationMessages.passwordShort[cfg.window.lang]);	
						$repeatpassword.attr("disabled","disabled");
					}else if(value.length > 16){
						$this.addClass("invalid");
						$this.removeClass("valid");	
						$errorContainer.show().text(cfg.validationMessages.passwordLong[cfg.window.lang]);
						$repeatpassword.attr("disabled","disabled");
					}else{
						$this.addClass("valid");
						$this.removeClass("invalid");
						$errorContainer.hide().text('');	
						$repeatpassword.removeAttr("disabled");	
					}
					break;
				}
				case 'repeatpassword':{
					var password = $this.closest('form').find('[data-type="password"]').val();					
					$this.removeAttr("disabled");
					if(value == password){
						$this.addClass("valid");
						$this.removeClass("invalid");
						$errorContainer.hide().text('');	
					}else{
						$this.removeClass("valid");
						$this.addClass("invalid");
						$errorContainer.show().text(cfg.validationMessages.passwordRepeat[cfg.window.lang]);
					}
					break;
				}
				case 'required':{
					var password = $this.closest('form').find('[data-type="password"]').val();
					if(value == ''){
						$this.addClass("valid");
						$this.removeClass("invalid");
						$errorContainer.show().text(cfg.validationMessages.required[cfg.window.lang]);	
					}else{
						$this.removeClass("invalid");
						$this.addClass("valid");
						$errorContainer.show().text('');
					}
					break;
				}
			}
		}else if($this.hasClass("required") && value.length < 1){
			$this.addClass("invalid");
			$this.removeClass("valid");	
			$errorContainer.show().text(cfg.validationMessages.required[cfg.window.lang]);
		}else if(!$this.hasClass("required") && value.length < 1){
			$this.removeClass("invalid");
			$this.removeClass("valid");	
			$errorContainer.hide().text('');	
		}else if($this.hasClass("required") && value.length > 1){
			$this.removeClass("invalid");
			$this.addClass("valid");	
			$errorContainer.hide().text('');	
		}	

	//}
});

//resize function
$(window).resize(function(){
	cfg.window.width = $(window).width();
	cfg.window.height = $(window).height();
	mobileMenu();
});
mobileMenu();

//searchField functionality
$("#searchField").on("focusin", function(event){
	$(this).attr("placeholder", cfg.search.placeholder[cfg.window.lang]);
	$("#searchBody").fadeIn(cfg.search.fadeDelay);
});
$("#searchField").on("focusout", function(event){
	$(this).attr("placeholder", cfg.search.placeholder[cfg.window.lang]);
	$("#searchBody").fadeOut(cfg.search.fadeDelay);
});
$("#similarRequests").hide();
$("#searchField").on('input', function(event){
	if($(this).val() != ""){		
		$("#recentRequests").hide();
		$("#similarRequests").fadeIn(200);
	}else{
		$("#similarRequests").hide();
		$("#recentRequests").fadeIn(200);	
	}
});

$(".prices").on("focusin", function(event){
	$(this).val("");
});
$(".prices").on("focusout", function(event){
	var valueDefault = $(this).attr("data-default");
	var value = $(this).val();
	if(value){
		if($(this).hasClass("nocurr")){
			$(this).val(value)
		}else{
			$(this).val(value + "BYN");	
		}
	}else{
		$(this).val(valueDefault);
	}
});
$(".prices").on("input", function(event){
	if($(this).val()*1 != $(this).val()){
		$(this).val("");
	}
});
$(".dropdown-filters").on("click","li", function(event){
	event.preventDefault();
	var $this = $(this),
	value = $this.attr("data-value");
	$this.parent().parent().find(".dropdown-toggle").html(value);
});

$(".toggle-active").click(function(){
	event.preventDefault();
	$(this).toggleClass("active");
	if($(this).attr("data-element")){
		$($(this).attr("data-element")).toggleClass("active");
	}
});

$(".toggle-active-self").click(function(){
	event.preventDefault();
	$(this).toggleClass("active");
});

//carousels initialization
$('.home-banner-carousel').slick(cfg.sliders.homeBanner);

$('.categories-carousel').slick(cfg.sliders.categories);

$('.brands-carousel').slick(cfg.sliders.brands);

$('.carousel-slider').slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: true,
	asNavFor: '.carousel-navigation',
	autoplay: true,
	dots: false,
	centerMode: false,
	prevArrow: '<button type="button" class="slick-prev"></button>',
	nextArrow: '<button type="button" class="slick-next"></button>',
	responsive: [{
		breakpoint: 768,
		settings: {
			arrows: false
		}
	}]		
});

$('.carousel-navigation').slick({
	slidesToShow: 5,
	slidesToScroll: 5,
	dots: false,
	vertical: true,
	verticalSwiping: true,
	asNavFor: '.carousel-slider',
	arrows: false,
	centerMode: false,
	focusOnSelect: true,
	infinite: false
});


//mobile nav toggler
$(".menu-toggler").click(function(){
	$(this).toggleClass("opened");
	$(".search-container").toggleClass("opened");
});


//double click on poupup menu item (need for sensor devices)
var menuBuffer; 
$(".top-nav>ul>li>a").click(function(event){
	event.preventDefault();
	var href = $(this).attr("href");
	if(menuBuffer == href){
		menuBuffer = 0; 
		window.location = href;
	}else{
		menuBuffer = href;
	}
});


//back to top animation
$(".back-to-top").on("click", function (event) {
	event.preventDefault();
	$('body,html').animate({scrollTop: 0}, 500);
});
$("#formBasket").on("click",".button", function (event) {
	event.preventDefault();
	$('body,html').animate({scrollTop: 0}, 500);
});

//functions depends on scroll
window.onscroll = function(event) {
	var scrolled = window.pageYOffset || document.documentElement.scrollTop;
	backTotop(scrolled);
}

$("#formBasket").validate({
	rules: {
		name: "required",
		lastname: "required",
		email: {
			required: true,
			email: true
		},
		phone: "required"
	},
	messages: {
		name: "Пожалуйста введите ваше имя",
		lastname: "Пожалуйста введите вашу фамилию",
		email: {
			required: "Пожалуйста введите ваш email",
			email: "Email должен быть корректным"
		},
		phone: "Пожалуйста введите ваш телефон"		
	}
});

$("#sendBasket").click(function(event){
	event.preventDefault();
	
	$("#formBasket input[required]").each(function(i, elem) {
		if(!$(this).hasClass("valid")){
			$(".open-tab").removeClass("active");
			$('.open-tab [href="#deliveryContent"]').parent().addClass("active");
			$(".contet-tab-item").removeClass("active");
			$("#deliveryContent").addClass("active");
			$("[data-show]").hide();
			$('[data-show="#deliveryContent"]').show();			
			$('#formBasket').submit();
		}else{
			$('#formBasket').submit();	
		}
	});
});

//custom input fill using next attributes:
//"data-input" - input id for write in, 
//"data-value" - value for input,
//"data-reset" - IDs for reset after click
$("[data-input]").click(function(event){
	event.preventDefault();
	var $this =  $(this),
	inputID = $this.attr("data-input"),
	value = $this.attr("data-value"),
	resetInputs = $this.attr("data-reset"),
	textID = $this.attr("data-text");
	$(inputID).val(value);
	if($this.parent().hasClass("active-toggle")){
		$this.parent().children().removeClass("active");
		$this.addClass("active");
	}	
	if(resetInputs){
		resetInputs = resetInputs.split(",");
		for(var object in resetInputs){
			$(resetInputs[object]).val("").removeClass("valid");
			$('[data-input="' + resetInputs[object] + '"]').removeClass("active");
		}
	}
	if(textID){
		$(textID).text(value);
	}
});

$(".check-box").click(function(event){
	event.preventDefault();
	if($($(this).attr("href")).val() == 1){
		$($(this).attr("href")).val(0)
	}else{
		$($(this).attr("href")).val(1);
	}
});

//custom tabs functionality
$("[data-tab]").click(function(){
	var $this = $(this),
	tabId = $this.attr("href"),
	tabClass = $this.attr("data-tab");
	$('[data-tab="' +tabClass+ '"]')
	$this.parent().children().removeClass("active");
	$this.addClass("active");
	$(tabClass).removeClass("active");
	$(tabId).addClass("active");
});

var addressArr = []; 
$("[data-concat]").on("change", function(event){
	var $this = $(this),
	inputID = $this.attr("data-concat");
	itemIndex = $this.attr("data-position");
	addressArr[itemIndex] = $this.val();
	$(inputID).val(addressArr);

});

$(".basket input").click(function(){
	$(this).removeClass("error");
});

//basket puncts counter 
$("#counterAll").html($(".punct-item").length);
$("#moreResults").click(function(event){
	event.preventDefault();
	$(".puncts").addClass("show-hidden");
});

//basket nav
$("[data-show]").hide();
$('[data-show="#productContent"]').show();
$(".open-tab a").click(function(event){
	event.preventDefault();
	var $this = $(this),
	tabID = $this.attr("href");
	if($this.parent().hasClass("active")){
		$(".open-tab").removeClass("active");
		$(".contet-tab-item").removeClass("active");	
	}else{
		$(".open-tab").removeClass("active");
		$('.open-tab [href="'+tabID+'"]').parent().addClass("active");
		$(".contet-tab-item").removeClass("active");
		$(tabID).addClass("active");
		$("[data-show]").hide();
		$('[data-show="'+tabID+'"]').show();
	}
});

//basket map initialization
if($("div").is("#map")){
	var map;
	function initMap() {
		map = new google.maps.Map(document.getElementById('map'), cfg.basket.mapConfig.map);
		$(".puncts .punct-item").each(function(i, elem) {
			var marker;
			var infowindow;
			var cor = $(this).attr("data-coords").split(",");
			var cont = $(this).attr("data-value");
			marker = new google.maps.Marker({
				position: {lat: cor[0]*1 , lng: cor[1]*1},
				map: map,
				icon: cfg.basket.mapConfig.marker,
				title: cont
			});
			infowindow = new google.maps.InfoWindow({
				content: cont,
				maxWidth: cfg.basket.mapConfig.infoWindowWidth
			});
			marker.addListener('click', function() {
				infowindow.open(map, marker);
			});
		});
	}
}

$(".onempty").on('change',function(event){
	var $this = $(this);
	if($this.val()){
		$this.addClass("valid");
	}else{
		$this.removeClass("valid");
	}
});
$(".minus").click(function(){
	var value = $(this).siblings(".result").html()*1;
	if(value>1){
		$(this).siblings(".result").html(value - 1);
	}
});
$(".pluss").click(function(){
	var value = $(this).siblings(".result").html()*1;
	if(value < 100){
		$(this).siblings(".result").html(value + 1);
	}
});
function selectClear(){
	$("select .default").each(function(){
		$(this).prop('selected', true);
	});
}
selectClear();
$("[data-clear-select]").click(function(){
	var selectorsForClear = $(this).attr("data-clear-select");
	$(selectorsForClear).find('.placeholder').show();
	$(selectorsForClear).find('.field').hide().html("");
	$(selectorsForClear).removeClass("opened").addClass("empty");;
	$(selectorsForClear).find('input').val();
	$(selectorsForClear).find("li").removeClass("selected");
	$(".clearable").each(function(){
		$(this).val($(this).attr("data-default")).empty();
		selectClear();
	});
});

var date = {day: 0, month: 0, year: 0};

$(".custom-select").on("click","li, [data-value]", function(event){
	var $this = $(this),
	$thisParent = $(this).closest('.custom-select'),
	$thisPlaceholder = $thisParent.find('.placeholder'),
	$field = $thisParent.find('.field'),
	$input = $thisParent.find('input'),
	value = $(this).attr("data-value");
	
	if($thisParent.hasClass("multiple")){
		switch(value) {
			case 'disabled':{
				break;
			}  
			case 'clear':{
				$thisPlaceholder.show();
				$field.hide().html("");
				$thisParent.toggleClass("opened");
				$input.val();
				$thisParent.addClass("empty");
				$thisParent.find("li").removeClass("selected");
				break;
			}
			case 'open':{
				$thisParent.toggleClass("opened");
				break;
			}
			default:{
				$thisParent.addClass("opened");
				$this.toggleClass("selected");
				$thisPlaceholder.hide();
				$thisParent.removeClass("empty");
				var selectedItems = '';
				var count = 0; 
				$thisParent.find(".selected").each(function(i, elem) {
					if(count<1){
						selectedItems += $(this).attr("data-value");
					}else{
						selectedItems += "," + $(this).attr("data-value");
					}
					count++;	
				});
				$input.val(selectedItems);
				$field.show().html(selectedItems);
				$field.attr("title", selectedItems);
				if(count == 0){
					$thisPlaceholder.show();
					$thisParent.removeClass("opened");	
					$thisParent.addClass("empty");
					$input.val();
					$field.hide().html("");
				}
				break;
			}
		}
	}else if($thisParent.hasClass("date")){
		switch(value) {
			case 'disabled':{
				break;
			}  
			case 'clear':{
				$thisPlaceholder.show();
				$field.hide().html("");
				$thisParent.toggleClass("opened");
				$input.val();
				$thisParent.addClass("empty");
				$thisParent.find("li").removeClass("selected");
				date.month = 0;
				validateDate(date);
				break;
			}
			case 'open':{
				$thisParent.toggleClass("opened");
				break;
			}
			default:{
				if($this.hasClass("selected")){
					$thisPlaceholder.show();
					$field.hide().html("");
					$thisParent.toggleClass("opened");
					$input.val();
					$thisParent.addClass("empty");
					$thisParent.find("li").removeClass("selected");
					date.month = 0;
					validateDate(date);
				}else{
					$thisParent.toggleClass("opened");
					$thisParent.find("li").removeClass("selected");
					$this.addClass("selected");
					$field.show().html(value);
					$thisPlaceholder.hide();
					$input.val(value);
					$thisParent.removeClass("empty");
					date.month = $this.attr('data-num');
					validateDate(date);
				}
				break;
			}
		}
		
		$("#dateContainer").removeClass("valid");
	}else{
		switch(value) {
			case 'disabled':{
				break;
			}  
			case 'clear':{
				$thisPlaceholder.show();
				$field.hide().html("");
				$thisParent.toggleClass("opened");
				$input.val();
				$thisParent.addClass("empty");
				$thisParent.find("li").removeClass("selected");
				break;
			}
			case 'open':{
				$thisParent.toggleClass("opened");
				break;
			}
			default:{
				if($this.hasClass("selected")){
					$thisPlaceholder.show();
					$field.hide().html("");
					$thisParent.toggleClass("opened");
					$input.val();
					$thisParent.addClass("empty");
					$thisParent.find("li").removeClass("selected");
				}else{
					$thisParent.toggleClass("opened");
					$thisParent.find("li").removeClass("selected");
					$this.addClass("selected");
					$field.show().html(value);
					$thisPlaceholder.hide();
					$input.val(value);
					$thisParent.removeClass("empty");
				}
				break;
			}
		}
	}
});
$("#year").on("input", function(){
	date.year = $(this).val()*1;
	validateDate(date);
});
$("#day").on("input", function(){
	date.day = $(this).val()*1;
	validateDate(date);
});

$('body').on('click', function(event){ 
	if(event.target.closest('.custom-select') === null){
		$('.custom-select').removeClass('opened');	
	}
	if(event.target.closest(".toggle-active") === null && event.target.closest(".toogler-clear") === null){
		$(".toggle-active").removeClass("active");
		$(".toogler-clear").removeClass("active");
	}
});

//
$('#phone').mask("+375 (99) 999-99-99");

//FUNCTIONS

//mobile menu building onresize
function mobileMenu(){
	if(cfg.window.width < cfg.window.breakpoints.xs){
		$("#mobileMenu").html($(".top-nav-container>.container").html());
	}else{
		$("#mobileMenu").html("");
	}
}

//back to top showing
function backTotop(scrolled){
	var isHidden = true;
	if(scrolled > cfg.window.height/2 && isHidden){
		$(".back-to-top").fadeIn();
		isHidden = false;
	}else{
		$(".back-to-top").fadeOut();
		isHidden = true;	
	}
}
function validateDate(d){
	var dateForm = new Date(d.year, d.month, d.day);
	var dateNow = new Date();
	$("#dateContainer").addClass("was-change");
	if(dateNow.valueOf() - dateForm.valueOf() < 567648000000){
		$("#dateContainer").addClass("invalid");
		$("#dateContainer").removeClass("valid");
		$("#dateError").text("Для совершения покупок Ваш возраст должен превышать 18 лет!");
	}else{
		$("#dateContainer").addClass("valid");
		$("#dateContainer").removeClass("invalid");
		$("#dateError").text("");
	}
}
/*
function removeItemFromArray(arr, val){
	for(var i = 0; i < arr.length; i++){
		if(arr[i] == val){
			arr.splice(i);
		}
	}
}
function addItemToArray(arr, val){
	for(var i = 0; i < arr.length; i++){
		if(arr[i] == val){
			arr.splice(i);
		}
	}
	arr.push(val);
}
*/
 //  .match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
/*
$("#subscribeInput").on('change', function(event){
	var value = $(this).val();
	var isValid = value.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
	if(isValid){
		$(this).parent().addClass("apply");
		$(this).parent().removeClass("has-error");
		$("#subscribeBtn").removeAttr("disabled");
	}else{
		$(this).parent().addClass("has-error");
		$(this).parent().removeClass("apply");
		$("#subscribeBtn").attr("disabled");
	}
	if(value == ""){
		$(this).parent().removeClass("apply");
		$("#subscribeBtn").attr("disabled");
		$(this).parent().removeClass("has-error");
	}
});

$("#subscribeInput").on('input', function(event){
	var value = $(this).val();
	if(value == ""){
		$(this).parent().removeClass("apply");
		$("#subscribeBtn").attr("disabled");
		$(this).parent().removeClass("has-error");
	}
});
*/
