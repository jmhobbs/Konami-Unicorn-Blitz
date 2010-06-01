// ==UserScript==
// @name          Konami Unicorn Blitz
// @namespace     http://jmhobbs.github.com/Konami-Unicorn-Blitz
// @description   UP-UP-DOWN-DOWN-LEFT-RIGHT-LEFT-RIGHT-B-A
// @include       http://*
// ==/UserScript==

/*
	Idea from http://www.boingboing.net/2010/05/26/keyboard-shortcuts.html

	Thanks to
		http://www.howtocreate.co.uk/tutorials/javascript/eventinfo
	and
		http://www.webfetti.com/MySpace/Glitter/Animals.jhtml
*/
var Konami = {
	/* Set this to whatever path (relative or absolute) where your images are stored. */
	imagePath: 'http://github.com/jmhobbs/Konami-Unicorn-Blitz/raw/master/',
	/* You need to have all of your images in the same format, numbered starting at 1 */
	imageCount: 4,
	imageFormat: '.gif',
	/* How many unicorns do you want to spam them with? */
	unicornCount: 50,
	/* What do you want the text on top to be? */
	words: 'UNICORNS',
	/* if you want to auto hide the unicorns after some time (in milliseconds) */
	hideAfter: 0,
	hideTimeoutId: null,
	/* elements created will have the following id/classes set. the idPrefix will
	be used in conjunction with a 1-up number for each image created */
	idPrefix: 'konami_',
	className: 'konami_code',

	code: [ 38, 38, 40, 40, 37, 39, 37, 39, 66, 65 ],

	index: 0,

	active: false,
	elements: [],

	init: function () {
		// This is a fix for Greasemonkey. It doesn't support document.onKeyUp
		document.documentElement.addEventListener( "keyup", Konami.keyUp, true );
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
			++Konami.index;
			if( Konami.index == Konami.code.length ) {
				if ( Konami.active ) {
					Konami.remove();
				} else {
					Konami.unicorns();
				}
				Konami.index = 0;
			}
		}
		else {
			Konami.index = 0;
		}
	},


	unicorns: function () {
		Konami.active = true;
		document.body.style.overflow = 'hidden';
		var _height = window.innerHeight;
		var _width = window.innerWidth;
		for( i = 0; i < Konami.unicornCount; ++i ) {
			var imageId = Konami.idPrefix + '_image_' + i;
			var unicorn = document.createElement( 'img' );
			unicorn.setAttribute( 'src', Konami.imagePath + ( ( i % Konami.imageCount ) + 1 ) + Konami.imageFormat );
			var _top = Math.floor( Math.random() * _height ) - 100;
			var _left = Math.floor( Math.random() * _width  ) - 100;
			unicorn.setAttribute( 'style', 'position: fixed; z-index: 9998; top: ' + _top + 'px; left: ' + _left + 'px;' );
			unicorn.setAttribute('id', imageId);
			unicorn.setAttribute('class', Konami.className);
			/* store our element id's so that we can remove them from the DOM */
			Konami.elements.push(imageId);
			document.body.appendChild( unicorn );
		}
		var words = document.createElement( 'div' );
		var wordsId = Konami.idPrefix + '_words';
		Konami.elements.push(wordsId);
		words.setAttribute('id', wordsId);
		words.setAttribute('class', Konami.className);
		words.innerHTML = Konami.words;
		var _t_top = ( Math.floor( _top / 2 ) - 100 );
		var _t_top = ( _t_top < 0 ) ? 0 : _t_top;
		words.setAttribute( 'style', 'font-size: 100px; text-shadow: #FFF 0 0 20px; font-weight: bold; position: fixed; top: ' + _t_top + 'px; width: 100%; text-align: center; z-index: 9999;' );
		document.body.appendChild( words );

		if(Konami.hideAfter > 0) {
			Konami.hideAfterTimeoutId = setTimeout(function() { Konami.remove() }, Konami.hideAfter);
		}
	},

	remove: function() {
		if(Konami.hideAfterTimeoutId != null) {
			clearTimeout(Konami.hideAfterTimeoutId);
			Konami.hideAfterTimeoutId = null;
		}
		Konami.active = false;
		document.body.style.overflow = 'auto';
		while ( Konami.elements.length ) {
			var elementId = Konami.elements.pop();
			document.body.removeChild(document.getElementById(elementId));
		}
	}
};

Konami.init();