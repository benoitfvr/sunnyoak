$( document ).ready(function() {
  	$('.submit').hover(
  		function() {
			let hue = $(".colorpicker").val();
			$(this).css( "color", "#fff" );
			$(this).css( "background", "hsl(" + hue + ", 100%, 50%)" );
		},
		function() {
			let hue = $(".colorpicker").val();
			$(this).css( "color", "hsl(" + hue + ", 100%, 50%)" );
			$(this).css( "background", '#fff' );
		}
	);
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
	let rgb = colorcss.replace(regex, '').split(',');
	$.ajax({
		method: "POST",
		url: "gestionlampe",
		data: { 'command': 'CC', 'red': rgb[0], 'green': rgb[1], 'blue': rgb[2] },
		dataType: "json"
	}).done(function( data ) {
		if (data.success) {
			$("#valuecolor").css( "background-color", "rgb(" + data.red + ", " + data.green + ", " + data.blue + ")" );
			$('#on_off').prop("checked", true);
		}
	});
}

function onOff() {
	let onOffVal = $('#on_off').is(':checked');
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
				$("#imageoff").attr('src','static/img/off.jpg');
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
				$("#imageoff").attr('src','static/img/on.jpg');
			}
		});
	}
}

function RrOff() {
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
				$("#imageoff").attr('src','static/img/off.jpg');
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
				$('#on_off').prop("checked", true);
				$('#tr_off').prop("checked", false);
				$("#imageoff").attr('src','static/img/rainbow.jpg');
			}
		});
	}
}

function TrOff() {
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
				$("#imageoff").attr('src','static/img/off.jpg');
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
				$('#on_off').prop("checked", true);
				$('#rr_off').prop("checked", false);
				$("#imageoff").attr('src','static/img/rainbow.jpg');
			}
		});
	}
}
