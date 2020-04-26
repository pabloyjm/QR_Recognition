$(document).ready(function () {

	my_sound = $("<audio>", {src:"audio/scan.mp3",preload:"auto"}).appendTo("body");

	Webcam.attach('#example');

	window.estado = false;

	$('#button').click(function () {
	var elem = document.getElementById("myBar");   
	var width = 0;
	var id = setInterval(frame, 100);
	
	function frame() {

			if (estado==true){
				clearInterval(id);
				my_sound[0].play();
				elem.style.width = 100 + '%';
				console.log("QR encontrado");
				console.log(qrcode.result);
				estado=false;
				return;
			}
			if (width < 100) {
				take_snapshot();
				width++; 
				elem.style.width = width + '%'; 
			}
			else {
			clearInterval(id);
			elem.style.width = width + '%';
			$("#qrContent").text("Tiempo exedido");
			}
		}
	});

	qrcode.callback = showInfo;

});

function take_snapshot() {
	Webcam.snap(function (dataUrl) {
		qrCodeDecoder(dataUrl);
	});
}

// decode the img
function qrCodeDecoder(dataUrl) {
	qrcode.decode(dataUrl);
}

// show info from qr code
function showInfo(data) {
	$("#qrContent").text(data);
}
