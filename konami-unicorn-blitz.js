/*
	Idea from http://www.boingboing.net/2010/05/26/keyboard-shortcuts.html

	Thanks to
		http://www.howtocreate.co.uk/tutorials/javascript/eventinfo
	and
		http://www.webfetti.com/MySpace/Glitter/Animals.jhtml
*/
var Konami = {
	// Set this to whatever path (relative or absolute) where your images are stored.
	imagePath: 'http://github.com/jmhobbs/Konami-Unicorn-Blitz/raw/master/', 

	code: [ 38, 38, 40, 40, 37, 39, 37, 39, 66, 65 ],

	index: 0,

	init: function () {
		document.onkeyup = Konami.keyUp
	},

	keyUp: function ( e ) {
		if( !e ) {
			if( window.event ) {
				e = window.event;
			}
			else {
				return;
			}
		}

		if( typeof( e.keyCode ) == 'number'  ) {
			e = e.keyCode;
		}
		else if( typeof( e.which ) == 'number' ) {
			e = e.which;
		}
		else if( typeof( e.charCode ) == 'number'  ) {
			e = e.charCode;
		}
		else {
			return;
		}

		if( e == Konami.code[Konami.index] ) {
			++Konami.index
			if( Konami.index == Konami.code.length ) {
				Konami.unicorns();
			}
		}
		else {
			Konami.index = 0;
		}
	},

	unicorns: function () {
		document.body.style.overflow = 'hidden';
		var unicorns = new Array();
		_height = window.innerHeight;
		_width = window.innerWidth;
		for( i = 0; i < 50; ++i ) {
			unicorns.push( document.createElement( 'img' ) );
			unicorns[i].setAttribute( 'id', 'konami-corn' );
			unicorns[i].setAttribute( 'src', Konami.imagePath + ( ( i % 4 ) + 1 ) + '.gif' );
			_top = Math.floor( Math.random() * _height ) - 100;
			_left = Math.floor( Math.random() * _width  ) - 100;
			unicorns[i].setAttribute( 'style', 'position: fixed; z-index: 9998; top: ' + _top + 'px; left: ' + _left + 'px;' );
			document.body.appendChild( unicorns[i] );
		}
		words = document.createElement( 'div' );
		words.innerHTML = 'UNICORNS';
		_t_top = ( Math.floor( _top / 2 ) - 100 );
		_t_top = ( _t_top < 0 ) ? 0 : _t_top;
		words.setAttribute( 'style', 'font-size: 100px; text-shadow: #FFF 0 0 20px; font-weight: bold; position: fixed; top: ' + _t_top + 'px; width: 100%; text-align: center; z-index: 9999;' );
		document.body.appendChild( words );
	}
}

Konami.init();
