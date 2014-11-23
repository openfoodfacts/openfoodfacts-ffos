window.addEventListener( "load", function() {

	 var canvas = document.querySelector( 'canvas' );
    	 var context = canvas.getContext( '2d' );
    	 var w, h, ratio;

	function draw(urlImage) {
	  var ctx = document.getElementById('canvas').getContext('2d');
	  var img = new Image();
	  img.src = urlImage;
	  img.onload = function(){
	    canvas.width = img.width;
	    canvas.height = img.height;
	    ctx.drawImage(img,0,0);
	  }
	}


	document.querySelector('#pick-image').addEventListener ('click', function () {

	var pick = new MozActivity({
		name: "pick",
		data: {
		    type: "image/jpeg",
		    // In FxOS 1.3 and before the user is allowed to crop the
		    // image by default, but this can cause out-of-memory issues
		    // so we explicitly disable it.
		    nocrop: true // don't allow the user to crop the image
		}
	    });

	    pick.onsuccess = function () {
		
		draw(window.URL.createObjectURL(this.result.blob));
		
		dataURL = canvas.toDataURL();
		
		console.log(dataURL);
		var reader = new FileReader();
		reader.onloadend = function () {
		  //reader.result image en base 64
	          console.log(reader.result);
	        }
	        
		reader.readAsDataURL(this.result.blob);
		
	    };

	    pick.onerror = function () {
		console.log("Can't view the image");
	    };
	});

} );
