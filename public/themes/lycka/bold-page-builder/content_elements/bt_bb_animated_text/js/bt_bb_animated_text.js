(function( $ ) {
	"use strict";
	
		window.local_bt_bb_animate_elements = function( $elm ){ 			
				bt_bb_animated_text( $elm );
		};

		window.bt_bb_animated_text = function( $elm ) {			
			if ( $elm.hasClass( 'bt_bb_animated_text_wrapper' ) ) {				
				$elm.show();
				var animation_in_order_sequence		= $elm.data( 'animation-in-order' ) == "sequence" ? true : false; 
				var animation_in_order_sync			= $elm.data( 'animation-in-order' ) == "sync" ? true : false; 
				var animation_in_order_reverse		= $elm.data( 'animation-in-order' ) == "reverse" ? true : false; 
				var animation_in_order_shuffle		= $elm.data( 'animation-in-order' ) == "shuffle" ? true : false; 

				var animation_out_order_sequence	= $elm.data( 'animation-out-order' ) == "sequence" ? true : false; 
				var animation_out_order_sync		= $elm.data( 'animation-out-order' ) == "sync" ? true : false; 
				var animation_out_order_reverse		= $elm.data( 'animation-out-order' ) == "reverse" ? true : false; 
				var animation_out_order_shuffle		= $elm.data( 'animation-out-order' ) == "shuffle" ? true : false; 

				var animation_scale					= $elm.data( 'animation-scale' ); 
				var animation_word					= $elm.data( 'animation-word' ) == true ? "word" : "char"; 					
				
				$elm.textillate({
					in: { 
						effect:		$elm.data( 'animation-in' ),
						sequence:	animation_in_order_sequence, 	// animate the character sequence
						sync:		animation_in_order_sync,	 	// animate all the characters at the same time
						reverse:	animation_in_order_reverse,  	// reverse the character sequence (note that reverse doesn't make sense with sync = true)
						shuffle:	animation_in_order_shuffle,  	// randomize the character sequence (note that shuffle doesn't make sense with sync = true)
						delay:		$elm.data( 'animation-delay' ), // set the delay between each character
						delayScale: animation_scale,				// set the delay factor applied to each consecutive character
					},
					out: {
						effect:		$elm.data( 'animation-out' ), 
						sequence:	animation_out_order_sequence, 		// animate the character sequence
						sync:		animation_out_order_sync,	  		// animate all the characters at the same time
						reverse:	animation_out_order_reverse,  		// reverse the character sequence (note that reverse doesn't make sense with sync = true)
						shuffle:	animation_out_order_shuffle,  		// randomize the character sequence (note that shuffle doesn't make sense with sync = true)
						delay:		$elm.data( 'animation-delay' ),  	// set delay between each character
						delayScale: animation_scale,					// set the delay factor applied to each consecutive character
					},
					minDisplayTime: $elm.data( 'animation-duration' ),		//Loop Interval / Duration
					initialDelay:	$elm.data( 'animation-initial-delay' ),	//Waiting time before starting
					autoStart:		true,
					loop:			$elm.data( 'animation-loop' ), 							
					type:			animation_word,
					selector:		'.bt_bb_animated_text_text_texts',	// the default selector to use when detecting multiple texts to animate
				});					
			}
		}		
})( jQuery );