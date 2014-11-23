window.addEventListener("load", function() {

	var video = document.querySelector('video');
	var canvas = document.querySelector('canvas');
	var debug = document.querySelector('#debug');
	var context = canvas.getContext('2d');
	var cameras;

	function debug_msg(msg) {
		// because console.log doesn't work on my machine
		debug.innerHTML = debug.innerHTML + "<br/>" + msg;
	}

	function logError(err) {
		debug_msg('error: ' + err);
	}

	function previewCamera(camera) {
		debug_msg('camera: ' + camera.toString());
		camera.focusMode = "continuous-picture";
		video.mozSrcObject = camera;
		video.play();
	}

	debug.innerHTML = 'init';

	cameras = navigator.mozCameras.getListOfCameras();

	debug_msg('about to get camera preview: ' + cameras[0]);

	navigator.mozCameras.getCamera(
		cameras[0], {
			mode: "picture"
		},
		previewCamera,
		logError
	);

	takeScreenshot = function() {
		var w = video.videoWidth;
		var h = video.videoHeight;
		canvas.width = w;
		canvas.height = h;
		context.drawImage(video, 0, 0, w, h);
		debug_msg("decoding");
		qrcode.callback = debug_msg;
		qrcode.decode();
	};

	document.addEventListener('touchstart', takeScreenshot);
});
