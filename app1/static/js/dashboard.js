$('.menu-opener').on('click', function() {
	$('body').addClass('no-scroll menu-open');
});

$('.profile-opener').on('click', function() {
	$('body').addClass('no-scroll profile-open');
});

$('.overlay').on('click', function() {
	$('body').removeClass('no-scroll menu-open profile-open');
});