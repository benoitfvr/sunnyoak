function hasTouch() {
    return 'ontouchstart' in document.documentElement
           || navigator.maxTouchPoints > 0
           || navigator.msMaxTouchPoints > 0;
}

$( document ).ready(function() {
	$('.submit').hover(
		function() {
			if (!hasTouch()) {
				let hue = $(".colorpicker").val();
				$(this).css( "color", "#fff" );
				$(this).css( "background", "hsl(" + hue + ", 100%, 50%)" );
			}
		},
		function() {
			if (!hasTouch()) {
				let hue = $(".colorpicker").val();
				$(this).css( "color", "hsl(" + hue + ", 100%, 50%)" );
				$(this).css( "background", '#fff' );
			}
		}
	);
	setColor();
	if ($('.on_off').is(':checked')) {
		$("#valuecolor").css( "background-color", $("#tmpcolor").css( "background-color" ) );
		$(".principale").css( "color", $("#tmpcolor").css( "background-color" ) );
	} else {
		$("#valuecolor").css( "background-color", '#000000' );
		$(".principale").css( "color",'#ffffff');
	}
});

function openNav() {
	document.getElementById("mySidenav").style.width = "300px";
	document.getElementById("header-logo").style.marginLeft ="300px";
}

function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
	document.getElementById("header-logo").style.marginLeft ="100px";
}

function setColor(){
	let hue = $(".colorpicker").val();
	$("#tmpcolor").css( "background-color", "hsl(" + hue + ", 100%, 50%)" );
	$(".submit").css( "color", "hsl(" + hue + ", 100%, 50%)" );
}

function sendColor(){
	const regex = /(rgb\()|(\))|( )/g;
	let colorcss = $("#tmpcolor").css( "background-color" );
	let hue = $(".colorpicker").val();
	let rgb = colorcss.replace(regex, '').split(',');
	$(".submit").blur();
	$.ajax({
		method: "POST",
		url: "gestionlampe",
		data: { 'command': 'CC', 'red': rgb[0], 'green': rgb[1], 'blue': rgb[2], 'hue': hue},
		dataType: "json"
	}).done(function( data ) {
		if (data.success) {
			$("#valuecolor").css( "background-color", "rgb(" + data.red + ", " + data.green + ", " + data.blue + ")" );
			$(".principale").css( "color", "rgb(" + data.red + ", " + data.green + ", " + data.blue + ")" );
			$('.on_off').prop("checked", true);
		}
	});
}

function onOff(e) {
	let onOffVal = $(e).is(':checked');
	$('.on_off').prop("checked", onOffVal);
	console.log(onOffVal);
	if (onOffVal == false){
		$.ajax({
			method: "POST",
			url: "gestionlampe",
			data: { 'command': 'OFF' },
			dataType: "json"
		}).done(function( data ) {
			if (data.success) {
				$("#valuecolor").css( "background-color", "rgb(" + data.red + ", " + data.green + ", " + data.blue + ")" );
				$(".imageoff").attr('src','static/img/off.jpg');
				$('#tr_off').prop("checked", false);
				$('#rr_off').prop("checked", false);
			}
		});
	} else {
		$.ajax({
			method: "POST",
			url: "gestionlampe",
			data: { 'command': 'ON' },
			dataType: "json"
		}).done(function( data ) {
			if (data.success) {
				$("#valuecolor").css( "background-color", "rgb(" + data.red + ", " + data.green + ", " + data.blue + ")" );
				$(".imageoff").attr('src','static/img/on.jpg');
			}
		});
	}
}

function rrOff() {
	let RrOffVal = $('#rr_off').is(':checked');
	console.log(RrOffVal);
	if (RrOffVal == false){
		$.ajax({
			method: "POST",
			url: "gestionlampe",
			data: { 'command': 'OFF' },
			dataType: "json"
		}).done(function( data ) {
			if (data.success) {
				$("#valuecolor").css( "background-color", "rgb(" + data.red + ", " + data.green + ", " + data.blue + ")" );
				$(".imageoff").attr('src','static/img/off.jpg');
				$('.on_off').prop("checked", false);
			}
		});
	} else {
		$.ajax({
			method: "POST",
			url: "gestionlampe",
			data: { 'command': 'RR' },
			dataType: "json"
		}).done(function( data ) {
			if (data.success) {
				$("#valuecolor").css( "background-color", "rgb(" + data.red + ", " + data.green + ", " + data.blue + ")" );
				$('.on_off').prop("checked", true);
				$('#tr_off').prop("checked", false);
				$(".imageoff").attr('src','static/img/rainbow.jpg');
			}
		});
	}
}

function trOff() {
	let TrOffVal = $('#tr_off').is(':checked');
	console.log(TrOffVal);
	if (TrOffVal == false){
		$.ajax({
			method: "POST",
			url: "gestionlampe",
			data: { 'command': 'OFF' },
			dataType: "json"
		}).done(function( data ) {
			if (data.success) {
				$("#valuecolor").css( "background-color", "rgb(" + data.red + ", " + data.green + ", " + data.blue + ")" );
				$(".imageoff").attr('src','static/img/off.jpg');
				$('.on_off').prop("checked", false);
			}
		});
	} else {
		$.ajax({
			method: "POST",
			url: "gestionlampe",
			data: { 'command': 'TR' },
			dataType: "json"
		}).done(function( data ) {
			if (data.success) {
				$("#valuecolor").css( "background-color", "rgb(" + data.red + ", " + data.green + ", " + data.blue + ")" );
				$('.on_off').prop("checked", true);
				$('#rr_off').prop("checked", false);
				$(".imageoff").attr('src','static/img/rainbow.jpg');
			}
		});
	}
}
