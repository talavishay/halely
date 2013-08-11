(function ($) {

/**
 * The recommended way for producing HTML markup through JavaScript is to write
 * theming functions. These are similiar to the theming functions that you might
 * know from 'phptemplate' (the default PHP templating engine used by most
 * Drupal themes including Omega). JavaScript theme functions accept arguments
 * and can be overriden by sub-themes.
 *
 * In most cases, there is no good reason to NOT wrap your markup producing
 * JavaScript in a theme function.
 */
Drupal.theme.prototype.halely_omega_subthemeExampleButton = function (path, title) {
  // Create an anchor element with jQuery.
  return $('<a href="' + path + '" title="' + title + '">' + title + '</a>');
};

/**
 * Behaviors are Drupal's way of applying JavaScript to a page. The advantage
 * of behaviors over simIn short, the advantage of Behaviors over a simple
 * document.ready() lies in how it interacts with content loaded through Ajax.
 * Opposed to the 'document.ready()' event which is only fired once when the
 * page is initially loaded, behaviors get re-executed whenever something is
 * added to the page through Ajax.
 *
 * You can attach as many behaviors as you wish. In fact, instead of overloading
 * a single behavior with multiple, completely unrelated tasks you should create
 * a separate behavior for every separate task.
 *
 * In most cases, there is no good reason to NOT wrap your JavaScript code in a
 * behavior.
 *
 * @param context
 *   The context for which the behavior is being executed. This is either the
 *   full page or a piece of HTML that was just added through Ajax.
 * @param settings
 *   An array of settings (added through drupal_add_js()). Instead of accessing
 *   Drupal.settings directly you should use this because of potential
 *   modifications made by the Ajax callback that also produced 'context'.
 */
Drupal.behaviors.halely_omega_subthemeExampleBehavior = {
  attach: function (context, settings) {
    // By using the 'context' variable we make sure that our code only runs on
    // the relevant HTML. Furthermore, by using jQuery.once() we make sure that
    // we don't run the same piece of code for an HTML snippet that we already
    // processed previously. By using .once('foo') all processed elements will
    // get tagged with a 'foo-processed' class, causing all future invocations
    // of this behavior to ignore them.
    $('.some-selector', context).once('foo', function () {
      // Now, we are invoking the previously declared theme function using two
      // settings as arguments.
      var $anchor = Drupal.theme('halely_omega_subthemeExampleButton', settings.myExampleLinkPath, settings.myExampleLinkTitle);

      // The anchor is then appended to the current element.
      $anchor.appendTo(this);
    });
	jQuery(".views-fluidgrid-item-inner .field-content >div").each(function(i, val){
		var cs = jQuery(val).attr("class"); 
		var tit = cs + " -- " +jQuery("img", val).attr("title"); 
		jQuery("img", val).attr("title",tit);
		jQuery(val).bind("mouseover mouseout", function(e){
			jQuery('#'+cs).toggleClass("active-trail");
		});
		jQuery(val).bind("mouseover", function(e){
			var rand = Math.round( Math.random() * (-5 - 5) + 5);
			jQuery(val).css("transform","scale(1.1) rotateZ("+rand+"deg)");
		});
	});
	
    
    jQuery(" [nid]").live("click", function(e){
    	jQuery(".isotope-element").css("z-index","1");
    	var nid = jQuery(e.currentTarget).attr("nid");
        jQuery.colorbox({href:"/get_node/"+nid,"width": window.innerWidth * 0.80 ,"height":window.innerHeight * 0.80});
    });
    
jQuery(".isotope-element").bind("mouseover", function(e){
    that = jQuery(e.currentTarget);
if(!jQuery("html").hasClass("no-csstransforms3d")){
	var transform = "transform";
} 

    jQuery(".views-field-title,.views-field-type", that).removeClass("fadeout").addClass("fadein");
    
    if(typeof(that.attr("trans")) === "undefined" || that.attr("trans") === ""){    	
   		if (transform !== "transform"){
    		var t = "matrix(1, 0, 0, 1, "+jQuery(that).css("translate").toString(',')+")";	
    	} else {
    		var t = jQuery(that).css("transform");    		    		
    	}
    	jQuery(that).attr("trans",t);
   	} else {
   		var t = jQuery(that).attr("trans");
   	}
   	
   	if(jQuery(that).attr("data-category") === "שותפים"){
   		if (transform === "transform"){
    	jQuery(that).css({transform  : t.replace(/1,/g, '3,').replace(/0,/g, Math.random()*(Math.floor(Math.random()*2.01) - 1.00)+',') ,"z-index":"99999"}).addClass("shadow");    
   		}		else	{
    	jQuery(that).css({"-webkit-transform"  : t.replace(/1,/g, '3,').replace(/0,/g, Math.random()*(Math.floor(Math.random()*2.01) - 1.00)+',') ,"z-index":"99999"}).addClass("shadow");       			
   		}   		
   	} else {
   		if (transform === "transform"){
    		jQuery(that).css({transform : t.replace(/1,/g, '1.2,') ,"z-index":"99999"}).addClass("shadow");
    	}else{
    		jQuery(that).css({"-webkit-transform" : t.replace(/1,/g, '1.2,') ,"z-index":"99999"}).addClass("shadow");
    	}    	    
   	}
}).bind("mouseout", function(e){
	that = jQuery(e.currentTarget);	
	t = that.attr("trans");	
	jQuery(that).css({transform : t ,"z-index":"1"}).removeClass("shadow");	    
	jQuery(that).css({"-webkit-transform"  : t, "z-index":"1"}).removeClass("shadow");	    
	// jQuery(that).css({});
    jQuery(".views-field-title,.views-field-type", that).addClass("fadeout").removeClass("fadein");
});
var supportsOrientationChange = "onorientationchange" in window,
orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
window.addEventListener(orientationEvent, function(e) {
        jQuery("#isotope-container [trans]").each(function(i, val){
        	jQuery(val).attr("trans", "");
        });
}, false);


jQuery('.menu a').each(function(i, val){
	jQuery(val).attr("state", "off");
    jQuery(val).bind("click", function(e){
        jQuery("#isotope-container [trans]").each(function(i, val){
        	jQuery(val).attr("trans", "");
        });
        var type = jQuery(e.currentTarget).text().trim();
        
        if(type !== "צור קשר" && type !== "בלוג"){
        	
        	e.preventDefault(); 
        	if(jQuery(e.currentTarget).attr("state") === "off" ){
        	
        	jQuery(".menu a").attr("state", "off");        	        
        	jQuery('#isotope-container').isotope({ filter: '.'+type  });
        	jQuery(e.currentTarget).attr("state", "on");
        	} else {
        		jQuery('#isotope-container').isotope({ filter: '*'  });
        		jQuery(e.currentTarget).attr("state", "off");
        	}
        	return false;
        } 
    })
});

// ####################
 // jQuery(function(){
//       
      // var $container = jQuery('#isotope-container');
//       
//       
      // // add randomish size classes
      // $container.find('.isotope-element').each(function(){
        // var $this = jQuery(this),
            // number = parseInt( $this.find('.number').text(), 10 );
        // if ( number % 7 % 2 === 1 ) {
          // $this.addClass('width2');
        // }
        // if ( number % 3 === 0 ) {
          // $this.addClass('height2');
        // }
      // });
//       
      // $container.isotope({
        // itemSelector: '.element',
        // masonry : {
          // columnWidth : 120
        // }
      // });
//       
//       
      // // change size of clicked element
      // $container.delegate( '.isotope-element', 'click', function(){
        // jQuery(this).toggleClass('large');
        // $container.isotope('reLayout');
      // });
// 
//       
// 
//       
    // });
// // ####################
	// jQuery('#isotope-container').isotope({ filter: '*'  });
  }
};

})(jQuery);
