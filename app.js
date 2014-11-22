window.addEventListener( "load", function() {

    var stream = null;
    var video = document.querySelector( 'video' );
    var canvas = document.querySelector( 'canvas' );
    var context = canvas.getContext( '2d' );
    var w, h, ratio;

    navigator.getUserMedia = ( navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia );

    if ( navigator.getUserMedia ) {

        navigator.getUserMedia( {
                video: true
            },

            function( localMediaStream ) {
                video.src = window.URL.createObjectURL( localMediaStream );
                video.play();
            },

            function( err ) {
                console.log( "The following error occured: " + err );
            }

        );

    } else {
        console.log( "getUserMedia not supported" );
    }

    takeScreenshot = function() {
        ratio = video.videoWidth / video.videoHeight;
        w = video.videoWidth - 100;
        h = parseInt( w / ratio, 10 );
        canvas.width = w;
        canvas.height = h;
        context.fillRect( 0, 0, w, h );
        context.drawImage( video, 0, 0, w, h );
    };

    document.addEventListener( 'touchstart', takeScreenshot );

} );