/*

Name: jQuery-Specific Build of the Konami-Unicorn-Blitz project
Project: http://github.com/jmhobbs/Konami-Unicorn-Blitz
*/
var KonamiConfig = {
	/* Set this to whatever path (relative or absolute) where your images are stored. */
	imagePath: '/Konami/',
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
};

/* internal stuff, no need to mess with */
var Konami = {
	code: [ 38, 38, 40, 40, 37, 39, 37, 39, 66, 65 ],
	
	index: 0,

	active: false,
	elements: [],

	keyUp: function ( e ) {
		// jQuery normalizes the keycode implemtations
		e = e.which;

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
		$('body').css('overflow', 'hidden');
		var _height = window.innerHeight;
		var _width = window.innerWidth;
		for( i = 0; i < Konami.unicornCount; ++i ) {
			var imageId = Konami.idPrefix + '_image_' + i;
			var _top    = Math.floor( Math.random() * _height ) - 100;
			var _left   = Math.floor( Math.random() * _width  ) - 100;
			var $unicorn = $('<img />').attr({
				src: Konami.imagePath + (( i % Konami.imageCount) + 1) + Konami.imageFormat,
				id: imageId
			}).css({
				'position' : 'fixed',
				'z-index'  : '9998',
				'top'      : _top + 'px',
				'left'     : _left + 'px'
			}).addClass(Konami.className);
			/* store our element id's so that we can remove them from the DOM */
			Konami.elements.push(imageId);
			$unicorn.appendTo($('body'));
		}
		var wordsId = Konami.idPrefix + '_words';
		var _t_top = ( Math.floor( _top / 2 ) - 100 );
		_t_top = ( _t_top < 0 ) ? 0 : _t_top;
		var $words = $('<div>' + Konami.words + '</div>').attr({
			id: wordsId
		}).css({
			'font-size'   : '100px',
			'text-shadow' : '#fff 0 0 20px',
			'font-weight' : 'bold',
			'position'    : 'fixed',
			'top'         : _t_top + 'px',
			'width'       : '100%',
			'text-align'  : 'center',
			'z-index'     : '9999'
		}).addClass(Konami.className);

		Konami.elements.push(wordsId);
		$words.appendTo($('body'));

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
		$('body').css('overflow', 'auto');
		while ( Konami.elements.length ) {
			var elementId = Konami.elements.pop();
			$('#' + elementId).remove();
		}
	}
};

$(document).ready(function() {
	// add our configuration options
	$.extend(Konami, KonamiConfig);

	$('html').live('keyup', Konami.keyUp);
});
